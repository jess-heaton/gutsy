'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/dashboard';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) { setErr(error.message); return; }
    router.push(next);
    router.refresh();
  }

  async function google() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-4xl text-brand-700 text-center mb-2">gutsy</h1>
        <p className="text-center text-gray-600 mb-8">Welcome back.</p>

        <form onSubmit={submit} className="space-y-3">
          <input type="email" required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500" />
          <input type="password" required placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500" />
          {err && <p className="text-sm text-red-600">{err}</p>}
          <button disabled={busy} className="w-full bg-brand-700 text-white rounded-xl py-3 font-medium hover:bg-brand-800 disabled:opacity-50">
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button onClick={google} className="w-full border border-gray-200 rounded-xl py-3 font-medium hover:bg-gray-50">
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          New here? <Link href="/signup" className="text-brand-700 font-medium">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
