import { useEffect, useRef } from 'react';

interface StarParticle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  speed: number;
  phase: number;
}

interface WaterGlint {
  x: number;
  y: number;
  width: number;
  speed: number;
  phase: number;
}

/**
 * Renders subtle twinkling sky stars and shimmering moonlight ripples on water
 * over the night photography seascape while respecting prefers-reduced-motion.
 */
export function SeascapeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId = 0;

    // Generate deterministic-feeling stars across upper night sky (0..54% height)
    const stars: StarParticle[] = Array.from({ length: 78 }, (_, idx) => ({
      x: ((idx * 73 + 19) % 100) / 100,
      y: ((idx * 41 + 7) % 52) / 100,
      radius: idx % 7 === 0 ? 1.5 : idx % 3 === 0 ? 1.1 : 0.75,
      baseAlpha: 0.25 + ((idx * 17) % 55) / 100,
      speed: 0.8 + ((idx * 13) % 18) / 10,
      phase: idx * 0.9,
    }));

    // Shimmer glints concentrated along the moonlight reflection path on the ocean
    const glints: WaterGlint[] = Array.from({ length: 34 }, (_, idx) => {
      const yNorm = 0.61 + ((idx * 29) % 36) / 100;
      const spread = 0.04 + (yNorm - 0.6) * 0.22;
      const offset = (((idx * 37) % 100) / 100 - 0.5) * 2 * spread;
      return {
        x: 0.45 + offset,
        y: yNorm,
        width: 8 + ((idx * 11) % 20),
        speed: 1.1 + ((idx * 7) % 14) / 10,
        phase: idx * 0.75,
      };
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const drawFrame = (timeMs: number) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const t = timeMs / 1000;

      ctx.clearRect(0, 0, w, h);

      // 1. Soft twinkling sky stars
      for (const star of stars) {
        const twinkle = reducedMotion
          ? 1
          : 0.55 + 0.45 * Math.sin(t * star.speed + star.phase);
        const alpha = star.baseAlpha * twinkle;
        ctx.fillStyle = `rgba(245, 238, 220, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Gentle silver moonlight shimmer on ocean ripples
      for (const glint of glints) {
        const shimmer = reducedMotion
          ? 0.4
          : Math.max(0, Math.sin(t * glint.speed + glint.phase));
        const alpha = 0.06 + shimmer * 0.24;
        const driftX = reducedMotion ? 0 : Math.sin(t * 0.7 + glint.phase) * 3;
        const gx = glint.x * w + driftX;
        const gy = glint.y * h;

        const grad = ctx.createLinearGradient(
          gx - glint.width / 2,
          gy,
          gx + glint.width / 2,
          gy
        );
        grad.addColorStop(0, 'rgba(245, 230, 200, 0)');
        grad.addColorStop(0.5, `rgba(245, 236, 214, ${alpha.toFixed(3)})`);
        grad.addColorStop(1, 'rgba(245, 230, 200, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(gx - glint.width / 2, gy - 0.75, glint.width, 1.5);
      }

      if (!reducedMotion) {
        animationFrameId = window.requestAnimationFrame(drawFrame);
      }
    };

    if (reducedMotion) {
      drawFrame(0);
    } else {
      animationFrameId = window.requestAnimationFrame(drawFrame);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
