═══════════════════════════════════════════════════════════════════
  📱 HOW TO VIEW ON YOUR PHONE
═══════════════════════════════════════════════════════════════════

3 EASY STEPS:

═══════════════════════════════════════════════════════════════════
  STEP 1: Find Your Computer's IP Address
═══════════════════════════════════════════════════════════════════

When you run:
  npm.cmd run dev -- --host 0.0.0.0

The terminal will show something like:

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/  ← THIS ONE!

Copy the "Network" URL (looks like 192.168.x.x:5173)

OR find it manually:

WINDOWS:
1. Open Command Prompt
2. Type: ipconfig
3. Look for "IPv4 Address" under your WiFi network
4. It will be something like: 192.168.1.100
5. Your URL = http://192.168.1.100:5173

═══════════════════════════════════════════════════════════════════
  STEP 2: Connect Phone to Same WiFi
═══════════════════════════════════════════════════════════════════

1. On your phone, go to Settings
2. Select the SAME WiFi network as your computer
3. It must be the same network!

═══════════════════════════════════════════════════════════════════
  STEP 3: Open Phone Browser
═══════════════════════════════════════════════════════════════════

1. Open Safari (iPhone) or Chrome (Android)
2. In address bar, paste the Network URL
   Example: http://192.168.1.100:5173
3. Press Enter

✅ You should now see Baseline Journal on your phone!

═══════════════════════════════════════════════════════════════════
  🧪 TEST IT OUT
═══════════════════════════════════════════════════════════════════

Try these on your phone:

1. Calendar Grid
   - You should see a month calendar (NEW)
   - Click different days
   - Each day shows the entry status

2. Header
   - Should show only "Streak: 5" (no Points)
   - Top right has gear icon ⚙ (Settings)

3. Tap Gear Icon
   - Opens settings panel
   - Change pause duration (0, 3, 5, or 10 seconds)
   - Toggle "Show on date change"

4. Click a Day with Entry
   - Should load that entry
   - Can edit it
   - Can add photo
   - Can save

5. Try Different Dates
   - With pause enabled, should show countdown
   - Then disappear and show journal form

═══════════════════════════════════════════════════════════════════
  ⚠️ COMMON ISSUES & FIXES
═══════════════════════════════════════════════════════════════════

"Cannot connect to http://192.168.x.x:5173"
→ Phone and computer NOT on same WiFi
  Solution: Ensure both devices connect to same network

"Shows old version (Points still there)"
→ Browser is caching old version
  Solution: Hard refresh on phone (swipe down multiple times)
           Clear browser cache in Settings

"Blank screen"
→ Dev server crashed or not running
  Solution: Check terminal on computer
           Stop (Ctrl+C) and restart: npm.cmd run dev -- --host 0.0.0.0

"Works on computer but not phone"
→ Firewall might be blocking
  Solution: Check Windows Firewall settings
           Allow Node.js through firewall

═══════════════════════════════════════════════════════════════════
  💡 TIPS FOR PHONE TESTING
═══════════════════════════════════════════════════════════════════

✓ Use responsive view in desktop (F12 → Device Toolbar)
  But NOTHING beats real phone testing

✓ Test portrait + landscape modes
  Calendar should adapt to phone width

✓ Test on actual slow connection
  (Inspect → Network → Throttle to 3G)

✓ Test offline mode
  Service worker should cache everything after first load

✓ Test adding entry with phone camera
  Use device's actual camera

═══════════════════════════════════════════════════════════════════
  📍 QUICK REFERENCE
═══════════════════════════════════════════════════════════════════

Computer Terminal shows:
┌─────────────────────────────────────────┐
│ ➜  Local:   http://localhost:5173/      │
│ ➜  Network: http://192.168.1.100:5173/  │
└─────────────────────────────────────────┘
                        ↓
Use THIS URL on phone ──┘

Same WiFi:  ✅ Required
USB Cable:  ❌ Not needed
VPN:        ❌ Might block it

═══════════════════════════════════════════════════════════════════

Need help? Check terminal output for the Network URL!

═══════════════════════════════════════════════════════════════════
