import { ShieldCheck } from 'lucide-react';
import type { Author } from '@/data/articles';

export function AuthorAvatar({ initials, className = '' }: { initials: string; className?: string }) {
  return (
    <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-brand-700 to-brand-500 text-white flex items-center justify-center text-xs font-bold tracking-wide ${className}`}>
      {initials}
    </div>
  );
}

export default function AuthorByline({
  author,
  reviewer,
  date,
  updatedDate,
  readTime,
}: {
  author: Author;
  reviewer?: Author;
  date: string;
  updatedDate?: string;
  readTime: string;
}) {
  const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <div className="flex flex-wrap items-center gap-4 py-5 border-y border-gray-100">
      <div className="flex items-center gap-3">
        <AuthorAvatar initials={author.avatarInitials} />
        <div>
          <p className="text-sm font-semibold text-gray-900 leading-tight">{author.name}</p>
          <p className="text-xs text-gray-500">{author.role}</p>
        </div>
      </div>

      <div className="h-8 w-px bg-gray-200 hidden sm:block" />

      <div className="text-xs text-gray-500 space-y-0.5">
        <p>Published <time dateTime={date}>{fmt(date)}</time></p>
        {updatedDate && updatedDate !== date && (
          <p>Updated <time dateTime={updatedDate}>{fmt(updatedDate)}</time> · {readTime} read</p>
        )}
        {(!updatedDate || updatedDate === date) && <p>{readTime} read</p>}
      </div>

      {reviewer && (
        <div className="ml-auto flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          {reviewer.role}
        </div>
      )}
    </div>
  );
}
