# Otto — parting advice & the blind spots we haven't dug into

*July 12, 2026. The final synthesis: what's been validated, what hasn't been examined deeply enough, and the advice that matters most. Companion docs: `mvp-audit-and-roadmap.md`, `rep-detection-first-principles-audit.md`, `business-model-and-ops.md`.*

---

## 0. New intelligence (verified July 2026) — the window just narrowed

Two facts surfaced in a final competitive sweep that change the urgency calculus:

1. **Whoop shipped automatic strength detection in 2026** ("Passive MSK" — auto exercise detection built on their 2023 Strength Trainer, which claimed 97% repeatability across 10k+ reps in-lab). The new passive layer is **publicly unvalidated** and wrist-based with acknowledged lower-body weakness — but the "auto-tracked lifting" narrative is no longer Otto + Motra's alone.
2. **FORT (YC W2026, ex-Tesla engineers) is Otto's exact thesis as hardware**: screenless wrist wearable, auto-detects 50+ exercises, counts reps/sets/rest, measures rep velocity, and sells **proximity-to-failure via velocity loss against a personal baseline** — Otto's Effort metric, almost verbatim. $289 pre-order / $349 retail, ships **Q3 2026**, with a "Fort Premium" analytics subscription on top.

**Read this correctly — it's mostly good news:**
- FORT is *thesis validation by smart money*: YC + ex-Tesla engineers independently concluded velocity-loss-from-the-wrist is the product. You are not crazy.
- FORT *repriced the market for you*: they must convince lifters to spend $289–349 + subscription on a second wearable. Otto's pitch is "the watch you already own, $0 hardware." That is now the loudest line in your positioning, ahead of even "no logging."
- FORT validates the business model: hardware + paid analytics = everyone agrees interpretation is what's paid for.
- But the **launch window is now real**: FORT ships Q3 2026, Whoop's passive detection is live, Apple is 1–2 cycles away. The week-16 launch target in the roadmap is no longer just a plan — it's a competitive deadline. Every week of slip has a price now.

---

## 1. The blind spots — ranked by probability they kill the company

### #1 — Generalization beyond N=1 (existential; unexplored by any doc so far beyond a flag)
Every accuracy number Otto has — 96% set recall, ±1 rep at 87% — is **one lifter, one watch, one wrist**. Wrist circumference, watch snugness, left vs right wrist, ROM differences, grip style, tempo culture (powerlifters vs bodybuilders vs CrossFit) are all unmeasured axes.
**The action: run the Stranger Test within 2 weeks.** 5–10 people you don't train with, zero parameter tuning, measure set recall + rep MAE. If recall holds ≥85%, the roadmap stands. If it drops to 70%, *everything reorders* — and you want to know that before building another feature, not after inviting 50 beta testers. This is the single highest-information-per-dollar experiment available to the company.

