# Otto MVP — technical audit & roadmap

*July 12, 2026. Sources: full read of the VisualVectors testbed (`C:/Users/lukef/Documents/VisualVectors` — docs findings, Python `src/algo` pipeline, experiment scripts, labeled data, both Swift apps), the otto-web product spec (landing page + /watch-ui Rounds 3–5), and July-2026 web research. Multi-agent audit: 5 corpus readers, 6 problem analysts, 1 business analyst, completeness critic, spec-inventory verification.*

*Honesty note: every accuracy number below is doc-claimed, not independently re-run. Reproducing the harness and pinning the numbers as a regression baseline is Sprint 0, item 1.*

---

## 1. The verdict

The testbed is much stronger than "testbed" implies — and the product spec is writing checks it can't cash yet.

**Near the product bar today:**
- **Segmentation & rep counting** — rhythm-confirmation stack: 96% set recall (23/24) at 2 spurious, ~87% of windows within ±1 rep, exact Python/Swift parity, and a genuinely correct live architecture (dumb activity gate for UI, authoritative batch re-segment at set close; live == final by construction).
- **Exercise identity, within-user** — 6-D posture/shape fingerprint (83% family-level LOO, 8/8 on fresh one-tap field data), name-once + 1-NN with an honest abstain gate, 88% plan alignment via TemplateMatcher.

**Writing checks it can't cash:**
- Three of the five headline landing-page metrics have **no algorithm behind them at all**: Training Load, Stimulus, and Readiness — Readiness is literally `min(96, max(48, 92 - load/8))` in Models.swift.
- Every number was calibrated on **one lifter, one wrist, ~7 captures, ~28 minutes of data**. The longest real capture is 6.7 minutes vs a 60–90 min product target.
- The flywheel stores that constitute the moat story (LabelStore, RepCorrectionStore) are **log-only** — nothing consumes them yet.

**Most striking finding:** Quality — the only score the testbed actually validated (0.6·consistency + 0.4·SPARC, 4/4 clean-vs-grindy matched pairs) — **appears nowhere in the product spec.** We're marketing everything we don't have and hiding the one thing we do.

---

## 2. The five hardest problems (ranked by difficulty × product dependence)

### P1 · Cross-session velocity comparability — the unproven flagship
"Same weight, 8% faster than 3 weeks ago" is the best marketing moment and the one claim with **zero** evidence. The corpus validates within-set ratios only. Three uncontrolled multiplicative factors sit between sessions: tempo-dependent filter gain, wrist→bar transfer function, strap/placement. This R&D may return a **kill verdict** — the roadmap must be built so nothing user-visible depends on it succeeding.

Decision rule after the repeatability study: test-retest CV <5% → numeric cross-session claims allowed; 5–8% → directional trend only ("faster / similar / slower"); >8% → kill speed-at-load, keep e1RM/timing trends.

### P2 · The Effort measurement path
The physics problem: the 2.0 s moving-average detrend is a high-pass whose **gain is tempo-dependent**, and reps slow as fatigue rises — so measurement error is correlated with the exact quantity (velocity loss) being measured. The testbed measured it directly: detrended amplitude 0.40 vs 0.90 for a 2.2 s/rep OHP vs a faster squat.

The fix is architectural: **decouple counting from measurement.** Keep the shipped DSP for rep boundaries; re-integrate per-rep velocity between ZUPT anchors at rep turnarounds with per-rep linear drift correction (1.5–3 s windows where strapdown correction actually works). ZUPT was shelved for *counting* — correctly (undercounts 1→4) — but never tried for *measurement*, which is where it belongs.

Also structurally broken in the current Intensity formula (`0.7·clamp(dropoff/0.35) + 0.3·clamp(peakAccel/8.0)`):
- The 0.35 clamp saturates exactly where the zone system needs resolution — cannot distinguish 35% from 50% velocity loss (hypertrophy vs overreach).
- The peakAccel term is load-confounded — light explosive work reads as high effort (explosive goblet hit 6.82 m/s² at low effort).
- Dropoff itself is broken on ~half of common movement patterns: **−21% on curls, −21% on explosive goblet, +62% on paused squat.** "Gate dropoff per exercise, never headline it" (testbed doctrine) must be enforced in the scorer, not just the UI.

