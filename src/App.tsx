import { useCallback, useEffect, useRef, useState } from 'react';
import { BirthdayAudioEngine } from './audio/birthdayAudioEngine';
import { ArrivalCurtain } from './components/ArrivalCurtain';
import { HotspotMarker } from './components/HotspotMarker';
import { MemoryLightbox } from './components/MemoryLightbox';
import { SeascapeCanvas } from './components/SeascapeCanvas';
import { VoyageHud } from './components/VoyageHud';
import { BIRTHDAY_CONFIG, type MemoryId, type MemoryItem } from './config/birthdayConfig';

function useIsMobilePortrait(): boolean {
  const [isMobilePortrait, setIsMobilePortrait] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia('(max-width: 767px) and (orientation: portrait)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px) and (orientation: portrait)');
    const handleChange = () => setIsMobilePortrait(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isMobilePortrait;
}

export default function App() {
  const isMobilePortrait = useIsMobilePortrait();

  const [hasEnteredVoyage, setHasEnteredVoyage] = useState(false);
  const [discoveredIds, setDiscoveredIds] = useState<MemoryId[]>([]);
  const [activeMemoryId, setActiveMemoryId] = useState<MemoryId | null>(null);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [isFinaleOpen, setIsFinaleOpen] = useState(false);
  const [hasShownFinaleOnce, setHasShownFinaleOnce] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [backdropError, setBackdropError] = useState(false);

  const audioEngineRef = useRef<BirthdayAudioEngine | null>(null);

  useEffect(() => {
    const engine = new BirthdayAudioEngine(BIRTHDAY_CONFIG.audio);
    audioEngineRef.current = engine;

    return () => {
      engine.dispose();
      audioEngineRef.current = null;
    };
  }, []);

  // Reset backdrop fallback state when switching between mobile/desktop orientation
  useEffect(() => {
    setBackdropError(false);
  }, [isMobilePortrait]);

  const handleEnterVoyage = useCallback(async () => {
    setHasEnteredVoyage(true);
    const engine = audioEngineRef.current;
    if (engine) {
      await engine.start();
      setIsPlaying(true);
      setIsMuted(false);
    }
  }, []);

  const handleToggleAudio = useCallback(async () => {
    const engine = audioEngineRef.current;
    if (!engine) {
      return;
    }

    if (!engine.getIsPlaying()) {
      await engine.start();
      engine.setMuted(false);
      setIsPlaying(true);
      setIsMuted(false);
      return;
    }

    const nextMuted = !engine.getMuted();
    engine.setMuted(nextMuted);
    setIsMuted(nextMuted);
  }, []);

  const handleSelectMemory = useCallback((memory: MemoryItem) => {
    setActiveMemoryId(memory.id);
    setDiscoveredIds((prev) =>
      prev.includes(memory.id) ? prev : [...prev, memory.id]
    );
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setActiveMemoryId(null);
    if (
      discoveredIds.length === BIRTHDAY_CONFIG.memories.length &&
      !hasShownFinaleOnce
    ) {
      setHasShownFinaleOnce(true);
      setIsFinaleOpen(true);
    }
  }, [discoveredIds.length, hasShownFinaleOnce]);

  const activeIndex = BIRTHDAY_CONFIG.memories.findIndex(
    (m) => m.id === activeMemoryId
  );
  const activeMemory =
    activeIndex >= 0 ? BIRTHDAY_CONFIG.memories[activeIndex] : null;

  const handlePreviousMemory = useCallback(() => {
    if (activeIndex < 0) {
      return;
    }
    const prevIdx =
      (activeIndex - 1 + BIRTHDAY_CONFIG.memories.length) %
      BIRTHDAY_CONFIG.memories.length;
    handleSelectMemory(BIRTHDAY_CONFIG.memories[prevIdx]);
  }, [activeIndex, handleSelectMemory]);

  const handleNextMemory = useCallback(() => {
    if (activeIndex < 0) {
      return;
    }
    const nextIdx = (activeIndex + 1) % BIRTHDAY_CONFIG.memories.length;
    handleSelectMemory(BIRTHDAY_CONFIG.memories[nextIdx]);
  }, [activeIndex, handleSelectMemory]);

  // Keyboard shortcuts: Escape closes modals, Left/Right arrows cycle memories
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (activeMemoryId) {
          handleCloseLightbox();
        } else if (isFinaleOpen) {
          setIsFinaleOpen(false);
        } else if (isIndexOpen) {
          setIsIndexOpen(false);
        }
      } else if (activeMemoryId && event.key === 'ArrowLeft') {
        handlePreviousMemory();
      } else if (activeMemoryId && event.key === 'ArrowRight') {
        handleNextMemory();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    activeMemoryId,
    isFinaleOpen,
    isIndexOpen,
    handleCloseLightbox,
    handlePreviousMemory,
    handleNextMemory,
  ]);

  const backdropSrc = isMobilePortrait
    ? BIRTHDAY_CONFIG.mobileBackgroundImageUrl
    : BIRTHDAY_CONFIG.backgroundImageUrl;

  return (
    <main className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#040812] select-none">
      {/*
        Aspect-locked stage:
        - Portrait mobile (< 768px portrait): uses dedicated 9:16 night seascape filling 100dvh edge-to-edge.
        - Laptop / landscape: uses 16:9 widescreen ocean panorama.
        Because image, canvas, and hotspots share the exact stage box, every halo stays aligned to its element.
      */}
      <div
        className={
          isMobilePortrait
            ? 'relative aspect-[9/16] h-[100dvh] shrink-0'
            : 'relative aspect-video w-[max(100vw,177.78vh)] shrink-0'
        }
      >
        {!backdropError ? (
          <img
            src={backdropSrc}
            alt="Moonlit night sky with clouds, North Star, sailing ship, leaping dolphin, and message in a bottle on calm ocean waves"
            referrerPolicy="no-referrer"
            onError={() => setBackdropError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-b from-[#040812] via-[#0B1730] to-[#050C1C]" />
        )}

        {/* Subtle drifting moonlight mist near clouds */}
        <div
          aria-hidden="true"
          className="animate-cloud-glide pointer-events-none absolute inset-x-[12%] top-[24%] h-[20%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(226,232,240,0.14)_0%,transparent_70%)] blur-2xl"
        />

        {/* Animated twinkling sky stars & shimmering water reflection */}
        <SeascapeCanvas />

        {/* Subtle top & bottom gradient scrims for crisp HUD legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#040812]/80 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#040812]/90 to-transparent"
        />

        {/* 6 Interactive Seascape Hotspots */}
        {hasEnteredVoyage &&
          BIRTHDAY_CONFIG.memories.map((memory) => (
            <HotspotMarker
              key={memory.id}
              memory={memory}
              isMobilePortrait={isMobilePortrait}
              isDiscovered={discoveredIds.includes(memory.id)}
              isActive={activeMemoryId === memory.id}
              onSelect={handleSelectMemory}
            />
          ))}
      </div>

      {/* Responsive Top HUD, Mobile Bottom Thumb Bar & Finale Celebration */}
      {hasEnteredVoyage && (
        <VoyageHud
          greeting={BIRTHDAY_CONFIG.mainGreeting}
          memories={BIRTHDAY_CONFIG.memories}
          discoveredIds={discoveredIds}
          activeMemoryId={activeMemoryId}
          isMuted={isMuted}
          isPlaying={isPlaying}
          isIndexOpen={isIndexOpen}
          isFinaleOpen={isFinaleOpen}
          finaleContent={BIRTHDAY_CONFIG.finale}
          onToggleAudio={handleToggleAudio}
          onToggleIndex={() => setIsIndexOpen((prev) => !prev)}
          onSelectMemory={handleSelectMemory}
          onCloseFinale={() => setIsFinaleOpen(false)}
          onOpenFinale={() => setIsFinaleOpen(true)}
        />
      )}

      {/* Opening Welcome Curtain (unlocks audio smoothly on first click) */}
      {!hasEnteredVoyage && (
        <ArrivalCurtain
          greeting={BIRTHDAY_CONFIG.mainGreeting}
          prompt={BIRTHDAY_CONFIG.arrivalPrompt}
          buttonLabel={BIRTHDAY_CONFIG.arrivalButtonLabel}
          onEnter={handleEnterVoyage}
        />
      )}

      {/* Active Memory Photo & Letter Lightbox */}
      {activeMemory && (
        <MemoryLightbox
          memory={activeMemory}
          currentIndex={activeIndex}
          totalCount={BIRTHDAY_CONFIG.memories.length}
          onClose={handleCloseLightbox}
          onPrevious={handlePreviousMemory}
          onNext={handleNextMemory}
        />
      )}
    </main>
  );
}
