# Baseline Journal Agent Context

## What We Are Building

Baseline Journal is a premium, local-first, offline-friendly journaling PWA.

It is meant to feel like a quiet daily ritual, not a productivity dashboard. The app should help someone pause, regulate, and leave a small honest trace of the day. The emotional tone matters as much as the feature list.

The intended user may be tired, overstimulated, avoidant, anxious, or low-energy. The interface should reduce friction without feeling childish or clinical.

## Product Intention

Baseline Journal should feel:

- Calm
- Private
- Tactile
- Emotionally grounded
- Low stimulation
- Phone-first
- Installable
- Offline after first load
- Local-only, with no accounts or backend
- Visual and at-a-glance (like Forest app)

Do not turn this into a marketing site, analytics dashboard, habit tracker, productivity app, social app, or cloud-sync product unless explicitly asked.

The first screen should always be the actual journaling experience.

## Core Stack

This project uses:

- Vite
- React
- TypeScript
- Tailwind CSS
- IndexedDB through `idb`
- localStorage for shared Baseline stats
- Canvas API for local image compression
- `html2pdf.js` for zine PDF export
- `lucide-react` for icons
- `vite-plugin-pwa` for installability and service worker support

Use existing patterns and file structure before introducing new abstractions.

## Data Model

IndexedDB database:

```text
BaselineJournalDB
```

Object store:

```text
dailyLogs
```

Primary key:

```text
date
```

Date format:

```text
YYYY-MM-DD
```

Each daily log must follow this shape:

```ts
{
  date: string;
  journalEntry: string;
  isZeroEnergy: boolean;
  rawMadLibData?: {
    brainState: string;
    focusState: string;
    groundingSensation: string;
  };
  proofImageBase64: string | null;
}
```

Shared Baseline localStorage keys:

```text
baseline_active_streak
baseline_last_active_date
baseline_app_settings
```

Preserve these exact names because other Baseline tools may read them.

Note: `baseline_user_points` removed (points system discontinued).

## Streak Logic

On successful daily entry save:

- Use today’s local date as `YYYY-MM-DD`.
- If `baseline_last_active_date` was yesterday, increment `baseline_active_streak`.
- If today is new but not consecutive, reset `baseline_active_streak` to `1`.
- If today was already active, do not double-increment.
- Always update `baseline_last_active_date`.

Note: Points system removed. Only streak is tracked.

## Required App Features

### 1. Customizable Grounding Pause (ImpulseReset)

Users can customize the grounding pause:

- Duration options: Off (0s), 3s, 5s, 10s (default 3s)
- Show on date change: Toggle (default on)
- Show on app start: Toggle (default off)
- Dark stone background with breathing ring animation
- Full-screen blocking overlay
- Fade out smoothly

Purpose: this is a dopamine interrupter and grounding pause before journaling.

### 2. Visual Calendar Navigation

Interactive calendar view showing:

- Current month grid (7 columns for weekdays)
- Days with entries highlighted in amber
- Zero-energy entries marked with moon icon
- Photo proof entries marked with dot indicator
- Click any day to select and edit
- Cannot navigate to future dates
- Today marked with amber indicator
- Previous/Next month navigation
- Quick "Today" button

### 3. Dual Reflection Workspace

There are two modes.

Standard Mode:

- Minimal textarea
- Serif writing font
- Max 500 characters
- Remaining character counter
- Save button
- Existing saved text loads when returning to a date

Zero-Energy Mode:

- Hide the normal textarea
- Use tap-first controls
- Brain states: Foggy, Heavy, Numb, Peaceful, Restless
- Focus states: Surviving, Distracted, Resting, Rebuilding
- Grounding label must be:

```text
One physical thing I can see/hear right now:
```

Guide toward 1-3 words gently.

On save, generate `journalEntry` automatically from the selections and also save the raw selections in `rawMadLibData`.

### 4. Local Image Proof

Use this input behavior:

```html
<input type="file" accept="image/*" capture="environment">
```

When an image is selected:

- Load in browser.
- Use an off-screen canvas.
- Cap longest edge at 800px.
- Preserve aspect ratio.
- Export with `canvas.toDataURL("image/jpeg", 0.7)`.
- Store base64 in `proofImageBase64`.

Support preview, remove, and replace.

### 5. Save Behavior

Saving must support:

- Creating a new entry
- Updating existing entry
- Preserving image if only text changes
- Removing image only when explicitly removed
- Reloading saved entry when date changes
- Updating streak/points after successful save
- Showing subtle confirmation

### 6. History View

Show saved entries calmly and chronologically, preferably with a sort toggle.

Each item should include:

- Formatted date
- Journal text
- Thumbnail if photo exists
- Zero-energy indication when applicable

### 7. Zine PDF Export

