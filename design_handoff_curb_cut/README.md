# Handoff: Curb Cut App — ADA Accessibility Survey Tool

## Overview

The Curb Cut App is a mobile-first web application that helps advocates and residents survey their community for missing or non-compliant ADA curb cuts. Users navigate a map, drop pins at problem locations, add descriptions and photos, track their GPS path, and generate a formal PDF complaint letter addressed to their local public works department.

---

## About the Design Files

The file `Curb Cut App.html` in this bundle is a **high-fidelity design reference built in HTML/CSS/JS** — a functional prototype showing the intended look, feel, and behavior of the app. It is **not** production code to be shipped directly.

Your task is to **recreate this design in your target codebase** (React Native, React + Leaflet, Next.js, etc.) using its established patterns, component libraries, and conventions. If no codebase exists yet, React with Leaflet.js and jsPDF is recommended — the prototype already uses this stack and the patterns translate cleanly.

---

## Fidelity

**High-fidelity.** The prototype reflects final colors, typography, spacing, component states, and interactions. Implement pixel-faithfully where possible, adapting only where your framework requires it (e.g. native navigation patterns on mobile).

---

## Design Tokens

### Colors
```
--navy:     #0f1f3d   /* Primary background, header */
--navy2:    #1a3260   /* Hover state on navy */
--blue:     #2451b7   /* Primary action, map pins, badges */
--blue-lt:  #3b6fd4   /* Hover on blue */
--green:    #1db87e   /* Place Pin CTA, active GPS, icon bg */
--green-dk: #14976a   /* Hover on green */
--amber:    #f59e0b   /* Warning / secondary accent */
--red:      #e84040   /* Destructive, Cancel place mode, GPS tracking active */
--white:    #f7f8fa   /* App background */
--surface:  #ffffff   /* Card / modal surface */
--surf2:    #f3f5f9   /* Input background, secondary surface */
--surf3:    #e8ecf3   /* Hover state on surf2, badges */
--text1:    #0f1f3d   /* Primary text */
--text2:    #3d5070   /* Secondary text, labels */
--text3:    #7b8fab   /* Muted text, placeholders, coords */
--border:   #dde2ed   /* All borders */
```

### Typography
- **Primary font:** `DM Sans` (Google Fonts) — weights 400, 500, 600, 700
- **Monospace font:** `DM Mono` (Google Fonts) — weights 400, 500 (used for coordinates, pin numbers)
- Fallback: `-apple-system, sans-serif`

### Spacing & Radius
```
--radius:    14px   /* Cards, modals, bottom sheet */
--radius-sm: 8px    /* Inputs, small buttons */
```

### Shadows
```
--shadow-sm: 0 1px 4px rgba(15,31,61,0.08)
--shadow:    0 4px 20px rgba(15,31,61,0.12)
--shadow-lg: 0 12px 40px rgba(15,31,61,0.18)
```

---

## Screens / Views

### 1. Mobile Layout (< 640px)

#### Header Bar
- Fixed at top, full width
- Height: 56px + `env(safe-area-inset-top)` padding
- Background: `--navy`
- Contents (left → right, flex row, `gap: 10px`, `padding: 0 16px`):
  - **Brand group** (flex: 1):
    - App icon: 32×32px, `border-radius: 9px`, background `--green`, contains white wheelchair/person SVG
    - Title: "Curb Cut", `font-size: 16px`, `font-weight: 700`, `letter-spacing: -0.3px`, color `#fff`
    - Subtitle: "ADA Survey Tool", `font-size: 11px`, color `rgba(255,255,255,0.45)`
  - **Action buttons** (flex row, `gap: 6px`):
    - Search icon button: 40×40px, `border-radius: 10px`, `background: rgba(255,255,255,0.08)`, `border: 1px solid rgba(255,255,255,0.12)`
    - **Place Pin pill button**: `height: 36px`, `padding: 0 14px`, `border-radius: 18px`, `background: --green`, `color: #fff`, `font-size: 13px`, `font-weight: 700`. When active (placing): `background: --red`, label changes to "Cancel"
    - Save icon button: same style as search
    - Clear/trash icon button: same style as search

#### Map
- Fills remaining viewport height below header
- Uses Leaflet.js with CartoDB Voyager tiles
- Zoom controls: top-right, custom styled (white cards, 44×44px buttons, `border-radius: 14px`, `box-shadow: --shadow`)
- Place mode cursor: `crosshair`

