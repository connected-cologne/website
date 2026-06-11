# CONNECTED - Uebergabe fuer neuen Chat

## Projektstatus
Wir bauen eine Website fuer das DJ-Kollektiv CONNECTED aus Koeln.

### Stack
- Next.js (App Router)
- Tailwind CSS
- Sanity CMS (Project ID `z4bxx5o0`, Dataset `production`, public)
- Claude Code im Terminal
- GitHub Repo auf der Organisation `connected-cologne`

### Setup-Hinweise
- Projektordner liegt jetzt unter `~/website` (umgezogen von `~/Desktop/website`)
- Die Claude Code App hat aktuell ein Directory-Problem -> wir arbeiten deshalb im normalen Terminal weiter

### Wichtige Projektdateien
- Briefing-Datei: `CONNECTED_Projektuebergabe.md`
- Design-Referenz: `dj-kollektiv-prototype.html`
- Logos liegen im Projekt unter `public/images/`
- Sanity Studio liegt unter `/studio` (im Browser erreichbar, dort werden Events gepflegt)

### Bereits umgesetzte Dinge
1. Fonts eingebunden:
   - Bebas Neue
   - Space Grotesk
   - IBM Plex Mono

2. Design Tokens / CSS Variablen in `globals.css`
   - Farben
   - Spacing
   - Radius
   - Base reset

3. Layout und Navigation
   - Custom Cursor
   - Grain Overlay
   - Sticky Nav
   - Mobile Hamburger / Drawer
   - Logo links, Links mittig, Live-Dot rechts

4. Hero
   - Glitch-Titel CONNECTED / COLOGNE
   - Intro Text
   - Ticker
   - Next Event Card -> zieht jetzt **live** das naechste Event aus Sanity (gleiche Logik wie Events-Sektion: naechstes Datum zuerst, ueber `getEvents()` / `formatDay()`)

5. Events
   - Events kommen jetzt **live aus Sanity** (Titel, Datum, Ort, Lineup, Poster, Ticket-Link, Sold-Out-Flag)
   - Poster-Bild pro Event mit Klick-Lightbox (Vollbildansicht)
   - Status-Logik fertig: `Demnächst` (kein Ticket-Link) / `Verfügbar` (Ticket-Link vorhanden) / `Sold Out` (Sold-Out-Flag, ueberschreibt alles)
   - Mobile Layout solide

6. Sanity CMS
   - Eingerichtet und verbunden (Project ID `z4bxx5o0`, Dataset `production`, public — kein Token noetig, da public + nur published content)
   - Studio unter `/studio`
   - Schema "Event": Titel, Datum, Ort, Lineup, Poster (mit Hotspot), Ticket-URL, Sold-Out-Flag

## Design-Entscheidungen
- Mobile-first bleibt der Ansatz
- Prototype ist nur Referenz fuer Stimmung, Farben und Effekte, nicht 1:1 Layout
- CircoLoco ist Referenz fuer Event-Struktur / Minimalismus / Poster-Integration
- Hauptlogo: weiße Version auf schwarzem Grund

## Inhaltliche Entscheidungen
- Inner Circle bleibt erstmal Platzhalter / spaeter
- Merch bleibt Platzhalter
- Press Kit spaeter
- Events werden jetzt ueber Sanity gepflegt ✅
- Radio: Archiv-Grid laeuft schon automatisch ueber den YouTube RSS-Feed, Featured Set ist noch manuell
- Artists sollen spaeter eventuell React Bits `ProfileCard` bekommen
- Ticketing spaeter ueber ticket.io Links pro Event

## Wichtige Dateien / Assets
- `public/images/Cc_Logo_SW.png` -> Hauptlogo
- `public/images/Cc_Logo_SW2.png` -> alternative Logo-Version
- `public/images/zari_picture.JPG` -> einziges echtes Artist-Foto bisher (ZARI)

## Was noch zu tun ist
1. **Radio-Sektion**
   - Archiv-Grid laedt bereits automatisch die neuesten Videos vom YouTube-Kanal (RSS-Feed, kein API-Key noetig)
   - Featured-Video ist noch manuell ueber `FEATURED_VIDEO_ID` in `Radio.tsx` gesetzt -> ggf. spaeter automatisieren

2. **Artists-Sektion mit echten Daten**
   - Aktuell noch Platzhalter: Bios sind Fülltext, Social-/Presskit-Links sind `#`
   - Fotos fehlen bis auf ZARI (`zari_picture.JPG`)
   - Echte Fotos, Bios und Social-Links fuer alle 7 Mitglieder einpflegen (NINTEN, KISH, BOYSDOCRY, ZARI, SAO, FINNITO, AAADRICH)

3. **Footer-Links**
   - Booking & Presse sind bereits als `mailto:`-Links gesetzt ✅
   - `Impressum` und `Datenschutz` sind noch Platzhalter (`#`) -> Seiten/Inhalte erstellen und verlinken

4. **Spaeter**
   - ticket.io Anbindung pro Event
   - React Bits ProfileCard fuer Artists (Phase 2)
   - Intro-Animation (Loading Screen)
   - Inner Circle Konzept
   - Merch / Shopify
   - Vercel Deployment + Domain

## Wichtige Hinweise fuer den neuen Chat
- Erstmal nichts neu erfinden
- Weiter auf dem bestehenden Stand aufbauen
- Wenn Code geaendert wird, immer gezielt und schrittweise
- Bei Fragen zu Mobile zuerst die aktuelle Seite anschauen, nicht blind umbauen
- Sanity-Logik (Query, Typen, Helper) liegt zentral in `src/sanity/lib/queries.ts` — von Hero und Events gemeinsam genutzt

## Gute naechste Anfrage fuer den neuen Chat
"Hier ist der aktuelle Stand. Bitte fahre mit dem Projekt fort, prüfe zuerst den jetzigen Aufbau und schlage mir den naechsten sinnvollen Schritt vor."
