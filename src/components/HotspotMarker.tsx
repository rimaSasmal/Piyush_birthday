import { Check } from 'lucide-react';
import type { MemoryItem } from '../config/birthdayConfig';

interface HotspotMarkerProps {
  memory: MemoryItem;
  isDiscovered: boolean;
  isActive: boolean;
  onSelect: (memory: MemoryItem) => void;
}

/**
 * Interactive luminous marker anchored precisely over an ocean or sky element.
 */
export function HotspotMarker({
  memory,
  isDiscovered,
  isActive,
  onSelect,
}: HotspotMarkerProps) {
  const isFloatingWaterElement = memory.id === 'bottle' || memory.id === 'ship';

  return (
    <button
      type="button"
      onClick={() => onSelect(memory)}
      aria-label={`Open memory: ${memory.elementLabel} — ${memory.title}`}
      style={{
        left: `${memory.hotspot.xPercent}%`,
        top: `${memory.hotspot.yPercent}%`,
      }}
      className={`group absolute z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040812] ${
        isFloatingWaterElement ? 'animate-gentle-bob' : ''
      }`}
    >
      {/* Expanding outer moonlight ripple */}
      <span
        aria-hidden="true"
        className={`animate-hotspot-ripple absolute h-10 w-10 rounded-full border ${
          isDiscovered ? 'border-[#F2B705]/65' : 'border-[#F5E6C8]/70'
        }`}
      />

      {/* Core interactive ring */}
      <span
        aria-hidden="true"
        className={`relative flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-200 ease-out group-hover:scale-110 ${
          isActive
            ? 'scale-110 border-[#F2B705] bg-[#F2B705]/25 shadow-[0_0_24px_rgba(242,183,5,0.55)]'
            : isDiscovered
              ? 'border-[#F2B705]/85 bg-[#081226]/70 shadow-[0_0_16px_rgba(242,183,5,0.35)] group-hover:bg-[#F2B705]/25'
              : 'border-[#F5E6C8]/85 bg-[#081226]/45 shadow-[0_0_18px_rgba(245,230,200,0.4)] group-hover:border-[#F2B705] group-hover:bg-[#F2B705]/20'
        }`}
      >
        {isDiscovered ? (
          <Check className="h-3.5 w-3.5 text-[#F2B705]" strokeWidth={2.4} />
        ) : (
          <span className="h-2 w-2 rounded-full bg-[#F5E6C8] transition-colors duration-150 group-hover:bg-[#F2B705]" />
        )}
      </span>

      {/* Hover / Focus label tooltip */}
      <span
        className="pointer-events-none absolute bottom-full mb-2.5 whitespace-nowrap rounded-lg border border-white/15 bg-[#071022]/90 px-3 py-1.5 text-xs font-medium tracking-wide text-[#F5E6C8] opacity-0 shadow-lg backdrop-blur-md transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 translate-y-1"
      >
        {memory.elementLabel}
      </span>
    </button>
  );
}
