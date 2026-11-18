/**
 * ============================================================================
 * BIRTHDAY VOYAGE CONFIGURATION (Java-Style Constants)
 * ============================================================================
 * Hi! As a Java developer, think of this single file as your `Constants.java`
 * or `application.properties` class. You do NOT need to touch any React UI
 * files to personalize your husband's gift.
 *
 * HOW TO ADD YOUR OWN PHOTOS LATER:
 *   Option A (Recommended for GitHub Pages):
 *     1. Put your photos inside `public/photos/` (e.g. `public/photos/our-trip.jpg`)
 *     2. Change `photoUrl` below to `'./photos/our-trip.jpg'`
 *
 *   Option B (Direct Import):
 *     1. Place your image inside `src/assets/images/`
 *     2. Add `import myPhoto from '../assets/images/my-photo.jpg';` at the top
 *     3. Set `photoUrl: myPhoto` on the memory entry below.
 * ============================================================================
 */

import seascapeBackdrop from '../assets/images/seascape_night_backdrop_1794999026980.jpg';
import seascapeMobileBackdrop from '../assets/images/seascape_mobile_portrait_1795003117994.jpg';
import dummyBottlePhoto from '../assets/images/memory_bottle_letter_1794999030753.jpg';
import dummyCloudsPhoto from '../assets/images/memory_clouds_dawn_1794999028425.jpg';
import dummyDolphinPhoto from '../assets/images/memory_dolphin_sea_1794999029340.jpg';
import dummyMoonPhoto from '../assets/images/memory_moon_couple_1794999028153.jpg';
import dummyShipPhoto from '../assets/images/memory_ship_horizon_1794999029510.jpg';
import dummyStarPhoto from '../assets/images/memory_north_star_night_1794999028694.jpg';

export type MemoryId =
  | 'moon'
  | 'north-star'
  | 'clouds'
  | 'ship'
  | 'dolphin'
  | 'bottle';

export interface MemoryItem {
  /** Unique identifier matching the interactive element in the night sky/ocean. */
  readonly id: MemoryId;
  /** Short name shown on hover and in the voyage index. */
  readonly elementLabel: string;
  /** 1-word concise label shown in the iPhone bottom memory bar. */
  readonly shortLabel: string;
  /** Heartfelt memory headline shown inside the popup card. */
  readonly title: string;
  /** Clean metadata line shown above the title (e.g., date, port, or voyage note). */
  readonly dateOrLocation: string;
  /** Path or imported photo asset. Supports './photos/...' or external HTTPS URLs. */
  readonly photoUrl: string;
  /** Accessible image description for screen readers / fallback state. */
  readonly photoAlt: string;
  /** Multi-line birthday message or memory letter. Use '\n\n' for paragraphs. */
  readonly message: string;
  /** Optional sign-off line below the message. */
  readonly signOff: string;
  /** Position on the 16:9 desktop seascape backdrop (percentage from top-left). */
  readonly hotspot: {
    readonly xPercent: number;
    readonly yPercent: number;
  };
  /** Position on the 9:16 portrait mobile seascape backdrop (percentage from top-left). */
  readonly mobileHotspot: {
    readonly xPercent: number;
    readonly yPercent: number;
  };
}

export interface BirthdaySiteConfig {
  readonly mainGreeting: string;
  readonly arrivalPrompt: string;
  readonly arrivalButtonLabel: string;
  readonly backgroundImageUrl: string;
  readonly mobileBackgroundImageUrl: string;
  readonly audio: {
    /** Softness of the music-box "Happy Birthday" melody (0.0 to 1.0). */
    readonly musicBoxVolume: number;
    /** Softness of the ambient ocean waves (0.0 to 1.0). */
    readonly oceanWavesVolume: number;
    /** Tempo in beats per minute for the music box melody (default 82 = calm). */
    readonly tempoBpm: number;
    /**
     * Optional custom MP3/M4A file path (e.g., './audio/our-song.mp3').
     * Leave as null to play the built-in Music-Box Happy Birthday tune!
     */
    readonly customAudioUrl: string | null;
  };
  readonly finale: {
    readonly title: string;
    readonly message: string;
    readonly signOff: string;
  };
  readonly memories: readonly MemoryItem[];
}

