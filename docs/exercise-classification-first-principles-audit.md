# Otto — exercise classification: first-principles audit

*July 12, 2026. Method: 14-agent deep research — 3 repo readers (Python testbed, Swift on-device port, docs/doctrine), 5 first-principles lenses (wrist-IMU observability, classical pattern recognition, modern learned approaches, context/Bayesian fusion, cross-user robustness), each adversarially verified against the actual code and data, then a final judge. Companion to `rep-detection-first-principles-audit.md`. All file:line refs verified against the repo as of this date.*

---

## 1. Verdict

**The shipped architecture is fundamentally right — and that is now a cross-verified conclusion, not doctrine.** All five lenses independently converged:

- **Name-once + 1-NN is literally a prototypical-network head** — the exact few-shot method the 2026 HAR literature recommends. The product mechanic and the state-of-the-art serving architecture are the same thing. Every future upgrade (richer descriptors, learned embedding) slots in as *a better distance function* with no redesign.
- **The DOF math proves a wrist-unobservable exercise class exists** (idle-hands leg work, Smith-vs-barbell, same-grip machine variants). No amount of data or ML fixes physics — so the plan-prior + run-alignment + naming architecture is a *structural necessity*, not a stopgap.
- The 6-feature fingerprint's family-level performance (83%, 15/16 among partnered classes) is **near the information ceiling of six scalars**, and the one invariance actually tested (effort/tempo) held.

**Three amendments to the doctrine, none architectural:**

1. **Strict tempo-invariance is right for FAMILY identity but wrong as a universal.** Paused-vs-regular squat differ *by definition* only in tempo/dwell. A firewalled within-family "variant axis" (dwell, dead-stop transient, relative ROM) is required — the repo's own experiments prove shape space cannot separate squat variants and state features add nothing.
2. **The learned encoder is NOT gated solely on the flywheel.** RecoFit (CDLA-Permissive 2.0 — ship-weights legally OK) and MM-Fit (CC BY 4.0, *not* NC as we assumed) permit bootstrapping a cross-user embedding **now, in parallel** — as killable R&D that never blocks launch.
3. **The weak part is not the fingerprint — it's the serving hygiene around it:** three coexisting z-scalers (one leaky), dead confidence code, ordinal alignment that cascades, and unconditional flywheel filing that poisons the very corpus the future encoder will train on.

And the standing asterisk: **every headline number is one lifter, one wrist, one crown config.** The cheapest decisive attack on that is the mirror self-capture (Experiment 5), not more features.

---

## 2. Verified code defects (fix regardless of strategy)

| # | Defect | Where | Consequence |
|---|---|---|---|
| 1 | **Three coexisting z-scalers, one leaky.** Experiment scaler pools stats *including the test point*; on-device scaler recomputes over the whole corpus per call; posture fallback is unscaled. | `scripts/fingerprint.py:56-59`, `LabelStore.swift:155-157` | Published 61%/83% may be flattered by leakage; Swift/Python parity uncheckable; distances shift as corpus grows. |
| 2 | **Unconditional flywheel filing.** Every template-matched set files a labeled example immediately — including from never-reviewed sessions, with the aligner's known *systematic* failures (cascades, extras-glued-to-last). | `Models.swift:198` | Corpus poisoning of the future encoder's training data. Partially mitigated: (session,set) dedupe-replace on correction exists (`LabelStore.swift:117`) — the unrecoverable residue is sessions never opened. |
| 3 | **Dead confidence code.** `isConfident` computed but never surfaced; no shape-distance radius inside the 35° gate; no singleton flag; no ratio margin. | `LabelStore.swift:127` | Wrong-name suggestions ship with the same UI weight as sure ones — trust-killers and one-tap corpus-poisoners. |
| 4 | **Ordinal run-to-slot alignment.** Prefill-last + extras-attach-to-last; one merge/over-split cascades through the rest of the session. | `TemplateMatcher.swift:58-62` | The documented failure class (88% → 60% on the adversarial session). |
| 5 | **Label-join guard missing.** Ordinal join of labels to detected windows with no count-mismatch check. | `scripts/fp_oneshot.py` | Silent mislabeling in eval — the Stranger Test depends on this being fixed. |
| 6 | **The weight ask does not exist in code.** No UI path stores an independently entered per-set weight; "weight" is copied from the plan prescription. | `TemplateMatcher.swift:30` | The product's one brand-promise interaction is unimplemented, and the only data stream that can contextually separate squat variants (load) never accumulates. |

