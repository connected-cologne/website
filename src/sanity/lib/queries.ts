import { defineQuery } from 'next-sanity';

import { client } from './client';

// Published, upcoming events — soonest first.
export const EVENTS_QUERY = defineQuery(`
  *[_type == "event" && date >= now()] | order(date asc) {
    _id,
    title,
    date,
    location,
    lineup,
    poster,
    ticketUrl,
    soldOut
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
};

// Upcoming events, soonest first — used by both the hero and events section.
export async function getEvents(): Promise<SanityEvent[]> {
  try {
    return await client.fetch(EVENTS_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    return [];
  }
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

export function formatDay(iso: string) {
  const d = new Date(iso);
  const day = d.toLocaleDateString('en-GB', { day: '2-digit' });
  const month = d.toLocaleDateString('en-GB', { month: 'short' }).replace('.', '').toUpperCase();
  return `${day} ${month}`;
}
