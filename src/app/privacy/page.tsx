import Link from 'next/link';

export const metadata = { title: 'Privacy' };

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 lg:py-20 prose prose-gray">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: 19 April 2026</p>

      <p>
        Gutsy is an IBS tracking app at <Link href="/" className="text-brand-700">gutsy.freedible.co.uk</Link>.
        This page covers both the web app and the Gutsy browser extension.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">What we store</h2>
      <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
        <li>Your email and hashed password (or Google OAuth identity) for sign-in.</li>
        <li>The logs you enter: meals, bowel movements, symptom scores, notes.</li>
        <li>Saved recipes and menu scans you choose to keep.</li>
        <li>Basic profile info (display name, phase of the low-FODMAP diet).</li>
      </ul>
      <p>
        All of this is stored in our database (hosted by Supabase) and is tied to your account.
        Only you can read or edit it. We enforce this at the database level with row-level
        security — not just in application code.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">The browser extension</h2>
      <p>
        The Gutsy browser extension adds a floating "quick log" pill to any tab so you can log
        without switching to the Gutsy site. It stores two things on your device only
        (via <code>chrome.storage.local</code>):
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
        <li>
          <b>Your session tokens.</b> When you are signed in on the Gutsy site in any tab, the
          extension copies your Supabase session (access + refresh tokens, user id, email) from
          that tab so it can make authenticated requests to your account from other tabs.
          Cleared on sign-out.
        </li>
        <li>
          <b>Pending logs.</b> If you log something while offline or signed out, the entry is
          buffered locally and sent to your Gutsy account the next time you visit the Gutsy site.
        </li>
      </ul>
      <p>
        The extension does <b>not</b> read the contents of the pages you browse, scrape form
        inputs, or contain any tracking, analytics or advertising code. Its only network
        destination is the Gutsy backend at <code>epeckzrybiwjwxazhvrm.supabase.co</code>.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">What we do not do</h2>
      <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
        <li>No selling or sharing of personal data with third parties.</li>
        <li>No ads, no advertising identifiers.</li>
        <li>No analytics SDKs on the browser extension.</li>
        <li>No tracking you across other sites.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Third-party services</h2>
      <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
        <li><b>Supabase</b> — stores your account, logs, recipes and menu scans.</li>
        <li><b>Anthropic</b> — when you use the menu scanner or recipe fixer, we send the menu
          image or recipe text to Claude for analysis. Anthropic does not train on API data.
          Results are returned to you and optionally saved to your account.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Your rights</h2>
      <p>
        You can delete your account at any time from{' '}
        <Link href="/settings" className="text-brand-700">Settings</Link>. Deleting your account
        removes all of your logs, recipes and menu scans from our database.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Contact</h2>
      <p>
        Questions: <a href="mailto:hi@gutsy.freedible.co.uk" className="text-brand-700">hi@gutsy.freedible.co.uk</a>.
      </p>
    </div>
  );
}
