'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './ArtistCard.module.css';

/* =============================================
   TYPES
   ============================================= */

export type ArtistLinks = {
  instagram?: string;
  soundcloud?: string;
  spotify?: string;
  youtube?: string;
  presskit?: string;
};

export type ArtistCardProps = {
  name: string;
  genres: string[];
  image: string;
  bio: string;
  links?: ArtistLinks;
};

/* =============================================
   LOGO — used for back-side branding AND as a
   repeating mask for the holographic shine
   (project only ships a .png, not .jpg)
   ============================================= */
const LOGO_SRC = '/images/Cc_Logo_SW.png';

/* =============================================
   TILT ENGINE
   Adapted from React Bits ProfileCard — same
   spring/lerp approach, recolored to purple.
   ============================================= */

const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1000,
  INITIAL_X_OFFSET: 60,
  INITIAL_Y_OFFSET: 50,
};

type TiltEngine = {
  setImmediate: (x: number, y: number) => void;
  setTarget: (x: number, y: number) => void;
  toCenter: () => void;
  beginInitial: (durationMs: number) => void;
  getCurrent: () => { x: number; y: number; tx: number; ty: number };
  cancel: () => void;
};

function createTiltEngine(getEl: () => HTMLElement | null, applyEl: () => HTMLElement | null): TiltEngine {
  let rafId: number | null = null;
  let running = false;
  let lastTs = 0;

  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  const DEFAULT_TAU = 0.14;
  const INITIAL_TAU = 0.6;
  let initialUntil = 0;

  const setVarsFromXY = (x: number, y: number) => {
    const el = getEl();
    const apply = applyEl();
    if (!el || !apply) return;

    const width = el.clientWidth || 1;
    const height = el.clientHeight || 1;

    const percentX = clamp((100 / width) * x);
    const percentY = clamp((100 / height) * y);

    const centerX = percentX - 50;
    const centerY = percentY - 50;

    const properties: Record<string, string> = {
      '--pointer-x': `${percentX}%`,
      '--pointer-y': `${percentY}%`,
      '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
      '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
      '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
      '--rotate-x': `${round(-(centerX / 5))}deg`,
      '--rotate-y': `${round(centerY / 4)}deg`,
    };

    for (const [k, v] of Object.entries(properties)) apply.style.setProperty(k, v);
  };

  const step = (ts: number) => {
    if (!running) return;
    if (lastTs === 0) lastTs = ts;
    const dt = (ts - lastTs) / 1000;
    lastTs = ts;

    const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
    const k = 1 - Math.exp(-dt / tau);

    currentX += (targetX - currentX) * k;
    currentY += (targetY - currentY) * k;

    setVarsFromXY(currentX, currentY);

    const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

    if (stillFar) {
      rafId = requestAnimationFrame(step);
    } else {
      running = false;
      lastTs = 0;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
  };

  const start = () => {
    if (running) return;
    running = true;
    lastTs = 0;
    rafId = requestAnimationFrame(step);
  };

  return {
    setImmediate(x, y) {
      currentX = x;
      currentY = y;
      setVarsFromXY(currentX, currentY);
    },
    setTarget(x, y) {
      targetX = x;
      targetY = y;
      start();
    },
    toCenter() {
      const el = getEl();
      if (!el) return;
      this.setTarget(el.clientWidth / 2, el.clientHeight / 2);
    },
    beginInitial(durationMs) {
      initialUntil = performance.now() + durationMs;
      start();
    },
    getCurrent() {
      return { x: currentX, y: currentY, tx: targetX, ty: targetY };
    },
    cancel() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      running = false;
      lastTs = 0;
    },
  };
}

/* =============================================
   ICONS — small inline SVGs for the back side
   ============================================= */

function InstagramIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SoundCloudIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 13v4" strokeLinecap="round" />
      <path d="M6 11v6" strokeLinecap="round" />
      <path d="M9 9v8" strokeLinecap="round" />
      <path d="M12 6v11" strokeLinecap="round" />
      <path d="M15 9.5c2.5-1 5 .8 5 3.5a3.6 3.6 0 0 1-3.6 3.6H12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M7.5 9.5c3-1 6.5-.7 9 1" strokeLinecap="round" />
      <path d="M8 12.5c2.3-.8 5-.6 7 .8" strokeLinecap="round" />
      <path d="M8.5 15.3c1.8-.6 3.8-.4 5.3.6" strokeLinecap="round" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="M11 10l4 2-4 2v-4z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PressKitIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3v11" strokeLinecap="round" />
      <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 19h16" strokeLinecap="round" />
    </svg>
  );
}

