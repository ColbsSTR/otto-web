# Otto's top-3 metrics: formulas and the algorithms under them

**Effort · Training Load · Stimulus** — the three numbers Otto actually publishes.
Readiness and Progress are in-app *events* derived from these (a ratio crossing a band,
a baseline shifting); they are consumers of this document, not subjects of it.

Grounding: everything here is built on the testbed's validated reliability hierarchy
(`VisualVectors/docs/signals_and_scoring.md`) — timing is rock solid, direct dynamics are
solid, within-set *ratios* are solid because drift cancels, absolute velocity in m/s is
never trusted. Every velocity quantity below is the **relative wrist proxy** (detrended
peak concentric vertical velocity per rep, `conc_vel_mean` units), never m/s. All
formulas are **you-vs-you**: normalized per user, per exercise. The Round 6 weight flow
supplies load; classification/naming supplies identity. Where either is missing, the
metric *waits* — it does not guess (product contract already says this: "Effort waits,"
"deposits post after naming").

---

## 0. The hinge: everything runs through one estimator

All three metrics are functions of the same small state per set:

```
(rep velocities v₁…vₙ, rep times t₁…tₙ, load L, exercise e, user u, clock time)
```

and all three hinge on **one derived quantity**:

> **R̂ = estimated reps-in-reserve (RIR) at set end.**

- **Effort** *displays* R̂ (mapped to 0–100 and zones).
- **Training Load** *weights* volume by R̂ (a hard set counts more than an easy one).
- **Stimulus** *counts reps* by R̂ (only reps near failure stimulate).

This concentrates the algorithm investment: get R̂ right (with honest uncertainty) and
all three metrics inherit it. It also concentrates the risk: a confidently-wrong R̂
corrupts all three at once, which is why R̂ must be allowed to **abstain**
("Effort — · calibrating") exactly like classification abstains with "Exercise A."

---

## 1. Effort — how close to failure was this set (per set, 0–100)

### 1.1 Primary channel: velocity decay extrapolated to the personal floor

The literature-standard fact: for a given user and lift, the velocity of the *last rep
before failure* is remarkably stable regardless of load — the **minimal velocity
threshold**. In our units it's a personal floor `v_floor(u, e)`. Reps-to-failure is then
"how many more reps until the decay line hits the floor":

```
v_ref   = max(v₁ … v₃)                      # best of first 3 reps (rep 1 can be off-tempo)
(α, β)  = TheilSen(vᵢ over last k reps)      # robust slope, k = min(4, n); β < 0 expected
R̂_vel   = max(0, (vₙ − v_floor(u,e)) / (−β))     if β < −β_min
        = R_cap (≈ 6, "not near failure")         if β ≥ −β_min  (no decay yet)
```

Why extrapolation instead of endpoint %-velocity-loss: %VL needs the whole set to have
been pushed; extrapolation reads the *trajectory* and works on submaximal sets (a 5-rep
set at 5 RIR shows a shallow slope → large R̂, correctly). Endpoint VL is kept as a
cross-check: `VL = (v_ref − vₙ)/v_ref`, and large disagreement between the two widens
uncertainty rather than picking a winner.

**Validity gate (non-negotiable):** the 10-set labeled session proved velocity dropoff is
*not universal* — it broke on the explosive goblet (−21%), the curl (−21%), and the paused
squat (+62%), and was sensible only on steady verticals. So the velocity channel only
fires when the set is velocity-coherent for its exercise family:

```
gate(e, set) = family(e) ∈ VELOCITY_VALID          # steady verticals: squat, press, dead, row…
             ∧ no intentional-tempo flag            # paused/explosive tempo work
             ∧ vel_scatter below raggedness cap     # trajectory clean enough to fit
```

Seed `VELOCITY_VALID` by rule (ballistic + rotational families off), then *learn* the
flag per family from whether the channel's R̂ agrees with confirmed-failure anchors.

### 1.2 Secondary channel: timing (always available — it's the most trusted signal we have)

Cadence lengthening is fatigue read from timestamps — no integration, works on curls and
paused squats where velocity breaks:

