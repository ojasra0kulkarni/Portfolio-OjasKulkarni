'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
  x: number;
  y: number;
  value: string;
  alpha: number;
  alphaDir: number;
  size: number;
  speed: number;
  drift: number;
  isFalling: boolean;
}

const NUMS = '0123456789';
const COUNT = 110;

function makeParticle(w: number, h: number, forceVisible = false): Particle {
  const isFalling = Math.random() > 0.45;
  return {
    x: Math.random() * w,
    y: forceVisible ? Math.random() * h : (isFalling ? -20 : Math.random() * h),
    value: NUMS[Math.floor(Math.random() * NUMS.length)],
    alpha: Math.random() * 0.18 + 0.04,
    alphaDir: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.004 + 0.001),
    size: Math.random() * 7 + 8,
    speed: Math.random() * 0.45 + 0.12,
    drift: (Math.random() - 0.5) * 0.12,
    isFalling,
  };
}

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const w = canvas.width, h = canvas.height;
    particlesRef.current = Array.from({ length: COUNT }, () => makeParticle(w, h, true));

    const draw = () => {
      const cw = canvas.width, ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);

      particlesRef.current.forEach((p, i) => {
        ctx.font = `${p.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `rgba(234, 88, 12, ${Math.max(0, p.alpha)})`;
        ctx.fillText(p.value, p.x, p.y);

        if (p.isFalling) {
          p.y += p.speed;
          p.x += p.drift;
          if (Math.random() < 0.012) p.value = NUMS[Math.floor(Math.random() * NUMS.length)];
          p.alpha += p.alphaDir * 0.5;
          p.alpha = Math.max(0.03, Math.min(0.22, p.alpha));
          if (p.y > ch + 20 || p.x < -20 || p.x > cw + 20) {
            particlesRef.current[i] = makeParticle(cw, ch, false);
          }
        } else {
          p.alpha += p.alphaDir;
          if (p.alpha > 0.22 || p.alpha < 0.01) {
            p.alphaDir *= -1;
            if (p.alpha < 0.01) {
              p.x = Math.random() * cw;
              p.y = Math.random() * ch;
              p.value = NUMS[Math.floor(Math.random() * NUMS.length)];
              p.size = Math.random() * 7 + 8;
            }
          }
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 50,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