**Stale-docs corrections (our own docs lag the code):** the watch→phone transfer already ships **all 6 shape features + rep-mechanism features + HR per set** (`watch WatchSessionManager.swift:44-55`) — the "3 numbers/set" framing in `exercise_classification.md:151` and `ml_roadmap.md:18-19` is outdated; gyro IS in the on-device sample struct now (`CaptureController.swift:319-322`); raw 50 Hz CSVs already persist phone-side (`CSVWriter.swift`). Richer descriptors need **no new transport**. Also: the "100% field check" ran on *Python-recomputed* features (`fp_oneshot.py`), not watch-computed ones — only the 3/3 flywheel prediction exercised the true device path; keep a parity diff in CI.

**Competitive correction:** FORT is **not wrist-only** — its band mounts magnetically on equipment/body and the case doubles as an equipment sensor, and it began shipping June 2026 (pre-order GA Q3). "Our sensing is better" fails for machine lifts. The defensible position: **no extra hardware + learns your exercises in one session + never forgets** — never a detection-count arms race.

---

## 3. Keep (verified as sound)

1. **1-NN + name-once + learn-a-metric doctrine** (`ml_roadmap.md:48-66`) as the *permanent* serving architecture — endorsed by all five lenses; natively few-shot and open-set.
2. **Plan prior + run-based alignment as first-class signal** — required by physics for the unobservable class; 88% vs 38% measures its value (caveat: both are ceilings from truth-derived, in-order plans).
3. **Signed gravity-mean as the v1 dominant separator, within a device config** — the row's gx sign flip (−0.85 → +0.84) is real signal. Never `abs()` it per-set; canonicalize per config instead.
4. **Effort/tempo invariance as the acceptance gate for FAMILY identity** — measured and held; scoped to family, not variants.
5. **Rep counting stays DSP**, separate from identity — and rep anchors are the free phase-registration signal the trajectory descriptor needs.
6. **6-feature vector as a cheap first-stage gate** before any richer distance (standard two-stage retrieval).
7. **Watch-buffers-session + rich transfer payload** — already in place; no architecture change needed for richer descriptors.
8. **LabelSource tags** (`LabelStore.swift:16-21`) — stored-but-unconsumed; exactly the hook quarantine and noise-weighting need. Add a consumer, don't simplify away.
9. **Evening edit pass as the ask surface; watch passive at launch** — zero-friction is the differentiator vs FORT; wrong names are recoverable same-day.
10. **Three-problem framing** (segmentation / within-user identity / cross-user naming) as the evaluation contract — it's what lets the Stranger Test report within-user transfer and cross-user naming as *separate numbers*. The MVP bet is only the first two.
11. **35° posture gate as a hard veto** under any future fusion — the only abstain mechanism that exists today.

---

## 4. Change now (ship-sized, ordered; all additive)

1. **Frozen robust scaler as constants.** One median/IQR scaler computed offline, persisted (12 numbers), refreshed per release — kills the three-scaler divergence. *The most airtight finding across all five verifications; near-zero risk.*
2. **Quarantine templateMatch flywheel filing + consume LabelSource at suggest time.** templateMatch examples become 1-NN evidence only after edit-pass confirmation or ≥2 mutually-consistent corroborating sets; rank weight: named > confirmed > manualAssign > templateMatch. ~1–2 days.
3. **Abstain + ratio-margin confidence in `suggest`.** Shape-distance radius inside the 35° gate; Lowe-style ratio d1/d2 (d2 = nearest *different-class* neighbor); singleton flag; below threshold show an honest **"Exercise A"** placeholder instead of a guess; wire `isConfident` into the confirm chip. Margin heuristic, NOT logistic calibration — the entire corpus contains ~7 error examples; a logistic fit on 7 negatives is noise.
4. **DP/Needleman-Wunsch run-to-slot alignment** (gated on Experiment 4). Skips/repeats/insertions; substitution cost = shape distance to LabelStore prototypes + set-count mismatch; **no load term yet** (plan-copied weight is circular). Degrades to current behavior cold. Chosen over Hungarian: order is information.
5. **History/frequency prior + cluster-then-name cold start.** A 5-exercise user is a 5-way problem; first session with no plan/history presents A/B/C clusters in the edit pass — one tap names a whole cluster and files N examples (Ward purity 83% at k=8 on the hardest data).
6. **Fused run-boundary score** — gated on Experiment 2. Posture jump normalized by the run's own grav_swing + rot_trans/vert_frac jump + rest-gap duration (rest gap must be computed on-watch or added as one field — it is NOT in the transfer payload today). Cannot catch goblet→paused (provably collides); the 27°/33° inversion fix is *unproven*, hence the gate.
7. **Per-config sign canonicalization** — gated on Experiment 5. Canonicalize (gx,gy,gz) by {diag(±1,±1,1)} keyed on `WKInterfaceDevice` wristLocation/crownOrientation (readable settings). Decision-identical for the existing corpus; prevents the first left-wrist beta user from shattering.
8. **Evaluation hygiene:** label-join count guard in `fp_oneshot.py`; report partnered-class accuracy (73% fine, 15/16 family) and singleton coverage as separate headline numbers.
9. **Build the weight-ask flow** (user-entered weight stored distinct from plan-copied). Fulfills the brand promise AND starts the only data stream that can ever separate squat variants contextually (back ~3–4× goblet load, plausible but unmeasured).

