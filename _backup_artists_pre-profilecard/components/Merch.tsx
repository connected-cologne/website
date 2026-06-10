const PRODUCTS = [
  {
    id: '1',
    name: 'CONNECTED — Oversized Tee',
    price: '€39.00',
    badge: 'New Drop',
    badgeMuted: false,
  },
  {
    id: '2',
    name: 'CONNECTED — Longsleeve',
    price: '€45.00',
    badge: null,
    badgeMuted: false,
  },
  {
    id: '3',
    name: 'CONNECTED — Cap',
    price: '€28.00',
    badge: 'Limited',
    badgeMuted: true,
  },
];

export default function Merch() {
  return (
    <section id="merch" className="section section--surface">
      {/* Section header */}
      <div className="section-head reveal">
        <div>
          <p className="label" style={{ marginBottom: '10px' }}>05 — Kollektiv Store</p>
          <h2 className="section-title">Merch</h2>
        </div>
        <a href="#" className="btn">Zum Shop →</a>
      </div>

      {/* Product grid */}
      <div className="merch-grid">
        {PRODUCTS.map((p, i) => {
          const delay = i === 1 ? ' reveal-d1' : i === 2 ? ' reveal-d2' : '';
          return (
            <div key={p.id} className={`merch-card reveal${delay}`}>
              <div className="mc-img-wrap">
                <div className="mc-img-inner" aria-hidden="true">
                  {/* Placeholder — replace with real product photo */}
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    opacity={0.06}
                    aria-hidden="true"
                  >
                    <rect x="20" y="30" width="60" height="50" rx="2" fill="white" />
                    <path d="M20 40 L10 35 L10 75 L20 70" />
                    <path d="M80 40 L90 35 L90 75 L80 70" />
                    <path d="M35 30 Q50 10 65 30" />
                  </svg>
                </div>
                {p.badge && (
                  <div
                    className="mc-badge"
                    style={p.badgeMuted ? { background: 'var(--muted)' } : undefined}
                  >
                    {p.badge}
                  </div>
                )}
              </div>
              <div className="mc-body">
                <div className="mc-name">{p.name}</div>
                <div className="mc-foot">
                  <span className="mc-price">{p.price}</span>
                  <button className="btn" style={{ padding: '8px 14px', fontSize: '9px' }}>
                    Demnächst
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
