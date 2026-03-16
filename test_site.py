"""
Agency Website - Playwright Test Script
Tests: homepage, navigation, key pages, and interactive elements
"""

from playwright.sync_api import sync_playwright
import sys

import time
import urllib.request

BASE_URL = "http://localhost:3002"

# Warm up Next.js (first request triggers compilation, can take 10-20s)
print("Warming up Next.js dev server...")
for _ in range(30):
    try:
        urllib.request.urlopen(BASE_URL, timeout=5)
        print("Server warmed up!")
        break
    except Exception:
        time.sleep(2)
else:
    print("Warning: could not warm up server, proceeding anyway")

def take_screenshot(page, name):
    path = f"/tmp/agency_{name}.png"
    page.screenshot(path=path, full_page=True)
    print(f"  [screenshot] {path}")

def check_page(page, url, name, checks=None):
    print(f"\n--- {name} ({url}) ---")
    page.goto(url, timeout=60000)
    page.wait_for_load_state("networkidle", timeout=30000)
    take_screenshot(page, name)

    title = page.title()
    print(f"  title: {title}")

    if checks:
        for selector, label in checks:
            try:
                el = page.locator(selector).first
                if el.is_visible():
                    print(f"  [PASS] {label}")
                else:
                    print(f"  [WARN] {label} - not visible")
            except Exception as e:
                print(f"  [FAIL] {label} - {e}")

    # Check for console errors
    return title

errors = []

def on_console(msg):
    if msg.type == "error":
        errors.append(f"Console error on {msg.page.url}: {msg.text}")

def on_pageerror(err):
    errors.append(f"Page error: {err}")

results = {}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context()
    context.set_default_timeout(60000)
    page = context.new_page()
    page.on("console", on_console)
    page.on("pageerror", on_pageerror)

    # 1. Homepage
    results["home"] = check_page(page, BASE_URL, "homepage", checks=[
        ("nav", "Navigation present"),
        ("h1, h2", "Hero heading"),
        ("footer", "Footer present"),
        ("a[href='/start']", "CTA link to /start"),
    ])

    # 2. About page
    results["about"] = check_page(page, f"{BASE_URL}/about", "about", checks=[
        ("h1, h2", "Page heading"),
    ])

    # 3. Blog page
    results["blog"] = check_page(page, f"{BASE_URL}/blog", "blog", checks=[
        ("h1, h2", "Page heading"),
        ("article, .blog, [class*='blog'], a[href*='/blog/']", "Blog posts"),
    ])

    # 4. Stories page
    results["stories"] = check_page(page, f"{BASE_URL}/stories", "stories", checks=[
        ("h1, h2", "Page heading"),
    ])

    # 5. Start/contact page
    results["start"] = check_page(page, f"{BASE_URL}/start", "start", checks=[
        ("h1, h2", "Page heading"),
        ("form, input, button", "Form elements"),
    ])

    # 6. Privacy page
    results["privacy"] = check_page(page, f"{BASE_URL}/privacy", "privacy", checks=[
        ("h1, h2", "Page heading"),
    ])

    # 7. Nav links from homepage
    print("\n--- Navigation link test ---")
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    nav_links = page.locator("nav a").all()
    print(f"  Found {len(nav_links)} nav links:")
    for link in nav_links:
        href = link.get_attribute("href")
        text = link.inner_text().strip()
        print(f"    {text!r} -> {href}")

    # 8. Check for 404 on a bad route
    print("\n--- 404 check ---")
    page.goto(f"{BASE_URL}/nonexistent-page-xyz")
    page.wait_for_load_state("domcontentloaded")
    status_text = page.locator("body").inner_text()
    if "404" in status_text or "not found" in status_text.lower():
        print("  [PASS] 404 page works")
    else:
        print("  [WARN] 404 behavior unclear")

    context.close()
    browser.close()

print("\n\n========== SUMMARY ==========")
print(f"Pages tested: {list(results.keys())}")
if errors:
    print(f"\nConsole/Page errors ({len(errors)}):")
    for e in errors:
        print(f"  [ERROR] {e}")
else:
    print("\nNo console/page errors detected.")
print("==============================")
