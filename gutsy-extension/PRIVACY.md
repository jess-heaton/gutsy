# Gutsy Browser Extension — Privacy Policy

Last updated: 2026-04-19.

The Gutsy browser extension ("the extension") is a companion to the Gutsy web
app at https://gutsy.freedible.co.uk. It provides a floating "quick log" pill
on any tab so you can log meals, bowel movements and symptoms without switching
to the Gutsy site.

## What the extension stores on your device

The extension uses `chrome.storage.local` — data stays on your device and is
not shared with third parties.

- **Session tokens.** When you are signed in to Gutsy in any tab, the extension
  reads your Supabase session (access + refresh tokens, user id, email) from
  that tab and stores a copy locally. This is used to authenticate requests to
  the Gutsy API from other tabs. Cleared when you sign out.
- **Pending logs.** If you log something while offline or signed out, the entry
  is buffered locally and sent to your Gutsy account the next time you visit
  the Gutsy site.

## What the extension sends over the network

- Entries you log are sent to the Gutsy backend (Supabase) at
  `https://epeckzrybiwjwxazhvrm.supabase.co`, associated with your Gutsy
  account. They are **not** sent anywhere else.
- The extension does **not** read the content of the pages you browse. It only
  injects its own widget.
- The extension does **not** contain any tracking, analytics or advertising
  code.

## What the extension never does

- No reading of page content or form inputs on the sites you visit.
- No sharing of data with third parties.
- No ads or telemetry.

## Contact

Questions: hi@gutsy.freedible.co.uk