#### Place Mode Banner
- Appears centered at top of map when place mode is active
- `position: absolute`, `top: 12px`, centered horizontally
- `background: --navy`, `color: #fff`, `border-radius: 20px`, `padding: 8px 16px`
- Contains an animated green pulsing dot + text: "Tap map to place pin — tap pin to remove"
- Pulse animation: `opacity` 1→0.5→1, `scale` 1→0.6→1, 1.4s infinite

#### Mobile Search Overlay
- Appears when search button tapped, overlays top of map
- `position: absolute`, full width, `height: 60px`
- `background: --surface`, `border-radius: 0 0 14px 14px`, `box-shadow: --shadow-lg`
- Contains: back arrow button (36×36px) + full-width text input + "Go" button (`background: --blue`)

#### GPS FAB
- `position: absolute`, bottom-left of map, `left: 14px`, `bottom: 14px`
- 48×48px square, `border-radius: 14px`, `background: --surface`, `box-shadow: --shadow`
- When GPS tracking active: `background: --red`, `color: #fff`

#### Bottom Sheet
- `position: absolute`, anchored to bottom of map container
- `border-radius: 20px 20px 0 0`, `background: --surface`
- `box-shadow: 0 -8px 32px rgba(15,31,61,0.18)`
- Drag handle: centered, `width: 38px`, `height: 4px`, `background: --surf3`, `border-radius: 2px`
- **Snap points:** 100px (peek, handle + tabs only), 42% viewport height (half), 80% viewport height (full)
- **Transition:** `height 0.32s cubic-bezier(0.4, 0, 0.2, 1)`

##### Bottom Sheet Tabs (3 tabs)
Each tab: `flex: 1`, `min-height: 44px`, icon (16px emoji) + label (10px, font-weight 600)
- Tab 0: 📍 Locations
- Tab 1: 📋 Survey
- Tab 2: 🗺 Tools
- Active tab: `color: --blue`, `border-bottom: 2.5px solid --blue`
- Inactive: `color: --text3`, no border

##### Tab 0 — Locations
- Scrollable list of **Marker Cards** (see component below)
- Empty state: centered text, `color: --text3`, `font-size: 13px`
- **Generate PDF Report** button at bottom (see PDF Button component)

##### Tab 1 — Survey Info
- Scrollable form with fields: Surveyor Name, Survey Date, City/Location, Department Name, Department Address, Survey Notes (textarea)
- All fields use `field-input` style (see Form Fields)

##### Tab 2 — Tools
- Address search row: text input + "Go" button
- GPS status text: `font-size: 12px`, `color: --text3`
- Divider line: `height: 1px`, `background: --border`
- Generate PDF Report button

---

### 2. Desktop Layout (≥ 640px)

#### Left Sidebar (360px wide)
- Fixed height (full viewport), scrollable
- `border-right: 1px solid --border`
- **Dark header panel** (`background: --navy`, padding 16px 20px 20px):
  - Brand row: 36×36px green icon + title "Curb Cut" + subtitle
  - Search row: dark-styled input (`background: rgba(255,255,255,0.1)`, `border: 1px solid rgba(255,255,255,0.15)`, `border-radius: 10px`, `color: #fff`) + green "Go" button
  - Mode row: two equal buttons — Navigate / Place Marker. Active: `background: --green`, `color: #fff`. Inactive: `background: rgba(255,255,255,0.07)`, `color: rgba(255,255,255,0.6)`, `border: 1px solid rgba(255,255,255,0.1)`
  - GPS row: "GPS Tracking" button + status text. When tracking: `background: --red`
- **White body panel** (padding 16px, flex column, gap 12px):
  - Survey Info accordion
  - Marked Locations accordion with count badge

#### Map Area
- Fills remaining width to the right of sidebar
- Full viewport height
- All map overlays (search, banner, FAB) hidden on desktop; search is in sidebar

---

## Components

### Marker Card
```
border: 1.5px solid --border
border-radius: 12px
background: --surface
overflow: hidden
```
- **Top row** (padding 11px 12px 8px, flex, gap 10px):
  - Badge: 28×28px circle, `background: --blue`, `color: #fff`, `font-size: 12px`, `font-weight: 700`, `font-family: DM Mono` — shows sequential number
  - Description text: `font-size: 12.5px`, `color: --text1`, `line-height: 1.45`
  - Optional photo thumb: `max-width: 72px`, `max-height: 54px`, `border-radius: 6px`, `object-fit: cover`
