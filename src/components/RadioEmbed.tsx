'use client';

import { useState } from 'react';

type RadioEmbedProps = {
  videoId: string;
  title: string;
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/**
 * Two-click (DSGVO) wrapper for the featured YouTube embed.
 * Until the user clicks, only the cookieless YouTube thumbnail is shown —
 * no connection to Google is made. The click swaps in the real iframe.
 */
export default function RadioEmbed({ videoId, title }: RadioEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="radio-embed-wrap">
      {loaded ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="embed-consent"
          onClick={() => setLoaded(true)}
          aria-label={`Load video: ${title}`}
        >
          {/* Cookieless thumbnail straight from img.youtube.com — no tracking. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="embed-consent-thumb"
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt=""
            aria-hidden="true"
            loading="lazy"
            onError={(e) => {
              // maxresdefault is missing for some uploads — fall back to hqdefault.
              const img = e.currentTarget;
              if (!img.src.endsWith('hqdefault.jpg')) {
                img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }
            }}
          />
          <span className="embed-play" aria-hidden="true">
            <PlayIcon />
          </span>
          <span className="embed-consent-label">
            Click to load video · YouTube may set cookies
          </span>
        </button>
      )}
    </div>
  );
}
