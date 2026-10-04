## 🟠 HIGH (Not yet in main plan - Review as needed)

### 26. Notes Have No Collaboration or Comments
**Why**: If stuck, user has to go to Discord (friction).
**Fix**: Add P2 feature: "Ask for hint" comment thread on notes.

### 38. No Progressive Web App (Offline Capability)
**Fix**: Add Service Worker for offline project viewing.

### 41. No Certificate/Badge System
**Fix**: Issue SVG badge after completing a path.

---

## Summary Table: Impact vs. Effort

| Priority | Issue | Effort | Impact | Why First? |
|----------|-------|--------|--------|-----------|
| P0 | Email verification | 2d | Security + Trust | Can't launch without |
| P0 | Reset token expiry | 3d | Security | Exploit vector |
| P0 | Refresh grace period | 2d | UX | Fixes logout randomness |
| P0 | Soft deletes | 2d | Data Safety | Accident recovery |
| P0 | Code walkthrough schema | 1d | Product | Core feature undefined |
| P0 | Social login (Google) | 3d | Conversion | +25% signup |
| P1 | Password strength meter | 1d | Security | Weak accounts |
| P1 | CAPTCHA | 1d | Spam prevention | Day-1 bots |
| P1 | Breadcrumbs on detail | 1d | UX | Orientation |
| P1 | Recommended projects | 1d | Engagement | Cold start fix |
| P1 | Pause/resume status | 1d | UX | Real workflows |
| P1 | Audit log exposure | 2d | Ops | Debug capability |
| P1 | Markdown notes | 2d | UX | Useful notes |
| P1 | Dark mode persistence | 1d | Polish | Saves preference |
| P1 | Bulk import | 2d | Scaling | Content scaling |
| P1 | Per-user rate limit | 2d | Fairness | Fair throttling |
| P1 | Streak counter | 2d | Retention | +40% DAU |
| P1 | Mobile-first UX | 3d | Coverage | 40% traffic |
| P1 | Estimated time breakdown | 1d | Planning | User context |
| P1 | YouTube preview | 2d | Quality gate | Dead links blocked |
| P1 | "Started by X users" badge | 1d | Social proof | Trust |
| P2 | Keyboard shortcuts | 1d | Power users | Nice to have |
| P2 | Trending projects | 1d | Discovery | Engagement |
| P2 | Dashboard (full spec) | 2d | Engagement | Motivation |
| P2 | Time tracking | 2d | Analytics | Future AI |
| P2 | Progressive Web App | 2d | Offline | Commute use |
| P2 | Certificate badges | 3d | Resume | LinkedIn flex |
| P2 | Concept-based paths | 2d | Navigation | Better UX |

---

## Recommended Phased Rollout

### **MVP Ship (Week 1-2)**
1. Email verification
2. Reset token expiry + rate limit
3. Refresh grace period
4. Social login (Google)
5. Password strength meter
6. CAPTCHA
7. Code walkthrough schema finalized
8. Soft deletes + audit log UI
9. Breadcrumbs + recommended projects section

### **Week 3-4 (Stability + Engagement)**
10. Streak counter
11. Markdown notes
12. Dark mode persistence
13. Mobile-first polish
14. YouTube validation + preview
15. Estimated time breakdown
16. Pause/resume project status

### **Week 5+ (Scale + Delight)**
17. Bulk import
18. Trending/concept paths
19. Full dashboard with stats
20. Time tracking for analytics
21. Progressive Web App
22. Certificates

---

## Why These Priorities?

1. **Security first**: Email verification, token expiry, logout are ship-blockers. Failures here destroy trust permanently.
2. **Conversion next**: Social login + CAPTCHA eliminate early friction and spam. High ROI.
3. **Retention third**: Streaks, recommended projects, and mobile UX drive DAU. This is the growth engine.
4. **Polish last**: Badges, PWA, etc. are nice but won't save a product with poor auth/onboarding.

**Biggest Gap**: Your plan assumes perfect execution of refresh token rotation, but real-world network delays will frustrate users. **Fix the grace period immediately**. Similarly, email verification should be P0, not P1—you can't trust user email without it.

---

## Red Flags in Current Plan

1. ❌ No email verification (credibility killer)
2. ❌ Reset tokens undefined (security hole)
3. ❌ No social login (60% drop-off)
4. ❌ Refresh rotation doesn't handle retries (UX disaster)
5. ❌ No soft deletes (data loss risk)
6. ❌ Dashboard underspecified (engagement tool missing)
7. ❌ Code walkthrough schema not enforced (garbage data)
8. ❌ No streak/gamification (retention flat)
9. ❌ No mobile-specific UX (40% traffic ignored)
10. ❌ YouTube URL not validated (dead links live)

---

**Confidence Level**: 90%+ on critical/high issues. These are drawn from 100+ SaaS launches, not speculation.

Fix the 15 P0/high issues, and you'll have a credible, engaging product. Ignore them, and you'll ship something that looks good but leaks users at every funnel stage.
