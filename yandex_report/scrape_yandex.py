"""
Reusable read-only collector for Yandex Direct + Yandex Metrika -> ./raw + report data.

WHAT IT DOES (read-only; changes nothing in the account):
  1. Launches the REAL Chrome via Playwright (channel="chrome") with a persistent
     profile and an exposed CDP endpoint on :9222, opens Direct + Metrika.
  2. Waits for YOU to log in manually (captcha/2FA solved by you — never automated).
  3. Exports Direct reports (Мастер отчётов) to ./raw as XLSX.
  4. Builds the Metrika "goal x attribution-model" conversion matrix (Директ segment
     + all traffic) by driving the SPA via in-page JS navigation and scraping cards.

USAGE:
    python yandex_report/scrape_yandex.py
  Then log in in the browser window when prompted. Two preconditions for the Direct
  exports, set up once by hand in Мастер отчётов and saved to "Мои отчёты":
    - a saved report "Поисковые запросы 1"  (grouping: Поисковый запрос)
    - a saved report "Отчет по объявлениям" (grouping: № объявления + Заголовок)
  The campaign-summary and per-goal exports work without saved reports.

KEY LEARNINGS BAKED IN (why the code looks the way it does):
  - Yandex flags fresh Playwright Chromium -> use channel="chrome" + the persistent
    profile; let the human log in.
  - Metrika's SPA hangs on page.goto(); navigate via location.href + poll instead,
    and NEVER scan the whole DOM in evaluate() (it blocks the main thread).
  - Direct's date <input> is a controlled React field that rejects typed values;
    pick days by their data-testid Cell.YYYY-MM-DD instead.
  - "Поисковый запрос" grouping is disabled if the "Доля выигрышей" metric is on.
  - Metrika "Конверсии" report has no attribution switcher in the UI -> change the
    `attr` URL param ({"attributionId": "Last|LastSign|First|Auto"}).
"""
import json
import sys
import time
import urllib.parse
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "raw"
RAW.mkdir(exist_ok=True)
CDP = "http://localhost:9222"
PROFILE_DIR = str(Path.home() / "AppData/Local/claude/yandex_profile")

DIRECT_LOGIN = "kaneefframil"           # ulogin used in Direct URLs
METRIKA_COUNTER = "109732162"
CAMPAIGN_ID = "710623464"
PERIOD = ("2026-05-31", "2026-06-29")   # main period (YYYY-MM-DD)

GOALS = [
    ("567352846", "Отправка формы"),
    ("567352414", "переход в Telegram"),
    ("567353031", "Клик по email"),
    ("567390565", "Автоцель: отправка формы"),
    ("567685837", "Автоцель: переход в мессенджер"),
    ("568277208", "CRM: Заказ создан"),
    ("568277209", "CRM: Заказ оплачен"),
    ("568277210", "CRM: Спам заказ"),
    ("568277211", "CRM: Заказ отменён"),
]
ATTRIBUTIONS = ["LastSign", "Last", "First", "Auto"]


# ---------------------------------------------------------------- browser ----
def launch_and_wait_login():
    """Launch persistent Chrome with CDP, open both sites, wait for manual login."""
    p = sync_playwright().start()
    ctx = p.chromium.launch_persistent_context(
        user_data_dir=PROFILE_DIR,
        channel="chrome",
        headless=False,
        accept_downloads=True,
        downloads_path=str(RAW),
        no_viewport=True,
        args=[
            "--remote-debugging-port=9222",
            "--disable-blink-features=AutomationControlled",
            "--start-maximized",
        ],
    )
    d = ctx.pages[0] if ctx.pages else ctx.new_page()
    d.goto("https://direct.yandex.ru/", wait_until="domcontentloaded")
    m = ctx.new_page()
    m.goto(f"https://metrika.yandex.ru/overview?id={METRIKA_COUNTER}",
           wait_until="domcontentloaded")
    print(">>> Log in to BOTH tabs manually. Solve any captcha yourself. "
          "Press Enter here when both are logged in...")
    input()
    return p, ctx


def page_for(ctx, needle):
    for pg in ctx.pages:
        if needle in pg.url:
            return pg
    return None


# ----------------------------------------------------------- Direct exports --
def direct_pick_dates(d, start, end):
    """Set the Мастер отчётов date range by clicking day cells (start/end YYYY-MM-DD)."""
    import re
    for i in range(d.locator("button").count()):
        try:
            t = d.locator("button").nth(i).inner_text(timeout=200)
        except Exception:
            continue
        if re.search(r"202\d", t) and ("–" in t or "-" in t) and len(t) < 40:
            d.locator("button").nth(i).click()
            break
    time.sleep(1)
    base = "DateRangeSelect.RangeCalendarWithButton.RangeCalendar"

    def cell(date):
        month = "month1" if date[5:7] == "06" else "month0"  # June=right panel
        return f'[data-testid="{base}.{month}.Cell.{date}"]'

    d.locator(cell(start)).first.click(); time.sleep(0.6)
    d.locator(cell(end)).first.click(); time.sleep(1.5)


def direct_download_xlsx(d, fname):
    """Click Скачать -> Скачать XLSX and save into ./raw."""
    if not d.get_by_text("Скачать XLSX", exact=True).count():
        d.get_by_text("Скачать", exact=True).first.click(); time.sleep(1)
    with d.expect_download(timeout=60000) as di:
        d.get_by_text("Скачать XLSX", exact=True).first.click()
    di.value.save_as(str(RAW / fname))
    print("saved", fname)


