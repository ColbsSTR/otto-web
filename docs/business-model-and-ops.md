# Otto — freemium architecture, revenue plan & automated ops

*July 12, 2026. Method: 3 researchers (2025–26 subscription economics via RevenueCat/Adapty state-of-industry data; competitor paywall teardowns as of July 2026; solo-founder ops automation), 3 competing paywall architectures (including the founder proposal steelmanned as a "glass paywall" design), 2 adversarial judges. Both judges independently converged on the same verdict and near-identical recommended blends.*

---

## 1. Verdict on the proposal (templates + auto-counting free, ALL metrics/data paid)

**Not viable as literally stated — but half right, and the fix keeps your instinct intact.**

**The half that's right:** counting is a commodity (Motra free-tier, Apple 1–2 cycles from sherlocking it) and interpretation is the product. Metrics-behind-paywall is the validated pattern of every close analog: Athlytic, Gentler Streak, Bevel, Strong's charts, Whoop's bundling — *pay for the interpretation, never the record.* And free templates + uncapped auto-detection **strictly dominates Motra's real free tier** — which is not actually free: it's ~180 of 470 exercises, 7-day history, 2 templates, with $5.99–17.99/mo SKUs behind it, and an accuracy-complaint review stream. "We never cap detection, and corrections are never paid features" is the anti-Motra weapon.

**What breaks, specifically:**

1. **"ALL data locked" fails the competitive envelope.** Strong gives full history free forever; Hevy gives ~3 months. An *auto*-tracker with no free history reads worse than free *manual* loggers, and walks into the data-hostage / bait-and-switch review narrative in a category already running a 4.71% refund rate — reviews a solo founder cannot outspend.
2. **It starves the moat.** The correction flywheel needs free users opening, reviewing, and correcting sessions every evening. Every session a free user can't see is a labeled IMU/truth pair Otto never collects. **Free history is data acquisition, not generosity.** Edit-pass completion >60% is the company KPI; a full data lock taxes it directly.
3. **The conversion psychology is backwards.** Every high-converting pattern in the benchmark data involves *prior possession* of the value: value-moment paywalls convert 2.1× immediate ones (65% vs 31%, Adapty 2026); 17–32-day trials convert 42.5% vs 25.5% for short ones; reverse trials work explicitly via loss aversion. There is no evidence anywhere in the research that a permanently blurred, never-experienced number converts. **You can't crave a number you've never seen; you grieve one that was taken away.**
4. **Effort is uncalibrated for much of year 1.** Locking all metrics means charging for a number that's still wrong — the never-sell-a-calibrating-metric guardrail exists because that's precisely Motra's failure mode.

**The survivable version of your instinct:** FREE = *the record*. PAID = *every interpretation of the record* — after every user has lived with the full metric layer for 21–28 days.

---

## 2. The recommended architecture

