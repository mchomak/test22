"""Shared helpers for attaching to the running CDP browser (read-only)."""
import re, time
from pathlib import Path
from playwright.sync_api import sync_playwright

RAW = Path(__file__).resolve().parent.parent / "raw"
RAW.mkdir(exist_ok=True)
CDP = "http://localhost:9222"

def attach():
    p = sync_playwright().start()
    b = p.chromium.connect_over_cdp(CDP)
    return p, b, b.contexts[0]

def page_for(ctx, needle):
    for pg in ctx.pages:
        if needle in pg.url:
            return pg
    return None

def shot(pg, name, full=False):
    path = RAW / name
    pg.screenshot(path=str(path), full_page=full)
    return path

def save_html(pg, name):
    path = RAW / name
    path.write_text(pg.content(), encoding="utf-8")
    return path