```
grind_time  = duration(last rep) / median(rep durations)          # 1.0 easy … 1.6+ grind
R̂_time      = g(grind_time)      # monotone map, seeded: 1.0→≥5, 1.2→3, 1.4→1, 1.6+→0
```

Plus binary grind markers that cost R̂ directly: a non-reversal on the final rep (the
reversal-gate signal reused — a real sticking-point grind), and a within-set pause
(posture-held gap, the rest-vs-pause signal reused).

### 1.3 Fusion, abstention, display

```
R̂ = inverse-variance fusion of the channels that fired
σ_R̂ grows when channels disagree or the fit was short/ragged

Effort = 100 · clamp(1 − R̂ / R_scale, 0, 1)         R_scale ≈ 8
```

Zones (the ones already in the mocks): **cruise** R̂ ≥ 5 · **productive** 2–4 ·
**grind** 0.5–2 · **overreach** ≈0 *with* form breakdown (Quality's trend-removed
scatter spiking + gyro rise — the only place red appears).

If `σ_R̂` exceeds the confidence cap, Effort displays **"—"** and the set is flagged for
the evening pass. An honest dash beats a confident lie — same principle as "Exercise A."

### 1.4 Variables to refine (ranked)

1. **`v_floor(u, e)` — the single most valuable personal constant in the whole system.**
   Cold-start from a family prior; personalize with Bayesian shrinkage from *anchored
   sets*: any set the user confirms was to-failure (an occasional evening one-tap ask —
   "was that last bench set all-out?" — or an explicit AMRAP in a program). Each anchor's
   final-rep velocity is a direct observation of the floor. ~2–3 anchors per lift
   suffices; until then Effort runs on the prior with the "calibrating" chip visible.
2. Velocity-validity gate membership + thresholds per family (`β_min`, raggedness cap).
3. The timing map `g(·)` — calibrate against anchored sets too (cheap, cross-exercise).
4. `R_scale`, zone boundaries, fusion weights, fit window `k`.
5. Reference-velocity choice (best-of-3 vs median-of-3) — decide on data, trivially A/B-able offline.

---

## 2. Training Load — systemic dose (per session, then rolling)

### 2.1 Per-set contribution

Tonnage alone lies (1×5 @ 80% ≠ 5×5 @ 40% in stress) and RPE-minutes alone lie (ignores
what was lifted). The honest wrist version is **relative volume × effort weighting**:

```
relLoad    = L / ê1RM(u, e)                        # dimensionless %1RM, comparable across lifts
effortMult = 1 + γ · clamp((R_mult − R̂) / R_mult, 0, 1)      # γ ≈ 1.0, R_mult ≈ 5
SetLoad    = reps · relLoad · effortMult
```

An easy set (R̂ ≥ 5) counts its relative tonnage ×1; a to-failure set counts ×(1+γ)≈2.
This is the set-level analogue of session-RPE, but computed, not asked.

**Missing pieces degrade gracefully, never invent:** load unknown (skipped cold ask) →
the set contributes a TUT-based work placeholder with a wide σ and a "load pending" flag;
the evening backfill *recomputes* it exactly. Identity unknown ("Exercise B") → relLoad
uses a whole-body prior ê1RM with wide σ. Load provenance (plan / history /
carry-forward / confirmed) sets the σ on L itself — a rung-4 anomaly-flagged weight
carries its flag into the session's uncertainty.

### 2.2 Session and rolling

```
SessionLoad = Σ SetLoad                    # + a small session-duration term? No — keep pure; duration is its own fact.
LoadIndex   = SessionLoad / median(SessionLoad over trailing 28 d)     # 1.0 = your typical day

Acute  A_t  = EWMA(daily load, half-life ≈ 3.5 d)
Chronic C_t = EWMA(daily load, half-life ≈ 14 d)
ACR         = A_t / C_t                    # undefined (→ "building baseline") for first ~21 d
```

EWMA over windowed averages deliberately (smoother, no cliff when a big day exits a 7-day
window). ACR bands, Foster monotony/strain, and baseline z-scores are the **Readiness
event feed** — computed here, interpreted there.

