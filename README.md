# Baseline Journal

A private, local-first daily journaling PWA. Write, reflect, and track your journal entries—all data stays on your phone.

## Features

- 📝 **Daily Journaling** – Standard entries & zero-energy reflections (when you're tired)
- 📅 **Visual Calendar** – See at-a-glance which days you journaled (like Forest app)
- 📸 **Photo Proof** – Optional: attach a photo to ground yourself in the moment
- 🧠 **MadLib Prompts** – Guided reflection with Mad Libs-style prompts (brainState, focusState, grounding)
- 🌙 **Grounding Pause** – Customizable moment before saving (0-10 seconds, or skip entirely)
- ⏱️ **Streak Tracking** – Track your journaling consistency (no gamification)
- 🔒 **100% Private** – All data stored locally on your device, never uploaded
- 📴 **Offline First** – Works completely offline, syncs to IndexedDB automatically
- 📱 **Installable** – Add to home screen on iOS/Android for app-like experience
- 📄 **Export to PDF** – Create a "zine" of your journal entries

## Quick Start

### Local Development
```bash
npm install
npm run dev
# Opens http://localhost:5173
```

### Deploy to Vercel
See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for step-by-step instructions (3 minutes).

### Install as Phone App
Once deployed to Vercel:
- **iOS**: Safari → Share → Add to Home Screen
- **Android**: Chrome → Menu → Install App

## Tech Stack

- **React 19** – UI
- **TypeScript** – Type safety
- **Tailwind CSS** – Styling
- **Vite** – Fast build & dev server
- **IndexedDB** – Local data storage (never uploaded)
- **Service Worker** – Offline capability & caching
- **vite-plugin-pwa** – PWA manifest generation

## Project Structure

```
src/
  components/          # React components
    App.tsx           # Main app orchestrator
    CalendarView.tsx  # Month calendar with entry indicators
    SettingsPanel.tsx # Customizable pause duration & visibility
    ReflectionWorkspace.tsx  # Entry editor
    CameraProof.tsx   # Photo capture
    ImpulseReset.tsx  # Grounding pause overlay
    ZineExport.tsx    # PDF export
  lib/
    db.ts             # IndexedDB operations
    dates.ts          # Date utilities
    settings.ts       # User preferences (localStorage)
    streaks.ts        # Streak & stats tracking
    imageCompression.ts # Photo processing
  types.ts            # TypeScript types
  main.tsx            # Entry point
index.html            # HTML shell
vite.config.ts        # Vite config (PWA plugin)
vercel.json           # Vercel deployment config
```

## Data Privacy

🔒 **Your journal is yours alone.**

- All entries, photos, and streak data stored in **IndexedDB** (local to your phone)
- No server backend — nothing is uploaded
- No tracking, no ads, no analytics
- Works 100% offline after first load
- Service worker caches app shell for instant loads

## Troubleshooting

**App won't install on phone?**
- Vercel URL needs HTTPS (automatically provided by Vercel)
- Check DevTools → Application → Manifest (should load without errors)
- Hard refresh (Ctrl+Shift+R on desktop, pull-to-refresh twice on phone)

**Entries not saving?**
- Check DevTools → Application → IndexedDB → "BaselineJournal"
- Try: Clear site data, reload, and re-enter

**Slow initial load in dev mode?**
- This is normal for Vite dev server (compiles on first request)
- Production build (Vercel) will be much faster
- Run `npm run build && npm run preview` to test production speed

## Documentation

- [AGENT.md](./AGENT.md) – Full feature specification
- [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) – Deployment guide
- [PERFORMANCE_TIPS.md](./PERFORMANCE_TIPS.md) – Optimization & troubleshooting
- [PHONE_SETUP.md](./PHONE_SETUP.md) – Local WiFi access (dev only)

## License

Private project. Use freely for personal use.

---

**Ready to journal?** Deploy to Vercel and install on your phone in 3 minutes. See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md).
