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
 *     2. Change `photoUrl` below to `'../assets/images/our-trip.jpg'`
 *
 *   Option B (Direct Import):
 *     1. Place your image inside `src/assets/images/`
 *     2. Add `import myPhoto from '../assets/images/my-photo.jpg';` at the top
 *     3. Set `photoUrl: myPhoto` on the memory entry below.
 * ============================================================================
 */

import seascapeBackdrop from '../assets/images/seascape_night_backdrop_1794999026980.jpg';
import seascapeMobileBackdrop from '../assets/images/seascape_mobile_portrait_1795003117994.jpg';
import dummyBottlePhoto from '../assets/images/Bottle.JPG';
import dummyCloudsPhoto from '../assets/images/cloud.JPG';
import dummyDolphinPhoto from '../assets/images/Dolphin.jpg';
import dummyMoonPhoto from '../assets/images/Moon.jpg';
import dummyShipPhoto from '../assets/images/Ship.jpeg';
import dummyStarPhoto from '../assets/images/star.JPG';

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
  /** Path or imported photo asset. Supports '../assets/images/...' or external HTTPS URLs. */
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
  mainGreeting: 'Happy Birthday, Pati ji :)',

  /** Short invitation shown on the opening curtain before clicking to start audio. */
  arrivalPrompt:
    'Engine room se break lo, Mr. 2nd Engineer! Tumhare liye kuch special hai chotu',
  arrivalButtonLabel: 'Okay, Lets Go',

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
    title: 'Bas, Saare Surprises Khatam! ❤️',
    message:
      'Ships may take you places, but you always have a home to come back to. I hope this little surprise reminded you how loved you are. Missing you a thoda jydaa extra today :( Happy Birthday!',
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
        'Jab bhi tum samundar mein door hote ho, Kabhi kabhi mann karta hai ki tum paas hote, toh chhoti-chhoti baatein bhi saath mein share kar paate.\n\nI know ghar se itne mahine door rehna easy nahi hota, and I am really proud of how hard you work. Bas apna khayal rakha karo. Yahan koi hai jo tumhe bahut miss karta hai aur tumhare jaldi ghar aane ka wait karta hai. ❤️',
      signOff: 'Tumhari favourite troublemaker',
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
        'Suna hai long before GPS, sailors trusted the North Star to guide them safely home. Life mein kitni bhi ups and downs aayein, We can always count on each other.\n\nHere is to many more random baatein, silly jokes, chhoti-badi fights and zero alarms.',
      signOff: 'So glad I have you',
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
      title: 'Through Every Weather',
      dateOrLocation: 'Memory 03 · Peaceful Harbor Dawn',
      photoUrl: dummyCloudsPhoto,
      photoAlt: 'Soft pastel dawn clouds reflecting over a calm coastal harbor',
      message:
        'Just like how quickly clouds gather and clear waise hi humari nok-jhok, chhoti-badi fights aur phir ek dusre ko manana. Kabhi itne sweet, toh kabhi itne stubborn \n\nBut at the end of the day you are always my favourite person my chotu bacha.',
      signOff: 'Saving all my hugs for you ❤️',
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
      title: 'My Hardworking Sailor',
      dateOrLocation: 'Memory 04 · Across the Horizon',
      photoUrl: dummyShipPhoto,
      photoAlt: 'View from a vessel bow sailing toward a glowing twilight horizon',
      message:
        'Everyone sees the ship crossing the ocean, yet few see the grit and skill deep below deck keeping everything running smoothly.\n\nI am endlessly proud of the dedication you bring to your work every day—and even prouder to call you mine.',
      signOff: 'Your forever cheerleader ⚓',
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
        'Just like waves playfully chase each other across the ocean, some of life-s best moments happen without any plans.\n\n sabse badiya time of our life will always be those small nameless ,uncaptured ,playful moments we spend laughing with each other .',
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
        'If I could send one wish across the ocean tonight, it would be :that this birthday brings you as much happiness, support, and love as you give me every single day.\n\nHappy Birthday, Pati ji!',
      signOff: 'Always in your corner ❤️',
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
