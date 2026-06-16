'use client';

import { useState } from 'react';

type SoundCloudEmbedProps = {
  soundcloudUrl: string;
  title: string;
};

// Yellow accent (--yellow in globals.css) for the SoundCloud waveform —
// a small detail highlight. URL-encoded for the player's color param.
const WAVEFORM_COLOR = '%23d4ff00';

// SoundCloud sets may carry tracking params (?si=…) — keep only the base URL.
function buildEmbedSrc(soundcloudUrl: string): string {
  const baseUrl = soundcloudUrl.split('?')[0];
  const params = new URLSearchParams({
    url: baseUrl,
    auto_play: 'true',
    hide_related: 'true',
    show_comments: 'false',
    show_user: 'false',
    show_reposts: 'false',
    visual: 'true',
  });
  // color is appended raw so the %23-encoded hex is preserved as-is.
  return `https://w.soundcloud.com/player/?${params.toString()}&color=${WAVEFORM_COLOR}`;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function SoundCloudGlyph() {
  return (
    <svg className="embed-sc-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M3 13v4" strokeLinecap="round" />
      <path d="M6 11v6" strokeLinecap="round" />
      <path d="M9 9v8" strokeLinecap="round" />
      <path d="M12 6v11" strokeLinecap="round" />
      <path d="M15 9.5c2.5-1 5 .8 5 3.5a3.6 3.6 0 0 1-3.6 3.6H12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Two-click (DSGVO) wrapper for a single SoundCloud embed. Renders a dark
 * placeholder until the user clicks; only then is the SoundCloud iframe (and
 * any connection to SoundCloud's servers) loaded. Used per-release, so it
 * works for any number of releases coming from Sanity.
 */
export default function SoundCloudEmbed({ soundcloudUrl, title }: SoundCloudEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={title}
        className="listen-embed"
        width="100%"
        height="300"
        allow="autoplay"
        loading="lazy"
        src={buildEmbedSrc(soundcloudUrl)}
      />
    );
  }

  return (
    <button
      type="button"
      className="sc-consent"
      onClick={() => setLoaded(true)}
      aria-label={`Load SoundCloud player: ${title}`}
    >
      <SoundCloudGlyph />
      <span className="embed-play" aria-hidden="true">
        <PlayIcon />
      </span>
      <span className="embed-consent-label">
        Click to load player · SoundCloud may set cookies
      </span>
    </button>
  );
}
