# Cookie Consent & Google Consent Mode v2 Implementation

## ✅ Verification Checklist

### 1. **Custom Banner Implementation** ✅
- [x] Custom-built consent banner (not third-party CMP)
- [x] Full control over UI/UX and consent logic
- [x] Branded to match site design
- [x] Component: `src/components/CookieConsent.astro`

### 2. **Consent Mode Setup** ✅
- [x] Google Consent Mode v2 implemented
- [x] Default consent set BEFORE gtag.js loads (critical timing)
- [x] Consent defaults in `<head>` synchronously
- [x] gtag.js loads async AFTER consent defaults

### 3. **Manual gtag.js Implementation** ✅
- [x] Consent code added to head via `astro.config.mjs`
- [x] Custom HTML with direct gtag() commands
- [x] No GTM dependency

### 4. **Regional Scoping** ✅
- [x] Different defaults for GDPR vs non-GDPR regions
- [x] GDPR regions (EU): analytics_storage = 'denied' by default
- [x] Non-GDPR regions: analytics_storage = 'granted' by default
- [x] Preserves measurement quality in non-GDPR regions
- [x] Detection via timezone (proxy for region)

### 5. **Timing & Execution Order** ✅

**Correct Load Order:**
```
1. Consent Mode Default (synchronous, in <head>)
   ↓
2. gtag.js Script Load (async)
   ↓
3. GA4 Config (gtag('config', ...))
   ↓
4. Page Body Loads
   ↓
5. CookieConsent Component (UI + consent update logic)
   ↓
6. User Interacts with Banner
   ↓
7. gtag('consent', 'update', ...) - instant update
```

**Key Points:**
- ✅ Consent default ALWAYS runs before gtag.js
- ✅ No race conditions
- ✅ gtag() commands in callbacks use consent APIs (not Custom HTML)
- ✅ Consent state available immediately

## 🏗️ Architecture

### File Structure
```
kyc-docs-site/
├── astro.config.mjs              # Consent mode initialization + gtag.js
├── src/
│   └── components/
│       ├── CookieConsent.astro   # Banner UI + consent logic
│       └── overrides/
│           ├── PageFrame.astro   # Global component wrapper
│           └── Footer.astro      # Cookie settings link
```

### Data Flow

1. **Head (astro.config.mjs)**
   ```javascript
   // Sync script - executes immediately
   gtag('consent', 'default', {
     analytics_storage: isGDPR ? 'denied' : 'granted',
     // ... other consent types
   });
   ```

2. **Body (CookieConsent.astro)**
   ```javascript
   // Read stored consent
   if (consent) {
     gtag('consent', 'update', { analytics_storage: 'granted' });
   } else if (isGDPRRegion) {
     showBanner();
   }
   ```

3. **User Action**
   ```javascript
   // User clicks "Accept"
   gtag('consent', 'update', { analytics_storage: 'granted' });
   localStorage.setItem('cookie_consent', { analytics: true });
   ```

## 🌍 Regional Behavior

### GDPR Regions (EU/EEA/UK)
- **Default**: Analytics denied
- **Banner**: Shown on first visit
- **User**: Must explicitly consent
- **Tracking**: Only after consent

### Non-GDPR Regions (US, India, etc.)
- **Default**: Analytics granted
- **Banner**: Not shown (implicit consent)
- **User**: Can opt-out via footer link
- **Tracking**: Immediate, full measurement

### Detection Method
```javascript
function isGDPRRegion() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const euTimezones = ['Europe/', 'Atlantic/Reykjavik', ...];
  return euTimezones.some(zone => tz.startsWith(zone));
}
```

**Note**: Timezone is a proxy, not 100% accurate (VPNs, edge cases). For production at scale, consider:
- IP geolocation (Cloudflare, MaxMind)
- `navigator.language` heuristics
- First-party geolocation API

## 🔒 Consent Types Configured

| Consent Type | Default | Purpose |
|--------------|---------|---------|
| `ad_storage` | denied | Ad cookies (N/A for us) |
| `ad_user_data` | denied | User data for ads (N/A) |
| `ad_personalization` | denied | Ad personalization (N/A) |
| `analytics_storage` | **GDPR: denied, Other: granted** | Google Analytics |
| `functionality_storage` | granted | Site functionality |
| `personalization_storage` | denied | Personalization (N/A) |
| `security_storage` | granted | Security features |

## 📊 Google Analytics Configuration

```javascript
gtag('config', 'G-G986QLPFZ1', {
  'anonymize_ip': true,           // IP anonymization for privacy
  'cookie_flags': 'SameSite=None;Secure'  // Secure cookies
});
```

## 🎨 User Experience

### First Visit (GDPR Region)
1. Page loads, consent denied
2. Banner appears at bottom
3. User sees: Accept All | Settings | Reject
4. Choice saved in `localStorage`
5. Consent mode updated instantly

### First Visit (Non-GDPR Region)
1. Page loads, consent granted
2. No banner shown
3. Analytics tracks immediately
4. Footer has "Cookie Settings" link for opt-out

### Return Visit
1. Page loads
2. Reads `localStorage`
3. Applies saved consent
4. No banner (unless user clears storage)

## 🧪 Testing Checklist

### Manual Testing
- [ ] Open in incognito (fresh state)
- [ ] Verify banner shows in EU timezone
- [ ] Click "Accept" → banner disappears, GA tracks
- [ ] Click "Reject" → banner disappears, no GA tracking
- [ ] Click "Settings" → modal opens, toggle works
- [ ] Footer link → modal reopens
- [ ] Close browser, reopen → consent persisted
- [ ] Check DevTools → `localStorage['cookie_consent']` exists
- [ ] Check Network → GA requests only after consent

### Google Analytics Testing
1. Real-Time Reports in GA4
2. Check "Consent" dimension in reports
3. Verify `analytics_storage` state
4. DebugView for consent events

### Consent Mode Verification
```javascript
// In browser console
window.dataLayer
// Should show consent commands before config
```

## 📜 Compliance

### GDPR Requirements Met
- [x] Explicit opt-in for GDPR regions
- [x] Granular consent controls
- [x] Easy to access and modify (footer link)
- [x] Clear information about cookies
- [x] Consent stored locally (user privacy)
- [x] No tracking before consent (GDPR regions)

### Additional Standards
- [x] ePrivacy Directive (Cookie Law)
- [x] Google Consent Mode v2 (March 2024 requirement)
- [x] ICO Guidelines (UK)
- [x] CNIL Guidelines (France)

## 🚀 Deployment

```bash
npm run build
./deploy.sh deploy
```

Live: https://javajack.github.io/broking-kyc/

## 🔧 Maintenance

### Update Consent Settings
Edit `astro.config.mjs` head section.

### Change GDPR Detection
Update `isGDPRRegion()` function in `astro.config.mjs`.

### Modify Banner UI
Edit `src/components/CookieConsent.astro`.

### Add More Cookie Categories
1. Add toggle to Settings modal
2. Add consent type to `gtag('consent', 'default', ...)`
3. Update consent update logic

## 📚 References

- [Google Consent Mode v2 Docs](https://developers.google.com/tag-platform/security/guides/consent)
- [gtag.js Developer Guide](https://developers.google.com/tag-platform/gtagjs/reference)
- [GDPR Official Text](https://gdpr-info.eu/)
- [ICO Cookie Guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/)

---

**Implementation Date**: 2026-02-17
**Consent Mode Version**: v2
**GA4 Measurement ID**: G-G986QLPFZ1
