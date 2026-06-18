'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#events',       label: 'Events' },
  { href: '#radio',        label: 'Radio' },
  { href: '#artists',      label: 'Artists' },
  { href: '#listen',       label: 'Listen' },
  // TODO: re-enable when ready
  // { href: '#inner-circle', label: 'Inner Circle' },
  // { href: '#merch',        label: 'Merch' },
];

export default function Nav() {
  const [stuck, setStuck]   = useState(false);
  const [open, setOpen]     = useState(false);
  const [active, setActive] = useState('');

  // Blur on scroll
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Escape key closes drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* ── Mobile fullscreen drawer ─────────────── */}
      <div
        role="dialog"
        aria-label="Navigation menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-[499] flex flex-col items-center justify-center gap-9 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(8,8,8,0.97)' }}
      >
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="drawer-link"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className="flex gap-5 mt-2">
          <a
            href="https://www.youtube.com/@ConnectedCologne"
            target="_blank"
            rel="noopener noreferrer"
            className="drawer-soc"
          >
            YouTube
          </a>
          <a href="#" className="drawer-soc">Instagram</a>
          <a href="#" className="drawer-soc">SoundCloud</a>
        </div>
      </div>

      {/* ── Nav bar ──────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between h-[var(--nav-h)] px-5 min-[600px]:px-8 min-[960px]:px-14 border-b"
        style={{
          background: stuck ? 'rgba(8,8,8,0.6)' : 'transparent',
          borderColor: stuck ? 'var(--border)' : 'transparent',
          backdropFilter: stuck ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: stuck ? 'blur(16px)' : 'none',
          transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s, -webkit-backdrop-filter 0.4s',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/Cc_Logo_SW.png"
            alt="CONNECTED Cologne"
            width={7200}
            height={5400}
            priority
            style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop center links */}
        <ul
          className="hidden min-[960px]:flex items-center gap-10"
          aria-label="Main navigation"
        >
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav-link${active === link.href.slice(1) ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Live dot — desktop only */}
          <span className="nav-live-dot hidden min-[960px]:flex">Live</span>

          {/* Hamburger — mobile only */}
          <button
            className="flex min-[960px]:hidden flex-col justify-center gap-[5px] p-1"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className="block w-6 h-[1.5px] origin-center transition-transform duration-300"
              style={{
                background: 'var(--text)',
                transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-6 h-[1.5px] transition-opacity duration-300"
              style={{
                background: 'var(--text)',
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-[1.5px] origin-center transition-transform duration-300"
              style={{
                background: 'var(--text)',
                transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>
    </>
  );
}
