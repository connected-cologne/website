import ArtistsGrid, { type Artist } from './ArtistsGrid';

const ARTISTS: Artist[] = [
  {
    id: 'ninten',
    name: 'NINTEN',
    letter: 'N',
    genre: 'Techno · Industrial',
    bio: 'Gründungsmitglied von CONNECTED. Bekannt für treibende Sets zwischen Industrial und Melodic Techno. Regelmäßig auf den CONNECTED-Events vertreten.',
    socials: [
      { label: 'Instagram',  url: '#' },
      { label: 'SoundCloud', url: '#' },
      { label: 'RA',         url: '#' },
    ],
    pressKit: true,
  },
  {
    id: 'kish',
    name: 'KISH',
    letter: 'K',
    genre: 'Dark Techno · Groove',
    bio: 'KISH steht für hypnotische Grooves und eine dunkle, intensive Energie auf dem Dancefloor. Sein Sound ist tief verwurzelt in der Kölner Club-Kultur.',
    socials: [
      { label: 'Instagram',  url: '#' },
      { label: 'SoundCloud', url: '#' },
    ],
    pressKit: false,
  },
  {
    id: 'boysdocry',
    name: 'BOYSDOCRY',
    letter: 'B',
    genre: 'Techno · Breaks',
    bio: 'BOYSDOCRY verbindet Techno mit Breaks und schafft eine unverwechselbare, energiegeladene Atmosphäre — roh, ehrlich, direkt.',
    socials: [
      { label: 'Instagram',  url: '#' },
      { label: 'SoundCloud', url: '#' },
      { label: 'Mixcloud',   url: '#' },
    ],
    pressKit: false,
  },
  {
    id: 'zari',
    name: 'ZARI',
    letter: 'Z',
    genre: 'Acid · Rave',
    bio: 'Inspiriert von der frühen Rave-Kultur der 90er. ZARI lebt und liebt Acid — jedes Set eine Zeitreise in die Ursprünge elektronischer Musik.',
    socials: [
      { label: 'Instagram',  url: '#' },
      { label: 'SoundCloud', url: '#' },
    ],
    pressKit: true,
  },
  {
    id: 'sao',
    name: 'SAO',
    letter: 'S',
    genre: 'Melodic · Progressive',
    bio: 'SAO bringt Melodie und Emotion in den Techno. Seine Sets bauen Spannungsbögen auf, die den Dancefloor in eine andere Dimension transportieren.',
    socials: [
      { label: 'Instagram',  url: '#' },
      { label: 'SoundCloud', url: '#' },
    ],
    pressKit: false,
  },
  {
    id: 'finnito',
    name: 'FINNITO',
    letter: 'F',
    genre: 'Techno · Minimal',
    bio: 'Weniger ist mehr — FINNITOs minimalistischer Ansatz schafft Raum und Tiefe. Präzise, reduziert, mit einem untrüglichen Gespür für den richtigen Moment.',
    socials: [
      { label: 'Instagram',  url: '#' },
      { label: 'SoundCloud', url: '#' },
    ],
    pressKit: false,
  },
  {
    id: 'aaadrich',
    name: 'AAADRICH',
    letter: 'A',
    genre: 'Techno · Experimental',
    bio: 'AAADRICH denkt Techno neu — experimentell, grenzüberschreitend und immer auf der Suche nach dem unerwarteten Moment, der alles verändert.',
    socials: [
      { label: 'Instagram',  url: '#' },
      { label: 'SoundCloud', url: '#' },
      { label: 'RA',         url: '#' },
    ],
    pressKit: true,
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

      <ArtistsGrid artists={ARTISTS} />
    </section>
  );
}
