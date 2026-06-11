export default function InnerCircle() {
  return (
    // TODO: re-enable when ready
    <section id="inner-circle" className="section hidden">
      <div className="ic-glow" aria-hidden="true" />

      <p className="label reveal" style={{ position: 'relative', zIndex: 1 }}>
        04 — Members Only
      </p>

      <h2 className="ic-title reveal reveal-d1">
        INNER<br />CIRCLE
      </h2>

      <p className="ic-sub reveal reveal-d2">
        Exklusiver Bereich für Kollektiv-Members und enge Community.
        Dieser Bereich wird demnächst freigeschaltet.
      </p>

      <div className="ic-soon reveal reveal-d3">Coming Soon</div>
    </section>
  );
}
