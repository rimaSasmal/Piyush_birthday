import { Anchor, Volume2 } from 'lucide-react';

interface ArrivalCurtainProps {
  greeting: string;
  prompt: string;
  buttonLabel: string;
  onEnter: () => void;
}

/**
 * Welcoming opening screen that unlocks the browser's Web Audio API smoothly
 * when the user clicks to begin their moonlit birthday voyage.
 */
export function ArrivalCurtain({
  greeting,
  prompt,
  buttonLabel,
  onEnter,
}: ArrivalCurtainProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#030712]/80 px-6 backdrop-blur-md">
      <div className="flex max-w-xl flex-col items-center text-center">
        <Anchor
          className="mb-5 h-7 w-7 text-[#F2B705]/90"
          strokeWidth={1.6}
          aria-hidden="true"
        />

        <h1 className="font-display text-4xl font-semibold tracking-tight text-[#F5E6C8] [text-wrap:balance] sm:text-6xl">
          {greeting}
        </h1>

        <p className="mt-4 max-w-md text-sm leading-relaxed tracking-[0.01em] text-[#E6DFD1]/80 sm:text-base">
          {prompt}
        </p>

        <button
          type="button"
          onClick={onEnter}
          className="mt-8 inline-flex cursor-pointer items-center gap-2.5 rounded-xl border border-[#F2B705]/60 bg-[#F2B705] px-7 py-3.5 text-sm font-semibold text-[#040812] whitespace-nowrap shrink-0 shadow-[0_10px_35px_rgba(242,183,5,0.28)] transition-all duration-200 hover:bg-[#F7C631] hover:shadow-[0_14px_42px_rgba(242,183,5,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5E6C8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
        >
          <Volume2 className="h-4 w-4" aria-hidden="true" />
          <span>{buttonLabel}</span>
        </button>

        <p className="mt-4 text-xs text-[#F5E6C8]/55">
          Plays a soft music-box birthday melody with ocean waves
        </p>
      </div>
    </div>
  );
}
