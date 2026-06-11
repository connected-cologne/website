/* =============================================
   WHATSAPP COMMUNITY CTA
   Slim banner strip between Hero and Events.
   ============================================= */

function WhatsAppIcon() {
  return (
    <svg className="wa-cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0-7.78 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" strokeLinejoin="round" />
      <path
        d="M8.6 9.3c.1-.5.5-1 1-1.1l.6-.2 1 2-.7.6c.4 1 1.1 1.7 2.1 2.1l.6-.7 2 1-.2.6c-.2.5-.6.9-1.1 1-3 .1-5.2-2.1-5.3-5.3z"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function WhatsAppCTA() {
  return (
    <section className="wa-cta reveal">
      <p className="wa-cta-text">
        <strong className="wa-cta-highlight">Stay Connected</strong> — Join our WhatsApp Community
      </p>
      <a
        href="https://chat.whatsapp.com/KIrOapi9pJL8S1dl8Unm9B"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--filled"
      >
        <WhatsAppIcon />
        Join now →
      </a>
    </section>
  );
}
