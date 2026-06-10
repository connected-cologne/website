'use client';

import { useState } from 'react';

export type Artist = {
  id: string;
  name: string;
  letter: string;
  genre: string;
  bio: string;
  socials: { label: string; url: string }[];
  pressKit: boolean;
};

export default function ArtistsGrid({ artists }: { artists: Artist[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="artists-grid">
      {artists.map((a, i) => {
        const delay = i % 4 === 1 ? ' reveal-d1' : i % 4 === 2 ? ' reveal-d2' : i % 4 === 3 ? ' reveal-d3' : '';
        return (
          <div
            key={a.id}
            className={`artist-card reveal${delay}`}
            onClick={() => toggle(a.id)}
            role="button"
            tabIndex={0}
            aria-label={`${a.name} — Info anzeigen`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(a.id); }}
          >
            {/* Background image placeholder */}
            <div className="ac-img-bg" aria-hidden="true">
              <span className="ac-placeholder-letter">{a.letter}</span>
            </div>

            {/* Always-visible name + genre strip */}
            <div className="ac-always">
              <div className="ac-name">{a.name}</div>
              <div className="ac-genre">{a.genre}</div>
            </div>

            {/* Hover / tap overlay */}
            <div className={`ac-overlay${openId === a.id ? ' is-open' : ''}`}>
              <div className="ac-ov-name">{a.name}</div>
              <div className="ac-ov-genre">{a.genre}</div>
              <p className="ac-ov-bio">{a.bio}</p>
              <div className="ac-ov-socials">
                {a.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ac-social-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              {a.pressKit && (
                <a
                  href="#"
                  className="ac-presskit"
                  onClick={(e) => e.stopPropagation()}
                >
                  Press Kit
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