- **Coordinates** (below top row, `padding: 0 12px 6px 50px`): `font-size: 10px`, `color: --text3`, `font-family: DM Mono`
- **Actions row** (flex, gap 5px, `padding: 6px 10px 10px`, `border-top: 1px solid --surf2`):
  - Edit button: `flex: 1`, `height: 30px`, `border-radius: 7px`, `font-size: 11.5px`, `font-weight: 600`, `color: --text2`, `background: --surf2`, `border: 1px solid --border`
  - View button: same style
  - Delete button: same but `color: --red`, `background: #fff4f4`, `border-color: #fde0e0`

### Form Fields
```css
/* Label */
font-size: 11px; font-weight: 600; color: --text3;
text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 5px;

/* Input */
border: 1.5px solid --border;
border-radius: 8px;
padding: 9px 11px;
font-size: 13px;
color: --text1;
background: --surf2;

/* Focus state */
border-color: --blue;
background: #fff;
box-shadow: 0 0 0 3px rgba(36,81,183,0.12);
```

### PDF Button
```
width: 100%; height: 44px;
border-radius: 10px;
background: --navy; color: #fff;
font-size: 13.5px; font-weight: 700;
display: flex; align-items: center; justify-content: center; gap: 8px;
```
- Hover: `background: --navy2`
- Active: `transform: scale(0.98)`

### Accordion Section (desktop sidebar)
```
border: 1.5px solid --border;
border-radius: 14px;
overflow: hidden;
background: --surface;
```
- Header: `padding: 13px 14px`, flex row, `cursor: pointer`
  - Icon slot: 28×28px, `border-radius: 7px`, `background: --surf2`
  - Title: `font-size: 13px`, `font-weight: 700`, `color: --text1`
  - Optional count badge: `background: --blue`, `color: #fff`, `border-radius: 20px`, `font-size: 11px`, `font-weight: 700`, `padding: 2px 7px`
  - Chevron: `color: --text3`, `font-size: 11px`, rotates `-90deg` when collapsed
- Body: `padding: 0 14px 14px`, `flex-direction: column`, `gap: 10px`
- Collapsed: body hidden

### Edit Modal
- **Backdrop**: `background: rgba(15,31,61,0.55)`, `backdrop-filter: blur(4px)`
- **Sheet** (slides up from bottom on mobile, centered dialog on desktop):
  - Mobile: full width, `border-radius: 22px 22px 0 0`, `max-height: 88vh`
  - Desktop: `max-width: 540px`, `border-radius: 18px`, `max-height: 82vh`, `padding: 28px`
  - Enter animation (mobile): `translateY(60px) → translateY(0)`, opacity 0→1, `duration: 0.28s`, easing `cubic-bezier(0.34, 1.1, 0.64, 1)`
  - Enter animation (desktop): `scale(0.96) → scale(1)` + `translateY(8px) → 0`, `0.22s ease-out`
- Contents:
  - Drag handle (mobile only): 38×4px, `background: --surf3`
  - Header row: title ("Location #N") + close button (32×32px circle, `background: --surf2`)
  - Coords bar: `font-size: 11.5px`, `font-family: DM Mono`, `background: --surf2`, `border-radius: 6px`, `padding: 6px 10px`
  - Description textarea: `border: 1.5px solid --border`, `border-radius: 10px`, `min-height: 90px`, same focus state as form fields
  - Photo attach label-button + hidden file input + preview image (hidden until photo selected)
  - Button row: Cancel (flex:1, `border: 1.5px solid --border`, `background: --surf2`) + Save Location (flex:2, `background: --blue`, `color: #fff`)

### Map Pins
Custom Leaflet `divIcon`:
- Outer wrapper: 32×40px
- Pin head: 30×30px, `border-radius: 50% 50% 50% 0`, `transform: rotate(-45deg)`, `background: --blue`, `border: 2.5px solid #fff`, `box-shadow: 0 3px 10px rgba(15,31,61,0.35)`
- Number inside: counter-rotated `rotate(45deg)`, `font-family: DM Mono`, `font-size: 10px`, `font-weight: 800`, `color: #fff`
- Place mode: pin head turns `--red`
- `iconAnchor: [16, 40]` (tip of pin)

### GPS Dot
Custom Leaflet `divIcon`: 16×16px circle, `background: --blue`, `border: 3px solid #fff`, `box-shadow: 0 0 0 3px rgba(36,81,183,0.3)`

### Toast Notification
- `position: fixed`, top ~70px, centered horizontally
- `background: --navy`, `color: #fff`, `border-radius: 20px`, `padding: 10px 18px`
- `font-size: 13px`, `font-weight: 600`
- Green checkmark icon prefix
- Appears: `opacity: 0→1` + `translateY(-12px → 0)`, `duration: 0.2s`
- Auto-dismisses after 2.4s

---

