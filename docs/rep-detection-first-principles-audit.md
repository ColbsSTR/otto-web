# Rep detection & velocity pipeline — first-principles audit

*July 12, 2026. Method: four independent designers (strapdown inertial-nav, filter theory, detection theory, robust systems) each redesigned the pipeline from first principles against the eight documented failure cases, forbidden from re-proposing rejected ideas without solving the original failure; two adversarial verifiers (physics, shipping) then scored every design against every case. This doc is the reconciled synthesis. Companion to `mvp-audit-and-roadmap.md`.*

**Code under audit:** `src/algo/{integrate,orientation,transform,rep_count,rhythm}.py` and the parity Swift ports (`RepCounter.swift`, `SessionSegmenter.swift`).

---

## 1. Root cause, established

All four designers independently derived the same diagnosis with matching numbers, and it quantitatively matches the corpus measurements. This is now established root cause, not hypothesis:

### 1a. The 2.0 s moving-average subtraction, analyzed as a filter

`detrend_velocity` computes `y = v − MA_T(v)` — a high-pass whose kernel is a boxcar. Its frequency response is **H(f) = 1 − sinc(πfT)**. With T = 2.0 s:

| Rep tempo | Rep freq | Gain H(f) |
|---|---|---|
| 1.0 s/rep | 1.00 Hz | 1.00 |
| ~1.4 s/rep | 0.715 Hz | **1.22 (+22% sidelobe — amplifies)** |
| 2.2 s/rep | 0.455 Hz | 0.90 |
| 2.5 s/rep | 0.40 Hz | 0.77 |
| 3.0 s/rep | 0.333 Hz | 0.59 |
| 4.0 s/rep | 0.25 Hz | 0.36 |

Three documented failures fall straight out of this curve:

- **F5 (tempo-dependent gain):** a set slowing from 2.0 → 2.8 s/rep under fatigue has **~35% of its "velocity loss" fabricated by the filter**, correlated with the physiological quantity by construction. Matches the measured 0.40-vs-0.90 amplitude split in `signals_and_scoring.md`.
- **F2 (double-bumps):** at 2.5 s/rep the fundamental passes at 0.77 while its 2nd harmonic is amplified at 1.19 — a **1.55× relative harmonic boost**. One press comes out as two bumps. In the time domain: subtracting the boxcar smear of a velocity pulse leaves negative shoulders of depth ≈ ROM/T ≈ 0.2 m/s flanking every rep — exactly the "fakes negative undershoots" that killed the zero-crossing gate. Below fW<1 the filter degenerates to a second-differentiator (y ≈ −(W²/24)·x″) — a Mexican-hat, i.e. a ringing machine. Rect sidelobes are −13 dB; a Gaussian-like kernel is −40 dB.
- **F1 (slow-set erasure):** a grind's detrended amplitude (~0.2) × gain 0.59 falls under the **fixed prominence threshold 0.2**, while sidelobe-boosted harmonics spray incoherent junk peaks (8 real reps → 14 peaks).

The 2 s + 5 s two-pass design is two point samples of a >3-octave tempo continuum. Signal and drift **overlap spectrally** (a gravity-leakage step at set onset has 1/f content up into the rep band), so *no LTI cutoff exists that separates them*. The correct separation axis is **state, not frequency**: drift is a low-order dynamic process that becomes observable the moment you have boundary conditions (instants where velocity is known to be zero). Filtering discards that observability; estimation uses it.

### 1b. The error budget of open-loop integration

- Residual accel bias after CM gravity removal: 2–5 mg → velocity error b·t of **1.2–3 m/s per minute** vs a rep signal of 0.2–1.2 m/s. SNR < 1 within the first minute — why the detrender is load-bearing at all.
- Attitude error → gravity leakage g·sinθ: **1° = 0.171 m/s²**. A maximal grind (0.10 m ROM over ~1.5 s) has true mean acceleration ~0.2–0.5 m/s² — the grind's physical signal sits *at* the leakage floor of a 1–2° attitude error. **F1's "residual sensing limit" and F3's "4th wall" are sensing budget, not tuning failures.**
- CM's EKF down-weights its accelerometer tilt reference during dynamics, so tilt coasts on gyro *during* a set (~1–2° wander over 20–40 s) and re-converges at rest. Drift is therefore **piecewise-linear per set** — which is exactly why the corpus found "deg 1/2/3 identical, linear is enough" for the reversal gate's detrend. The stack discovered the right error model empirically and then didn't exploit it as an estimator.

### 1c. Verified implementation defects (found during this audit)