/* =============================================
   ARTIST CARD
   ============================================= */

export default function ArtistCard({ name, genres, image, bio, links = {} }: ArtistCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);

  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  const tiltEngine = useMemo(
    () => createTiltEngine(() => tiltRef.current, () => wrapRef.current),
    []
  );

  const getOffsets = (evt: PointerEvent, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const el = tiltRef.current;
      if (!el) return;
      const { x, y } = getOffsets(event, el);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    (event: PointerEvent) => {
      const el = tiltRef.current;
      const wrap = wrapRef.current;
      if (!el || !wrap) return;

      wrap.classList.add(styles.active);
      wrap.classList.add(styles.entering);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        wrap.classList.remove(styles.entering);
      }, 180);

      const { x, y } = getOffsets(event, el);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        wrap.classList.remove(styles.active);
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  useEffect(() => {
    const el = tiltRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;

    // Tilt + intro animation run on fine-pointer (desktop) only. On touch
    // devices we skip the whole engine: mouse-tilt is meaningless without a
    // cursor, and the per-frame .tilt transform was breaking the nested 3D
    // flip context on iOS Safari (mirrored/snapping flip). Click-to-flip
    // still works everywhere — this effect only drives the tilt/intro.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (reduceMotion || coarsePointer) return;

    el.addEventListener('pointerenter', handlePointerEnter);
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerleave', handlePointerLeave);

    const initialX = (el.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      el.removeEventListener('pointerenter', handlePointerEnter);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
    };
  }, [handlePointerEnter, handlePointerMove, handlePointerLeave, tiltEngine]);

  const toggleFlip = () => setFlipped((f) => !f);

  const hasLinks = links.instagram || links.soundcloud || links.spotify || links.youtube || links.presskit;

  return (
    <div ref={wrapRef} className={styles.wrapper}>
      {/* Cursor-following purple glow behind the card */}
      <div className={styles.glow} aria-hidden="true" />

      <div ref={tiltRef} className={styles.tilt}>
        <div
          className={`${styles.flipper} ${flipped ? styles.flipped : ''}`}
          role="button"
          tabIndex={0}
          aria-pressed={flipped}
          aria-label={`${name} — Karte umdrehen`}
          onClick={toggleFlip}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleFlip();
            }
          }}
        >
          {/* ───────── FRONT ───────── */}
          <div className={`${styles.face} ${styles.front}`}>
            {!imgError ? (
              <Image
                src={image}
                alt={`${name} DJ portrait`}
                fill
                sizes="(min-width: 960px) 25vw, (min-width: 600px) 50vw, 100vw"
                className={styles.photo}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className={styles.photoFallback} aria-hidden="true">
                <span className={styles.fallbackLetter}>{name.charAt(0)}</span>
              </div>
            )}

            {/* Holographic shine — masked by the CONNECTED logo, max opacity 0.3 */}
            <div className={styles.shine} aria-hidden="true" />

            {/* Bottom gradient fade to black */}
            <div className={styles.gradient} aria-hidden="true" />

            <div className={styles.info}>
              <h3 className={styles.name}>{name}</h3>
              <div className={styles.genres}>{genres.join(' · ')}</div>
            </div>

            <div className={styles.hint}>Click to flip →</div>
          </div>

          {/* ───────── BACK ───────── */}
          <div className={`${styles.face} ${styles.back}`}>
            <div className={styles.backContent}>
              <img src={LOGO_SRC} alt="" className={styles.backLogo} aria-hidden="true" />

              <h3 className={styles.backName}>{name}</h3>
              <p className={styles.bio}>{bio}</p>

              <div className={styles.divider} />

              {hasLinks && (
                <div className={styles.links}>
                  {links.instagram && (
                    <a
                      href={links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkRow}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <InstagramIcon />
                      <span>Instagram</span>
                    </a>
                  )}
                  {links.soundcloud && (
                    <a
                      href={links.soundcloud}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkRow}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SoundCloudIcon />
                      <span>SoundCloud</span>
                    </a>
                  )}
                  {links.spotify && (
                    <a
                      href={links.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkRow}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SpotifyIcon />
                      <span>Spotify</span>
                    </a>
                  )}
                  {links.youtube && (
                    <a
                      href={links.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkRow}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <YoutubeIcon />
                      <span>YouTube</span>
                    </a>
                  )}
                  {links.presskit && (
                    <a
                      href={links.presskit}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkRow}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <PressKitIcon />
                      <span>Press Kit</span>
                    </a>
                  )}
                </div>
              )}

              <div className={styles.hint}>Click to flip back</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
