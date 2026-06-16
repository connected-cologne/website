import Link from 'next/link';

import { formatDay, getEvents } from '@/sanity/lib/queries';

export default async function Hero() {
  const events = await getEvents();
  const nextEvent = events[0];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden pb-14 min-[960px]:pb-[72px]"
    >
      <div className="hero-media" aria-hidden="true">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/connected-background.mp4" type="video/mp4" />
        </video>
        <div className="hero-media-gradient" />
      </div>

      <div className="hero-glow" />
      <div className="hero-scanlines" />

      {/* Eyebrow */}
      <div className="hero-content reveal flex items-center gap-4 mb-7">
        <div className="w-10 h-px shrink-0" style={{ background: 'var(--purple)' }} />
        <span className="label">Cologne Techno Collective — Est. 2025</span>
      </div>

      {/* Title */}
      <h1 className="hero-content hero-title reveal reveal-d1">
        <span className="block">
          <span className="glitch" data-t="CONNECTED">CONNECTED</span>
        </span>
        <span className="block hero-title-outline">COLOGNE</span>
      </h1>

      {/* Bottom row */}
      <div className="hero-content reveal reveal-d2 mt-9 min-[960px]:mt-14 flex flex-col min-[960px]:flex-row min-[960px]:items-end min-[960px]:justify-between gap-6">
        {/* Description */}
        <p
          className="max-w-[360px] text-sm leading-[1.8]"
          style={{ color: 'var(--text-2)' }}
        >
          <strong style={{ color: 'var(--text)', fontWeight: 600 }}>
            Techno. Dance. Rave Culture.
          </strong>
          <br />
          A collective of DJs from Cologne, connecting spaces and people
          through electronic music. No compromises.
        </p>

        {/* Next event card */}
        {nextEvent && (
          <div className="flex flex-col items-start min-[960px]:items-end gap-[10px]">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              Next Event
            </span>
            <div className="hero-event-card">
              <div className="hec-date">{formatDay(nextEvent.date)}</div>
              <div className="hec-info">
                <div className="hec-name">{nextEvent.title}</div>
                <div className="hec-sub">
                  {nextEvent.location} ·{' '}
                  {new Date(nextEvent.date).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
              <Link href="#events" className="btn btn--yellow shrink-0">
                NEXT EVENT →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
