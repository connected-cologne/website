# CONNECTED – Project Brief
> DJ Collective from Cologne · Web Project · June 2026

---

## Goal

A visually strong, standalone website for the DJ collective **CONNECTED** (Cologne).
The collective should be able to manage events, radio sets and artist info themselves — without coding knowledge.
Design language: **Dirty / Grunge / Concrete / Graffiti** meets Techno & Drum and Bass.

---

## Tech Stack

| What | How |
|---|---|
| Framework | **Next.js** (React) |
| Styling | **Tailwind CSS** |
| Hosting | Vercel (recommended, not yet set up) |
| CMS | **Sanity.io** — set up & connected (Project ID `z4bxx5o0`, dataset `production`, public; Studio at `/studio`) |
| Domain | Available, registrar needs to be checked |

---

## Component Strategy

### Approach: Placeholders first, real components later

We build the website in two phases:

**Phase 1 — Placeholders:**
- All sections are built with simple placeholder components
- Focus is on layout, colors and the design system
- No external animation libraries in this phase

**Phase 2 — React Bits components:**
- Placeholders are replaced with animated React Bits components
- Planned components (from reactbits.dev):

| Section | Component | URL |
|---|---|---|
| Artists / DJ Cards | **ProfileCard** | https://reactbits.dev/components/profile-card |

### Important instructions for Claude Code:
- Always start with simple placeholder components
- Do NOT install external animation libraries in Phase 1
- For DJ cards (Artists section): build a simple card first, replace with ProfileCard from React Bits later
- ProfileCard requires: `npm install framer-motion`
- Mobile tilt is enabled (`enableMobileTilt=true`)

---

## Design System (from Prototype)

**Colors:**
- Background: `#0a0a0a` (near black)
- Primary accent: `#7c3aed` (dark, intense purple)
- Secondary accent: `#d4ff00` (acid yellow)
- Text: `#f0f0f0`

**Effects:**
- Grain/Noise overlay (SVG feTurbulence) over the entire page
- Scanline overlay
- Glitch animation on the hero title
- Custom cursor (dot + ring)
- Scroll-reveal animations (IntersectionObserver)
- Sticky nav with active section tracking

**Fonts (Google Fonts):**
- `Bebas Neue` — Display / Headlines
- `Space Grotesk` — Body text
- `IBM Plex Mono` — Labels, tags, mono elements

**CSS Variables (copy exactly from prototype):**
```css
--bg: #080808;
--surface: #0f0f0f;
--surface-2: #141414;
--border: #1e1e1e;
--border-2: #2a2a2a;
--text: #f0f0f0;
--text-2: #a0a0a0;
--muted: #484848;
--purple: #7c3aed;
--purple-dim: rgba(124, 58, 237, 0.13);
--purple-glow: rgba(124, 58, 237, 0.28);
--yellow: #d4ff00;
--yellow-dim: rgba(212, 255, 0, 0.08);
--red: #ff3b30;
--font-display: 'Bebas Neue', sans-serif;
--font-body: 'Space Grotesk', sans-serif;
--font-mono: 'IBM Plex Mono', monospace;
--section-pad: 120px 56px;
--nav-h: 72px;
--radius: 2px;
```

---

## Layout Approach

**Mobile-first.** Build base styles for small screens first, then scale up with min-width media queries. The majority of users will visit on mobile (club/event context).

The HTML prototype (`dj-kollektiv-prototype.html`) is a **design reference only** — use it for colors, typography, effects and overall visual mood. Do NOT copy its layout structure directly, as it was built desktop-only. Rebuild every section mobile-first from scratch.

Responsive breakpoints:
- Mobile base: 0–599px (default styles, no media query needed)
- Tablet: `@media (min-width: 600px)`
- Desktop: `@media (min-width: 960px)`

---

## Pages & Sections

### Navigation
- `EVENTS` · `RADIO` · `ARTISTS` · `INNER CIRCLE` (paused, link stays) · `MERCH` (placeholder)

### 1. Hero
- Large glitch title: **CONNECTED**
- Subtitle: Cologne
- CTA button: "NEXT EVENT"
- Ticker band below with scrolling text
- ✅ **Next Event card now fetches live from Sanity** — same query/logic as the Events section (soonest upcoming event by date), shared via `getEvents()` / `formatDay()` in `src/sanity/lib/queries.ts`

### 2. Events
- Clean vertical list, inspired by CircoLoco's event layout
- ✅ **Live data from Sanity** — title, date, location, lineup, poster, ticket URL, sold-out flag
- ✅ **Each event has a poster image**, click to open a fullscreen lightbox (`EventPoster.tsx`)
- Layout per event: poster image on top or left, then date (large), event name, venue, lineup, ticket button
- ✅ **Status logic implemented**: `Demnächst` (no ticket URL) / `Verfügbar` (ticket URL set) / `Sold Out` (soldOut flag — overrides everything)
- **Ticket links go to ticket.io** — simple external redirect per event, no own ticket system
- Each event in Sanity has a ticket URL field
- Lineup = members of the collective

