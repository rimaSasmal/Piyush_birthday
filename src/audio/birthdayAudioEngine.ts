/**
 * ============================================================================
 * BIRTHDAY AUDIO ENGINE (Web Audio API)
 * ============================================================================
 * Synthesizes a tender music-box arrangement of "Happy Birthday to You"
 * layered softly over rhythmic ocean waves—no external MP3 files required.
 * Also supports an optional customAudioUrl if configured later.
 * ============================================================================
 */

interface MelodyNote {
  readonly midi: number | null;
  readonly beats: number;
}

// "Happy Birthday to You" in F major (calm, warm music-box register)
// MIDI 72 = C5, 74 = D5, 76 = E5, 77 = F5, 79 = G5, 81 = A5, 82 = Bb5, 84 = C6
const HAPPY_BIRTHDAY_MELODY: readonly MelodyNote[] = [
  // "Hap-py Birth-day to you"
  { midi: 72, beats: 0.75 },
  { midi: 72, beats: 0.25 },
  { midi: 74, beats: 1.0 },
  { midi: 72, beats: 1.0 },
  { midi: 77, beats: 1.0 },
  { midi: 76, beats: 2.0 },

  // "Hap-py Birth-day to you"
  { midi: 72, beats: 0.75 },
  { midi: 72, beats: 0.25 },
  { midi: 74, beats: 1.0 },
  { midi: 72, beats: 1.0 },
  { midi: 79, beats: 1.0 },
  { midi: 77, beats: 2.0 },

  // "Hap-py Birth-day, dear Pa-ti ji"
  { midi: 72, beats: 0.75 },
  { midi: 72, beats: 0.25 },
  { midi: 84, beats: 1.0 },
  { midi: 81, beats: 1.0 },
  { midi: 77, beats: 1.0 },
  { midi: 76, beats: 1.0 },
  { midi: 74, beats: 2.0 },

  // "Hap-py Birth-day to you"
  { midi: 82, beats: 0.75 },
  { midi: 82, beats: 0.25 },
  { midi: 81, beats: 1.0 },
  { midi: 77, beats: 1.0 },
  { midi: 79, beats: 1.0 },
  { midi: 77, beats: 2.5 },

  // Gentle rest before repeating
  { midi: null, beats: 3.0 },
];

// Gentle companion left-hand accompaniment notes (soft harp-like warmth)
const ACCOMPANIMENT_MAP: Record<number, number> = {
  2: 53, // F3
  5: 48, // C3
  8: 55, // G3
  11: 53, // F3
  14: 53, // F3
  18: 58, // Bb3
  21: 60, // C4
  24: 53, // F3
};