Replace the internals; keep the 0–100 surface and the ±6→±2 calibrating UX. Blend in drift-free timing signals (rep-duration slope, TUT, cadence lengthening — the "rock solid" tier in the testbed's own reliability hierarchy) so Effort degrades gracefully where velocity is untrustworthy.

### P3 · Phantom reps & the failure boundary
The testbed proved this elegantly: four principled gates (zero-crossing, cm ROM floor, accel de-bias, ZUPT) all break the same grind-to-failure rep — *"a real grind and a double-bump are nearly the same gesture"* — irreducible on wrist motion alone (the "4th wall"). The grindy-failure rep measures ~0.10 m descent, inside the phantom band (0.07–0.11 m).

The unsolved **leading setup phantom** becomes rep 1 — and the dropoff formula uses rep 1 as the baseline. This is the product's scariest silent-poison bug, and it's neutralizable in a week: switch the baseline to **fastest-of-first-3 reps** (Program.velLossPct already does this; WorkoutScorer doesn't — they disagree today).

Long-term fix per the testbed's own conclusion: no more global hand gates; a per-exercise learned gate trained on RepCorrectionStore once corrections reach ~200–300 sets, with the phantom scripts as a pre-registered ship gate and an undercount-forbidden constraint.

### P4 · Cross-user generalization
Every threshold is N=1: 30° rest-vs-pause (with a 4° margin), 15° rescue gate, 0.30 periodicity, 35°/18° identity gates. HAR literature consistently shows large within-user → held-out-user degradation on wrist IMU. The conversion event — "it scored my workout and I logged nothing" — fires for a stranger on session one. Highest-risk unknown; cheapest to measure (10-person pilot, weeks).

### P5 · The missing flagging layer
"41 sets clean, 3 flags" is a **flagging contract, not an accuracy contract** — and no per-set confidence score exists anywhere in the codebase. All inputs are already computed per set: periodicity strength, minGapFrac, minDescentFrac dispersion, pose-swing margin, rescue-vs-base provenance, reversal-gate near-misses. A ~6-feature logistic model calibrated so ~7% of sets flag, capturing ≥80% of sets with any error, converts residual error classes from silent poison into the designed product experience. Highest-leverage missing component; 1–2 weeks of modeling.

---

## 3. Keep / refine / replace / needs-R&D

| Component | Verdict | Reason |
|---|---|---|
| Rhythm-confirmation segmentation stack | **Keep** | 96% recall; right architecture — spend effort on additions, not new gates |
| Autocorrelation coherence gate (≥0.30) | **Keep** | The load-bearing noise rejector: real sets 0.5–0.9 vs noise <0.35 — widest separation in the corpus |
| Relative-height filter + re-split | **Keep** | Load-adaptive; re-split move raised recall 92%→96% |
| Reversal gate | **Keep** | Earned in with numbers (−0.46..−0.89 vs +0.19..+0.28; abs-err 22→19, zero new undercounts); proves the per-set linear-detrend trick per-rep integration will reuse |
| Batch-at-set-close live architecture | **Keep** | Best platform decision in the codebase; zero parity risk |
| 6-D fingerprint + name-once 1-NN | **Keep** | "Learn a metric, not a classifier" is right and validated (effort/tempo-invariance held); extend with full quaternion, don't replace |
| LabelStore / RepCorrectionStore flywheels | **Keep** | The actual moat — correctly phone-side post-hoc so corrections never contaminate motion; but log-only today |
| Quality score | **Keep — put it in the product** | Only validated score in the system; absent from otto-web |
| Timing features (TUT, cadence, rep-duration) | **Keep — promote** | "Rock solid" reliability tier; physically grounded velocity proxies; elevate to first-class Effort inputs |
| Reference-device sidecar spec | **Keep — execute** | "The single most important unexecuted artifact in the corpus" |
| Rest-vs-pause 30° pose split | Refine | Key insight (78%→87% within ±1) but 4° margin, N=1 — soften to a score before strangers |
| Rescue pass (5 s / 15°) | Refine | n=1 recovery; 15° self-flagged "most likely to not generalize"; **bug: all-slow-lift sessions return nothing** (rescue skipped when base pass finds zero sets) |
| TemplateMatcher plan alignment | Refine | 88% real; but overflow sets silently inherit the last exercise and get filed as flywheel ground truth — label poison |
| vel_dropoff definition | Refine | Baseline → fastest-of-first-3; terminal → median-of-last-2 |
| WCSession transfer | Refine | Metadata-first via transferUserInfo (summary in seconds); gzip; schema_version; idempotent ingest |
| 50 Hz capture | Refine | Run validation at 100 Hz; decide shipping rate from measured delta vs battery (CMBatchedSensorManager as later opt-in) |
| Phone ingest (UUID minting) | **Replace** | Discards watch session_id; retry = duplicate session; score-less sessions vanish — data lineage is load-bearing for the flywheel |
| Per-sample MainActor hops | **Replace** | 50 task hops + string formatting/sec on main actor for 90 min = pure battery waste |
| vz_hp peaks as velocity *measurement* | **Replace** | Tempo-gain bias corrupts the fatigue signal; ZUPT-anchored per-rep re-integration inside confirmed boundaries |
| Effort/Intensity formula internals | **Replace** | Saturating clamp + load-confounded accel term; keep surface + calibrating UX |
| Leading-phantom hand detectors | **Replace** | Three attacks, all rejected with numbers; learned per-exercise gate later; flagging + phantom-immune baseline now |
| Exercise→muscle mapping | **Replace** | MuscleGroup.from() is a UI tint helper; Stimulus needs a curated fractional table (~50 lifts, front/side/rear delt splits) |
| Validation harness | **Replace** | Nothing frozen; every number lives in prose/stdout — pin labeled sessions as CI regression suites |
| N=1 corpus | **Replace** | Did its job; every threshold is now a prior, not a constant |
| Confidence/flagging layer | **Needs-R&D (build now)** | Product contract requires it; ingredients all exist |
| Warmup-vs-work designation | Needs-R&D | Nothing exists; ship plan-mode heuristic only (position-in-run + prefilled weight + repVelMed) |
| Velocity-loss zone boundaries | Needs-R&D | Borrowed from barbell LPT literature (mean/propulsive velocity) in different units than wrist peak velocity; need reference-device remap |
| Stimulus / Training Load / Readiness | Needs-R&D | No algorithms exist — see triage |
| Cross-session speed-at-load, LVP e1RM | Needs-R&D, possibly kill | Gated on the repeatability study (P1) |
| Live mid-set rep counter (WatchJourneys mock) | Unsupported by architecture | The live gate never counts; reps land seconds after racking — net-new DSP the docs deliberately avoided. Adjust the mock or accept batch semantics |
| minReps=3 floor (heavy singles/doubles invisible) | Needs-R&D | Product blind spot for strength work; "logged, not scored" tier in the interim |

---

## 4. Analyst contradictions — resolved

1. **Effort formula (refine vs replace):** Replace the internals, keep the composite surface and calibrating UX.
2. **Zones before or after the reference study:** Coarse qualitative bands ("est."-tagged, whitelist-gated) in beta; **public launch gated on the reference-device study.** The falsifiability dispute resolves against complacency: velocity-loss *percent* is directly checkable against any bar sensor, m/s or not. One "Otto said 34%, my GymAware said 19%" video lands on the hero feature. The study costs ~$500 and two weeks. Pre-launch mandatory.
3. **ZUPT:** Shelved for counting (stays), active for measurement (starts). Not a contradiction once decoupled.
4. **Raw CSV vs flywheel:** Metadata-first sync always; raw motion uploads as opt-in **windowed set±10 s snippets**, gzipped, deferred to charger/Wi-Fi. The flywheel needs labeled snippets, not 45 MB sessions. (Trust the measured 511 KB/min; the doc's 80 KB/min is wrong by 6×.)
5. **Capture data rate:** 511 KB/min measured. Re-verify every unmeasured platform number in the docs before it reaches marketing.
6. **Beta campaign shape:** One funnel (below) merging the data-strategy and business designs, with unified gates.

---

## 5. Business & claims triage

### July 2026 competitive facts (web-verified)
- **watchOS 27 (WWDC, June 2026) shipped no native strength rep counting** — Apple spent the cycle on Siri/Apple Intelligence. Sherlock window still open; assume 1–2 cycles, not 3.
- **Train Fitness rebranded to Motra and is now free** ([trainfitness.ai](https://trainfitness.ai/)) — kills the "$120/yr incumbent" price anchor and raises the stakes on Otto's free tier. Claims 470+ exercises via "Neural Kinetic Profiling"; reviews still cite accuracy limitations; no correction-flywheel or velocity layer.
- **`HKWorkoutEffortScore` is confirmed writable by third parties** (CR-10, 0–10, relatable to your own HKWorkouts). Apple auto-scores only walking/running/hiking/cycling — **strength effort inside Apple's Training Load is a genuine integration gap Otto fills.** Frame as integration; don't use Apple's "Training Load" as the in-app metric name. (Sources: [Apple Developer docs](https://developer.apple.com/documentation/healthkit/hkquantitytypeidentifier/estimatedworkouteffortscore), [WWDC26 workout-zones session](https://developer.apple.com/videos/play/wwdc2026/207/), [sasq.ca write-up](https://sasq.ca/blog/2025/4/28/reading-writing-workout-effort-scores), [watchOS 27 coverage](https://www.macrumors.com/2026/06/18/watchos-27-hands-on/), [the5krunner](https://the5krunner.com/2026/06/08/watchos-27-features-compatibility/).)

### The wedge: auto-logging, not Effort
Rep counts are user-verifiable daily — every correct count is a trust deposit, every correction is flywheel fuel. Effort asks users to trust an unverifiable number from an admittedly uncalibrated heuristic. Lead with "your lifting logs itself"; ship Effort subordinate and labeled **calibrating** until it clears ρ≥0.6 vs user-reported RPE in beta. Once Otto is right about what they can check, they extend belief to what they can't. Reversing the order burns early adopters exactly when their screenshots matter most.

### Claims to fix (liability order)
1. **"Knows a PR day by your last warmup"** — hardcoded mock, no signal, no validation path. Cut or "coming to early access." First flat-feeling day with a green readiness score destroys the instrument identity.
2. **"Objective proximity to failure… it isn't a guess"** — by the testbed's own account, it currently is one, and the failure boundary is where wrist sensing provably fails. Reframe: *"measured from how your rep speed decays — the signal coaches pay $2,000 rigs to see."* Anchor to you-vs-you.
3. **"Measures Effort, Training Load & Stimulus"** → "estimates/tracks." Rename Training Load.
4. **Every m/s display in the watch-ui mocks** (0.46 m/s footers, "Est. 1RM 287 · from bar speed", speed-at-load tables) violates testbed doctrine: *"never a headline number."* Percentages and deltas only — you can't be caught wrong in units you never display.
5. **"Just wearing it makes you stronger"** — efficacy claim, zero evidence pathway. Convert to an earned beta-cohort stat later.
6. **"Top 10% session today"** chip — ungated cohort comparison, deferred to ~10K users by the plan itself.
7. **Modality-tier bug (Round 5 copy):** Effort-lite tier promises "Effort from rep-speed decay" for dumbbells — but the measured dropoff failure case (curl −21%) *is* a dumbbell lift. Tier boundary is drawn by equipment; the real failure boundary is movement dynamics (steady-vertical vs explosive/paused/rotational). Redraw.
8. Scope the promise like Whoop does: name the supported movements ("squats, presses, rows, deadlifts — more every month"). Heavy singles/doubles are structurally invisible (minReps=3): "logged, not scored," never implied otherwise.

### Monetization guardrails
- **Free forever (non-negotiable):** auto set/rep detection, corrections, exercise naming, 30-day history, Apple Health write. Corrections and labels ARE the moat — paywalling them starves the flywheel; Motra going free makes this table stakes.
- **Pro ($8/mo):** full history/trends, calibrated Effort with per-exercise baselines, velocity-loss zones + auto-regulation for plan-followers, Load-to-Health, Stimulus (plan-followers). Hold until D7 ≥30% *and* Effort calibration passes ρ≥0.6 — charging for an uncalibrated headline score buys one-star reviews.
- Never charge for accuracy (corrections/recounts free). Never sell a metric still labeled "calibrating." No m/s in any tier. No annual until churn data exists.
- v2 paid: readiness (HRV-interim), cross-session progress index (evidence-gated), team tier ($15/athlete/mo — coaches are who pays for velocity-loss zones).

---

## 6. Roadmap

### Sprint 0 — stop the bleeding (2 weeks, founder, parallelizable)
1. **Re-run the whole Python harness; pin every claimed number as a frozen regression suite** (validate.py, segment_eval, quality, fingerprint/fp_oneshot, transitions, phantom scripts). Nothing is frozen today.
2. Dropoff baseline → fastest-of-first-3 in WorkoutScorer (phantom-immune Effort).
3. Watch session_id propagated end-to-end; idempotent ingest (kill UUID minting).
4. RepCorrectionStore logs confirmations instead of deleting them (true-negative rate is unmeasurable otherwise).
5. Fix empty-base rescue-pass guard (all-slow-lift session returns nothing today).
6. Metadata-first WCSession sync (phone summary in seconds, versioned schema).
7. Device/wrist/crown/band metadata in every capture header.

### Phase 1 — founder validation (weeks 1–3, overlaps Sprint 0)
- Execute the designed-but-never-run **limit-test protocol** (4 sessions, 40–55 labeled sets: tempo ladder, geometry sweep, failure/rest-pause/superset blocks). Gate: zero new undercounts across the tempo ladder; pose thresholds hold or re-fit.
- **Reference-device campaign** (GymAware/Vitruve rental): 10–15 sessions, bench/OHP/deadlift/row + squat as expected-failure control, 100 Hz arm. Gates: per-rep rank correlation ρ>0.9 within sets; within-set VL% error <5 pp on ≥80% of gated sets; zone remap derived.
- **Build the confidence/flagging layer** (~6 features, logistic, ~7% flag rate capturing ≥80% of errored sets).
- **90-minute platform soak** (Series 8/9/SE2/Ultra): battery, jetsam headroom, live-pass wall time, transfer reliability. Gates: ≤25%/90 min battery, live pass <2 s, final pass <10 s on SE2. Then the four platform fixes (off-main capture, buffer compaction, metadata-first, HKLiveWorkoutBuilder + finishWorkout + effort score).
- Start the per-rep ZUPT-anchored velocity integrator offline against reference data. Gate: tempo-invariance — same-true-velocity reps at 1 s/rep vs 3 s/rep read within 10%.

### Phase 2 — the N=1→N=10 cliff (weeks 3–7)
10–15 hand-picked pilots, stratified: ~30% right-wrist, ≥40% women, Series 4/SE→Ultra, 3+ gyms, powerlifter/bodybuilder/circuit styles. Video-audit rubber-stamping (blind rep entry probes). **Gates to open the beta: held-out-user set recall ≥93%, ±1 reps ≥85%, zero-set sessions <2%, family 1-NN ≥80% leave-user-out, ≤1 threshold re-fit cycle.**

### Phase 3 — calibration beta (weeks 7–15, n=50, 70/30 casual/engaged)
1,500–3,000 labeled sets. RPE taps after flagged sets (Effort calibration fuel) + post-session sRPE (Load calibration). Gates: Effort ρ≥0.6 vs reported RPE; correction rate <10% of sets and falling; **edit-pass completion >60% of sessions** (company-dashboard metric — a beta that skips the edit pass kills the flywheel regardless of algorithm quality); Load test-retest CV <15% before anything is written to Health. Cross-session repeatability study runs here (CV <5% numeric / 5–8% directional / >8% kill). Build in public: weekly accuracy dashboard + one narrated fix per week (the reversal-gate and rescue-pass writeups are already excellent content); "I trained the algorithm" contributor cards.

### Launch (~week 16)
Free auto-logging wedge + calibrating Effort + **Quality in the product** + coarse zones on whitelisted lifts + effort-score→HealthKit + name-once identity + plan-following with weight prefill. Waitlist wave (300–500) becomes the cross-user fingerprint corpus.

### Post-launch, evidence-gated
- **v1.1:** Stimulus as plan-follower fractional-set accounting (curated ~50-lift muscle table; adjustable targets anchored to 10–20 hard-sets/week literature; "deposits" framing, never measured physiology).
- **v2:** cross-session speed trends (if CV study passed), warmup readiness (long pole; HRV/sleep interim — pilot gate: warmup-speed deviation predicts session performance at ρ>0.5), learned phantom gate (~10k corrections, phantom scripts as pre-registered ship gate, undercount-forbidden), contrastive embedding (≥100 users / ≥5k labeled sets, held-out-user eval non-negotiable, ships only if it beats the hand fingerprint by ≥10 pts fine-grained).

---

## 7. The strategic through-line

Otto's durable moat is exactly where the testbed already retreated to: **relative, per-user, per-exercise, correction-trained metrics.** Apple ships neutral plumbing, not judgments. Motra went free but has no correction flywheel and no velocity layer. Strong/Hevy own manual logging but their interaction model is the phone-in-hand loop Otto eliminates. The VBT hardware crowd can't follow onto a bare wrist — and Otto must never fight them in their units.

The evening edit pass is the only mechanism in the market that pairs raw wrist IMU with user-verified rep/exercise truth at scale. That pairing is the moat **if** launch volume materializes — which makes **speed-to-launch** and **edit-pass engagement rate** the two numbers that decide whether the moat ever exists.

---

## Appendix: known open items
- Two audit gap-fills were rate-limited and back-filled manually: July-2026 competitive research (done, above) and harness reproduction (Sprint 0, item 1 — until then, all numbers are doc-claimed).
- The critic flagged as unverified-but-load-bearing: the "HAR 15–30 pt cross-user drop" magnitude (direction credible, magnitude uncited), the gravity-leak back-of-envelope numbers in P2 (physics reasoning, not measurements), and Swift↔Python parity durability (asserted at port time; no CI check exists — the pinned regression suite fixes this).