### #2 — Exercise classification is designed but validated only at N=1, coarse-grained
*(Corrected 2026-07-12: an earlier version of this doc said "no design doc exists" — wrong. `VisualVectors/docs/exercise_classification.md` + `ml_roadmap.md` contain a full three-problem framing, a tested 6-feature fingerprint (83% family-level LOO, squat variants don't separate), run-based template alignment (88% vs 38% naive), and a shipped name-once suggester + label flywheel.)*
The real gaps: variant-level identity (squat flavors collide), same-posture adjacent exercises merging runs, supersets/reorder, and — the big one — zero cross-user evidence. Cold-naming 50+ exercises across unseen users (FORT's claim) is a big-corpus ML problem the flywheel is designed to feed; the tested plan-prior approach ("your plan says bench next") already covers the MVP. See `exercise-classification-first-principles-audit.md` for the deep audit.

### #3 — Battery & watchOS runtime budget (never measured)
50 Hz CMDeviceMotion for a 60–90 min session inside an HKWorkoutSession, plus on-device processing. Motra proves it's feasible; battery complaints are still a top review theme in this category.
**The action: a one-day test on real hardware, early.** Instrument a full session; set the budget now (target: <20%/hr total watch drain during a session, processing amortized). If it fails, the fix (buffered batch processing at set boundaries instead of continuous) changes the architecture — cheaper to know before the sync layer is built.

### #4 — The liability line on auto-regulation advice (unexamined)
"Stop the set," overreach warnings, readiness scores — this is coaching output that edges toward health advice. The general-wellness carve-out (FDA + Apple 5.1.3) protects you **as long as claims stay fitness-framed**: never "prevents injury," never "detects overtraining" as a physiological diagnosis, always "training guidance."
**The action: one copy pass over app + site with the wellness-not-medical lens; assumption-of-risk clause in the ToS (templated, ~$0 marginal); a hard rule that marketing never says "injury."** An hour of work now versus an App Review rejection or worse later.

### #5 — The beta cohort pipeline (the plan assumes it exists; nothing builds it)
The calibration plan needs ~50 email-invited testers **stratified** across body types, tempos, watch fit, and exercise selection. Recruiting is slower than building, and it starts from the waitlist + Reddit presence + creator gifting that don't exist yet.
**The action: start the waitlist and Reddit presence this month** (the roadmap's "3 months before launch" for Reddit is now). Add a 4-question intake form (experience level, program style, watch model, wrist) so stratification is possible. This is also the Founders Lifetime buyer list.

### #6 — Sync reliability = the category's #1 one-star review
"It lost my workout" is the dominant 1-star narrative for every watch training app. WatchConnectivity is flaky by design.
**The action: make the invariant explicit in the sync design: a confirmed session can never be lost** — persist on watch first, transfer resumable, ack-before-delete. Metadata-first (already decided) + this invariant is the whole spec. Test by killing the phone app mid-transfer and force-rebooting the watch mid-session.

### #7 — The name "Otto" is collided (minor, but check now)
App Store already has **Otto: GLP-1 tracker** (Health & Fitness category!) and **Otto: Daily Tasks Virtual Pet**, plus Otto-branded insurance/bookkeeping apps. The name is keepable — but Otto must never be findable only by "Otto."
**The action: subtitle carries the search terms ("Otto — Auto Workout Tracker" or similar); run a USPTO knockout search in class 9/42 fitness software (~1 hour) before spending on brand assets.** Rename now costs a day; at launch it costs the waitlist.

### Explicitly *not* on this list
Things sometimes worried about that the evidence says to ignore for now: Android/Wear OS (wrong ICP, no HealthKit story), web dashboard (post-PMF), social/leaderboards beyond the existing "after launch" chip (retention theater until the instrument is trusted), paid UA (structurally unprofitable, permanently), and additional metrics beyond the shipped set (the audit's graduation pipeline is already full).

---

## 2. Parting advice — the ten things I'd tape above the desk

1. **The product is trust repair, not detection.** Detection will fail — for every competitor too (Whoop's passive layer is unvalidated; FORT hasn't shipped; Motra's review stream is accuracy complaints). The company that wins is the one whose *failure UX* builds trust instead of burning it. The edit pass, the honesty copy, the public accuracy dashboard — that's the product. Ship miscounts proudly handled, not accuracy theater.

2. **Validation before features, always.** The two kill-shot experiments — the time-warp invariance test (algorithm) and the Stranger Test (generalization) — cost days and can each invalidate months of planned work. Nothing else on the roadmap outranks them. When tempted by a feature, ask: "does this survive if the Stranger Test comes back at 70%?"

3. **Protect the flywheel above the margin.** The correction corpus is the only asset that compounds and the only one FORT/Whoop/Apple can't copy by shipping a feature. It's already the kill-switch hierarchy in the business doc — let it also settle product arguments: whichever option produces more confirmed sessions wins.

4. **Speed is now a strategy, not a preference.** FORT ships Q3 2026. Whoop's passive detection is live. The 16-week launch plan should be treated as a promise to yourself with the same seriousness as the numeric gates inside it. Cut scope, never dates — the free tier can launch with fewer *metrics* (they're paywalled anyway) but not later.

5. **Position against hardware, complement Apple.** The two-front story writes itself now: vs FORT/Whoop — "the watch you already own, $0"; vs Apple — "we write the effort scores Apple's own Training Load is missing." Never fight Apple's narrative; be the strength-shaped hole in it. If Apple ships rep counting, Otto's story collapses to corrections + interpretation + program-awareness — which is why #3 above matters most.

6. **Content is the job; engineering is the hobby.** The 80/20 marketing rule is the single most-broken assumption in indie postmortems, and every revenue case in the business doc dies without it. Calendar content like sprints. Otto's native genres are already identified: wrist-cam demos, "it miscounted — watch it learn," the accuracy dashboard series. FORT's launch coverage (NewAtlas, Stuff, Athletech) is your free market education — react-content to every FORT article is a Q3 series that writes itself.

7. **Pre-commit the kill criteria.** They're written down (edit-pass >60%, D7 ≥30%, ρ≥0.6, stranger recall ≥85%). The failure mode of solo founders isn't missing gates — it's renegotiating them at 11pm. The numbers were chosen calm; trust the calm version of you.

8. **Three numbers, one glance:** edit-pass completion, D7, correction pairs/week. MRR is the lagging fourth. If a week's work doesn't move one of the three, it was a hobby week.

9. **Buy calm with the Founders cash.** ~$5–8k from the Lifetime SKU isn't revenue, it's *runway serenity* — it buys the 6 months of content cadence without desperation. Desperation is visible in founder-face video, and it doesn't convert.

10. **The N=1 truth cuts both ways.** Everything measured is one lifter — that's the biggest risk *and* the proof that one motivated person with a watch generated a 96%-recall instrument. The corpus flywheel is designed to industrialize exactly what already worked once. Trust the design; verify the generalization; ship the honest version.

---

## 3. If there's only time for three things this month

1. **Stranger Test** (5–10 people, zero tuning, measure recall/MAE) — reorders everything else if it fails.
2. **Waitlist + Reddit presence live** (with the intake form) — the beta cohort, Founders buyers, and launch wave all start here, and it has the longest lead time.
3. **Battery test on hardware** — one day, and it de-risks the architecture decision every other sprint builds on.

Everything else — including every doc in this folder — is downstream of those three.
