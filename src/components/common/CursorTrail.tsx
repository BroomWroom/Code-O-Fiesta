'use client';

import React, { useEffect, useRef } from 'react';

export interface CursorTrailProps {
  color?: string;
  className?: string;
}

interface TrailPoint {
  x: number;
  y: number;
  bornAt: number;
}

const POINT_LIFETIME_MS = 1400;

export default function CursorTrail({ color = '139, 92, 246', className = '' }: CursorTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);

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

    const handlePointerMove = (e: PointerEvent) => {
      pointsRef.current.push({ x: e.clientX, y: e.clientY, bornAt: performance.now() });
    };
    window.addEventListener('pointermove', handlePointerMove);

    let frameId: number;

    const draw = () => {
      const now = performance.now();
      pointsRef.current = pointsRef.current.filter((p) => now - p.bornAt < POINT_LIFETIME_MS);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const age = now - curr.bornAt;
        const lifeFraction = 1 - age / POINT_LIFETIME_MS;

        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(curr.x, curr.y);
        ctx.strokeStyle = `rgba(${color}, ${Math.max(0, lifeFraction * 0.7)})`;
        ctx.lineWidth = Math.max(1, lifeFraction * 6);
        ctx.lineCap = 'round';
        ctx.shadowColor = `rgba(${color}, ${Math.max(0, lifeFraction)})`;
        ctx.shadowBlur = 12;
        ctx.stroke();
      }

      frameId = requestAnimationFrame(draw);
    };
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 z-[100] pointer-events-none ${className}`}
    />
  );
}