(Both judges' blend: the contrarian design's free tier + the founder design's simple fixed-clock trial + the flywheel-first design's Quality mechanic — with each design's signature gimmick deleted: no glass-blurred cards, no variable calibration trial clock, no token meter.)

### Free forever — "the record"
- **Uncapped** automatic exercise detection + set/rep/rest counting, all exercises
- Full evening edit pass, corrections, exercise naming — *marketed*: "corrections and accuracy are never paid features"
- **Unlimited templates/routines** (the category's most-hated cap, given away)
- **Full raw workout history, forever** (Strong-style; the history gate monetizes almost nobody at D30 retention of 3–6%, while free history is a trust weapon and pure label-volume acquisition)
- **Quality score on every session** — the one validated metric — *finalizing when the user confirms the session in the edit pass* (seeing your score and feeding the flywheel become the same action, 3–4×/week)
- Apple Health write **including HKWorkoutEffortScore** (the Apple-complement hook and the Featuring pitch)
- Any metric still labeled "calibrating" is visible free, with its ±error — for everyone

### Trial — fixed 21–28-day full-Pro reverse trial
- Day-0 **transparency pricing screen** (not a gate) — 82–86% of all trial starts happen on Day 0; capture intent without blocking
- No card required; full metric layer live from install (calibration story lives in the copy, not in custom entitlement state)
- On expiry: Pro cards **grey out showing the user's last real values** (loss-aversion rendering, never frosted mystery numbers)

### Pro — $49.99/yr anchor (default-selected), $7.99/mo decoy, no weekly ever
- Calibrated Effort + per-exercise baselines — **each metric moves behind the paywall only after it graduates calibration (ρ≥0.6)**; the paywall literally grows as accuracy is proven, and graduation events double as content + upgrade moments
- Velocity-loss zones + in-set auto-regulation (sold as coaching outcome; never "VBT," never m/s)
- Session Load; per-muscle Stimulus + weekly report; e1RM + all long-horizon trends; CSV export (one-time GDPR takeout always free); readiness later under the same graduation rule
- **Founders Lifetime $99** — hard cap 250, beta + waitlist only, retired by month 6 (~$5–8k runway cash; capped so it can't cannibalize the annual cohort)
- Launch intro: $39.99/yr for the waitlist wave

### Mechanics & guardrails
- RevenueCat cancellation/expiration webhooks → automated win-back email with discounted **web checkout** (skips Apple's 15%)
- Hold the paywall until **D7 ≥ 30% AND Effort ρ ≥ 0.6** — the ρ gate is a *revenue* gate: selling a wrong number into a 4.71%-refund category is the one unrecoverable mistake
- **Kill-switch hierarchy:** if blended edit-pass completion <60% for 2 months, loosen paid gates — never touch the free record. The flywheel outranks the margin.
- Experiment backlog (only if downgrade conversion <1.5–2%): metered "insight tokens," history-window gates — test via RevenueCat A/B, don't ship at launch

---

## 3. Revenue, step by step

**Phase 0 (now → wk 8): no paywall.** Calibration beta, correction volume, content cadence starts (this is when the funnel is built, not at launch). File the App Store **Featuring nomination** at wk 8–10 (6–8 weeks pre-launch): the pitch is Apple-flattering — Otto fills the strength gap in Apple's own Training Load by writing effort scores, novel on-wrist ML, indie originality.

**Phase 1 (wk 8–16): instrument and gate.** Five dashboards live (below). Hit D7≥30% + ρ≥0.6. Founders Lifetime $99 offered to beta + waitlist (~$5–8k one-time cash).

**Phase 2 (wk 16, launch): switch on the model.** Free tier as scoped; 21–28-day reverse trial; $39.99 intro annual → $49.99. 300–500 waitlist wave + organic content installs.

**Phase 3 (post-launch): compounding.** Win-back automation; referral = 1 free month per converted friend (expect K≈0.2–0.5 — treat as CAC reduction, never an engine); paid creator amplification *only* for the 3–5 creators whose gifted posts demonstrably drove installs ($200–800/post + fitness premium); coach/team tier ($15/athlete/mo) once identity + plans are solid — coaches are who actually pays for velocity-loss zones.

**The numbers to plan on (all-organic; paid UA is permanently off the table — $45–58 cost per paying sub vs $16–36 H&F year-1 LTV/payer):**

| Case | Assumptions | M12 MRR (net of 15%) |
|---|---|---|
| Budget (median execution) | 6–9k installs yr-1, ~2% blended conversion | **$700–1,500** |
| Good execution | 12–16k installs, 2.5–3%, content engine actually runs | $2–2.5k |
| Bull (not a plan) | top-quartile 6% conversion (needs certified Effort) AND a distribution event (Featuring/viral) | $4–6k |

Plus: cash collected runs ~2× recognized MRR during ramp (annual-heavy prepay, 68% of H&F revenue is annual) + the Founders cash. **Breakeven is ~8–10 annual subs** ($150–500/mo total costs), so even the bear case survives.

**Churn discipline:** 35% of annual cancellations happen in month 1 → the first 30 paid days must ship visible wins (weekly Stimulus report, e1RM movement, a graduation event). ~65–72% of annual subs don't renew at year 1 → model year 2 at ~30% renewal unless the product visibly improved mid-year (calibration improving is your renewal story). Reserve 5% for refunds.

**The framing that matters:** year 1 is a **corpus year, not a revenue year**. The success metrics for months 1–12 are labeled correction pairs, edit-pass completion, and D7 — MRR is the lagging confirmation. Every decision that trades label volume for near-term MRR sells the moat to rent a milestone.

---

## 4. Running it automated (solo founder)

**The one thing that can't be automated is the thing that decides the outcome:** founder-face distribution. Indie consensus is 80% marketing / 20% building; the realistic time budget is ~35 hrs/wk with 15–20 on growth/content. Every ops hour saved below should convert into content hours, not code hours.

### Automate (the stack, ~$150–500/mo total at 0–10k users)
- **Money:** RevenueCat (free to $2,500 MTR, then 1%) — paywalls, A/B experiments, charts, webhooks, win-backs in one tool. Skip Superwall until >1,000 paywall impressions/mo. StoreKit 2 `showManageSubscriptions` + `beginRefundRequest` sheets in-app so **billing and refund tickets go to Apple, not you** (only Apple can issue IAP refunds anyway).
- **Support:** docs + FAQ first; AI support agent ($0.29–0.99/resolution, realistic 42–50% deflection) only once volume exceeds ~10 tickets/day. Policy that kills a whole ticket class: "all refunds via Apple; corrections and accuracy fixes are always free." Budget 2–4 hrs/wk.
- **Analytics ($0):** PostHog free tier (1M events/mo, replays, flags, experiments) + RevenueCat charts. Exactly five dashboards: (1) revenue/trials/refunds; (2) activation funnel: install → first auto-logged workout → first edit pass → D7 return; (3) **moat health: edit-pass completion % + corrections/user**; (4) retention cohorts by channel (gates the paywall); (5) paywall experiments. Resist adding more until 10k users.
- **Releases:** fastlane + App Store Connect API, 7-day phased releases; the Python↔Swift parity suite pinned in CI.
- **Reviews:** AppFollow free rule for positive auto-replies; negative reviews get founder replies (those are content, not tickets).
- **Legal (~$72–240/yr, templated):** Termly/iubenda; GDPR Art. 9 explicit consent for health data; Apple 5.1.3 constraints that shape architecture — no HealthKit-context data to ad SDKs ever (SKAdNetwork only), no health data in iCloud, no false HealthKit writes.

### Do personally (non-delegable)
- **Short-form video, 4–6×/wk for 8+ weeks before expecting traction.** Otto's native formats: wrist-cam auto-logging demos, and *honesty content* — "it miscounted my set, here's the edit pass teaching it" turns the calibration story into the brand. The build-in-public accuracy dashboard is the recurring series.
- **Reddit** (r/AppleWatch, r/weightroom, r/fitness): 10:1 helpful-to-plug ratio, presence starting ~3 months before launch; the accuracy-dashboard posts are the Reddit-safe material.
- **Influencer seeding during beta:** gift lifetime Pro to 30–50 lifting creators (10K–100K followers) — zero cash, their corrections feed the flywheel, and it pre-seeds launch coverage. Written expectations; track with referral codes, not promises.
- **8–12 beta interviews** and the App Review relationship.

### One beta-ops landmine
TestFlight **public links anonymize testers** — you can't pair a public-link tester's corrections with their identity. The 50-user calibration beta must use email-invited builds (or in-app account linkage) or the calibration cohort can't be stratified.

---

## 5. The three numbers on the company dashboard

1. **Edit-pass completion rate** (>60% of sessions) — the moat's fuel gauge and the anti-churn habit, one metric.
2. **D7 retention** (≥30% gates the paywall).
3. **Labeled correction pairs/week** — the corpus the year is actually buying.

MRR is the fourth number, and it's a lagging one.
