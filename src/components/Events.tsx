import EventPoster from './EventPoster';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { EVENTS_QUERY, type SanityEvent } from '@/sanity/lib/queries';

type EventStatus = 'available' | 'sold-out' | 'soon';

const STATUS_TAG: Record<EventStatus, { label: string; cls: string }> = {
  'available': { label: 'Verfügbar',  cls: 'tag tag--avail' },
  'sold-out':  { label: 'Sold Out',   cls: 'tag tag--sold'  },
  'soon':      { label: 'Demnächst',  cls: 'tag'            },
};

function getStatus(ev: SanityEvent): EventStatus {
  if (ev.soldOut) return 'sold-out';
  if (ev.ticketUrl) return 'available';
  return 'soon';
}

function formatDay(iso: string) {
  const d = new Date(iso);
  const day = d.toLocaleDateString('de-DE', { day: '2-digit' });
  const month = d.toLocaleDateString('de-DE', { month: 'short' }).replace('.', '').toUpperCase();
  return `${day} ${month}`;
}

async function getEvents(): Promise<SanityEvent[]> {
  try {
    return await client.fetch(EVENTS_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    return [];
  }
}

export default async function Events() {
  const events = await getEvents();

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
        {events.map((ev, i) => {
          const status = getStatus(ev);
          const tag = STATUS_TAG[status];
          const revealDelay = i === 0 ? '' : i === 1 ? ' reveal-d1' : i === 2 ? ' reveal-d2' : ' reveal-d3';
          const posterUrl = ev.poster
            ? urlForImage(ev.poster).width(480).height(720).fit('crop').url()
            : undefined;
          const lineup = (ev.lineup ?? []).join(' · ');

          return (
            <article key={ev._id} className={`event-row reveal${revealDelay}`}>
              {/* Poster (click to open lightbox) */}
              <EventPoster
                src={posterUrl}
                alt={ev.title}
                posterLetter={ev.title.charAt(0)}
              />

              {/* Date + location */}
              <div className="ev-date">
                {formatDay(ev.date)}
                <span className="ev-location">{ev.location}</span>
              </div>

              {/* Name + lineup */}
              <div className="ev-info">
                <div className="ev-name">{ev.title}</div>
                {lineup && <div className="ev-lineup">{lineup}</div>}
              </div>

              {/* Venue + time (desktop only) */}
              <div className="ev-venue-time">
                <span className="ev-venue">{ev.location}</span>
              </div>

              {/* Status tag + ticket button */}
              <div className="ev-actions">
                <span className={tag.cls}>{tag.label}</span>
                {status === 'available' && ev.ticketUrl && (
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

        {events.length === 0 && (
          <p className="label label--muted reveal" style={{ padding: '20px 0' }}>
            Aktuell stehen keine Events fest — schaut bald wieder vorbei.
          </p>
        )}
      </div>
    </section>
  );
}
