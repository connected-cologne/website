# CONNECTED – Projekt-Briefing & Übergabe
> DJ Kollektiv aus Köln · Web-Projekt · Stand: Juni 2026

---

## 🎯 Ziel

Eine visuell starke, eigenständige Website für das DJ-Kollektiv **CONNECTED** (Köln).  
Das Kollektiv soll Events, Radio-Sets und Artists selbst pflegen können — ohne tiefes Coding.  
Design-Sprache: **Dirty / Grunge / Beton / Graffiti** trifft Techno & Drum & Bass.

---

## 🏗️ Tech-Stack (beschlossen)

| Was | Womit |
|---|---|
| Framework | **Next.js** (React) |
| Styling | **Tailwind CSS** |
| Hosting | ⏳ *Reminder: noch nicht entschieden — Vercel empfohlen* |
| CMS | ⏳ *Reminder: noch nicht entschieden — Sanity.io empfohlen* |
| Domain | vorhanden, Registrar muss noch geprüft werden |

---

## 🎨 Design-System (aus Prototype)

**Farben:**
- Background: `#0a0a0a` (fast schwarz)
- Primär-Akzent: `#7c3aed` (dunkles, intensives Lila)
- Sekundär-Akzent: `#d4ff00` (Acid Yellow)
- Text: `#f0f0f0`

**Effekte:**
- Grain/Noise Overlay (SVG feTurbulence) über der gesamten Seite
- Scanline Overlay
- Glitch-Animation auf dem Hero-Titel
- Custom Cursor (Dot + Ring)
- Scroll-Reveal Animationen (IntersectionObserver)
- Nav sticky mit Active-Section-Tracking

**Fonts:** Grotesk/Gothic — rau, technisch

---

## 📐 Seiten & Sektionen

### Navigation
- `EVENTS` · `RADIO` · `ARTISTS` · `INNER CIRCLE` *(pausiert, Link bleibt)* · `MERCH` *(Placeholder)*

### 1. Hero
- Großer Glitch-Titel: **CONNECTED**
- Untertitel: Köln
- CTA-Button: z.B. "NEXT EVENT ↓"

### 2. Events
- Liste kommender Events mit:
  - Datum, Location, Lineup
  - Externer Ticket-Link (Redirect)
- Lineup = Mitglieder des Kollektivs

### 3. Radio
- **Featured Player**: Eingebetteter YouTube-iframe
  - Zeigt das **neueste** Video ODER das mit den **meisten Aufrufen**
  - YouTube-Kanal: [https://www.youtube.com/@ConnectedCologne](https://www.youtube.com/@ConnectedCologne)
- **Archiv-Grid**: Ältere Sets als Karten darunter
  - Mit Episodennummer, DJ-Name, Set-Titel
  - Click → externer YouTube-Link (oder Player-Wechsel wenn einfach umsetzbar)

### 4. Artists
- **7 Mitglieder:** NINTEN · KISH · BOYSDOCRY · ZARI · SAO · FINNITO · AAADRICH
- Mobile: **1 Spalte**
- Tablet: 2 Spalten
- Desktop: 3–4 Spalten
- Jede Karte: Foto, Name, Genre-Tag
- Hover (Desktop) / Click (Mobile): Overlay mit Bio, Socials, Press Kit Link

### 5. Inner Circle *(pausiert)*
- Nav-Punkt bleibt sichtbar
- Feature-Entwicklung on hold
- ⏳ *Reminder: Konzept & Umsetzung noch offen*

### 6. Merch *(Placeholder)*
- Vorerst nur Platzhalter-Sektion
- ⏳ *Reminder: Shopify-Integration geplant*

### 7. Press Kit *(noch nicht gebaut)*
- ⏳ *Reminder: Sektion/Seite für Presse-Downloads noch ausstehend*

---

## 📱 Mobile-First

- Basis-Styles für kleine Screens, Media Queries für größere Breakpoints
- Alle Sektionen müssen auf Mobile einwandfrei funktionieren
- Artists: 1 Spalte auf Mobile
- Nav: Burger-Menü auf Mobile

---

## 🔔 Offene Punkte / Reminder-Liste

| # | Thema | Status |
|---|---|---|
| 1 | **Hosting** | Vercel empfohlen — noch nicht entschieden |
| 2 | **CMS** | Sanity.io empfohlen — noch nicht entschieden (damit Kollektiv Events & Radio selbst pflegt) |
| 3 | **Domain** | Vorhanden — Registrar muss noch geprüft werden (ggf. DNS auf Vercel zeigen lassen) |
| 4 | **Merch / Shopify** | Geplant — Timing offen |
| 5 | **Press Kit** | Sektion geplant — noch nicht begonnen |
| 6 | **Inner Circle** | Feature pausiert — Konzept fehlt noch |
| 7 | **Radio Player-Logik** | Archiv-Cards: externer Link reicht vorerst; Player-Switching wenn easy machbar |
| 8 | **Analytics** | Noch nicht besprochen — Plausible oder Vercel Analytics empfohlen |
| 9 | **Artist-Fotos** | Echte Fotos müssen noch geliefert werden |
| 10 | **Event-Daten** | Echte kommende Events müssen befüllt werden |
| 11 | **Radio-Archiv-Daten** | Episodenliste mit echten Set-Titeln muss geliefert werden |

---

## ✅ Nächste Schritte (nach Design-Phase)

1. Design finalisieren in Claude (Farben, Layouts, Komponenten)
2. Next.js Projekt aufsetzen + Tailwind konfigurieren
3. Komponenten bauen: Nav, Hero, Events, Radio, Artists, Footer
4. Mobile-First CSS umsetzen
5. Prototype-HTML als Referenz nutzen (liegt bereits vor)
6. CMS anbinden (Sanity) → Events & Radio editierbar machen
7. Deploy auf Vercel
8. Domain verknüpfen

---

## 📎 Referenzen

- Prototype-Datei: `dj-kollektiv-prototype.html` (vollständig gebaut, alle Sektionen vorhanden)
- YouTube-Kanal: [https://www.youtube.com/@ConnectedCologne](https://www.youtube.com/@ConnectedCologne)
