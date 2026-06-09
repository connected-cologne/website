const FEATURED = {
  num:    'CONNECTED RADIO — EP. 014',
  title:  'NINTEN',
  sub:    'Studio Set',
  meta:   'Juni 2026 · 1 Std. 42 Min.',
  desc:   'NINTEN nimmt uns mit auf eine Reise durch Industrial Techno und Dark Ambient. Aufgenommen im Studio in Köln. Das bisher härteste Set der Radio-Serie.',
  tags:   [
    { label: 'Techno',    cls: 'tag tag--purple' },
    { label: 'Industrial', cls: 'tag tag--purple' },
    { label: 'Studio',     cls: 'tag' },
    { label: 'Neu',        cls: 'tag tag--avail' },
  ],
  youtubeUrl: 'https://www.youtube.com/@ConnectedCologne',
};

const ARCHIVE = [
  { num: 'EP. 013', title: 'KISH — Late Night Session',      meta: 'Mai 2026 · 2h 01m · Dark Techno' },
  { num: 'EP. 012', title: 'BOYSDOCRY — Warehouse Mix',      meta: 'Apr. 2026 · 3h 15m · Techno / Industrial' },
  { num: 'EP. 011', title: 'ZARI — Acid Sessions Vol. 2',    meta: 'März 2026 · 1h 28m · Acid / Rave' },
  { num: 'EP. 010', title: 'SAO — Open Air Closing Set',     meta: 'Feb. 2026 · 4h 00m · Techno' },
  { num: 'EP. 009', title: 'FINNITO × AAADRICH — B2B',       meta: 'Jan. 2026 · 2h 45m · Hybrid' },
  { num: 'EP. 008', title: 'NINTEN — Year Mix 2025',         meta: 'Dez. 2025 · 3h 30m · Techno' },
];

const YT_CHANNEL = 'https://www.youtube.com/@ConnectedCologne';

export default function Radio() {
  return (
    <section id="radio" className="section section--surface">
      {/* Section header */}
      <div className="section-head reveal">
        <div>
          <p className="label" style={{ marginBottom: '10px' }}>02 — Studio Sets</p>
          <h2 className="section-title">Radio</h2>
        </div>
        <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" className="btn">
          YouTube Kanal →
        </a>
      </div>

      {/* Featured player + info */}
      <div className="radio-featured reveal">
        {/* Embed */}
        <div>
          <div className="radio-embed-wrap">
            {/*
              Placeholder — swap for a real iframe once the YouTube API key is
              set up and the latest video ID can be fetched automatically.
              See CONNECTED_Projektuebergabe.md § Open Items #7.
            */}
            <div className="radio-embed-placeholder">
              <span style={{ fontSize: '52px', opacity: 0.1, lineHeight: 1 }}>▶</span>
              <span className="label--muted label" style={{ maxWidth: '260px' }}>
                YouTube Player — wird nach API-Key-Setup automatisch geladen
              </span>
              <a
                href={YT_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--filled"
              >
                Zum Kanal →
              </a>
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div>
          <p className="radio-feat-num">{FEATURED.num}</p>
          <h3 className="radio-feat-title">
            {FEATURED.title}
            <br />
            <span
              style={{
                fontSize: '0.55em',
                color: 'var(--text-2)',
                letterSpacing: '1px',
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
              }}
            >
              {FEATURED.sub}
            </span>
          </h3>
          <p className="radio-feat-meta">{FEATURED.meta}</p>
          <p className="radio-feat-desc">{FEATURED.desc}</p>
          <div className="radio-feat-tags">
            {FEATURED.tags.map((t) => (
              <span key={t.label} className={t.cls}>{t.label}</span>
            ))}
          </div>
          <a
            href={FEATURED.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--filled"
          >
            ▶ Auf YouTube ansehen
          </a>
        </div>
      </div>

      {/* Archive label */}
      <div className="reveal" style={{ marginBottom: '20px' }}>
        <p className="label">Archiv</p>
      </div>

      {/* Archive grid */}
      <div className="radio-grid">
        {ARCHIVE.map((ep, i) => {
          const delay = i % 3 === 1 ? ' reveal-d1' : i % 3 === 2 ? ' reveal-d2' : '';
          return (
            <a
              key={ep.num}
              href={YT_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className={`radio-card reveal${delay}`}
              aria-label={`${ep.num}: ${ep.title}`}
            >
              <div className="rc-thumb">
                <div className="rc-thumb-placeholder" aria-hidden="true">▶</div>
                <div className="rc-thumb-overlay" aria-hidden="true">▶</div>
                <div className="rc-num">{ep.num}</div>
              </div>
              <div className="rc-body">
                <div className="rc-title">{ep.title}</div>
                <div className="rc-meta">{ep.meta}</div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Load more */}
      <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
        <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" className="btn">
          Alle Episodes →
        </a>
      </div>
    </section>
  );
}