### 3. Radio
- **Featured Player**: Embedded YouTube iframe
  - YouTube channel: https://www.youtube.com/@ConnectedCologne
  - ⚠️ Still manually set via `FEATURED_VIDEO_ID` in `Radio.tsx` — not yet automatic
- ✅ **Archive Grid**: already live — fetches the channel's latest videos via the YouTube RSS feed (no API key needed), shown as cards with thumbnail, date and title, linking out to YouTube

### 4. Artists
- **7 members:** NINTEN · KISH · BOYSDOCRY · ZARI · SAO · FINNITO · AAADRICH
- Phase 1: Simple card with photo placeholder, name, genre tag, hover overlay — ✅ built (`ArtistCard`)
- ⚠️ Still placeholder content: bios are filler text, social/press-kit links are `#`, and most photos are missing (only ZARI has a real photo)
- Phase 2: Replace with React Bits ProfileCard (with tilt effect)
- Desktop: 3–4 columns / Tablet: 2 columns / Mobile: 1 column
- Hover (desktop) / tap (mobile): overlay with bio, socials, press kit link

### 5. Inner Circle (paused)
- Nav link stays visible
- Feature development on hold
- Show teaser/placeholder only

### 6. Merch (placeholder)
- Placeholder section only for now
- Shopify integration planned later

### 7. Press Kit (not yet built)
- Section/page for press downloads — planned but not started

---

## Open Items

| # | Topic | Status |
|---|---|---|
| 1 | Hosting | Vercel recommended — not yet set up |
| 2 | CMS | ✅ Done — Sanity.io set up & connected (Project ID `z4bxx5o0`, dataset `production`, public), Events fully wired up |
| 3 | Domain | Available — registrar needs to be checked |
| 4 | Merch / Shopify | Planned — timing open |
| 5 | Press Kit | Planned — not yet started |
| 6 | Inner Circle | Feature paused — concept missing |
| 7 | YouTube API Key | ✅ Not needed — radio archive grid uses the public RSS feed; only the Featured Set video is still set manually |
| 8 | Analytics | Not discussed yet — Plausible or Vercel Analytics recommended |
| 9 | Artists — real content | Real photos, bios and social/press-kit links still need to be delivered for all 7 members |
| 10 | Event data | ✅ Managed in Sanity Studio (`/studio`) — add real upcoming events there |
| 11 | Radio archive data | ✅ Resolved — archive auto-pulls from the YouTube channel's RSS feed |
| 12 | React Bits ProfileCard | Phase 2 — insert after layout is complete |
| 13 | Footer legal links | `Impressum` and `Datenschutz` are still placeholder (`#`) links — pages/links need to be created |
| 14 | Project location | Project folder moved from `~/Desktop/website` to `~/website` |

---

## Build Order (follow this sequence strictly)

1. ✅ Fonts + CSS variables in globals.css
2. ✅ Layout + Nav component (desktop + mobile hamburger menu)
3. ✅ Hero section with glitch title and ticker
4. ✅ Events section — now with live Sanity data (was placeholder)
5. ✅ Radio section with YouTube auto-embed (archive grid via RSS feed; featured video still manual)
6. ✅ Artists section Phase 1 (simple placeholder cards — content still placeholder)
7. ✅ Inner Circle + Merch placeholders
8. ✅ Footer (legal links `Impressum`/`Datenschutz` still placeholder)
9. **Phase 2:** Replace artist cards with React Bits ProfileCard
10. ✅ Connect Sanity CMS — done for Events + Hero Next Event card
11. Deploy to Vercel
12. Connect domain
13. **Last step:** Intro animation (loading screen / entrance animation before the page reveals)

---

## Logo

Two versions available (both in `/public/images/`):

| File | Use |
|---|---|
| `Cc_Logo_SW.jpg` — white logo on black background | Main logo for the website (nav, hero, dark backgrounds) |
| `Cc_Logo_SW2.png` — black logo on white/transparent background | Press kit, merch, light contexts |

**Always use the white-on-black version (`Cc_Logo_SW.jpg`) as the primary logo on the website.**
The logo is an atom/orbit graphic with "CONNECTED COLOGNE" text inside — hand-drawn, grunge style. Do not replace it with text.

---

## Visual References

### 1. HTML Prototype (`dj-kollektiv-prototype.html`)
Use for: colors, typography, effects (grain, glitch, cursor, scanlines), overall dark mood.
Do NOT copy layout — rebuild mobile-first from scratch.

### 2. CircoLoco website (https://circoloco.com)
Use for: event listing layout, overall minimalism, generous use of black space, poster integration.
Key inspiration:
- Events displayed as a clean vertical list
- Each event has a poster image
- Large date, event name, lineup below
- Very minimal — let the poster do the visual work

---

## References

- Prototype file: `dj-kollektiv-prototype.html`
- YouTube channel: https://www.youtube.com/@ConnectedCologne
- React Bits ProfileCard: https://reactbits.dev/components/profile-card
- CircoLoco (event layout reference): https://circoloco.com
