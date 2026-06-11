# Deploy Baseline Journal to Vercel

## Quick Start (3 minutes)

### 1. Prerequisites
- GitHub account (free)
- Vercel account (free)
- Git installed locally

### 2. Create Public Folder with Icons
Run this in terminal at project root:
```bash
mkdir -p public
```

The app will work without custom icons (fallback to browser defaults), but for best PWA experience:
- Place `pwa-192.png` (192×192) in `public/` folder
- Place `pwa-512.png` (512×512) in `public/` folder  
- Place `apple-touch-icon.png` (180×180) in `public/` folder

For now, skip icons — Vercel will deploy fine without them.

### 3. Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Baseline Journal PWA"

# Create a new repo on github.com, then:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/baseline-journal.git
git push -u origin main
```

### 4. Deploy to Vercel

Option A: **Web UI (Easiest)**
1. Go to https://vercel.com/new
2. Click "Import Project"
3. Paste: `https://github.com/YOUR_USERNAME/baseline-journal`
4. Click "Import"
5. Environment: Leave defaults (framework auto-detected as Vite)
6. Click "Deploy" — Wait 2-3 minutes ✨

Option B: **Vercel CLI**
```bash
npm i -g vercel
vercel
# Follow prompts, answer yes to deploy
```

### 5. Verify Deployment
- Visit: `https://your-project-name.vercel.app`
- Should load instantly (much faster than dev server!)
- Check for "Install" button in browser address bar (iOS/Android)

### 6. Install as App on Phone

**iOS:**
1. Open Safari → go to your Vercel URL
2. Tap Share → "Add to Home Screen"
3. Name it "Baseline" → Add
4. Tap icon on home screen → App opens fullscreen ✓

**Android:**
1. Open Chrome → go to your Vercel URL
2. Tap ⋮ (menu) → "Install app"
3. Confirm → App installs to home screen ✓

---

## Troubleshooting

### "Install button not showing?"
- Open DevTools (F12) → Application → Manifest
- Check: `manifest.json` loads without errors
- Check: Service worker registered (show green ✓)
- Try: Hard refresh (Ctrl+Shift+R), then close/reopen

### "App crashes after install?"
- Check: No console errors in DevTools
- Check: All journal entries still exist (local IndexedDB)
- Solution: Clear site data → reinstall

### "Vite PWA plugin not generating manifest?"
- Run `npm run build` locally
- Check: `dist/manifest.json` exists
- If missing: Check vite.config.ts for errors

---

## What Gets Deployed

✅ **Deployed (fast, always updated):**
- React app (compiled to static files)
- Service worker (caches for offline)
- PWA manifest (enables app install)
- Tailwind CSS (production-optimized)

✅ **Stays Private (never uploaded):**
- All journal entries (stored in phone's IndexedDB)
- Photos taken (stored in phone's IndexedDB)
- Streak data (stored in phone's IndexedDB)
- Settings (stored in phone's localStorage)

**Nothing goes to a server.** Your data lives 100% on your phone. 🔒

---

## Custom Domain (Optional)

After deploying:
1. Vercel dashboard → Your project → Settings → Domains
2. Add your custom domain (e.g., `journal.yourdomain.com`)
3. Update DNS records (Vercel shows instructions)

---

## Next Steps

1. ✅ Install on phone as app
2. ✅ Test: Create a journal entry, take a photo, check calendar
3. ✅ Test offline: Disconnect WiFi, app still works ✓
4. ✅ Uninstall dev server (can delete `npm run dev` now)

Questions? Check `/AGENT.md` for full feature documentation.
