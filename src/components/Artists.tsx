import ArtistCard, { type ArtistCardProps } from './ArtistCard/ArtistCard';

const ARTISTS: ArtistCardProps[] = [
  {
    name: 'NINTEN',
    genres: ['Techno', 'Industrial'],
    image: '/images/ninten_picture.jpg',
    bio: 'Founding member of CONNECTED. Known for driving sets between industrial and melodic techno. A regular presence at CONNECTED events.',
    links: {
      instagram: '#',
      soundcloud: '#',
      presskit: '#',
    },
  },
  {
    name: 'FINNITO',
    genres: ['Techno', 'Minimal'],
    image: '/images/finnito_picture.jpg',
    bio: 'Less is more — FINNITO\'s minimalist approach creates space and depth. Precise, reduced, with an unerring sense for the right moment.',
    links: {
      instagram: '#',
      soundcloud: '#',
    },
  },
  {
    name: 'BOYSDOCRY',
    genres: ['Techno', 'Breaks'],
    image: '/images/boysdocry_picture.jpg',
    bio: 'BOYSDOCRY blends techno with breaks to create a distinctive, high-energy atmosphere — raw, honest, direct.',
    links: {
      instagram: '#',
      soundcloud: '#',
      youtube: '#',
    },
  },
  {
    name: 'KISH',
    genres: ['Dark Techno', 'Groove'],
    image: '/images/kish_picture.jpg',
    bio: 'KISH stands for hypnotic grooves and a dark, intense energy on the dancefloor. His sound is deeply rooted in Cologne\'s club culture.',
    links: {
      instagram: '#',
      soundcloud: '#',
    },
  },
  {
    name: 'ZAR.I',
    genres: ['Acid', 'Rave'],
    image: '/images/zari_picture.JPG',
    bio: 'Inspired by the early rave culture of the 90s. ZARI lives and loves acid — every set a journey back to the origins of electronic music.',
    links: {
      instagram: '#',
      soundcloud: '#',
      presskit: '#',
    },
  },
  {
    name: 'AAADRICH',
    genres: ['Techno', 'Experimental'],
    image: '/images/aaadrich_picture.jpg',
    bio: 'AAADRICH rethinks techno — experimental, boundary-pushing and always in search of the unexpected moment that changes everything.',
    links: {
      instagram: '#',
      soundcloud: '#',
      youtube: '#',
      presskit: '#',
    },
  },
  {
    name: 'SAO',
    genres: ['Melodic', 'Progressive'],
    image: '/images/artists/sao.jpg',
    bio: 'SAO brings melody and emotion to techno. His sets build arcs of tension that carry the dancefloor into another dimension.',
    links: {
      instagram: '#',
      soundcloud: '#',
    },
  },
  {
    name: 'WEHLERISCH',
    genres: ['Techno'],
    image: '/images/wehlerisch_picture.jpg',
    bio: 'Part of the CONNECTED collective. Bio and photos coming soon.',
    links: {
      instagram: '#',
      soundcloud: '#',
    },
  },
  {
    name: 'DAVIDE',
    genres: ['Techno'],
    image: '/images/davide_picture.jpg',
    bio: 'Part of the CONNECTED collective. Bio and photos coming soon.',
    links: {
      instagram: '#',
      soundcloud: '#',
    },
  },
  {
    name: 'SENNA',
    genres: ['Techno'],
    image: '/images/senna_picture.jpg',
    bio: 'Part of the CONNECTED collective. Bio and photos coming soon.',
    links: {
      instagram: '#',
      soundcloud: '#',
    },
  },
];

export default function Artists() {
  return (
    <section id="artists" className="section">
      <div className="section-head reveal">
        <div>
          <p className="label" style={{ marginBottom: '10px' }}>03 — The Collective</p>
          <h2 className="section-title">Artists</h2>
        </div>
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