**HR stays out, by principle** (`signals_and_scoring.md`): HR is metabolic cost, and
folding it in punishes exactly the heaviest strength work. It ships alongside as its own
axis (session avg/peak, per-set peak already captured), and HR-recovery-between-sets
feeds Readiness, not Load.

### 2.3 The load-side algorithm: ê1RM from two estimators

```
Reps-based (valid only when R̂ ≤ 2):   ê1RM_epley = L · (1 + (reps + R̂) / 30)
Velocity-based (per u, e):             fit  v_first = a − b·L   online (RLS, forgetting λ)
                                       ê1RM_vel = (a − v_floor(u,e)) / b
Fuse: inverse-variance. Publish nothing until σ is tight ("calibrating").
```

The velocity-based one works *despite* uncalibrated units because user, exercise, and
wrist are held constant — the proxy units cancel in the ratio. And the same fitted line
is **exactly the anomaly detector the Round 6 weight re-ask needs**: observed first-rep
velocity vs predicted-for-claimed-load ("+11% vs your 225 speed") is one subtraction on
this model. One algorithm, two product surfaces.

### 2.4 Variables to refine

1. `effortMult` shape (γ, R_mult; linear vs exponential — does a failure set cost 2× or 3× an easy one?).
2. EWMA half-lives (3.5/14 d are literature seeds; strength-only training may want longer chronic).
3. RLS forgetting factor λ (how fast ê1RM tracks a strength gain vs noise).
4. The unknown-load TUT placeholder coefficient (only matters until the evening backfill).
5. Whether isolation lifts' relLoad needs a family scalar (a curl at 90% ê1RM is not a squat at 90%) — likely fold into effortMult per family, decide on data.

---

## 3. Stimulus — hypertrophy dose per muscle (per set → session → week)

### 3.1 Stimulating reps (the effective-reps model, made soft)

Stimulus concentrates in reps near failure. Rep *i* (counting back from set end) sits at
distance `R̂ + (n − i)` from failure; weight it with a logistic:

```
s(r)          = 1 / (1 + exp((r − r₀) / τ))        # r₀ ≈ 3, τ ≈ 1  → ~last 5 reps before failure count
StimReps_set  = m_load · Σᵢ s(R̂ + n − i)
m_load        = clamp((relLoad − 0.20) / 0.15, 0, 1)   # 0 below 20 %1RM, full credit ≥ 35 %1RM
```

`m_load` encodes the load-threshold finding (light loads to failure ≈ equivalent
hypertrophy *above ~30 %1RM*; below that, junk) and guards against warmups/carrying
counting as stimulus. A 8-rep set ending at R̂=1 yields ≈ 3.9 StimReps; the same 8 reps
at R̂=5 yields ≈ 0.6. That asymmetry **is** the metric.

### 3.2 Per-muscle routing: the involvement matrix

```
Deposit(m) = Involvement[e][m] · StimReps_set
```

`Involvement` is exercises × ~13 muscle groups, values 0–1: prime mover 1.0, strong
synergist 0.4–0.7, stabilizer 0.1–0.25. **Seeded from EMG literature + coaching
consensus as static data, human-editable, versioned** — not learned (a wrist can't
observe muscle activation; pretending otherwise is the kind of dishonesty Otto doesn't
do). Variant-level rows adjust the split (incline bench shifts chest→front delt), which
is precisely why the classification audit's firewalled **variant axis** matters to this
metric, not just to naming.

### 3.3 Aggregation and the honesty gates

```
SessionStim(m) = S_max · (1 − exp(−k · Σ_session Deposit(m)))     # within-day saturation, k ≈ 0.15
WeeklyStim(m)  = Σ_days SessionStim(m)                            # no weekly saturation; compare to band
```

Session saturation encodes diminishing returns of the 9th hard set for one muscle in one
day. Weekly values render against per-muscle target **bands** (MEV→MRV-shaped, seeded
~15–60 weekly StimReps ≈ 4–15 hard sets) — bands are a Progress/Readiness concern; the
deposit numbers ("Delts +34") are this metric.

