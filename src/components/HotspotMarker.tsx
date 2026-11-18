import { Check } from 'lucide-react';
import type { MemoryItem } from '../config/birthdayConfig';

interface HotspotMarkerProps {
  memory: MemoryItem;
  isMobilePortrait: boolean;
  isDiscovered: boolean;
  isActive: boolean;
  onSelect: (memory: MemoryItem) => void;
}

/**
 * Transparent-center luminous halo marker anchored around each ocean or sky element.
 * Keeps 100% of the underlying moon, dolphin, star, ship, clouds, and bottle clearly visible.
 */
export function HotspotMarker({
  memory,
  isMobilePortrait,
  isDiscovered,
  isActive,
  onSelect,
}: HotspotMarkerProps) {
  const isFloatingWaterElement = memory.id === 'bottle' || memory.id === 'ship';
  const coords = isMobilePortrait ? memory.mobileHotspot : memory.hotspot;

  return (
    <button
      type="button"
      onClick={() => onSelect(memory)}
      aria-label={`Open memory: ${memory.elementLabel} — ${memory.title}`}
      style={{
        left: `${coords.xPercent}%`,
        top: `${coords.yPercent}%`,
      }}
      className={`group absolute z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040812] ${
        isFloatingWaterElement ? 'animate-gentle-bob' : ''
      }`}
    >
      {/* Expanding outer moonlight ripple (transparent interior) */}
      <span
        aria-hidden="true"
        className={`animate-hotspot-ripple absolute h-11 w-11 rounded-full border bg-transparent ${
          isDiscovered ? 'border-[#F2B705]/60' : 'border-[#F5E6C8]/55'
        }`}
      />

      {/* Hollow transparent ring so the photographic element shines right through */}
      <span
        aria-hidden="true"
        className={`relative flex h-9 w-9 items-center justify-center rounded-full border bg-transparent transition-all duration-200 ease-out group-hover:scale-110 sm:h-10 sm:w-10 ${
          isActive
            ? 'scale-110 border-[#F2B705] shadow-[0_0_20px_rgba(242,183,5,0.5)]'
            : isDiscovered
              ? 'border-[#F2B705]/75 shadow-[0_0_12px_rgba(242,183,5,0.3)] group-hover:border-[#F2B705]'
              : 'border-[#F5E6C8]/65 shadow-[0_0_14px_rgba(245,230,200,0.28)] group-hover:border-[#F2B705]'
        }`}
      >
        {/* Corner check badge when discovered — never blocks the center element */}
        {isDiscovered && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#F2B705] bg-[#060E1F]/90 shadow-sm">
            <Check className="h-2.5 w-2.5 text-[#F2B705]" strokeWidth={2.6} />
          </span>
        )}
      </span>

      {/* Desktop Hover / Focus label tooltip */}
      <span className="pointer-events-none absolute bottom-full mb-2 hidden translate-y-1 whitespace-nowrap rounded-lg border border-white/15 bg-[#071022]/90 px-3 py-1.5 text-xs font-medium tracking-wide text-[#F5E6C8] opacity-0 shadow-lg backdrop-blur-md transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:block">
        {memory.elementLabel}
      </span>
    </button>
  );
}
