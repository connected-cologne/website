import { defineQuery } from 'next-sanity';

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
