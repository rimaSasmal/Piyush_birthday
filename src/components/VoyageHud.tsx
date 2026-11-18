import {
  Check,
  Cloud,
  Compass,
  Fish,
  Moon,
  Music2,
  Sailboat,
  ScrollText,
  Sparkles,
  Star,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import type { MemoryId, MemoryItem } from '../config/birthdayConfig';

interface VoyageHudProps {
  greeting: string;
  memories: readonly MemoryItem[];
  discoveredIds: readonly string[];
  activeMemoryId: MemoryId | null;
  isMuted: boolean;
  isPlaying: boolean;
  isIndexOpen: boolean;
  isFinaleOpen: boolean;
  finaleContent: {
    readonly title: string;
    readonly message: string;
    readonly signOff: string;
  };
  onToggleAudio: () => void;
  onToggleIndex: () => void;
  onSelectMemory: (memory: MemoryItem) => void;
  onCloseFinale: () => void;
  onOpenFinale: () => void;
}

function getElementIcon(id: MemoryId) {
  switch (id) {
    case 'moon':
      return Moon;
    case 'north-star':
      return Star;
    case 'clouds':
      return Cloud;
    case 'ship':
      return Sailboat;
    case 'dolphin':
      return Fish;
    case 'bottle':
      return ScrollText;
  }
}

/**
 * Responsive HUD:
 * - Desktop (>= md): 3-zone top bar + Memories popover + bottom hint
 * - Mobile (< md): Compact top bar (~54px) + 6-item bottom thumb bar (~56px, <= 15% total sticky cap)
 */
export function VoyageHud({
  greeting,
  memories,
  discoveredIds,
  activeMemoryId,
  isMuted,
  isPlaying,
  isIndexOpen,
  isFinaleOpen,
  finaleContent,
  onToggleAudio,
  onToggleIndex,
  onSelectMemory,
  onCloseFinale,
  onOpenFinale,
}: VoyageHudProps) {
  const discoveredCount = discoveredIds.length;
  const totalCount = memories.length;
  const allDiscovered = discoveredCount === totalCount;
  const progressPct = Math.round((discoveredCount / totalCount) * 100);

  return (
    <>
      {/* Top Bar */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 bg-gradient-to-b from-[#030712]/85 via-[#030712]/40 to-transparent px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 sm:px-8 sm:py-6">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 sm:gap-8">
          {/* Zone 1: Greeting Wordmark + Subtle Progress */}
          <div className="pointer-events-auto min-w-0">
            <div className="flex items-baseline gap-2.5">
              <h1 className="font-display truncate text-xl font-semibold tracking-tight text-[#F5E6C8] sm:text-4xl">
                {greeting}
              </h1>
              {/* Compact inline mobile count */}
              <span className="shrink-0 text-xs font-medium text-[#F5E6C8]/70 tabular-nums md:hidden">
                {discoveredCount}/{totalCount}
              </span>
            </div>

            {/* Desktop progress bar & full counter */}
            <div className="mt-2 hidden items-center gap-3 md:flex">
              <div
                className="h-1 w-36 overflow-hidden rounded-full bg-white/15"
                aria-hidden="true"
              >
                <div
                  className="h-full rounded-full bg-[#F2B705] transition-all duration-300 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-xs tracking-wide text-[#F5E6C8]/75 tabular-nums whitespace-nowrap">
                {discoveredCount} of {totalCount} memories discovered
              </span>
            </div>
          </div>

          {/* Zone 2 & 3: Actions */}
          <div className="pointer-events-auto flex items-center gap-2 shrink-0 sm:gap-3">
            {allDiscovered && (
              <button
                type="button"
                onClick={onOpenFinale}
                aria-label="Open closing birthday toast"
                className="inline-flex h-11 min-w-[44px] cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[#F2B705]/45 bg-[#F2B705]/15 px-3 text-xs font-medium text-[#F5E6C8] whitespace-nowrap shrink-0 backdrop-blur-md transition-colors duration-150 hover:bg-[#F2B705]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] sm:h-10 sm:px-3.5"
              >
                <Sparkles className="h-4 w-4 text-[#F2B705] sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Birthday Toast</span>
              </button>
            )}

            {/* Desktop Memories Index button (mobile uses bottom thumb bar) */}
            <button
              type="button"
              onClick={onToggleIndex}
              aria-expanded={isIndexOpen}
              className="hidden h-10 cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-[#071022]/75 px-3.5 text-xs font-medium text-[#F5E6C8] whitespace-nowrap shrink-0 backdrop-blur-md transition-colors duration-150 hover:border-[#F2B705]/50 hover:bg-[#0B1730]/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] md:inline-flex"
            >
              <Compass className="h-3.5 w-3.5 text-[#F2B705]" aria-hidden="true" />
              <span>Memories</span>
            </button>

            <button
              type="button"
              onClick={onToggleAudio}
              aria-label={isMuted || !isPlaying ? 'Play music-box birthday tune' : 'Mute audio'}
              className="inline-flex h-11 min-w-[44px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/15 bg-[#071022]/75 px-3 text-xs font-medium text-[#F5E6C8] whitespace-nowrap shrink-0 backdrop-blur-md transition-colors duration-150 hover:border-[#F2B705]/50 hover:bg-[#0B1730]/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] sm:h-10 sm:px-3.5"
            >
              {isMuted || !isPlaying ? (
                <>
                  <VolumeX className="h-4 w-4 text-[#F5E6C8]/75" aria-hidden="true" />
                  <span className="hidden sm:inline">Sound Off</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4 text-[#F2B705]" aria-hidden="true" />
                  <span className="hidden sm:inline">Music Box On</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Collapsible Voyage Memories Index Panel */}
      {isIndexOpen && (
        <aside
          aria-label="Voyage memories list"
          className="fixed right-8 top-24 z-30 hidden w-80 rounded-2xl border border-white/15 bg-[#081226]/92 p-4 shadow-2xl backdrop-blur-xl md:block"
        >
          <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
            <span className="text-xs font-medium tracking-wide text-[#F5E6C8]/75">
              Click an element to open
            </span>
            <button
              type="button"
              onClick={onToggleIndex}
              aria-label="Close memories list"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-[#F5E6C8]/70 transition-colors hover:bg-white/10 hover:text-[#F5E6C8]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <ul className="space-y-1.5">
            {memories.map((item, idx) => {
              const found = discoveredIds.includes(item.id);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectMemory(item);
                      onToggleIndex();
                    }}
                    className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition-colors duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#F5E6C8]">
                        {item.elementLabel}
                      </p>
                      <p className="truncate text-xs text-[#F5E6C8]/55">
                        {found ? item.title : `Memory 0${idx + 1} · Undiscovered`}
                      </p>
                    </div>
                    <span className="shrink-0">
                      {found ? (
                        <Check className="h-4 w-4 text-[#F2B705]" aria-hidden="true" />
                      ) : (
                        <span className="block h-2 w-2 rounded-full bg-white/30" />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
      )}

      {/* Mobile Bottom Thumb Bar (6 even touch targets, <= 15% total sticky height) */}
      <nav
        aria-label="Memories quick navigation"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#040916]/88 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg md:hidden"
      >
        <div className="grid h-14 grid-cols-6 items-center">
          {memories.map((item) => {
            const Icon = getElementIcon(item.id);
            const found = discoveredIds.includes(item.id);
            const isActive = activeMemoryId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectMemory(item)}
                aria-label={`Open ${item.elementLabel}`}
                className={`relative flex min-h-[44px] min-w-[44px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] ${
                  isActive
                    ? 'text-[#F2B705]'
                    : found
                      ? 'text-[#F2B705]/90'
                      : 'text-[#F5E6C8]/75 active:text-[#F2B705]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={isActive || found ? 2.1 : 1.7} />
                <span className="text-[10px] font-medium tracking-tight leading-none">
                  {item.shortLabel}
                </span>
                {found && (
                  <span
                    aria-hidden="true"
                    className="absolute right-2.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#F2B705]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Subtle Bottom Hint Bar */}
      {!allDiscovered && (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-20 hidden justify-center px-4 md:flex">
          <p className="rounded-lg border border-white/10 bg-[#050C1B]/70 px-4 py-2 text-center text-xs text-[#F5E6C8]/75 backdrop-blur-md">
            <Music2 className="mr-1.5 inline-block h-3.5 w-3.5 text-[#F2B705]" aria-hidden="true" />
            Click the glowing rings on the moon, star, clouds, ship, dolphin, or bottle
          </p>
        </div>
      )}

      {/* Finale Closing Birthday Toast Modal */}
      {isFinaleOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="finale-toast-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#02050D]/80 p-4 backdrop-blur-sm"
          onClick={onCloseFinale}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl border border-[#F2B705]/30 bg-[#091326]/95 p-7 text-center shadow-[0_24px_80px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-9"
          >
            <button
              type="button"
              onClick={onCloseFinale}
              aria-label="Close birthday toast"
              className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#F5E6C8] transition-colors hover:border-[#F2B705]/60 hover:text-[#F2B705]"
            >
              <X className="h-4 w-4" />
            </button>

            <Sparkles
              className="mx-auto mb-4 h-7 w-7 text-[#F2B705]"
              strokeWidth={1.6}
              aria-hidden="true"
            />

            <p className="text-xs tracking-wide text-[#F2B705]/90 tabular-nums">
              {totalCount} of {totalCount} memories discovered
            </p>

            <h2
              id="finale-toast-title"
              className="font-display mt-2 text-3xl font-semibold text-[#F5E6C8] [text-wrap:balance] sm:text-4xl"
            >
              {finaleContent.title}
            </h2>

            <div className="mx-auto my-5 h-px w-16 bg-[#F2B705]/45" aria-hidden="true" />

            <p className="text-[15px] leading-[1.7] text-[#E6DFD1]">
              {finaleContent.message}
            </p>

            <p className="font-display mt-6 text-xl italic text-[#F2B705]">
              — {finaleContent.signOff}
            </p>

            <button
              type="button"
              onClick={onCloseFinale}
              className="mt-7 inline-flex h-11 cursor-pointer items-center justify-center rounded-lg border border-[#F2B705]/50 bg-[#F2B705]/15 px-5 text-xs font-medium text-[#F5E6C8] transition-colors hover:bg-[#F2B705]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] sm:h-10"
            >
              Keep Exploring the Night Sky
            </button>
          </div>
        </div>
      )}
    </>
  );
}