1. **Zero-pad edge bias, in both languages:** `rep_count.py:35` uses `np.convolve(mode="same")` with zero padding and no edge renormalization; `RepCounter.swift:97-110` sums only in-range samples but divides by the full window. The moving average is biased low by up to 2× within W/2 (1.0 s) of capture edges, inflating vz_hp exactly in F4's "first ~1.5 s" phantom zone. (One-tap caveat: whole-session detrend puts these zones only at session edges — run the padding-only A/B before crediting it with the mid-session phantom.)
2. **"Base always wins" (`rhythm.py:379-382`):** a corrupted 2 s detection blocks a clean 5 s detection whenever it produces anything at all, via the rescue overlap rule.
3. **Empty-base rescue skip:** an all-slow-lift session returns nothing (already in the Sprint-0 list).
4. **ZUPT anchor placement is subtle and two of four designers got it wrong:** anchors must be at **turnarounds** (zero-crossings of the per-set linear detrend / position extrema, where v = 0 physically) — *not* velocity minima (mid-eccentric, max speed) and *not* min-|a| points (constant velocity ≠ zero velocity). The shelved ZUPT prototype had it right.

---

## 2. What to KEEP (survived all adversarial scrutiny)

Every design kept these verbatim; the verifiers confirmed:

- **Pose-based rest-vs-pause discriminator (30° split / 15° rescue gate)** — the best-validated discovery in the stack (pauses ≤26°, rests ≥30°, measured clean margin). The settled F7 counting answer.
- **Autocorrelation coherence gate (≥0.30)** — the load-bearing noise rejector (real sets 0.5–0.9, walking/plate-loading <0.35).
- **Reversal gate** — measured win (abs-err 22→19, zero new undercounts); also proves the non-ringing per-set linear detrend that the measurement path reuses.
- **Rel-height filter, run growth, refine (double-bump merge / detached-lead drop), edge rejection** — all downstream of the real problem.
- **Batch-at-set-close architecture** — untouched by every design.
- **Naive cumtrapz as the substrate** — the drift belongs to the estimator downstream, not the integrator.
- **Undercount-averse doctrine** — encoded into every accepted change.

Caveat that travels with all of them: **every threshold is conditioned on the input signal.** Any front-end change requires re-measuring the 0.30 / 0.5× / 30° operating points on the frozen corpus before retiring the old pass.

## 3. What to CHANGE

### Phase A — additive; measured 96%/87% baseline preserved *by construction*

1. **Scale ladder (generalizing the 2s+5s hack):** keep the 2.0 s anchor rung bit-identical to today. Add rungs **{3.2, 5.0, 8.0} s** using a **triple-boxcar (≈Gaussian) kernel** — −40 dB sidelobes vs −13, 1.0% overshoot vs 21.7%, O(N) via running sums, parity-pinnable as the same scalar loop in Python and Swift — with reflection padding and **self-scaled prominence** (max(0.05 m/s, ~0.35 × span-median rep amplitude)) instead of the fixed 0.2 that provably caps the F1 win. New rungs admit sets **only through the already-measured 0-FP rescue gates** (pose ≤15°, ≥8 s, ≥4 reps, overlap ≤0.5) into a **claim ledger** with a property-tested invariant: fused rep-time multisets pairwise disjoint at 0.5× cadence. Drop the proposed 1.25 s rung (the anchor already covers explosive tempos; an 8-rep ~1 s/rep set fails the ≥8 s admission anyway). Longer windows carry 16× the curvature-leakage of short ones (−W²v″/24) → strictest gates on the longest rungs.
2. **Measurement path, quarantined (can create/delete nothing):** per-rep re-integration of world accel *inside confirmed rep boundaries*, v=0 anchored at **turnarounds**, linear drift allocation per interval — kills constant and linear bias exactly, ~0.03–0.08 m/s residual mid-span wander. **Genuine pause dwells become interior anchors** — F7's paused squat flips from the worst-measured set (+62% nonsense) to the best-measured one. **MCV = concentric displacement ÷ time** (integral — robust to 50 Hz undersampling of <100 ms peaks, standard VBT definition) instead of peak-of-filtered-residue. Touch-and-go fallback: clamped 1/(1−sinc(W/T̂)) gain correction (fixes cross-set comparability only — it cannot fix within-set differential gain, so its sets get a confidence penalty). The Swift primitive already exists: `SessionSegmenter.swift:461-481` (`descentBetween`) is the two-point de-bias + re-integration this needs.
3. **Effort baseline hardening (one line, zero count risk):** velocity-loss baseline = **median of first min(3,k) reps**, and the **pre-rhythm interval** (motion onset → rhythm onset) is excluded from the baseline even when the count keeps the peak. Contains F4's actual product harm (poisoned dropoff) whether or not the phantom is ever detected.
4. **Confidence layer (output-only v1):** logistic margins on every kept gate + cross-rung count agreement + **raw-accel cadence map** (short-time autocorrelation of *unintegrated* accel, 12 s windows, octave guard — drift-free and pre-detection, which is precisely why it escapes the circularity that killed the rejected cadence-adaptive re-detrend; ships as a signal, never a gate, because T̂ availability on low-accel grinds scales ~1/T² and is unmeasured) + DSP-vs-ZUPT per-rep disagreement. Bottom-quartile sets flag into the evening edit pass → RepCorrectionStore. Calibration bar: all documented-failure sets in the bottom quartile, AUC ≥ 0.85.
5. **Padding fix** gated on the one-variable isolation A/B (re-run the current stack with only reflection padding changed).

### Phase B — root-cause promotion, gated on the validation battery