export const BIRTHDAY_CONFIG: BirthdaySiteConfig = {
  /** Main title shown in the top-left header and on the opening curtain. */
  mainGreeting: 'Happy Birthday, Pati ji',

  /** Short invitation shown on the opening curtain before clicking to start audio. */
  arrivalPrompt:
    'Tap the moonlit ocean and stars to uncover six hidden memories waiting for you tonight.',
  arrivalButtonLabel: 'Open Your Birthday Voyage',

  /** Full-bleed realistic night sky & ocean photographs (desktop 16:9 & mobile 9:16). */
  backgroundImageUrl: seascapeBackdrop,
  mobileBackgroundImageUrl: seascapeMobileBackdrop,

  /** Audio settings for the built-in Music Box + Ocean Waves synthesizer. */
  audio: {
    musicBoxVolume: 0.42,
    oceanWavesVolume: 0.34,
    tempoBpm: 82,
    customAudioUrl: null,
  },

  /** Special closing toast unlocked once all 6 memories have been discovered. */
  finale: {
    title: 'All Six Memories Discovered',
    message:
      'No matter how many nautical miles stretch between the ship and shore, my heart sails right beside you every single watch. Wishing you calm seas, safe harbors, and the happiest birthday ahead.',
    signOff: 'Always yours, waiting on shore',
  },

  /**
   * The 6 clickable elements in the night seascape.
   * Replace `title`, `dateOrLocation`, `photoUrl`, `message`, and `signOff` with your own!
   */
  memories: [
    {
      id: 'moon',
      elementLabel: 'Glowing Full Moon',
      shortLabel: 'Moon',
      title: 'Under the Same Full Moon',
      dateOrLocation: 'Memory 01 · Open Waters',
      photoUrl: dummyMoonPhoto,
      photoAlt: 'Couple smiling together on a wooden sailboat deck at sunset',
      message:
        'Whenever you are miles away at sea, I look up at the full moon and remember we are looking at the exact same sky.\n\nThank you for working so hard, staying strong through long contracts, and still filling every call with warmth and laughter.',
      signOff: 'With all my love',
      hotspot: {
        xPercent: 35.5,
        yPercent: 40.5,
      },
      mobileHotspot: {
        xPercent: 32.0,
        yPercent: 23.0,
      },
    },
    {
      id: 'north-star',
      elementLabel: 'Brightest North Star',
      shortLabel: 'Star',
      title: 'My Guiding Light Home',
      dateOrLocation: 'Memory 02 · Quiet Stargazing',
      photoUrl: dummyStarPhoto,
      photoAlt: 'Two warm mugs on a wooden seaside terrace under a starry night sky',
      message:
        'Long before GPS, sailors trusted the North Star to guide them safely home. For me, you have always been that steady light—calm in rough weather, patient, and endlessly dependable.\n\nHere is to many more quiet nights together with warm tea and zero alarms.',
      signOff: 'Forever grateful for you',
      hotspot: {
        xPercent: 78.7,
        yPercent: 20.5,
      },
      mobileHotspot: {
        xPercent: 79.8,
        yPercent: 13.5,
      },
    },
    {
      id: 'clouds',
      elementLabel: 'Drifting Night Clouds',
      shortLabel: 'Clouds',
      title: 'Calm After Every Storm',
      dateOrLocation: 'Memory 03 · Peaceful Harbor Dawn',
      photoUrl: dummyCloudsPhoto,
      photoAlt: 'Soft pastel dawn clouds reflecting over a calm coastal harbor',
      message:
        'Life at sea teaches you how quickly clouds gather and clear—and your calm spirit always turns even the hardest days gentle for us.\n\nMay this new year bring you smooth passages, rested mornings, and skies painted in peaceful colors.',
      signOff: 'Counting down until port',
      hotspot: {
        xPercent: 49.0,
        yPercent: 42.5,
      },
      mobileHotspot: {
        xPercent: 63.0,
        yPercent: 29.5,
      },
    },
    {
      id: 'ship',
      elementLabel: 'Sailing Ship Silhouette',
      shortLabel: 'Ship',
      title: 'Heart of the Engine Room',
      dateOrLocation: 'Memory 04 · Across the Horizon',
      photoUrl: dummyShipPhoto,
      photoAlt: 'View from a vessel bow sailing toward a glowing twilight horizon',
      message:
        'Everyone sees the ship crossing the ocean, yet few see the grit and skill deep below deck keeping everything running smoothly.\n\nI am endlessly proud of the dedication you bring to your work every day—and even prouder to call you mine.',
      signOff: 'So proud of you',
      hotspot: {
        xPercent: 86.2,
        yPercent: 53.5,
      },
      mobileHotspot: {
        xPercent: 78.0,
        yPercent: 45.5,
      },
    },
    {
      id: 'dolphin',
      elementLabel: 'Leaping Dolphin',
      shortLabel: 'Dolphin',
      title: 'Joy Riding Alongside You',
      dateOrLocation: 'Memory 05 · Sunlit Wake',
      photoUrl: dummyDolphinPhoto,
      photoAlt: 'Wild dolphin gliding beside shimmering blue ocean waves',
      message:
        'Sailors say dolphins swimming beside the bow bring good luck and joy to the voyage.\n\nYou bring that same effortless smile into my life—turning ordinary days into my favorite adventures.',
      signOff: 'Here is to endless smiles',
      hotspot: {
        xPercent: 64.0,
        yPercent: 66.5,
      },
      mobileHotspot: {
        xPercent: 29.0,
        yPercent: 59.5,
      },
    },
    {
      id: 'bottle',
      elementLabel: 'Message in a Bottle',
      shortLabel: 'Bottle',
      title: 'A Birthday Wish Cast to Sea',
      dateOrLocation: 'Memory 06 · Shore to Ship',
      photoUrl: dummyBottlePhoto,
      photoAlt: 'Vintage glass bottle with rolled handwritten parchment on moonlit sand',
      message:
        'If I could send a letter across every wave to reach you tonight, it would carry one simple wish: that this birthday brings you as much happiness, peace, and love as you give me every single day.\n\nHappy Birthday, Pati ji!',
      signOff: 'Yours across every ocean',
      hotspot: {
        xPercent: 30.2,
        yPercent: 78.2,
      },
      mobileHotspot: {
        xPercent: 73.5,
        yPercent: 76.5,
      },
    },
  ],
};
