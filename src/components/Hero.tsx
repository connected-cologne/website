import Link from 'next/link';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden px-5 pb-14 min-[600px]:px-8 min-[960px]:px-14 min-[960px]:pb-[72px]"
    >
      <div className="hero-glow" />
      <div className="hero-scanlines" />

      {/* Eyebrow */}
      <div className="reveal flex items-center gap-4 mb-7 relative z-[1]">
        <div className="w-10 h-px shrink-0" style={{ background: 'var(--purple)' }} />
        <span className="label">Cologne Electronic Collective — Est. 2023</span>
      </div>

      {/* Title */}
      <h1 className="hero-title reveal reveal-d1 relative z-[1]">
        <span className="block">
          <span className="glitch" data-t="CONNECTED">CONNECTED</span>
        </span>
        <span className="block hero-title-outline">COLOGNE</span>
      </h1>

      {/* Bottom row */}
      <div className="reveal reveal-d2 relative z-[1] mt-9 min-[960px]:mt-14 flex flex-col min-[960px]:flex-row min-[960px]:items-end min-[960px]:justify-between gap-6">
        {/* Description */}
        <p
          className="max-w-[360px] text-sm leading-[1.8]"
          style={{ color: 'var(--text-2)' }}
        >
          <strong style={{ color: 'var(--text)', fontWeight: 600 }}>
            Techno. Drum &amp; Bass. Rave Culture.
          </strong>
          <br />
          Ein Zusammenschluss von DJs aus Köln, die Räume und Menschen durch
          elektronische Musik verbinden. Keine Kompromisse.
        </p>

        {/* Next event card */}
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
            Nächstes Event
          </span>
          <div className="hero-event-card">
            <div className="hec-date">28 JUN</div>
            <div className="hec-info">
              <div className="hec-name">CONNECTED × Warehouse Night</div>
              <div className="hec-sub">Industriehalle West · 22:00 – Open End</div>
            </div>
            <Link href="#events" className="btn btn--yellow shrink-0">
              NEXT EVENT →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