Promote CASL's front end once the battery passes: triple-boxcar + self-scaled prominence **at the anchor scale too**, and **symmetric scale competition with losers discarded** (per-run winner = max coherence among cadence-agreeing scales; kills "base always wins"). This retires the 2 s/5 s special-casing entirely. Optionally add raw-variance quiescence spans as an *additive* discovery source (deletes the F1 erasure mechanism at the discovery level — a 4 s/rep grind is violently non-quiescent in raw signals at any tempo), through the same rescue-grade gates.

### Shadow mode — not shipped, logged for the flywheel

- **Per-set self-template NCC parsing (CYCLE-DP):** the only mechanism anyone produced that attacks the F3 "4th wall" — a grind is a *phase-complete* cycle, a double-bump is half a cycle twice; they differ on ~50% of phase support, information every amplitude/timing gate discards. Also the only per-set F4 test that structurally spares the deadlift's rotational first rep (that set's own template is rotational). Disqualified from shipping by ~6 new N=1 constants and a global-argmin debug surface; runs as a logged validator with an explicit promotion criterion (zero conflicts with correct shipped counts; per-exercise thresholds from RepCorrectionStore).
- **Rotation-plane-membership F4 discriminator (QuAD):** orthogonal to all three rejected detectors; shipped off.

### Explicitly rejected by the panel (so nobody re-proposes them)

- Gravity-phase 2π cycle counting — wrist gravity traces an **arc**, not an origin-enclosing loop; unwrapped phase never advances. (Salvage, if ever: Schmitt-trigger hysteresis on the first principal component.)
- Per-anchor gravity re-estimation — circular: CM's EKF has already re-converged tilt from the same accelerometer at quiescence; the observable is ≈0 by construction.
- a_g (gravity-projected accel) as the *segmentation* front end — amplitude scales ~1/T², a **quadratically worse** tempo confound than the velocity domain's, on exactly the near-failure sets the doctrine protects; plus walking is *more* self-similar on a_g. (a_g survives as an auxiliary confidence observable — 9 flops/frame, drift-free.)
- Replacing set discovery with raw-variance spans in the MVP — unvalidated threshold transfer against a measured 96% recall (Phase-B additive only).
- Per-set sinc gain-correction as the *primary* F5 fix — a per-set constant cannot remove within-set differential gain (fallback only).

---

## 4. Validation battery (falsification-ordered; most run free on existing captures)

1. **Synthetic gain-sweep bench:** raised-cosine pulse trains on real drift residue; measured gain must reproduce the 1−sinc curve. Theory check before touching the corpus.
2. **Time-warp invariance test:** resample real sets 0.7×–2×; counts must be invariant and MCV ∝ 1/warp. The current stack is *predicted to fail quantitatively* per H(f) — if it doesn't, the shared diagnosis is wrong. The single best kill-shot instrument; runs on existing captures for free.
3. **Injected-bias test:** add synthetic constant/linear bias; measurement path must null it exactly.
4. **Padding-only A/B:** settles the F4 edge-artifact claim honestly.
5. **Superset regression assertion:** anchor rung + ledger reproduces today's outputs bit-for-bit on the frozen corpus (CI assertion, not a metric).
6. **Limit-test protocol with instrumented ground truth:** metronome tempo ladder 1–5 s/rep, paused 2 s/10 s, explosive, grind-to-failure, negative session (walking, plate-loading, stretching), superset block; 240 fps camera truth. Ship gates: **zero new undercounts anywhere; F8 negative session yields zero sets at all rungs; SE2 full-session budget <10 s.**
7. **Minimum-jerk detectability bound** (peak accel ≥ ~5.8·h/T²) computed per residual miss — classifies every miss as sensing-floor vs algorithm, turning "residual sensing limit" from folklore into a number.
8. Swift golden fixtures per stage (note: prefix-sum MA changes float summation order — one controlled re-goldening at ~1e-12).

**Compute:** anchor + 3 rungs ≈ ≤2× today's segmentation stage; measurement path is noise. Comfortably inside the <10 s / 90 min SE2 budget. Every new primitive (running-sum MA, sinc, logistic, cadence-map FFT reuse, two-point de-bias) is a fixed-order scalar Double loop — the same parity discipline that already shipped find_peaks and the reversal gate.

---

## 5. Why this doesn't re-trip the old rejections

- **ZUPT-as-counter (rejected: undercounts 1→4):** the shelved prototype's anchors depended on detected windows. Here anchors live *inside already-confirmed boundaries* on the measurement path only — an anchor error degrades a velocity number and can never delete a rep. The measured win (abs-err 15→9) is kept; the measured failure mode is structurally removed.
- **Cadence-adaptive re-detrend (rejected: circular, boundary-fragile):** the new cadence map reads *unintegrated* accel *before* any detection, with whole-session filtering — both documented failure axes are structurally absent, and it ships as confidence, not a gate.
- **Amplitude/ROM floors (rejected: grind rep inside the phantom band):** nothing here re-introduces an absolute amplitude gate; self-scaled prominence is relative to the span's own reps.
- **Cadence-CV gate / per-interval splitting (rejected: kills grindy sets):** still dead; nothing resurrects them.
