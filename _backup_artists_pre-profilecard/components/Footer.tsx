import Image from 'next/image';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '#events',       label: 'Events' },
  { href: '#radio',        label: 'Radio' },
  { href: '#artists',      label: 'Artists' },
  { href: '#inner-circle', label: 'Inner Circle' },
  { href: '#merch',        label: 'Merch' },
];

const SOCIALS = [
  { label: 'Instagram',  href: '#' },
  { label: 'SoundCloud', href: '#' },
  { label: 'YouTube',    href: 'https://www.youtube.com/@ConnectedCologne' },
  { label: 'RA',         href: '#' },
  { label: 'Mixcloud',   href: '#' },
];

const CONTACT = [
  { label: 'Booking',    href: 'mailto:booking@connected-cologne.de' },
  { label: 'Presse',     href: 'mailto:press@connected-cologne.de'   },
  { label: 'Impressum',  href: '#' },
  { label: 'Datenschutz',href: '#' },
];

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-wrap">
        <div className="footer-top">
          {/* Logo + tagline + socials */}
          <div>
            <Link href="/" aria-label="CONNECTED Cologne — zur Startseite">
              <Image
                src="/images/Cc_Logo_SW.png"
                alt="CONNECTED Cologne"
                width={7200}
                height={5400}
                style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
              />
            </Link>
            <p className="footer-sub">Cologne Electronic Collective — Est. 2023</p>
            <div className="footer-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="footer-soc-link"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Kontakt</h4>
            <ul>
              {CONTACT.map((c) => (
                <li key={c.label}>
                  <a href={c.href}>{c.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span className="footer-copy">
          © 2026 CONNECTED Cologne. All rights reserved.
        </span>
        <a
          href="mailto:booking@connected-cologne.de"
          className="footer-booking"
        >
          Booking Anfragen →
        </a>
      </div>
    </footer>
  );
}
