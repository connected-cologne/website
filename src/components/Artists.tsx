import ArtistCard, { type ArtistCardProps } from './ArtistCard/ArtistCard';

const ARTISTS: ArtistCardProps[] = [
  {
    name: 'NINTEN',
    genres: ['Techno', 'Industrial'],
    image: '/images/artists/ninten.jpg',
    bio: 'Gründungsmitglied von CONNECTED. Bekannt für treibende Sets zwischen Industrial und Melodic Techno. Regelmäßig auf den CONNECTED-Events vertreten.',
    links: {
      instagram: '#',
      soundcloud: '#',
      presskit: '#',
    },
  },
  {
    name: 'KISH',
    genres: ['Dark Techno', 'Groove'],
    image: '/images/artists/kish.jpg',
    bio: 'KISH steht für hypnotische Grooves und eine dunkle, intensive Energie auf dem Dancefloor. Sein Sound ist tief verwurzelt in der Kölner Club-Kultur.',
    links: {
      instagram: '#',
      soundcloud: '#',
    },
  },
  {
    name: 'BOYSDOCRY',
    genres: ['Techno', 'Breaks'],
    image: '/images/artists/boysdocry.jpg',
    bio: 'BOYSDOCRY verbindet Techno mit Breaks und schafft eine unverwechselbare, energiegeladene Atmosphäre — roh, ehrlich, direkt.',
    links: {
      instagram: '#',
      soundcloud: '#',
      youtube: '#',
    },
  },
  {
    name: 'ZARI',
    genres: ['Acid', 'Rave'],
    image: '/images/zari_picture.JPG',
    bio: 'Inspiriert von der frühen Rave-Kultur der 90er. ZARI lebt und liebt Acid — jedes Set eine Zeitreise in die Ursprünge elektronischer Musik.',
    links: {
      instagram: '#',
      soundcloud: '#',
      presskit: '#',
    },
  },
  {
    name: 'SAO',
    genres: ['Melodic', 'Progressive'],
    image: '/images/artists/sao.jpg',
    bio: 'SAO bringt Melodie und Emotion in den Techno. Seine Sets bauen Spannungsbögen auf, die den Dancefloor in eine andere Dimension transportieren.',
    links: {
      instagram: '#',
      soundcloud: '#',
    },
  },
  {
    name: 'FINNITO',
    genres: ['Techno', 'Minimal'],
    image: '/images/artists/finnito.jpg',
    bio: 'Weniger ist mehr — FINNITOs minimalistischer Ansatz schafft Raum und Tiefe. Präzise, reduziert, mit einem untrüglichen Gespür für den richtigen Moment.',
    links: {
      instagram: '#',
      soundcloud: '#',
    },
  },
  {
    name: 'AAADRICH',
    genres: ['Techno', 'Experimental'],
    image: '/images/artists/aaadrich.jpg',
    bio: 'AAADRICH denkt Techno neu — experimentell, grenzüberschreitend und immer auf der Suche nach dem unerwarteten Moment, der alles verändert.',
    links: {
      instagram: '#',
      soundcloud: '#',
      youtube: '#',
      presskit: '#',
    },
  },
];

export default function Artists() {
  return (
    <section id="artists" className="section">
      <div className="section-head reveal">
        <div>
          <p className="label" style={{ marginBottom: '10px' }}>03 — Das Kollektiv</p>
          <h2 className="section-title">Artists</h2>
        </div>
        <span className="label label--muted artists-hint">Hover für Info</span>
      </div>

      <div className="artists-grid">
        {ARTISTS.map((artist, i) => {
          const delay = i % 4 === 1 ? ' reveal-d1' : i % 4 === 2 ? ' reveal-d2' : i % 4 === 3 ? ' reveal-d3' : '';
          return (
            <div key={artist.name} className={`reveal${delay}`}>
              <ArtistCard {...artist} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
