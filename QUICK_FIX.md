🚨 QUICK FIX - App Not Updating

The app is showing the OLD version because:
1. Dev server is still serving cached files
2. Browser is caching the old bundle
3. Service worker might be caching old code

⚡ SOLUTION (Choose One):

OPTION 1 - Full Reset (Recommended)
─────────────────────────────────────
1. STOP the dev server (press Ctrl+C in terminal)
2. Clear cache and reinstall:
   npm run build
   npm run preview
3. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
4. Clear localStorage if needed (DevTools → Application → Clear All)

OPTION 2 - Quick Restart
─────────────────────────────────────
1. STOP: Ctrl+C in the terminal
2. START: npm.cmd run dev -- --host 0.0.0.0
3. Hard refresh: Ctrl+Shift+R

OPTION 3 - Complete Fresh Start
─────────────────────────────────────
1. Close browser completely
2. Kill any Node processes (Task Manager if needed)
3. Delete: node_modules/.vite
4. Run: npm.cmd run dev -- --host 0.0.0.0
5. Open fresh browser tab to http://localhost:5173

🔍 WHAT TO LOOK FOR:
─────────────────────────────────────
✅ Calendar appears (grid of days)
✅ Header shows only "Streak" (no Points)
✅ Settings gear icon visible (⚙)
✅ No calendar grid = old version still running

📱 ON PHONE/NETWORK:
─────────────────────────────────────
If accessing from another device:
1. Hard clear browser cache (Settings → Clear Browsing Data)
2. Hard refresh (Ctrl+Shift+R or swipe down refresh multiple times)
3. Or: Open DevTools → Network tab → disable cache → reload

🔧 VERIFY FILE CHANGES APPLIED:
─────────────────────────────────────
Check these files exist:
✓ src/components/CalendarView.tsx (new)
✓ src/components/SettingsPanel.tsx (new)
✓ src/lib/settings.ts (new)

Try: ls -la src/components/ | grep -i calendar

═══════════════════════════════════════════════════════════════════

After restart, you should see:
1. Calendar grid at top (month view)
2. Only "Streak" stat in header (no Points)
3. Gear icon ⚙ to customize pause settings
4. No 10-second delay by default (customizable in settings)

Let me know if you still see Points or old layout after restart!