Gates, matching Round 6 exactly: **no identity → no deposit** (letters accrue counted
facts; deposits post the moment naming resolves — the evening screen's payoff card is
literally this recompute). **No load → m_load falls back to family-typical relLoad with
a flag**, corrected by backfill. R̂ uncertain → StimReps carries σ; a week built on dashes
shows a hollow bar, not a made-up one.

### 3.4 Variables to refine

1. `Involvement` matrix values + variant deltas (the largest hand-authored surface; ship v1 from literature, revise from user edits/complaints, never auto-learn silently).
2. `r₀, τ` (how deep the stimulating zone reaches — the field argues 4 vs 6 reps; pick 5 and move on).
3. `m_load` ramp endpoints (0.20/0.35).
4. Session saturation `k`, `S_max`; weekly bands per muscle.
5. Whether eccentric-only/paused work deserves a TUT bonus term — park until eccentric control ships in Quality.

---

## 4. The fundamental algorithms (build list)

Ordered so each unlocks the ones after it. ✅ = exists in the testbed today.

| # | Algorithm | Feeds | Status |
|---|-----------|-------|--------|
| 1 | Per-rep concentric velocity proxy (integrate + detrend; **ZUPT front-end** is the shelf-ready upgrade — abs-err 15→9 on true windows) | everything | ✅ / upgrade shelved |
| 2 | Rep segmentation + reversal gate + rescue pass | everything | ✅ shipped, parity |
| 3 | Within-set decay fit + floor extrapolation (Theil–Sen, last-k) → `R̂_vel` | Effort | **build** |
| 4 | Timing channel `R̂_time` (cadence lengthening + grind markers) | Effort | build (features ✅, map new) |
| 5 | Velocity-validity gate per family | Effort | build (seed rules → learned flag) |
| 6 | `v_floor(u,e)` learner: family prior + Bayesian shrinkage from failure-anchored sets | Effort, ê1RM | **build — highest-value constant** |
| 7 | Channel fusion + σ propagation + abstain thresholds | all three | build |
| 8 | Load–velocity profile per (u,e): online RLS with forgetting → ê1RM + weight-anomaly detector | Load, weight re-ask | **build — one algo, two surfaces** |
| 9 | ê1RM fusion (Epley-from-R̂ ⊕ velocity-based) | Load, Stimulus | build |
| 10 | EWMA acute/chronic + ACR + baseline z-scores | Load → Readiness events | build (trivial math, careful states) |
| 11 | Involvement matrix + variant adjustment + stimulus aggregation | Stimulus | build (data authoring > code) |
| 12 | **Deterministic recompute**: metrics are pure functions of the edited record | all | **architecture requirement** |

\#12 is the quiet load-bearing one: the evening pass (rep fixes, weight backfill, cluster
naming) must replay the day and land on exactly the numbers a correct live session would
have produced. So metrics are **derived, never stored as truth** — store the record
(reps, times, velocities, loads, names, provenance), recompute the rest. This is also
what makes "deposits post after naming" a one-liner instead of a migration.

## 5. What to validate first (cheapest decisive experiments)

1. **Does the wrist proxy see the decay at all?** On existing labeled captures: fit the
   last-k decay line per set, check slope sign/monotonicity on the steady verticals and
   confirm the gate correctly excludes curl/paused/explosive. Zero new data needed.
2. **Floor stability probe (the Effort kill-shot):** 2–3 sets to genuine failure on one
   lift across different loads/days — is final-rep proxy velocity stable within ~±10%?
   If yes, `v_floor` is real in our units and Effort stands. If no, Effort's primary
   channel demotes to the timing channel and we say so.
3. **Load–velocity linearity probe:** one session, same lift, 3–4 loads, fresh sets —
   is first-rep proxy velocity vs load monotone and roughly linear per user? Gates ê1RM
   and the anomaly re-ask threshold.
4. **R̂ vs perceived RIR:** for a few weeks of the user's own training, log honest RIR at
   set end (evening, not mid-set); compare channels. This is also exactly the data the
   Stranger Test (experiment #9) should collect per participant.
