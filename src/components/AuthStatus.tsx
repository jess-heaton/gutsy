'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function AuthStatus({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const [email, setEmail] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (email === undefined) return null;

  if (variant === 'mobile') {
    return email
      ? <form action="/auth/signout" method="post" className="flex-1"><button className="w-full py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg">Sign out</button></form>
      : <Link href="/login" className="flex-1 py-2.5 text-center border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg">Sign in</Link>;
  }

  return email ? (
    <form action="/auth/signout" method="post">
      <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
        Sign out
      </button>
    </form>
  ) : (
    <Link href="/login" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
      Sign in
    </Link>
  );
}
