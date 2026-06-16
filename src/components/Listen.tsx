import { getReleases } from '@/sanity/lib/queries';
import SoundCloudEmbed from './SoundCloudEmbed';

const SPOTIFY_URL = 'https://open.spotify.com/artist/0BC0BsV1nhDmjqZ4SbZZJb';

export default async function Listen() {
  // Max. 3 releases are ever displayed — deliberate design decision.
  const releases = (await getReleases()).slice(0, 3);

  if (releases.length === 0) return null;

  return (
    <section id="listen" className="section">
      {/* Section header */}
      <div className="section-head reveal">
        <div>
          <p className="label" style={{ marginBottom: '10px' }}>04 — Releases</p>
          <h2 className="section-title">Listen</h2>
        </div>
      </div>

      {/* Releases — equal-width grid, centered when fewer than 3 */}
      <div className="listen-grid" style={{ '--cols': releases.length } as React.CSSProperties}>
        {releases.map((release, i) => {
          const delay = i === 1 ? ' reveal-d1' : i === 2 ? ' reveal-d2' : '';
          return (
            <div key={release._id} className={`listen-release reveal${delay}`}>
              <h3 className="listen-title">{release.title}</h3>
              <SoundCloudEmbed soundcloudUrl={release.soundcloudUrl} title={release.title} />
            </div>
          );
        })}
      </div>

      {/* Spotify — brand green takes priority over the site palette here */}
      <div className="listen-spotify reveal reveal-d1">
        <a
          href={SPOTIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn listen-spotify-btn"
        >
          Also on Spotify →
        </a>
      </div>
    </section>
  );
}
