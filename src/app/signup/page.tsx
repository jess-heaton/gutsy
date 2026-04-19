'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null); setMsg(null);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    setBusy(false);
    if (error) { setErr(error.message); return; }
    if (data.session) {
      router.push('/dashboard');
      router.refresh();
    } else {
      setMsg('Check your email to confirm your account.');
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-4xl text-brand-700 text-center mb-2">gutsy</h1>
        <p className="text-center text-gray-600 mb-8">Start tracking in under a minute.</p>

        <form onSubmit={submit} className="space-y-3">
          <input type="email" required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500" />
          <input type="password" required minLength={6} placeholder="Password (min 6)" value={password} onChange={e=>setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500" />
          {err && <p className="text-sm text-red-600">{err}</p>}
          {msg && <p className="text-sm text-emerald-700">{msg}</p>}
          <button disabled={busy} className="w-full bg-brand-700 text-white rounded-xl py-3 font-medium hover:bg-brand-800 disabled:opacity-50">
            {busy ? 'Creating…' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have one? <Link href="/login" className="text-brand-700 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