---

## 5. R&D (each behind an explicit gate)

| Track | What | Gated on |
|---|---|---|
| **Variant axis** | Bottom-dwell + dead-stop transient + relative ROM, consulted only *within* a matched family, firewalled from family identity (effort leaking into identity is the named #1 failure mode) | Experiment 8 ≥85% within-family |
| **Twist/pronation** | Forearm-axis integrated twist per rep + delta-heading *relative to set start* (self-referenced ⇒ session-invariant; raw quat+gyro already in every CSV) | Experiment 7: twist beats the 6-feature control |
| **Trajectory → CNN** | 16-point phase-resampled per-rep gravity arc (peak-to-peak from rep anchors, jitter-ablated) as the hand-built precursor; contrastive 1D-CNN/TCN only if the hand version shows headroom | Experiment 3 fine >61%, family ≥83%, invariance intact |
| **Public-corpus bootstrap** | Contrastive TCN on RecoFit (CDLA-Permissive 2.0, ~114 subjects, 50 Hz accel+gyro), MM-Fit (CC BY 4.0) as held-out-user + left/right-transfer eval. Parallel, killable, never blocks week 16 | GPU machine; kill at <83% family on Otto's sets after 2 weeks |
| **Load-prior fusion** | Log-linear posterior: motion × plan × load × history. Note: squat variants defeat plan AND motion *on the same sets* — fusion's headline gain depends entirely on the load term | Weight-ask shipped + seasons of confirmed weights |
| **Otto-domain SSL** | Masked-recon/SimCLR on unlabeled captures (plumbing already exists; missing piece is consented off-device aggregation) | Post-launch multi-user data + consent policy |
| **Null-motion class** | Leg press / leg extension transmit only body sway — detect near-zero grip-coupled energy, label from plan with honest "from your plan" provenance | One machine-gym characterization session |
| **Semi-Markov joint decode + transition priors** | The eventual destination for the alignment stack; premature at n=2–4 | Dozens of labeled sets per exercise |

---

## 6. Rejected (with reasons)

- **Chasing FORT's "50+ exercises" with a big cross-user classifier** — wrong data regime, wrong framing (FORT isn't wrist-only), and cold cross-user naming degrades on exactly the variants that collide even within-user.
- **Create ML Activity Classification as a product path** — verified: closed-set softmax, no embedding export; structurally incompatible with open-set name-once. Keep only as a 1–2 day throwaway floor number.
- **Shipping ssl-wearables foundation weights** — academic-only license (Oxford UI); also claimed gains overstated (median +18.4% relative F1, not +130%).
- **Absolute yaw/heading features** — session-arbitrary and magnetically distorted in steel gyms; any gain is gym-layout confounder leakage. Only self-referenced deltas are admissible.
- **Shapelets** — memorize by construction at n=2–4.
- **Recurrence/self-similarity descriptors** — encode tempo (state); the repo measured state features adding exactly nothing.
- **Logistic calibration of NN distances now** — 7 error examples; noise.
- **On-watch mid-workout confirmation prompts at launch** — threatens the zero-friction brand; the edit pass catches errors same-day. Revisit only if post-launch correction rates prove high.
- **Per-set abs() of gravity components** — destroys real signal (the row gx sign flip). Canonicalize per config, never per-set.
- **Rep-scheme prior (5×5 vs 3×12) at week 16** — ±1 rep noise, schemes shared across exercises; zero pre-launch engineering value.

---

## 7. The experiment ladder (cheapest-and-most-decisive first)

