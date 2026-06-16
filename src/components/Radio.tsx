import RadioEmbed from './RadioEmbed';

// UPDATE THIS — replace with most popular / latest video ID to feature
const FEATURED_VIDEO_ID = 'HkQuKC7iyrw';

const FEATURED = {
  num:  'CONNECTED RADIO',
  title: 'Featured Set',
  sub:  'Studio Set',
  desc: 'Dive straight in — the currently featured set from CONNECTED Radio. Find more sets in the archive and on our YouTube channel.',
  tags: [
    { label: 'Techno',  cls: 'tag tag--purple' },
    { label: 'Studio',  cls: 'tag' },
    { label: 'New',     cls: 'tag tag--avail' },
  ],
  youtubeUrl: `https://www.youtube.com/watch?v=${FEATURED_VIDEO_ID}`,
};

const YT_CHANNEL_ID = 'UCctBM-2D7wr2zrvFl_JenCQ';
const YT_CHANNEL = 'https://www.youtube.com/@ConnectedCologne';
const YT_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL_ID}`;

type RadioVideo = {
  id: string;
  title: string;
  thumbnail: string;
  published: string;
};

function decodeEntities(str: string) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function formatDate(iso: string) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

// Fetches the channel's RSS feed and returns the latest videos.
// No API key required.
async function getLatestVideos(): Promise<RadioVideo[]> {
  try {
    const res = await fetch(YT_FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();

    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

    return entries.slice(0, 6).map((entry) => {
      const id = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? '';
      const title = entry.match(/<media:title>(.*?)<\/media:title>/)?.[1] ?? '';
      const thumbnail =
        entry.match(/<media:thumbnail url="(.*?)"/)?.[1] ??
        `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      const published = entry.match(/<published>(.*?)<\/published>/)?.[1] ?? '';

      return {
        id,
        title: decodeEntities(title),
        thumbnail,
        published,
      };
    });
  } catch {
    return [];
  }
}

export default async function Radio() {
  const videos = await getLatestVideos();

  return (
    <section id="radio" className="section section--surface">
      {/* Section header */}
      <div className="section-head reveal">
        <div>
          <p className="label" style={{ marginBottom: '10px' }}>02 — Studio Sets</p>
          <h2 className="section-title">Radio</h2>
        </div>
      </div>

      {/* Featured player + info */}
      <div className="radio-featured reveal">
        {/* Embed — two-click (DSGVO) wrapper, loads the iframe on click */}
        <div>
          <RadioEmbed videoId={FEATURED_VIDEO_ID} title={FEATURED.title} />
        </div>

        {/* Info panel */}
        <div>
          <p className="radio-feat-num">{FEATURED.num}</p>
          <h3 className="radio-feat-title">
            {FEATURED.title}
            <br />
            <span
              style={{
                fontSize: '0.55em',
                color: 'var(--text-2)',
                letterSpacing: '1px',
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
              }}
            >
              {FEATURED.sub}
            </span>
          </h3>
          <p className="radio-feat-desc">{FEATURED.desc}</p>
          <div className="radio-feat-tags">
            {FEATURED.tags.map((t) => (
              <span key={t.label} className={t.cls}>{t.label}</span>
            ))}
          </div>
          <a
            href={FEATURED.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--filled"
          >
            ▶ Watch on YouTube
          </a>
        </div>
      </div>

      {/* Archive label */}
      <div className="reveal" style={{ marginBottom: '20px' }}>
        <p className="label">Latest Uploads</p>
      </div>

      {/* Latest uploads grid */}
      <div className="radio-grid">
        {videos.map((video, i) => {
          const delay = i % 3 === 1 ? ' reveal-d1' : i % 3 === 2 ? ' reveal-d2' : '';
          return (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`radio-card reveal${delay}`}
              aria-label={video.title}
            >
              <div className="rc-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={video.thumbnail}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="rc-thumb-overlay" aria-hidden="true">▶</div>
                {video.published && <div className="rc-num">{formatDate(video.published)}</div>}
              </div>
              <div className="rc-body">
                <div className="rc-title">{video.title}</div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Load more */}
      <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
        <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" className="btn">
          All Episodes →
        </a>
      </div>
    </section>
  );
}
