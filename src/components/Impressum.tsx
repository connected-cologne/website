'use client';

import LegalOverlay from './LegalOverlay';

type ImpressumProps = {
  open: boolean;
  onClose: () => void;
};

export default function Impressum({ open, onClose }: ImpressumProps) {
  return (
    <LegalOverlay open={open} onClose={onClose} title="Impressum">
      <div className="legal-block">
        <p className="legal-heading">Angaben gemäß § 5 TMG</p>
        <p className="legal-text">
          Connected Cologne GbR
          <br />
          Vogelsanger Straße 365
          <br />
          50825 Köln
        </p>
      </div>

      <div className="legal-block">
        <p className="legal-heading">Kontakt</p>
        <p className="legal-text">
          E-Mail:{' '}
          <a href="mailto:info@connected-cologne.de">info@connected-cologne.de</a>
        </p>
      </div>

      <div className="legal-block">
        <p className="legal-heading">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</p>
        <p className="legal-text">
          Connected Cologne GbR
          <br />
          Vogelsanger Straße 365
          <br />
          50825 Köln
        </p>
      </div>

      <div className="legal-block">
        <p className="legal-heading">
          Hinweis zur Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO
        </p>
        <p className="legal-text">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
          (OS) bereit:{' '}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr
          </a>
        </p>
      </div>
    </LegalOverlay>
  );
}
