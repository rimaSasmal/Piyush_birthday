import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Compass, X } from 'lucide-react';
import type { MemoryItem } from '../config/birthdayConfig';

interface MemoryLightboxProps {
  memory: MemoryItem;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

/**
 * High-contrast dark obsidian glass lightbox modal displaying the selected
 * photo, clean unboxed metadata, heartfelt letter, and previous/next controls.
 */
export function MemoryLightbox({
  memory,
  currentIndex,
  totalCount,
  onClose,
  onPrevious,
  onNext,
}: MemoryLightboxProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [memory.id, memory.photoUrl]);

  const paragraphs = memory.message
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="memory-lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#02050D]/80 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[88dvh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#F5E6C8]/15 bg-[#091326]/95 shadow-[0_24px_80px_rgba(0,0,0,0.75)] backdrop-blur-xl md:flex-row"
      >
        {/* Top-right high-contrast close button (44px mobile touch target) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close memory"
          className="absolute right-3 top-3 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#050C1B]/85 text-[#F5E6C8] transition-colors duration-150 hover:border-[#F2B705]/60 hover:text-[#F2B705] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] sm:right-4 sm:top-4 sm:h-10 sm:w-10"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Photo Frame with Zero-Broken-Image fallback */}
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#060E1F] sm:aspect-[4/3] md:w-[52%] md:aspect-auto md:min-h-[420px]">
          {!imageError ? (
            <img
              src={memory.photoUrl}
              alt={memory.photoAlt}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0A1730] via-[#071022] to-[#040812] p-6 text-center">
              <Compass className="h-9 w-9 text-[#F2B705]/70" strokeWidth={1.5} />
              <p className="font-display text-2xl text-[#F5E6C8]">
                {memory.elementLabel}
              </p>
              <p className="max-w-xs text-xs leading-relaxed text-[#F5E6C8]/60">
                Photo placeholder ready—add your image path in the birthday config file to display it here.
              </p>
            </div>
          )}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#091326]/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#091326]/35"
          />
        </div>

        {/* Scrollable Letter Content */}
        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-5 sm:p-8">
          <div>
            {/* Unboxed metadata line (zero pills) */}
            <div className="flex flex-wrap items-center gap-2 pr-10 text-xs tracking-wide text-[#F5E6C8]/65 tabular-nums">
              <span>{memory.elementLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{memory.dateOrLocation}</span>
            </div>

            <h2
              id="memory-lightbox-title"
              className="font-display mt-2.5 text-2xl font-semibold leading-tight text-[#F5E6C8] [text-wrap:balance] sm:mt-3 sm:text-4xl"
            >
              {memory.title}
            </h2>

            <div className="my-4 h-px w-16 bg-[#F2B705]/45 sm:my-5" aria-hidden="true" />

            <div className="space-y-3.5 text-[14.5px] leading-[1.68] tracking-[0.01em] text-[#E6DFD1] sm:space-y-4 sm:text-[15px]">
              {paragraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>

            <p className="font-display mt-5 text-lg italic text-[#F2B705]/95 sm:mt-6 sm:text-xl">
              — {memory.signOff}
            </p>
          </div>

          {/* Footer pagination controls (44px touch targets) */}
          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 sm:mt-8 sm:pt-5">
            <span className="text-xs text-[#F5E6C8]/55 tabular-nums">
              {currentIndex + 1} of {totalCount}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onPrevious}
                className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3.5 text-xs font-medium text-[#F5E6C8] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#F2B705]/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] sm:h-10"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={onNext}
                className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-lg border border-[#F2B705]/40 bg-[#F2B705]/15 px-3.5 text-xs font-medium text-[#F5E6C8] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#F2B705]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] sm:h-10"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
