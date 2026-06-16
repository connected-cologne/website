'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import ContactModal from './ContactModal';
import Impressum from './Impressum';
import Datenschutz from './Datenschutz';
import type { ContactSubject } from '@/lib/contact';

/* =============================================
   ICONS — small inline SVGs, same style as the
   artist card social icons
   ============================================= */

function InstagramIcon() {
  return (
    <svg className="footer-soc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SoundCloudIcon() {
  return (
    <svg className="footer-soc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M3 13v4" strokeLinecap="round" />
      <path d="M6 11v6" strokeLinecap="round" />
      <path d="M9 9v8" strokeLinecap="round" />
      <path d="M12 6v11" strokeLinecap="round" />
      <path d="M15 9.5c2.5-1 5 .8 5 3.5a3.6 3.6 0 0 1-3.6 3.6H12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg className="footer-soc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="M11 10l4 2-4 2v-4z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="footer-soc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0-7.78 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" strokeLinejoin="round" />
      <path
        d="M8.6 9.3c.1-.5.5-1 1-1.1l.6-.2 1 2-.7.6c.4 1 1.1 1.7 2.1 2.1l.6-.7 2 1-.2.6c-.2.5-.6.9-1.1 1-3 .1-5.2-2.1-5.3-5.3z"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/connected_cologne?igsh=MXI1dGE3bzN2bTJmNg==', Icon: InstagramIcon },
  { label: 'SoundCloud', href: 'https://soundcloud.com/connected-radio-610173472', Icon: SoundCloudIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCctBM-2D7wr2zrvFl_JenCQ', Icon: YoutubeIcon },
  { label: 'WhatsApp', href: 'https://chat.whatsapp.com/KIrOapi9pJL8S1dl8Unm9B', Icon: WhatsAppIcon },
];

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<ContactSubject>('general');
  const [imprintOpen, setImprintOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const openContact = (subject: ContactSubject) => {
    setContactSubject(subject);
    setContactOpen(true);
  };

  return (
    <footer id="footer">
      <div className="footer-wrap">
        <div className="footer-top">
          <Link href="/" aria-label="CONNECTED Cologne — home">
            <Image
              src="/images/Cc_Logo_SW.png"
              alt="CONNECTED Cologne"
              width={7200}
              height={5400}
              style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>
          <p className="footer-sub">Cologne Electronic Collective — Est. 2025</p>
          <div className="footer-socials-row">
            <div className="footer-socials">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer-soc-link"
                >
                  <Icon />
                </a>
              ))}
            </div>
            <button type="button" className="btn" onClick={() => openContact('general')}>
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span className="footer-copy">
          © 2026 CONNECTED Cologne. All rights reserved.
        </span>
        <div className="footer-legal">
          <button type="button" onClick={() => openContact('booking')}>Booking</button>
          <a href="mailto:press@connected-cologne.de">Press</a>
          <button type="button" onClick={() => setImprintOpen(true)}>Imprint</button>
          <button type="button" onClick={() => setPrivacyOpen(true)}>Privacy</button>
        </div>
      </div>

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        initialSubject={contactSubject}
      />
      <Impressum open={imprintOpen} onClose={() => setImprintOpen(false)} />
      <Datenschutz open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  );
}