function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export class BirthdayAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicBoxBus: GainNode | null = null;
  private oceanBus: GainNode | null = null;
  private customAudioEl: HTMLAudioElement | null = null;

  private oceanSource: AudioBufferSourceNode | null = null;
  private oceanLfo: OscillatorNode | null = null;

  private schedulerTimer: number | null = null;
  private nextNoteTime = 0;
  private noteIndex = 0;

  private isPlaying = false;
  private isMuted = false;
  private musicBoxVolume: number;
  private oceanWavesVolume: number;
  private tempoBpm: number;
  private customAudioUrl: string | null;

  constructor(options: {
    musicBoxVolume: number;
    oceanWavesVolume: number;
    tempoBpm: number;
    customAudioUrl: string | null;
  }) {
    this.musicBoxVolume = options.musicBoxVolume;
    this.oceanWavesVolume = options.oceanWavesVolume;
    this.tempoBpm = options.tempoBpm;
    this.customAudioUrl = options.customAudioUrl;
  }

  public async start(): Promise<void> {
    if (this.isPlaying) {
      return;
    }

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : 1;
      this.masterGain.connect(this.ctx.destination);

      // Soft warm stereo-echo bus for music box chimes
      this.musicBoxBus = this.ctx.createGain();
      this.musicBoxBus.gain.value = this.musicBoxVolume;

      const delayNode = this.ctx.createDelay(1.0);
      delayNode.delayTime.value = 0.28;
      const delayFeedback = this.ctx.createGain();
      delayFeedback.gain.value = 0.24;
      const delayTone = this.ctx.createBiquadFilter();
      delayTone.type = 'lowpass';
      delayTone.frequency.value = 2200;

      this.musicBoxBus.connect(this.masterGain);
      this.musicBoxBus.connect(delayNode);
      delayNode.connect(delayTone);
      delayTone.connect(delayFeedback);
      delayFeedback.connect(delayNode);
      delayTone.connect(this.masterGain);

      // Ocean surf bus
      this.oceanBus = this.ctx.createGain();
      this.oceanBus.gain.value = this.oceanWavesVolume;
      this.oceanBus.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.isPlaying = true;
    this.startOceanSurf();

    if (this.customAudioUrl) {
      this.startCustomAudio(this.customAudioUrl);
    } else {
      this.noteIndex = 0;
      this.nextNoteTime = this.ctx.currentTime + 0.25;
      this.startMelodyScheduler();
    }
  }

  private startCustomAudio(url: string): void {
    if (!this.customAudioEl) {
      this.customAudioEl = new Audio(url);
      this.customAudioEl.loop = true;
      this.customAudioEl.volume = this.isMuted ? 0 : this.musicBoxVolume;
    }
    void this.customAudioEl.play().catch(() => {
      // Fall back to synthesized music box if custom URL fails to load
      if (this.ctx && this.isPlaying) {
        this.noteIndex = 0;
        this.nextNoteTime = this.ctx.currentTime + 0.2;
        this.startMelodyScheduler();
      }
    });
  }

  private startOceanSurf(): void {
    if (!this.ctx || !this.oceanBus || this.oceanSource) {
      return;
    }

    const durationSeconds = 8;
    const sampleRate = this.ctx.sampleRate;
    const frameCount = sampleRate * durationSeconds;
    const noiseBuffer = this.ctx.createBuffer(1, frameCount, sampleRate);
    const data = noiseBuffer.getChannelData(0);

    // Paul Kellet's pink-noise approximation for warm natural surf
    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    let b3 = 0;
    let b4 = 0;
    let b5 = 0;
    let b6 = 0;
    for (let i = 0; i < frameCount; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      const pink = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.045;
      b6 = white * 0.115926;

      // Smooth crossfade near loop edges
      const fadeSamples = sampleRate * 0.5;
      let env = 1;
      if (i < fadeSamples) {
        env = i / fadeSamples;
      } else if (i > frameCount - fadeSamples) {
        env = (frameCount - i) / fadeSamples;
      }
      data[i] = pink * env;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;

    const surfFilter = this.ctx.createBiquadFilter();
    surfFilter.type = 'lowpass';
    surfFilter.frequency.value = 340;
    surfFilter.Q.value = 0.65;

    const surfSwellGain = this.ctx.createGain();
    surfSwellGain.gain.value = 0.28;

    // Slow ~7.2-second wave rise and retreat
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.138;

    const filterDepth = this.ctx.createGain();
    filterDepth.gain.value = 260;

    const ampDepth = this.ctx.createGain();
    ampDepth.gain.value = 0.16;

    lfo.connect(filterDepth);
    filterDepth.connect(surfFilter.frequency);

    lfo.connect(ampDepth);
    ampDepth.connect(surfSwellGain.gain);

    source.connect(surfFilter);
    surfFilter.connect(surfSwellGain);
    surfSwellGain.connect(this.oceanBus);

    source.start();
    lfo.start();

    this.oceanSource = source;
    this.oceanLfo = lfo;
  }

  private startMelodyScheduler(): void {
    if (this.schedulerTimer !== null) {
      window.clearInterval(this.schedulerTimer);
    }

    const lookaheadMs = 60;
    const scheduleAheadSec = 0.22;

    this.schedulerTimer = window.setInterval(() => {
      if (!this.ctx || !this.isPlaying) {
        return;
      }

      while (this.nextNoteTime < this.ctx.currentTime + scheduleAheadSec) {
        const note = HAPPY_BIRTHDAY_MELODY[this.noteIndex];
        if (note.midi !== null) {
          this.triggerMusicBoxNote(note.midi, this.nextNoteTime, 0.24);
        }

        const companionMidi = ACCOMPANIMENT_MAP[this.noteIndex];
        if (companionMidi !== undefined) {
          this.triggerMusicBoxNote(companionMidi, this.nextNoteTime, 0.11);
        }

        const secondsPerBeat = 60 / this.tempoBpm;
        this.nextNoteTime += note.beats * secondsPerBeat;
        this.noteIndex = (this.noteIndex + 1) % HAPPY_BIRTHDAY_MELODY.length;
      }
    }, lookaheadMs);
  }

  private triggerMusicBoxNote(midi: number, startTime: number, velocity: number): void {
    if (!this.ctx || !this.musicBoxBus) {
      return;
    }

    const freq = midiToFrequency(midi);

    // Primary warm celesta sine tone
    const fundamental = this.ctx.createOscillator();
    fundamental.type = 'sine';
    fundamental.frequency.setValueAtTime(freq, startTime);

    // Subtle music-box tine harmonic (octave + soft bell shimmer)
    const harmonic = this.ctx.createOscillator();
    harmonic.type = 'triangle';
    harmonic.frequency.setValueAtTime(freq * 2, startTime);

    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(velocity, startTime + 0.015);
    noteGain.gain.exponentialRampToValueAtTime(0.0005, startTime + 1.85);

    const harmonicGain = this.ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.0001, startTime);
    harmonicGain.gain.linearRampToValueAtTime(velocity * 0.18, startTime + 0.008);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.45);

    fundamental.connect(noteGain);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(noteGain);
    noteGain.connect(this.musicBoxBus);

    fundamental.start(startTime);
    harmonic.start(startTime);
    fundamental.stop(startTime + 1.9);
    harmonic.stop(startTime + 0.5);
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(muted ? 0 : 1, now + 0.25);
    }
    if (this.customAudioEl) {
      this.customAudioEl.volume = muted ? 0 : this.musicBoxVolume;
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public dispose(): void {
    if (this.schedulerTimer !== null) {
      window.clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    if (this.oceanSource) {
      try {
        this.oceanSource.stop();
      } catch {
        // Already stopped
      }
      this.oceanSource.disconnect();
      this.oceanSource = null;
    }
    if (this.oceanLfo) {
      try {
        this.oceanLfo.stop();
      } catch {
        // Already stopped
      }
      this.oceanLfo.disconnect();
      this.oceanLfo = null;
    }
    if (this.customAudioEl) {
      this.customAudioEl.pause();
      this.customAudioEl = null;
    }
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
    this.isPlaying = false;
  }
}
