import { AuthorAvatar } from './AuthorByline';
import type { Author } from '@/data/articles';

export default function AuthorCard({ author, reviewer }: { author: Author; reviewer?: Author }) {
  return (
    <aside className="mt-12 border border-gray-200 rounded-2xl p-6 bg-gray-50/60 font-sans">
      <div className="flex items-start gap-4">
        <AuthorAvatar initials={author.avatarInitials} className="w-12 h-12 text-sm flex-shrink-0" />
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Written by</p>
          <p className="text-sm font-bold text-gray-900">{author.name}</p>
          <p className="text-sm text-gray-600 leading-relaxed mt-1.5">{author.bio}</p>
        </div>
      </div>
      {reviewer && (
        <div className="flex items-start gap-4 mt-5 pt-5 border-t border-gray-200">
          <AuthorAvatar initials={reviewer.avatarInitials} className="w-12 h-12 text-sm flex-shrink-0" />
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{reviewer.role}</p>
            <p className="text-sm font-bold text-gray-900">{reviewer.name}</p>
            <p className="text-sm text-gray-600 leading-relaxed mt-1.5">{reviewer.bio}</p>
          </div>
        </div>
      )}
    </aside>
  );
}
