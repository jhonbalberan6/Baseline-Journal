# Phone Performance Optimization

## Initial Load Slow? Here's Why & How to Fix:

### Root Causes
1. **Vite dev server cold-start** (first request compiles JS/CSS = 2-5 seconds)
2. **Network latency** over WiFi (adds 200-500ms per request)
3. **Browser cache** mixed with service worker (old code still loading)

### Solutions

#### Step 1: Warm Up the Dev Server (BEFORE phone access)
```bash
# On your desktop, open http://localhost:5173 first
# This triggers Vite compilation so phone doesn't have to wait
# Wait for page to fully load (see "Network" tab done)
# Then access from phone
```

#### Step 2: Clear Phone Cache & Service Worker
On your phone:
- **iPhone**: Settings → Safari → Clear History and Website Data
- **Android**: Settings → Apps → [Browser] → Storage → Clear Cache

Then hard refresh:
- **iPhone**: Swipe down quickly 3 times at top of screen
- **Android**: Ctrl+Shift+R (if using Chrome DevTools) or pull-to-refresh twice

#### Step 3: Connect to 2.4 GHz WiFi (NOT 5 GHz)
- 5 GHz WiFi = shorter range, higher latency over distance
- 2.4 GHz WiFi = better penetration through walls

#### Step 4: Close Other Apps
- Free up device memory
- Stop background processes using WiFi (updates, syncing)

### Expected Load Times
- **Desktop first visit**: 3-5 seconds (Vite compilation)
- **Phone second visit**: 1-2 seconds (cached JS/CSS)
- **Subsequent visits**: <500ms (service worker + local cache)

### Network Debugging
Open DevTools on phone:
1. **Android Chrome**: `chrome://inspect` → DevTools
2. **Safari iOS**: Connect to Mac → Web Inspector
3. Check "Network" tab → sort by "Waterfall"
4. Look for large files (should be <500KB total)

### Disabled Features That Would Slow Down
- ✅ html2pdf lazy-loaded (only on export)
- ✅ Image compression happens on save (not on load)
- ✅ Service worker caches after first visit

### If Still Slow After These Steps
1. Check if WiFi signal is weak (try moving closer)
2. Run `npm run build` then `npm run preview` for production-speed test
3. Report exact timing: how many seconds does blank page appear?
