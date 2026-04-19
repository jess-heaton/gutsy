# Gutsy — Browser Extension

Floating quick-log widget on any tab. Logs sync automatically to the Gutsy app when you visit it.

## Install in Chrome (or Edge)

1. Open Chrome and go to `chrome://extensions`
2. Turn on **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select this `gutsy-extension` folder
5. Done — the pill appears bottom-left on every tab

## How it works

- **On any page:** a small "quick log" pill sits bottom-left. Click it to log a meal, bowel movement, or symptom score.
- **On the Gutsy site:** the widget hides (the app has its own). Your extension logs are automatically merged into the app's data on page load — no action needed.

## Data

Extension logs are stored in Chrome's local storage (`chrome.storage.local`). When you open the Gutsy app, the extension syncs them into the app automatically.
