import type { Author } from '@/data/articles';

export function AuthorAvatar({ initials, className = '' }: { initials: string; className?: string }) {
  return (
    <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-brand-700 to-brand-500 text-white flex items-center justify-center text-xs font-bold tracking-wide ${className}`}>
      {initials}
    </div>
  );
}

export default function AuthorByline({
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
      <div className="text-xs text-gray-500 space-y-0.5">
        <p>Published <time dateTime={date}>{fmt(date)}</time></p>
        {updatedDate && updatedDate !== date && (
          <p>Updated <time dateTime={updatedDate}>{fmt(updatedDate)}</time> · {readTime} read</p>
        )}
        {(!updatedDate || updatedDate === date) && <p>{readTime} read</p>}
      </div>
    </div>
  );
}
