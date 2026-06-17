import ArtistCard, { type ArtistCardProps } from './ArtistCard/ArtistCard';

const ARTISTS: ArtistCardProps[] = [
  {
    name: 'NINTEN',
    genres: ['Groove', 'Trance', 'Schranz'],
    image: '/images/ninten_picture.jpg',
    bio: 'Two minds, one sound. Davide and Senna, colliding groove and intensity.',
    links: {
      instagram: 'https://www.instagram.com/ninten.connected',
      soundcloud: 'https://soundcloud.com/ninten-988569425',
      spotify: 'https://open.spotify.com/artist/71BJpbMhkaCpmRXa6JhPhX',
      presskit: '#',
    },
  },
  {
    name: 'FINNITO',
    genres: ['Speedhouse', 'Funkyhouse', 'Jazzhouse'],
    image: '/images/finnito_picture.jpg',
    bio: 'Jazzhouse stabs, funky basslines, soulful hooks. Playful at first, then completely relentless.',
    links: {
      instagram: 'https://www.instagram.com/finnito.cologne/',
      soundcloud: 'https://on.soundcloud.com/4vYHu6TYVLBiUjc57',
    },
  },
  {
    name: 'BOYSDOCRY',
    genres: ['Trance', 'Schranz'],
    image: '/images/boysdocry_picture.jpg',
    bio: 'Tension built slowly, released without mercy. Hypnotic, raw, and emotionally weighted.',
    links: {
      instagram: 'https://www.instagram.com/boysdocry.wav',
      soundcloud: 'https://soundcloud.com/user-821166776-370387442',
    },
  },
  {
    name: 'KISH',
    genres: ['Trance', 'Bounce', 'Schranz'],
    image: '/images/kish_picture.jpg',
    bio: 'Soaring trance, kinetic Bounce, industrial Schranz. Euphoria and aggression, no compromises.',
    links: {
      instagram: 'https://www.instagram.com/kish.cologne',
      soundcloud: 'https://on.soundcloud.com/NiCZY0Kl1cMkkiiNd0',
    },
  },
  {
    name: 'ZAR.I',
    genres: ['Speedhouse', 'Hardhouse', 'Hardgroove'],
    image: '/images/zari_picture.JPG',
    bio: 'Pure forward momentum. Speedhouse kicks, Hardhouse muscle, built for the peak hour.',
    links: {
      instagram: 'https://www.instagram.com/zar.izar.i',
      presskit: '#',
    },
  },
  {
    name: 'AAADRICH',
    genres: ['Hardhouse', 'Trance', 'Bounce'],
    image: '/images/aaadrich_picture.jpg',
    bio: 'Trance\'s melodic lift meets Hardhouse and Bounce weight. Built with purpose, landing with force.',
    links: {
      instagram: 'https://www.instagram.com/aaadrich',
      soundcloud: 'https://soundcloud.com/user-567965024',
      presskit: '#',
    },
  },
  {
    name: 'SAO',
    genres: ['House', 'Speedhouse', 'Techno'],
    image: '/images/sao_picture.jpg',
    bio: 'Fluid between House and Techno, with Speedhouse as the bridge. Every transition earned.',
    links: {
      instagram: 'https://www.instagram.com/beach_a_sao',
    },
  },
  {
    name: 'WEHLERISCH',
    genres: ['Trance', 'Hardhouse', 'Hardgroove'],
    image: '/images/wehlerisch_picture.jpg',
    bio: 'Founding member of CONNECTED. Driving sets between Trance, Hardhouse and Hardgroove.',
    links: {
      instagram: 'https://www.instagram.com/wehlerisch_',
      soundcloud: 'https://soundcloud.com/wehlerisch',
    },
  },
  {
    name: 'DAVIDE',
    genres: ['Trance', 'Groove', 'Schranz'],
    image: '/images/davide_picture.jpg',
    bio: 'One half of NINTEN. Melody and emotion in techno, precision with feeling.',
    links: {
      instagram: 'https://www.instagram.com/davide.connected',
      soundcloud: 'https://soundcloud.com/bouncinetti-davi-de',
    },
  },
  {
    name: 'SENNA',
    genres: ['Hardgroove', 'Hypnotic Techno', 'Schranz'],
    image: '/images/senna_picture.jpg',
    bio: 'One half of NINTEN. Studio and decks alike, shaping dark, unrelenting Hardgroove and Schranz.',
    links: {
      instagram: 'https://www.instagram.com/prod.senna',
      soundcloud: 'https://soundcloud.com/99senna',
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
