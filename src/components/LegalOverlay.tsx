'use client';

import { useEffect, useState, type ReactNode } from 'react';

type LegalOverlayProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Slide-in legal panel. Same overlay lifecycle as ContactModal — mount, then
 * animate in on the next frame; Escape and click-outside close it; body scroll
 * is locked while open. The rest of the site stays visible (dimmed) behind it.
 */
export default function LegalOverlay({ open, onClose, title, children }: LegalOverlayProps) {
  const [visible, setVisible] = useState(false);

  const close = () => {
    setVisible(false);
    window.setTimeout(onClose, 250);
  };

  // Mount first, then flip `visible` next frame so the slide/fade transitions.
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={`legal-overlay${visible ? ' legal-overlay--visible' : ''}`}
      onClick={close}
    >
      <div
        className="legal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="legal-close" onClick={close} aria-label="Close">
          <CloseIcon />
        </button>
        <div className="legal-content">
          <h2 className="legal-title">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
