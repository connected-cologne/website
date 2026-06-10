'use client';

import { useEffect, useState } from 'react';

type EventPosterProps = {
  src?: string;
  alt: string;
  posterLetter: string;
};

export default function EventPoster({ src, alt, posterLetter }: EventPosterProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Mount the lightbox first, then flip `visible` on the next frame so the
  // CSS transition (opacity/scale) actually animates in.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => {
    setVisible(false);
    window.setTimeout(() => setOpen(false), 200);
  };

  return (
    <>
      <button
        type="button"
        className="ev-poster"
        onClick={() => src && setOpen(true)}
        aria-label={src ? `${alt} — Poster vergrößern` : undefined}
        aria-hidden={!src}
        tabIndex={src ? 0 : -1}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" className="ev-poster-img" loading="lazy" />
        ) : (
          <span className="ev-poster-letter">{posterLetter}</span>
        )}
      </button>

      {open && src && (
        <div
          className={`ev-lightbox${visible ? ' ev-lightbox--visible' : ''}`}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} — Poster`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="ev-lightbox-img" />
        </div>
      )}
    </>
  );
}
