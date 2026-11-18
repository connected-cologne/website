import { defineQuery } from 'next-sanity';

import { client } from './client';

// All published events, oldest first. Split into upcoming / past at render
// time (see splitEvents) so events move over without a content change.
export const EVENTS_QUERY = defineQuery(`
  *[_type == "event" && defined(date)] | order(date asc) {
    _id,
    title,
    date,
    location,
    lineup,
    poster,
    ticketUrl,
    soldOut,
    recapUrl,
    showInPast
  }
`);

export type SanityEvent = {
  _id: string;
  title: string;
  date: string;
  location: string;
  lineup?: string[];
  poster?: {
    asset?: { _ref: string; _type: string };
    hotspot?: { x: number; y: number; height: number; width: number };
  };
  ticketUrl?: string;
  soldOut?: boolean;
  recapUrl?: string;
  showInPast?: boolean;
};

async function getAllEvents(): Promise<SanityEvent[]> {
  try {
    return await client.fetch(EVENTS_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    return [];
  }
}

const TIME_ZONE = 'Europe/Berlin';

// Offset of Cologne local time from UTC at the given instant, in ms (DST-aware).
function berlinOffsetMs(at: Date): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: TIME_ZONE,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
      .formatToParts(at)
      .map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  return asUtc - at.getTime();
}

// An event counts as past from 06:00 Cologne time on the day after its date,
// so it stays listed (with tickets) for the whole night.
export function eventEndsAt(iso: string): Date {
  const start = new Date(iso);
  const [y, m, d] = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE })
    .format(start)
    .split('-')
    .map(Number);
  const guess = Date.UTC(y, m - 1, d + 1, 6);
  return new Date(guess - berlinOffsetMs(new Date(guess)));
}

export type SplitEvents = {
  // Soonest first.
  upcoming: SanityEvent[];
  // Most recent first; excludes events switched off in the Studio.
  past: SanityEvent[];
};

export function splitEvents(events: SanityEvent[], now = new Date()): SplitEvents {
  const upcoming: SanityEvent[] = [];
  const past: SanityEvent[] = [];
  for (const ev of events) {
    if (eventEndsAt(ev.date) > now) upcoming.push(ev);
    else if (ev.showInPast !== false) past.push(ev);
  }
  past.reverse();
  return { upcoming, past };
}

// Upcoming and past events — used by both the hero and events section.
export async function getEvents(): Promise<SplitEvents> {
  return splitEvents(await getAllEvents());
}

// Releases — manual order, ascending. Max. 3 are shown (design decision).
export const RELEASES_QUERY = defineQuery(`
  *[_type == "release"] | order(order asc) {
    _id,
    title,
    soundcloudUrl,
    order
  }
`);

export type Release = {
  _id: string;
  title: string;
  soundcloudUrl: string;
  order?: number;
};

// Releases, ordered ascending — used by the Listen section.
export async function getReleases(): Promise<Release[]> {
  try {
    return await client.fetch(RELEASES_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    return [];
  }
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// "14 MAR" (or "14 MAR 2025"), in Cologne time. Month names are fixed so
// runtimes that abbreviate September as "Sept" don't change the layout.
export function formatDay(iso: string, { withYear = false } = {}) {
  const [y, m, d] = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE })
    .format(new Date(iso))
    .split('-');
  const label = `${d} ${MONTHS[Number(m) - 1]}`;
  return withYear ? `${label} ${y}` : label;
}