Use `html2pdf.js`.

Export all logs from IndexedDB as an editorial booklet:

- Cover page title: `BASELINE ZINE`
- Include total logged days
- Include start date
- Include end date
- Sort entries chronologically
- Use elegant serif typography
- Include formatted dates, entry text, and centered photo proof when available
- Use deep margins and book-like spacing

The PDF should feel like a private monthly artifact, not a report.

### 8. Reset Ceremony

Use a modal with cautionary red/amber hierarchy.

It must explain that local journal entries will be wiped.

The mandatory checkbox label must remain exactly:

```text
“I confirm that I have successfully downloaded and verified my monthly Zine PDF booklet.”
```

The final `Wipe All Data` button must be disabled until checked.

On confirmation:

- Clear IndexedDB `dailyLogs`.
- Close modal.
- Refresh UI.

Tone should feel ceremonial and clean, not scary.

### 9. Installable PWA

The app should be installable:

- Manifest
- App name and short name
- Standalone display
- Theme/background color
- Icons
- Service worker app-shell caching

In-app install behavior:

- Capture `beforeinstallprompt` where supported.
- Show install button only when appropriate.
- On iOS/Safari, show concise instructions: `Share → Add to Home Screen`.
- Hide install prompt when already installed.

### 10. Offline-First

There is no backend.

All user data remains local in:

- IndexedDB
- localStorage

No API keys, accounts, analytics, cloud sync, or external data calls should be added unless explicitly requested.

## Design Direction

Use a dark stone-and-amber visual system:

- Backgrounds: `stone-950`, `stone-900`
- Surfaces: `stone-900`, `stone-800`, custom stone equivalents
- Primary text: `stone-100`
- Secondary text: `stone-400`
- Accents: `amber-500`, `amber-600`
- Destructive hierarchy: red and amber

Use sans-serif fonts for app UI and controls.

Use a deep serif font, such as Georgia, for:

- Journaling workspace
- Generated entries
- History text
- Zine/PDF output

Avoid:

- Marketing hero sections
- Decorative gradient blobs or orbs
- Oversized sales-page typography
- Dashboard-style metric overload
- Cards inside cards
- Negative letter spacing
- Text overflow inside controls
- Fake buttons or placeholder flows

The app should feel premium, quiet, and tactile on a phone.

## Accessibility And UX Standards

Preserve:

- Keyboard-friendly controls
- Accessible labels
- Stable button/control dimensions
- Readable contrast
- Mobile-first layout
- No confusing layout shifts
- Clear disabled states
- Clear but gentle confirmation and error states

The app should be usable when the user is low-energy.

## Current File Structure

Expected major files:

```text
src/
  App.tsx
  main.tsx
  styles.css
  types.ts
  lib/
    db.ts
    streaks.ts
    dates.ts
    imageCompression.ts
    zineExport.ts
    pwaInstall.ts
    settings.ts
  components/
    AppShell.tsx
    ImpulseReset.tsx
    CalendarView.tsx
    ReflectionWorkspace.tsx
    CameraProof.tsx
    HistoryView.tsx
    ZineExport.tsx
    ResetCeremony.tsx
    InstallPrompt.tsx
    SettingsPanel.tsx
```

## Development Commands

PowerShell may block `npm`, so prefer `npm.cmd`.

Install:

```powershell
npm.cmd install --cache .\.npm-cache
```

Run dev server:

```powershell
npm.cmd run dev -- --host 0.0.0.0 --port 5173
```

Build:

```powershell
npm.cmd run build --cache .\.npm-cache
```

Local URL:

```text
http://localhost:5173
```

Phone URL is whichever network URL Vite prints, commonly something like:

```text
http://192.168.x.x:5173
```

Computer and phone must be on the same Wi-Fi.

## Important Implementation Notes

- Keep `html2pdf.js` lazy-loaded so the main app bundle stays lighter.
- Keep all journal data local.
- Do not introduce backend services casually.
- Do not change the IndexedDB database/store/key names without migration planning.
- Do not change the localStorage key names.
- Grounding pause is customizable; respect user preferences.
- Calendar is the primary navigation; do not add date pickers or text inputs for dates.
- Do not make Zero-Energy Mode feel like a form audit or productivity checklist.
- Keep the emotional language gentle and grounded.
- If adding features, ask whether they preserve the ritual feeling before adding them.
- Points system removed; only streak is shown to minimize gamification pressure.

## Product North Star

Baseline Journal is not trying to maximize entries, streaks, metrics, or engagement.

It is trying to make it easier for someone to come back to themselves for a few minutes, keep that record privately, and occasionally turn it into a meaningful physical-feeling artifact through the Zine PDF.

When in doubt, choose calm, privacy, and emotional safety over feature density.
