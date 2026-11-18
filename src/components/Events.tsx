import EventPoster from './EventPoster';
import PastEventsList from './PastEventsList';
import { urlForImage } from '@/sanity/lib/image';
import { formatDay, getEvents, type SanityEvent } from '@/sanity/lib/queries';

type EventStatus = 'available' | 'sold-out' | 'soon';

const STATUS_TAG: Record<EventStatus, { label: string; cls: string }> = {
  'available': { label: 'Available', cls: 'tag tag--avail' },
  'sold-out':  { label: 'Sold Out',  cls: 'tag tag--sold'  },
  'soon':      { label: 'Soon',      cls: 'tag'            },
};

function getStatus(ev: SanityEvent): EventStatus {
  if (ev.soldOut) return 'sold-out';
  if (ev.ticketUrl) return 'available';
  return 'soon';
}

const REVEAL_DELAYS = ['', ' reveal-d1', ' reveal-d2', ' reveal-d3'];

function EventRow({ ev, index, past = false }: { ev: SanityEvent; index: number; past?: boolean }) {
  const revealDelay = REVEAL_DELAYS[Math.min(index, 3)];
  const posterUrl = ev.poster
    ? urlForImage(ev.poster).width(480).height(720).fit('crop').url()
    : undefined;
  const lineup = (ev.lineup ?? []).join(' · ');
  const status = getStatus(ev);
  const tag = STATUS_TAG[status];

  return (
    <article className={`event-row${past ? ' event-row--past' : ''} reveal${revealDelay}`}>
      {/* Poster (click to open lightbox) */}
      <EventPoster
        src={posterUrl}
        alt={ev.title}
        posterLetter={ev.title.charAt(0)}
      />

      {/* Date + location */}
      <div className="ev-date">
        {formatDay(ev.date, { withYear: past })}
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

      {/* Upcoming: status tag + ticket button. Past: optional recap link only. */}
      <div className="ev-actions">
        {past ? (
          ev.recapUrl && (
            <a
              href={ev.recapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Recap →
            </a>
          )
        ) : (
          <>
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
          </>
        )}
      </div>
    </article>
  );
}

export default async function Events() {
  const { upcoming, past } = await getEvents();

  return (
    <section id="events" className="section">
      {/* Section header */}
      <div className="section-head reveal">
        <div>
          <p className="label" style={{ marginBottom: '10px' }}>01 — Upcoming</p>
          <h2 className="section-title">Events</h2>
        </div>
        {past.length > 0 && (
          <a href="#past-events" className="btn">Past Events ↓</a>
        )}
      </div>

      {/* Upcoming events */}
      <div>
        {upcoming.map((ev, i) => (
          <EventRow key={ev._id} ev={ev} index={i} />
        ))}

        {upcoming.length === 0 && (
          <p className="label label--muted reveal" style={{ padding: '20px 0' }}>
            No events are scheduled right now — check back soon.
          </p>
        )}
      </div>

      {/* Past events — newest first, first five visible */}
      {past.length > 0 && (
        <div id="past-events" className="past-events">
          <h3 className="past-events-title reveal">Past Events</h3>
          <PastEventsList total={past.length}>
            {past.map((ev, i) => (
              <EventRow key={ev._id} ev={ev} index={i} past />
            ))}
          </PastEventsList>
        </div>
      )}
    </section>
  );
}