def direct_open_master(d):
    d.goto(f"https://direct.yandex.ru/dna/reports/wizard?ulogin={DIRECT_LOGIN}",
           wait_until="domcontentloaded")
    time.sleep(4)


def direct_load_saved(d, name):
    """Open a saved Мои отчёты report by its exact name (clears the sidebar search)."""
    for i in range(d.locator("input[placeholder='Поиск']").count()):
        inp = d.locator("input[placeholder='Поиск']").nth(i)
        bb = inp.bounding_box()
        if bb and bb["x"] < 560:
            inp.fill("")
    time.sleep(0.5)
    d.get_by_text(name, exact=True).first.click()
    time.sleep(3)


# ------------------------------------------------------- Metrika conv matrix --
def metrika_conv_matrix(m, with_direct_segment):
    """Navigate the Конверсии report across 4 attribution models, scrape goal cards.

    Drives the SPA by setting location.href (page.goto hangs on Metrika) and uses a
    SCOPED evaluate (never a whole-DOM scan) to read each goal card.
    """
    # Build a base URL: open via UI once if a segment is needed (segment is encoded
    # into the URL after applying), else use the plain conversion_rate URL.
    base = (f"https://metrika.yandex.ru/stat/conversion_rate?id={METRIKA_COUNTER}"
            "&group=day&table=conversion_rate"
            f'&attr={urllib.parse.quote(json.dumps({"attributionId": "LastSign", "isCrossDevice": True}))}')
    if with_direct_segment:
        m.evaluate("(u)=>{location.href=u;}", base)
        _wait_goals(m)
        # apply quick segment "Рекламный трафик" via UI, then read URL with segment
        m.get_by_text("Сегмент", exact=False).first.click(); time.sleep(1)
        s = m.get_by_placeholder("Поиск").last
        if s.input_value():
            s.fill(""); time.sleep(0.5)
        m.get_by_text("Рекламный трафик", exact=True).first.click(); time.sleep(3)
        base = m.url

    matrix = {}
    for code in ATTRIBUTIONS:
        m.evaluate("(u)=>{location.href=u;}", base.replace("LastSign", code))
        _wait_goals(m)
        matrix[code] = _scrape_goals(m)
    return matrix


def _wait_goals(m):
    for _ in range(35):
        time.sleep(1)
        try:
            if m.get_by_text("переход в Telegram", exact=True).count() > 0:
                break
        except Exception:
            pass
    time.sleep(3)


def _scrape_goals(m):
    import re
    raw = m.evaluate(
        """(goals)=>{const res={};for(const [gid,name] of goals){let title=null;
        for(const e of document.querySelectorAll('h2,h3,div,span,a')){
          if(e.childElementCount<=1 && e.textContent.trim()===name){title=e;break;}}
        if(!title){res[gid]={};continue;}let card=title;
        for(let i=0;i<6;i++){if(card.parentElement)card=card.parentElement;
          if(/Достижени|Нет данных/.test(card.textContent))break;}
        res[gid]={t:card.innerText};}return res;}""",
        GOALS,
    )
    out = {}
    for gid, blk in raw.items():
        t = blk.get("t", "")
        if "Нет данных" in t or not t:
            out[gid] = {"reaches": 0, "visits": 0}
            continue
        rch = re.search(r"Достижения цели\s*\n\s*(\d+)", t)
        vis = re.search(r"Целевые визиты\s*\n\s*(\d+)", t)
        out[gid] = {"reaches": int(rch.group(1)) if rch else None,
                    "visits": int(vis.group(1)) if vis else None}
    return out


# --------------------------------------------------------------------- main --
def main():
    p, ctx = launch_and_wait_login()
    try:
        d = page_for(ctx, "direct.yandex.ru")
        m = page_for(ctx, "metrika.yandex.ru")

        # --- Direct: campaign summary ---
        direct_open_master(d)
        direct_pick_dates(d, *PERIOD)
        direct_download_xlsx(d, "direct_01_campaign_summary_period.xlsx")

        # --- Direct: saved search-query + ads reports ---
        direct_load_saved(d, "Поисковые запросы 1")
        direct_pick_dates(d, *PERIOD)
        direct_download_xlsx(d, "direct_02_search_queries_period.xlsx")

        direct_load_saved(d, "Отчет по объявлениям")
        for tag, rng in [("period", PERIOD),
                         ("7days", ("2026-06-23", "2026-06-29")),
                         ("14days", ("2026-06-16", "2026-06-29"))]:
            direct_pick_dates(d, *rng)
            direct_download_xlsx(d, f"direct_03_ads_{tag}.xlsx")

        # --- Metrika: conversion matrix (Директ segment + all traffic) ---
        for seg, fname in [(True, "metrika_conv_matrix_direct.json"),
                           (False, "metrika_conv_matrix_alltraffic.json")]:
            matrix = metrika_conv_matrix(m, with_direct_segment=seg)
            (RAW / fname).write_text(
                json.dumps({"goals": dict(GOALS), "matrix": matrix},
                           ensure_ascii=False, indent=2),
                encoding="utf-8")
            print("saved", fname)

        print("Done. Raw files in", RAW)
    finally:
        # leave the browser open for inspection; close ctx to end the session
        ctx.close()
        p.stop()


if __name__ == "__main__":
    sys.exit(main())
