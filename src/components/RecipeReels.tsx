'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Play, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import clsx from 'clsx';

interface Reel {
  src: string;
  title: string;
  description: string;
}

// Update titles/descriptions to match your actual videos
const REELS: Reel[] = [
  {
    src: '/reel-1.mp4',
    title: 'Creamy pasta',
    description: 'a creamy low-FODMAP pasta with chicken and spinach',
  },
  {
    src: '/reel-2.mp4',
    title: 'Buddha bowl',
    description: 'a nourishing low-FODMAP buddha bowl with roasted vegetables and tahini',
  },
  {
    src: '/reel-3.mp4',
    title: 'Stir fry',
    description: 'a quick low-FODMAP stir fry with rice noodles and tofu',
  },
  {
    src: '/reel-4.mp4',
    title: 'Salmon tray bake',
    description: 'a simple low-FODMAP salmon tray bake with roasted courgette and lemon',
  },
];

function ReelCard({ reel, onClick }: { reel: Reel; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
    setPlaying(true);
  };
  const handleMouseLeave = () => {
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
    setPlaying(false);
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex-shrink-0 w-44 h-[312px] rounded-2xl overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-400"
      aria-label={`View ${reel.title} recipe`}
    >
      <video
        ref={videoRef}
        src={reel.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* dark gradient base */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* play icon — fades out when playing */}
      <div className={clsx(
        'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
        playing ? 'opacity-0' : 'opacity-100',
      )}>
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
        </div>
      </div>

      {/* glassmorphism footer */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/10 backdrop-blur-md border-t border-white/10">
        <p className="text-white text-xs font-semibold leading-tight line-clamp-2">{reel.title}</p>
        <div className="flex items-center gap-1 mt-1.5">
          <Sparkles className="w-3 h-3 text-brand-300 flex-shrink-0" />
          <span className="text-white/80 text-[10px] font-medium">Fix this recipe</span>
        </div>
      </div>
    </button>
  );
}

export default function RecipeReels() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [modalReel, setModalReel] = useState<Reel | null>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -220 : 220, behavior: 'smooth' });
  };

  const fixRecipe = (reel: Reel) => {
    setModalReel(null);
    router.push(`/recipe?mode=describe&q=${encodeURIComponent(reel.description)}`);
  };

  return (
    <>
      <div className="relative">
        {/* scroll buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>

        {/* scrollable strip */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`.reel-strip::-webkit-scrollbar { display: none; }`}</style>
          {REELS.map(reel => (
            <ReelCard key={reel.src} reel={reel} onClick={() => setModalReel(reel)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalReel && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalReel(null)}
        >
          <div
            className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl max-w-xs w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="aspect-[9/16] relative">
              <video
                src={modalReel.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/10 backdrop-blur-md border-t border-white/10">
                <p className="text-white font-bold text-base">{modalReel.title}</p>
                <button
                  onClick={() => fixRecipe(modalReel)}
                  className="mt-3 w-full flex items-center justify-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Make this low-FODMAP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