## Interactions & Behavior

### Mode System
Two modes: `navigate` (default) and `place`.
- **Navigate mode:** Tapping/clicking the map does nothing. Tapping a pin opens Edit Modal.
- **Place mode:** Tapping/clicking the map drops a new pin. Tapping an existing pin deletes it.
- Mode indicator: place mode banner appears over map, Place Pin button turns red/shows "Cancel"
- Keyboard: `P` toggles mode, `Esc` exits place mode and closes modal

### Dropping a Pin
1. User taps map in place mode
2. Pin immediately appears with `?` label and "Looking up address…" description (pulsing opacity animation)
3. Background reverse geocode call to Nominatim API
4. On success: description updates to `"Corner at [street], [city], [state] — curb cut needed"`
5. All pin numbers refresh sequentially after any add/delete
6. Touch debounce: 600ms between drops to prevent double-tap

### Bottom Sheet (mobile)
- **Peek** (100px): handle bar + tabs visible, no content
- **Half** (42% viewport): default expanded state when tab tapped
- **Full** (80% viewport): maximum drag
- Dragging the handle area updates height live, then snaps to nearest snap point on release
- Tapping a tab snaps to half if currently at peek

### GPS Tracking
- Uses `navigator.geolocation.watchPosition` with `enableHighAccuracy: true`
- Blue dot marker follows position with accuracy circle
- Records path points when moved >3m (Haversine distance)
- Draws polyline of path; when ≥3 points, draws convex hull polygon
- Status text shows point count + estimated area (m² or acres)
- Session data includes GPS points (restored on reload)

### Session Persistence
All state saved to `localStorage` key `curbCutSurvey` on every change:
- All marker data (id, lat, lng, desc, autoDesc, photo as base64)
- GPS path points
- Last map center + zoom
- All form field values
- Auto-restores on page load

### PDF Generation
Uses jsPDF + html2canvas. Flow:
1. Cover letter page with formal complaint text addressed to the department
2. Map overview page (html2canvas screenshot of map, panned to fit all markers)
3. If markers are spread wide (zoom < 14), additional detail map pages per 6-marker chunk
4. One detail page per location (description, coords, Google Maps link, photo if attached)
5. Final quick-reference list page
6. Downloaded as `curb-cut-survey-{city}-{date}.pdf`

---

## State Management

```typescript
// Core state
markers: Array<{
  id: number;
  lat: number;
  lng: number;
  desc: string;
  autoDesc: boolean;       // true if description was auto-generated by geocode
  geocoding: boolean;      // true while reverse geocode is in progress
  photo: string | null;    // base64 JPEG data URL
  leafletMarker: L.Marker; // live map reference (not persisted)
}>

nextId: number;            // auto-increment counter
mode: 'navigate' | 'place';

// GPS state
gpsTracking: boolean;
gpsWatchId: number | null;
gpsPoints: Array<{ lat: number; lng: number }>;
gpsDot: L.Marker | null;
gpsAccCircle: L.Circle | null;
gpsPolyline: L.Polyline | null;
gpsHullPolygon: L.Polygon | null;

// Edit modal
editingId: number | null;
pendingPhoto: string | null;
```

---

## External Dependencies

| Library | Version | Purpose |
|---|---|---|
| Leaflet.js | 1.9.4 | Interactive map |
| jsPDF | 2.5.1 | PDF generation |
| html2canvas | 1.4.1 | Map screenshot for PDF |
| CartoDB Voyager | — | Map tile layer |
| Nominatim (OSM) | — | Reverse geocoding + address search |
| Google Fonts | — | DM Sans + DM Mono |

> **Note:** Nominatim has a usage policy — for production, use a self-hosted instance or a commercial geocoding API (Mapbox, Google Maps, etc.).

---

## Assets

- App icon: inline SVG of a simplified wheelchair/person figure, white on `--green` background
- Action icons: inline SVGs for search, save (floppy disk), trash, GPS crosshair, map pin, camera, edit pencil, delete trash — all drawn with `stroke="currentColor"`, `stroke-width="2"`, `stroke-linecap="round"`
- No external image assets; photos are user-provided via camera/file input

---

## Responsive Breakpoint

Single breakpoint at **640px**:
- `< 640px`: Mobile layout — header + map + bottom sheet. Sidebar hidden.
- `≥ 640px`: Desktop layout — sidebar (360px) + map side-by-side. Header, bottom sheet, mobile FABs hidden.

---

## Files in This Package

| File | Description |
|---|---|
| `Curb Cut App.html` | High-fidelity prototype — full working app reference |
| `README.md` | This document |
