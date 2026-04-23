'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Play, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { reelRecipes as allReels, type ReelRecipe } from '@/data/reel-recipes';

const REEL_ORDER = ['avocado-toast', 'protein-bowl', 'tzatziki', 'brownie', 'chicken-caesar-wrap', 'air-fry-chicken-bites'];
const reelRecipes = REEL_ORDER.map(slug => allReels.find(r => r.slug === slug)!).filter(Boolean);

function ReelCard({ reel, onClick }: { reel: ReelRecipe; onClick: () => void }) {
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
      className="relative flex-shrink-0 w-52 h-[370px] rounded-2xl overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-400"
      aria-label={`View ${reel.title} recipe`}
    >
      <video
        ref={videoRef}
        src={reel.videoSrc}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      <div className={clsx(
        'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
        playing ? 'opacity-0' : 'opacity-100',
      )}>
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-white/10 backdrop-blur-md border-t border-white/10">
        <p className="text-white text-sm font-semibold leading-tight line-clamp-2">{reel.title}</p>
        <div className="flex items-center gap-1 mt-1.5">
          <Sparkles className="w-3 h-3 text-brand-300 flex-shrink-0" />
          <span className="text-white/80 text-[11px] font-medium">See the FODMAP-safe recipe</span>
        </div>
      </div>
    </button>
  );
}

export default function RecipeReels() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [modalReel, setModalReel] = useState<ReelRecipe | null>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3.5 overflow-x-auto pb-2 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reelRecipes.map(reel => (
            <ReelCard key={reel.slug} reel={reel} onClick={() => setModalReel(reel)} />
          ))}
        </div>
      </div>

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
                src={modalReel.videoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/10 backdrop-blur-md border-t border-white/10">
                <p className="text-white font-bold text-base">{modalReel.title}</p>
                <p className="text-white/70 text-xs mt-0.5">{modalReel.totalTime} · serves {modalReel.servings}</p>
                <button
                  onClick={() => { setModalReel(null); router.push(`/reel/${modalReel.slug}`); }}
                  className="mt-3 w-full flex items-center justify-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  See the FODMAP-safe recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
