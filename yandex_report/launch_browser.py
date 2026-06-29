"""
Long-lived headed browser launcher for the Yandex Direct/Metrika read-only export.

Launches the REAL Chrome binary under Playwright (channel="chrome") with a
dedicated persistent profile and an exposed CDP endpoint on :9222, opens Yandex
Direct, then stays alive so the operator can log in manually and so the data
collection steps can attach over CDP (connect_over_cdp) without ever closing it.

Read-only: this launcher only opens pages. It changes nothing in the account.
Stop it by creating the STOP sentinel file (or Ctrl-C).
"""
import os
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

PROFILE_DIR = os.path.expandvars(r"%LOCALAPPDATA%\claude\yandex_profile")
RAW_DIR = str(Path(__file__).resolve().parent.parent / "raw")
STOP_FILE = Path(os.path.expandvars(r"%TEMP%")) / "yandex_scrape_stop"
CDP_PORT = 9222

os.makedirs(RAW_DIR, exist_ok=True)
if STOP_FILE.exists():
    STOP_FILE.unlink()

with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context(
        user_data_dir=PROFILE_DIR,
        channel="chrome",
        headless=False,
        accept_downloads=True,
        downloads_path=RAW_DIR,
        no_viewport=True,
        args=[
            f"--remote-debugging-port={CDP_PORT}",
            "--disable-blink-features=AutomationControlled",
            "--start-maximized",
        ],
    )
    page = ctx.pages[0] if ctx.pages else ctx.new_page()
    page.goto("https://direct.yandex.ru/", wait_until="domcontentloaded")

    print(f"[launcher] Browser up. CDP: http://localhost:{CDP_PORT}", flush=True)
    print(f"[launcher] Profile: {PROFILE_DIR}", flush=True)
    print(f"[launcher] Downloads -> {RAW_DIR}", flush=True)
    print(f"[launcher] LOG IN MANUALLY in the window. Stop with: {STOP_FILE}", flush=True)
    print("[launcher] READY", flush=True)

    # Keep the process (and therefore the browser) alive until told to stop.
    while not STOP_FILE.exists():
        time.sleep(1)

    print("[launcher] STOP sentinel found, closing browser.", flush=True)
    ctx.close()
