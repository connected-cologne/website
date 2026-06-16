'use client';

import LegalOverlay from './LegalOverlay';

type DatenschutzProps = {
  open: boolean;
  onClose: () => void;
};

export default function Datenschutz({ open, onClose }: DatenschutzProps) {
  return (
    <LegalOverlay open={open} onClose={onClose} title="Datenschutzerklärung">
      <div className="legal-block">
        <p className="legal-heading">1. Verantwortlicher</p>
        <p className="legal-text">
          Connected Cologne GbR
          <br />
          Vogelsanger Straße 365
          <br />
          50825 Köln
          <br />
          E-Mail:{' '}
          <a href="mailto:info@connected-cologne.de">info@connected-cologne.de</a>
        </p>
      </div>

      <div className="legal-block">
        <p className="legal-heading">2. Hosting</p>
        <p className="legal-text">
          Diese Website wird gehostet bei Vercel Inc., 340 Pine Street, Suite 701,
          San Francisco, CA 94104, USA. Vercel verarbeitet beim Aufruf der Website
          technisch notwendige Daten (z. B. IP-Adresse, Browsertyp, Zugriffszeit).
          Weitere Informationen:{' '}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            https://vercel.com/legal/privacy-policy
          </a>
        </p>
      </div>

      <div className="legal-block">
        <p className="legal-heading">3. Webanalyse mit Vercel Analytics</p>
        <p className="legal-text">
          Wir nutzen Vercel Analytics zur Analyse des Nutzungsverhaltens. Vercel
          Analytics arbeitet ohne Cookies und speichert keine personenbezogenen Daten
          dauerhaft. Es werden ausschließlich aggregierte, anonymisierte Nutzungsdaten
          erhoben. Eine Weitergabe an Dritte findet nicht statt. Rechtsgrundlage:
          Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Verbesserung
          unseres Angebots).
        </p>
      </div>

      <div className="legal-block">
        <p className="legal-heading">
          4. Eingebettete Inhalte von Drittanbietern (YouTube &amp; SoundCloud)
        </p>
        <p className="legal-text">
          Auf dieser Website werden Inhalte von YouTube (Google Ireland Limited,
          Gordon House, Barrow Street, Dublin 4, Irland) und SoundCloud (SoundCloud
          Limited, Rheinsberger Str. 76/77, 10115 Berlin) eingebettet.
        </p>
        <p className="legal-text">
          Diese Inhalte werden erst geladen, wenn Sie aktiv auf den entsprechenden
          Bereich klicken (Zwei-Klick-Lösung). Erst durch diesen Klick wird eine
          Verbindung zu den Servern des jeweiligen Anbieters hergestellt. Dabei können
          personenbezogene Daten (z. B. Ihre IP-Adresse) übertragen und Cookies gesetzt
          werden.
        </p>
        <p className="legal-text">
          Rechtsgrundlage für die Verarbeitung nach Ihrem Klick: Art. 6 Abs. 1 lit. a
          DSGVO (Einwilligung).
        </p>
        <p className="legal-text">
          Datenschutzerklärung YouTube:{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            https://policies.google.com/privacy
          </a>
          <br />
          Datenschutzerklärung SoundCloud:{' '}
          <a href="https://soundcloud.com/pages/privacy" target="_blank" rel="noopener noreferrer">
            https://soundcloud.com/pages/privacy
          </a>
        </p>
      </div>

      <div className="legal-block">
        <p className="legal-heading">5. Ihre Rechte</p>
        <p className="legal-text">
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung
          der Verarbeitung Ihrer personenbezogenen Daten sowie das Recht auf
          Datenübertragbarkeit. Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{' '}
          <a href="mailto:info@connected-cologne.de">info@connected-cologne.de</a>
        </p>
        <p className="legal-text">
          Bei Beschwerden können Sie sich an die zuständige
          Datenschutzaufsichtsbehörde wenden. Für Nordrhein-Westfalen ist dies:
          Landesbeauftragte für Datenschutz und Informationsfreiheit NRW,{' '}
          <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer">
            https://www.ldi.nrw.de
          </a>
        </p>
      </div>
    </LegalOverlay>
  );
}