1. **Leakage-clean replay** — rerun 18-set LOO with a train-fold-only frozen scaler; partnered/singleton split. *Gate:* family ≥83% and fine within 5 pts of 61% ⇒ numbers stand as the frozen baseline. Larger drop ⇒ recalibrate every downstream gate first. *Hours, zero new data.*
2. **Fused boundary-score replay** — sweep weights on existing sessions; check the 27° true boundary vs the 33° curl jump. *Gate:* true boundary outranks ⇒ ship change #6; fail ⇒ keep 25° and let DP alignment absorb over-splits. *Hours.*
3. **Trajectory headroom LOO** — phase-resampled gravity arcs vs 6-feature baseline; jitter ablation mandatory (rep anchors carry documented miscount noise). *Gate:* fine >61%, family ≥83%, invariance intact ⇒ ship the 48-float descriptor and green-light the CNN track; fail ⇒ variants go to variant-axis/plan, CNN deprioritized. *0.5–1 day.*
4. **Plan-corruption stress test + DP alignment A/B** — corrupt plans (reorder, superset, skip, extra run) on *both* arms (88% and 38% are truth-plan ceilings). *Gate:* DP ≥ ordinal clean AND ≥ +15 pts corrupted ⇒ ship change #4. *~1 day.*
5. **Mirror-model self-capture — THE classification kill-shot** (analog of the rep audit's time-warp test). You wear the watch on the RIGHT wrist 2 sessions + crown-flipped 1 session; 1-NN transformed sets against the left-wrist corpus. *Gate:* transformed family ≥80% (untransformed near-chance) ⇒ ship canonicalization keyed on watch settings; one corpus serves both wrists; the biggest external-validity risk retires. Fail ⇒ corpora keyed per config, beta stratifies by wrist, cross-config claims die *before* launch. *3 workouts + a 50-line script, zero recruiting.*
6. **Flywheel-poisoning audit + noise injection** — replay labels.json; inject systematic mislabels at 10/25/50%. *Gate:* quarantine beats source-weighting at 25% noise ⇒ ship #2 as quarantine; else weighting suffices. *0.5–1 day.*
7. **Pronation capture** — 3× hammer / supinated / EZ curls at fixed load; twist vs 6-feature control. *Gate:* twist-augmented 3-way LOO ≥90% AND beats control ⇒ twist enters the fingerprint. *One session + half day.*
8. **Variant-axis captures** — DL vs RDL; paused vs regular. *Gate:* ≥85% within-family ⇒ variant axis ships as a family-tiebreak; fail ⇒ variants become plan-context-only and the ship list says "hinge" honestly. *1–2 sessions.*
9. **Stranger Test (launch go/no-go for claims)** — 8–12 TestFlight lifters stratified by wrist side (≥3 each), crown orientation, ≥2 watch models; 2 sessions ≥1 week apart, ≥12 labeled sets each; frozen thresholds, zero tuning. Report separately: within-user LOO / cold session-2 / cross-user naming / abstention precision. *Gate:* median within-user session-2 family ≥80% AND abstention precision ≥95% ⇒ the **"learns you in one session"** marketing claim is licensed. Cross-user naming is *expected* to fail and reported separately. *2–3 weeks calendar.*
10. **RecoFit → Otto transfer probe** — parallel R&D. *Gate:* frozen-embed family ≥83% on Otto's sets ⇒ learned metric arrives months early; kill after 2 weeks if not. *Never blocks week 16.*

---

## 8. What ships at week 16 vs what waits

**Ships:** the hand 6-feature fingerprint + name-once + template matcher — **hardened, not replaced**: frozen scaler; flywheel quarantine + source-weighted suggestions; ratio-margin abstain with "Exercise A" placeholder; cluster-then-name cold start + history prior; DP alignment (gated on Exp 4); fused boundary score (gated on Exp 2); sign canonicalization (gated on Exp 5); label-join guard; the weight-ask flow. Watch stays passive.

**Positioning:** family-level auto-detection day one; fine-grained within-user after name-once; squat variants via plan + evening edit pass. **Never promise variant-level cold detection.** The Stranger Test licenses (or vetoes) "learns you in one session" before launch.

**Waits:** contrastive encoder + RecoFit bootstrap (parallel, killable); trajectory descriptor (Exp 3); twist features (Exp 7); variant axis (Exp 8); load prior (needs confirmed-weight seasons); logistic calibration (needs error examples); Otto-SSL; transition priors; semi-Markov decode; null-class detector; any cross-user naming claim.

---

## 9. Risks

1. **One lifter / one wrist / one config** on every shipped number; the strongest feature provably sign-flips across configs with zero canonicalization in code today. Mitigations: Experiment 5, then the Stranger Test.
2. **Flywheel poisoning is wired in now** (`Models.swift:198`); never-reviewed sessions are unrecoverable, and the fix's value is coupled to edit-pass engagement nobody has measured yet.
3. **Squat variants have NO shipped motion solution and the fusion escape hatch is blocked** until the weight-ask flow exists and accumulates data. Marketing implying variant-level auto-detection gets falsified by users in week one.
4. **88%/38% are ceilings** from truth-derived in-order plans; the honest plan-prior value could be materially lower (Experiment 4 measures it).
5. **Solo founder, ~9 weeks:** the learned track can silently eat the calendar. Any week it blocks the Swift hardening list, cut it.
6. **Trajectory features inherit rep-anchor miscount noise** — the jitter ablation is mandatory, not optional.
7. **FORT ships with equipment-mountable sensors** — don't argue sensing superiority for machine lifts; argue zero hardware + the flywheel.
8. **Abstain thresholds are calibrated on ~7 errors** — early suggest/abstain balance will be crude either way; instrument suggestion/abstain/correction rates from day one of beta.
