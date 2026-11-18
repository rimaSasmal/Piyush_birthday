import { Check, Compass, Music2, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import type { MemoryItem } from '../config/birthdayConfig';

interface VoyageHudProps {
  greeting: string;
  memories: readonly MemoryItem[];
  discoveredIds: readonly string[];
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

/**
 * Clean 3-zone top bar overlay, collapsible Memory Index drawer, and
 * closing celebration toast once all 6 seascape memories are uncovered.
 */
export function VoyageHud({
  greeting,
  memories,
  discoveredIds,
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
      {/* Top 3-Zone Bar */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 bg-gradient-to-b from-[#030712]/85 via-[#030712]/40 to-transparent px-5 py-4 sm:px-8 sm:py-6">
        <div className="mx-auto flex max-w-[1440px] items-start justify-between gap-4 sm:items-center sm:gap-8">
          {/* Zone 1: Greeting Wordmark + Subtle Progress */}
          <div className="pointer-events-auto min-w-0">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-[#F5E6C8] whitespace-nowrap sm:text-4xl">
              {greeting}
            </h1>
            <div className="mt-2 flex items-center gap-3">
              <div
                className="h-1 w-28 overflow-hidden rounded-full bg-white/15 sm:w-36"
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

          {/* Zone 2 & 3: Memories Index Toggle + Music Box Audio Control */}
          <div className="pointer-events-auto flex items-center gap-2.5 shrink-0 sm:gap-3">
            {allDiscovered && (
              <button
                type="button"
                onClick={onOpenFinale}
                className="hidden h-10 cursor-pointer items-center gap-1.5 rounded-lg border border-[#F2B705]/45 bg-[#F2B705]/15 px-3.5 text-xs font-medium text-[#F5E6C8] whitespace-nowrap shrink-0 backdrop-blur-md transition-colors duration-150 hover:bg-[#F2B705]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] sm:inline-flex"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#F2B705]" aria-hidden="true" />
                <span>Birthday Toast</span>
              </button>
            )}

            <button
              type="button"
              onClick={onToggleIndex}
              aria-expanded={isIndexOpen}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-[#071022]/75 px-3.5 text-xs font-medium text-[#F5E6C8] whitespace-nowrap shrink-0 backdrop-blur-md transition-colors duration-150 hover:border-[#F2B705]/50 hover:bg-[#0B1730]/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
            >
              <Compass className="h-3.5 w-3.5 text-[#F2B705]" aria-hidden="true" />
              <span>Memories</span>
            </button>

            <button
              type="button"
              onClick={onToggleAudio}
              aria-label={isMuted || !isPlaying ? 'Play music-box birthday tune' : 'Mute audio'}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-[#071022]/75 px-3.5 text-xs font-medium text-[#F5E6C8] whitespace-nowrap shrink-0 backdrop-blur-md transition-colors duration-150 hover:border-[#F2B705]/50 hover:bg-[#0B1730]/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
            >
              {isMuted || !isPlaying ? (
                <>
                  <VolumeX className="h-4 w-4 text-[#F5E6C8]/70" aria-hidden="true" />
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

      {/* Collapsible Voyage Memories Index Panel */}
      {isIndexOpen && (
        <aside
          aria-label="Voyage memories list"
          className="fixed right-5 top-20 z-30 w-[calc(100vw-2.5rem)] max-w-xs rounded-2xl border border-white/15 bg-[#081226]/92 p-4 shadow-2xl backdrop-blur-xl sm:right-8 sm:top-24"
        >
          <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
            <span className="text-xs font-medium tracking-wide text-[#F5E6C8]/75">
              Tap an element to open
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

      {/* Subtle Bottom Hint Bar (Before all discovered) */}
      {!allDiscovered && (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-20 flex justify-center px-4">
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
              className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#F5E6C8] transition-colors hover:border-[#F2B705]/60 hover:text-[#F2B705]"
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
              className="mt-7 inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-[#F2B705]/50 bg-[#F2B705]/15 px-5 text-xs font-medium text-[#F5E6C8] transition-colors hover:bg-[#F2B705]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
            >
              Keep Exploring the Night Sky
            </button>
          </div>
        </div>
      )}
    </>
  );
}
