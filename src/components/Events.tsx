type EventStatus = 'available' | 'sold-out' | 'soon';

type CCEvent = {
  id: string;
  day: string;
  year: string;
  name: string;
  venue: string;
  time: string;
  lineup: string;
  status: EventStatus;
  ticketUrl: string;
  posterLetter: string;
};

const EVENTS: CCEvent[] = [
  {
    id: '1',
    day: '28 JUN',
    year: '2026',
    name: 'CONNECTED × Warehouse Night',
    venue: 'Industriehalle West, Köln',
    time: '22:00 — Open End',
    lineup: 'NINTEN · KISH · BOYSDOCRY · ZARI',
    status: 'available',
    ticketUrl: '#',
    posterLetter: 'C',
  },
  {
    id: '2',
    day: '12 JUL',
    year: '2026',
    name: 'CONNECTED Open Air Vol. 4',
    venue: 'Hafengelände Nord, Köln',
    time: '16:00 — 06:00',
    lineup: 'NINTEN · KISH · BOYSDOCRY · ZARI · SAO · FINNITO · AAADRICH',
    status: 'available',
    ticketUrl: '#',
    posterLetter: 'O',
  },
  {
    id: '3',
    day: '02 AUG',
    year: '2026',
    name: 'B2B Series — EP. 07',
    venue: 'Club Bunker, Köln',
    time: '23:00 — 08:00',
    lineup: 'NINTEN B2B KISH',
    status: 'sold-out',
    ticketUrl: '#',
    posterLetter: 'B',
  },
  {
    id: '4',
    day: '19 SEP',
    year: '2026',
    name: 'CONNECTED Jahresabschluss 2026',
    venue: 'Venue TBA',
    time: '22:00 — Open End',
    lineup: 'Alle Members · Special Guests TBA',
    status: 'soon',
    ticketUrl: '#',
    posterLetter: 'J',
  },
];

const STATUS_TAG: Record<EventStatus, { label: string; cls: string }> = {
  'available': { label: 'Verfügbar',  cls: 'tag tag--avail' },
  'sold-out':  { label: 'Sold Out',   cls: 'tag tag--sold'  },
  'soon':      { label: 'Demnächst',  cls: 'tag'            },
};

export default function Events() {
  return (
    <section id="events" className="section">
      {/* Section header */}
      <div className="section-head reveal">
        <div>
          <p className="label" style={{ marginBottom: '10px' }}>01 — Upcoming</p>
          <h2 className="section-title">Events</h2>
        </div>
        <a href="#" className="btn">Alle Events →</a>
      </div>

      {/* Event list */}
      <div>
        {EVENTS.map((ev, i) => {
          const tag = STATUS_TAG[ev.status];
          const revealDelay = i === 0 ? '' : i === 1 ? ' reveal-d1' : i === 2 ? ' reveal-d2' : ' reveal-d3';

          return (
            <article key={ev.id} className={`event-row reveal${revealDelay}`}>
              {/* Poster placeholder */}
              <div className="ev-poster" aria-hidden="true">
                <span className="ev-poster-letter">{ev.posterLetter}</span>
              </div>

              {/* Date */}
              <div className="ev-date">
                {ev.day}<br />{ev.year}
              </div>

              {/* Name + lineup */}
              <div className="ev-info">
                <div className="ev-name">{ev.name}</div>
                <div className="ev-lineup">{ev.lineup}</div>
              </div>

              {/* Venue + time (desktop only) */}
              <div className="ev-venue-time">
                <span className="ev-venue">{ev.venue}</span>
                <span className="ev-time">{ev.time}</span>
              </div>

              {/* Status tag + ticket button */}
              <div className="ev-actions">
                <span className={tag.cls}>{tag.label}</span>
                {ev.status === 'available' && (
                  <a
                    href={ev.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--yellow"
                  >
                    Tickets →
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
