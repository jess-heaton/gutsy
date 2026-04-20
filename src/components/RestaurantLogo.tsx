'use client';

import { useState } from 'react';

interface Props {
  domain: string | null | undefined;
  name?: string | null;
  className?: string;
}

export default function RestaurantLogo({ domain, name, className = 'w-10 h-10' }: Props) {
  const [stage, setStage] = useState<'clearbit' | 'google' | 'avatar'>('clearbit');

  if (!domain) return <Avatar name={name} className={className} />;

  if (stage === 'clearbit') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt=""
        className={`${className} rounded-lg object-contain bg-white p-1 border border-gray-100`}
        onError={() => setStage('google')}
      />
    );
  }

  if (stage === 'google') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
        alt=""
        className={`${className} rounded-lg object-contain bg-white p-1 border border-gray-100`}
        onError={() => setStage('avatar')}
      />
    );
  }

  return <Avatar name={name} className={className} />;
}

function Avatar({ name, className }: { name?: string | null; className: string }) {
  const letter = (name ?? '?')[0].toUpperCase();
  return (
    <div className={`${className} rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0`}>
      <span className="text-brand-700 font-bold text-lg leading-none">{letter}</span>
    </div>
  );
}
