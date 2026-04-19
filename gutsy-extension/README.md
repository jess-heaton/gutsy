# Gutsy — Browser Extension

Floating quick-log widget on any tab. Logs sync directly to your Gutsy account.

## Install in Chrome (or Edge)

1. Open `chrome://extensions`
2. Turn on **Developer mode** (top-right)
3. Click **Load unpacked** and select this `gutsy-extension` folder
4. Sign in once at https://gutsy.freedible.co.uk
5. Done — the pill appears bottom-left on every tab

## How it works

- **Any page:** small "quick log" pill bottom-left. Click → log a meal, bowel movement, or symptom score. Writes straight to your Gutsy account.
- **Gutsy site:** widget hides (the app has its own). The extension picks up your auth session from the page so it can write to your account from anywhere.
- **Offline / signed out:** logs are buffered locally and flushed the next time you visit Gutsy.

## What it stores

- `gutsy_auth` — a copy of your Supabase session tokens (access + refresh), used to call the Gutsy API. Cleared on sign-out.
- `gutsy_pending` — any logs waiting to sync.

Both live only in `chrome.storage.local` on your device.
