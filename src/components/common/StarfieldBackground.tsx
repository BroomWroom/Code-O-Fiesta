'use client';

import React, { useEffect, useRef } from 'react';

export interface StarfieldBackgroundProps {
  starCount?: number;
  className?: string;
}

interface Star {
  angle: number;
  radius: number;
  speed: number;
  prevRadius: number;
}

const BASE_ACCELERATION = 0.0015;
const STREAK_SPEED_THRESHOLD = 1.4;

export default function StarfieldBackground({ starCount = 260, className = '' }: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let maxRadius = 0;

    const randomStar = (): Star => {
      const radius = Math.random() * maxRadius * 0.3;
      return {
        angle: Math.random() * Math.PI * 2,
        radius,
        speed: 0.3 + Math.random() * 0.6,
        prevRadius: radius,
      };
    };

    let stars: Star[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      maxRadius = Math.sqrt(width * width + height * height) / 2;
      stars = Array.from({ length: starCount }, randomStar);
    };
    resize();
    window.addEventListener('resize', resize);

    let frameId: number;

    const draw = () => {
      // Deep purple-black base rather than plain black, so the whole scene
      // reads as purple even where there are no stars.
      ctx.fillStyle = '#0a0616';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (const star of stars) {
        star.prevRadius = star.radius;
        // Stars accelerate outward as they travel — the "diving through space" feel.
        star.radius += star.speed * (1 + star.radius / maxRadius);
        star.speed += BASE_ACCELERATION;

        if (star.radius > maxRadius) {
          star.angle = Math.random() * Math.PI * 2;
          star.radius = 0;
          star.prevRadius = 0;
          star.speed = 0.3 + Math.random() * 0.6;
        }

        const cosA = Math.cos(star.angle);
        const sinA = Math.sin(star.angle);
        const x = cx + cosA * star.radius;
        const y = cy + sinA * star.radius;
        const depthFraction = star.radius / maxRadius;
        const size = 0.6 + depthFraction * 2.4;
        const opacity = Math.min(1, 0.2 + depthFraction);

        // Lavender/purple tint rather than plain white, brightening toward
        // magenta-white as stars approach — keeps every star visibly purple.
        const r = Math.round(180 + depthFraction * 60);
        const g = Math.round(140 + depthFraction * 90);
        const b = 255;
        const color = `rgba(${r}, ${g}, ${b}, ${opacity})`;

        if (star.speed > STREAK_SPEED_THRESHOLD) {
          const px = cx + cosA * star.prevRadius;
          const py = cy + sinA * star.prevRadius;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.5})`;
          ctx.lineWidth = size * 0.6;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      frameId = requestAnimationFrame(draw);
    };
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, [starCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
    />
  );
}
