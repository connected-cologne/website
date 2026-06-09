'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 960) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
      }
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
      }
      animId = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    animId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} id="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} id="cursor-ring" aria-hidden="true" />
    </>
  );
}
