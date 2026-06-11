# Step-by-Step: Deploy Baseline to Vercel & Install on Phone

## Goal
Host your journaling app online so you can install it as an app on your phone. Your data stays 100% private (only on your phone).

---

## Step 1: Push Code to GitHub (5 minutes)

### 1a. Install Git (if needed)
- Download from https://git-scm.com/downloads
- Run installer → click "Next" through all prompts

### 1b. Open Terminal in Your Project Folder
- Right-click in: `C:\Users\jhon\Desktop\Baseline Journal`
- Click "Open in Terminal"

### 1c. Initialize Git & Commit
Copy-paste each command (one at a time) into the terminal:

```bash
git init
git add .
git commit -m "Initial commit: Baseline Journal PWA"
```

### 1d. Create GitHub Repository
1. Go to https://github.com/new
2. Name: `baseline-journal`
3. Skip all other options → Click "Create repository"
4. You'll see a screen with git commands

### 1e. Push to GitHub
Copy the commands from GitHub (starts with "git branch -M main") and paste into your terminal:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/baseline-journal.git
git push -u origin main
```

**Expected output:**
```
...
* [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## Step 2: Deploy to Vercel (3 minutes)

### 2a. Go to Vercel
- Visit https://vercel.com/new
- If prompted, sign up with GitHub (one-click)

### 2b. Import Your Repository
1. Click "Import Project"
2. Paste your GitHub URL: `https://github.com/YOUR_USERNAME/baseline-journal`
3. Click "Continue"

### 2c. Configure (Use Defaults)
- **Framework**: Should auto-detect "Vite" ✓
- **Root Directory**: `.` (already set) ✓
- Everything else: Leave as-is

### 2d. Deploy
1. Click "Deploy"
2. **Wait 2-3 minutes** — Vercel builds your app ⏳

### 2e. Success! 🎉
You'll see: "Congratulations! Your project has been successfully deployed."

Click the **URL at the top** (looks like `https://baseline-journal-abc123.vercel.app`)

---

## Step 3: Verify It Works (1 minute)

### 3a. Open Your App
- Click the Vercel URL from Step 2e
- Should load **instantly** (way faster than dev server!)
- You'll see the calendar with your previous entries (all data is local) ✓

### 3b. Check Installation Prompt
- Look for "Install" button in browser address bar (iOS/Android)
- Or look for the Baseline logo in the top-left corner

---

## Step 4: Install as App on Your Phone (2 minutes)

### iOS (iPhone/iPad)

1. Open **Safari** → Go to your Vercel URL
2. Tap **Share button** (arrow pointing up-right)
3. Scroll down → Tap **"Add to Home Screen"**
4. Name: `Baseline` (already filled) → Tap **"Add"**
5. App icon appears on home screen ✓

**That's it!** Tap the icon to open as fullscreen app.

### Android (Chrome)

1. Open **Chrome** → Go to your Vercel URL
2. Tap **⋮ menu** (three dots, top-right)
3. Tap **"Install app"**
4. Confirm → App installs to home screen ✓

**That's it!** App opens fullscreen, just like a native app.

---

## Step 5: Test Your App (2 minutes)

Once installed, test these features:

✅ **Create entry** – Write something, take a photo, save
✅ **Calendar** – See the entry on the month calendar
✅ **Offline** – Turn off WiFi, app still works
✅ **Streak** – Check the streak count in top-left
✅ **Settings** – Tap gear icon → customize pause delay

---

## What's Deployed

### ✅ On Vercel (Public, ~50 KB)
- Your app code (React, calendar, forms)
- Service worker (enables offline)
- PWA manifest (enables app install)

### ✅ On Your Phone (Private, ~500 KB)
- **Journal entries** (IndexedDB)
- **Photos** (IndexedDB)
- **Streak data** (IndexedDB)
- **Settings** (localStorage)

**Nothing is uploaded to a server.** Your data lives entirely on your phone. 🔒

---

## Troubleshooting

### "Install button not showing?"
1. Make sure you're using HTTPS (Vercel provides this automatically)
2. Hard refresh: Ctrl+Shift+R (desktop) or pull-to-refresh twice (phone)
3. Check DevTools → Application → Manifest (should show no errors)

### "Entries are gone?"
- Your entries are stored in **IndexedDB** on your phone (not on Vercel)
- They're completely separate from the deployed app code
- Clear browser cache does NOT delete IndexedDB (safe!)

### "App crashed?"
1. Close the app completely
2. Reopen
3. Check browser DevTools (F12) for error messages
4. If red errors appear, let me know the exact error text

### "Slow to load?"
- Vercel is much faster than dev server (usually <1 second)
- If still slow: Check WiFi signal strength

---

## Next: Custom Domain (Optional)

Once everything works, you can use your own domain:

1. Buy domain (e.g., `journal.yourdomain.com`) — Namecheap, GoDaddy, etc.
2. In Vercel dashboard → Your project → Settings → Domains
3. Add your domain
4. Update DNS records (Vercel shows instructions)

---

## Questions?

- Full feature list: See `/README.md`
- Architecture details: See `/AGENT.md`
- Performance tips: See `/PERFORMANCE_TIPS.md`

**You're all set!** 🎉 Your private journaling app is now on your phone.
