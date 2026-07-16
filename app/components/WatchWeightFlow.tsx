/**
 * Round 6 — the weight flow, and the two ways to lift.
 *
 * Round 5 designed the weight ask as one screen. This round designs the whole
 * flow around it:
 *
 *   1. The provenance ladder — the guess comes from the plan, then history,
 *      then the set before; each screen states where its number came from.
 *      Later sets of the same lift never show a screen at all (silent
 *      carry-forward — the rest receipt shows what's assumed).
 *   2. The anomaly re-ask — when bar speed breaks the load's norm, Otto
 *      doesn't silently re-guess; it shows the evidence and asks once.
 *   3. The cold ask — first time ever, freeform: no guess exists, so none is
 *      shown. Skipping is free; Effort waits; the weight backfills tonight.
 *   4. Freeform ("Just lift") — movements Otto can't yet name get letters,
 *      not guesses. A wrong name corrupts history silently; a letter is just
 *      an unnamed measurement. Comparisons still work within the letter
 *      (A's set 3 vs A's set 1), and one evening tap names the whole cluster
 *      — once, forever.
 *
 * Same color language as Rounds 4–5: brand orange = Effort & stimulus,
 * white = counted facts, emerald = vs-norm / resolved, yellow = time,
 * amber = a measurement running below baseline or evidence for an ask.
 */

import { WatchFrame } from "./WatchJourneys";
import { PhoneFrame } from "./WatchContract";

/* =================================================================== */
/* The weight flow — one ask, four provenances                          */
/* =================================================================== */

/**
 * First set of a planned lift. The plan pre-answers the ask: the number is
 * the prescription, the provenance line says so (including the progression
 * step that put it there), and silence logs it. On a followed program this
 * is the whole weight flow — zero crown turns, all session.
 */
export function AskWeightPlan() {
  const rail = [
    { v: "145", sel: false },
    { v: "140", sel: false },
    { v: "135", sel: true },
    { v: "130", sel: false },
    { v: "125", sel: false },
  ];
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">OHP</span>
          <span className="text-zinc-500">SET 1</span>
        </div>
        <div className="flex flex-1 items-center justify-between pl-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[46px] font-semibold leading-none tracking-tight text-white">
                135
              </span>
              <span className="text-[11px] font-medium text-zinc-500">lb</span>
            </div>
            <div className="mt-2 whitespace-nowrap text-[9px] font-medium uppercase tracking-widest text-zinc-500">
              your plan · wk 3 · +5
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 pr-0.5">
            {rail.map((r) => (
              <span
                key={r.v}
                className={
                  r.sel
                    ? "rounded-md bg-white/[0.08] px-1.5 py-0.5 text-[13px] font-semibold text-white ring-1 ring-white/15"
                    : "px-1.5 text-[10px] font-medium text-zinc-700"
                }
              >
                {r.v}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-[9px] font-medium uppercase tracking-widest">
          <span className="text-zinc-600">
            Effort <span className="text-zinc-500">—</span>
          </span>
          <span className="text-yellow-400">✓ in 2s</span>
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * The anomaly re-ask. Set 4 moved 11% faster than 225 usually moves — the
 * signature of a back-off set. Otto does not silently re-guess the load; it
 * keeps the carried weight selected, states its evidence in amber, and asks
 * once. Silence still accepts — the set just carries a flag into tonight's
 * edit pass instead of a lie into the history.
 */
export function AskWeightChanged() {
  const rail = [
    { v: "245", sel: false },
    { v: "235", sel: false },
    { v: "225", sel: true },
    { v: "215", sel: false },
    { v: "205", sel: false },
  ];
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">SET 4</span>
        </div>
        <div className="flex flex-1 items-center justify-between pl-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[46px] font-semibold leading-none tracking-tight text-white">
                225
              </span>
              <span className="text-[11px] font-medium text-zinc-500">lb</span>
            </div>
            <div className="mt-2 whitespace-nowrap text-[9px] font-medium uppercase tracking-widest text-amber-400">
              +11% vs your 225 speed
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 pr-0.5">
            {rail.map((r) => (
              <span
                key={r.v}
                className={
                  r.sel
                    ? "rounded-md bg-white/[0.08] px-1.5 py-0.5 text-[13px] font-semibold text-white ring-1 ring-white/15"
                    : "px-1.5 text-[10px] font-medium text-zinc-700"
                }
              >
                {r.v}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between whitespace-nowrap text-[9px] font-medium uppercase tracking-widest">
          <span className="text-zinc-600">silent → flagged tonight</span>
          <span className="text-yellow-400">✓ in 2s</span>
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * First time ever — freeform, no plan, no history. There is no guess, so
 * none is shown: the headline honestly refuses to be a number, the rail
 * starts empty, and skipping costs nothing. Reps still count, the set still
 * banks; Effort waits for a load, and the weight backfills in one entry
 * tonight — applied to every set of the cluster at once.
 */
export function AskWeightCold() {
  const rail = ["70", "65", "60", "55", "50"];
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">EXERCISE A</span>
          <span className="text-zinc-500">SET 1</span>
        </div>
        <div className="flex flex-1 items-center justify-between pl-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[46px] font-semibold leading-none tracking-tight text-zinc-600">
                —
              </span>
              <span className="text-[11px] font-medium text-zinc-600">lb</span>
            </div>
            <div className="mt-2 whitespace-nowrap text-[9px] font-medium uppercase tracking-widest text-zinc-600">
              no guess yet · crown or skip
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 pr-0.5">
            {rail.map((v, i) => (
              <span
                key={v}
                className={
                  i === 2
                    ? "rounded-md border border-dashed border-white/20 px-1.5 py-0.5 text-[13px] font-semibold text-zinc-500"
                    : "px-1.5 text-[10px] font-medium text-zinc-700"
                }
              >
                {v}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between whitespace-nowrap text-[9px] font-medium uppercase tracking-widest">
          <span className="text-zinc-600">
            Effort <span className="text-zinc-500">waits</span>
          </span>
          <span className="text-yellow-400">skip is free</span>
        </div>
      </div>
    </WatchFrame>
  );
}

/* =================================================================== */
/* Freeform — "Just lift," letters over lies                            */
/* =================================================================== */

/**
 * Session start, on the wrist. The program is a prior, not a gate: pick a
 * routine and every ask pre-answers itself; pick "Just lift" and Otto sorts
 * the session into lettered movements instead. Or pick nothing — the session
 * starts on the first rep either way.
 */
export function WatchSessionStart() {
  const options = [
    { name: "Just lift", detail: "sorted tonight", sel: true },
    { name: "Push Day", detail: "4 lifts", sel: false },
    { name: "Full Body A", detail: "5 lifts", sel: false },
  ];
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">OTTO</span>
          <span className="text-zinc-500">6:12</span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-1.5">
          {options.map((o) => (
            <div
              key={o.name}
              className={`flex items-baseline justify-between rounded-xl px-3 py-2 ${
                o.sel ? "bg-white/[0.07] ring-1 ring-white/10" : ""
              }`}
            >
              <span
                className={
                  o.sel
                    ? "text-[16px] font-semibold text-white"
                    : "text-[12px] font-medium text-zinc-600"
                }
              >
                {o.name}
              </span>
              <span
                className={`text-[10px] font-semibold ${
                  o.sel ? "text-zinc-400" : "text-zinc-700"
                }`}
              >
                {o.detail}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-[9px] font-medium uppercase tracking-widest">
          <span className="text-zinc-600">crown ↕ to change</span>
          <span className="text-yellow-400">or just lift</span>
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * Rest, mid-freeform. The movement has no name yet, so it gets a letter —
 * not a guess. Everything that matters still works inside the letter: the
 * count, the load you gave it, and speed vs this movement's own first set.
 * Comparison over time needs identity, not a name; the name arrives tonight.
 */
export function WatchFreeformRest() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">EXERCISE A · S3</span>
          <span className="text-yellow-400">1:24</span>
        </div>
        <div className="flex flex-1 items-center justify-center gap-3">
          <span className="text-[46px] font-semibold leading-none tracking-tight text-white">
            8
          </span>
          <div className="flex flex-col">
            <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-500">
              reps
            </span>
            <span className="mt-0.5 text-[13px] font-semibold text-zinc-300">
              60 <span className="text-[10px] font-medium text-zinc-500">lb</span>
            </span>
          </div>
        </div>
        <div className="flex items-baseline justify-between whitespace-nowrap text-[11px] font-medium">
          <span>
            <span className="font-semibold text-white">−9%</span>
            <span className="text-zinc-500"> speed vs set 1</span>
          </span>
        </div>
        <div className="mt-1.5 text-[8px] font-medium uppercase tracking-widest text-zinc-700">
          named tonight · 1 tap
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * Freeform session end. The counted facts render in full — sets, letters,
 * loads, duration. What can't be computed yet isn't faked: muscle deposits
 * need names, so the footer states when they post instead of pretending.
 * The honest gap is the pitch for the evening pass.
 */
export function WatchFreeformDone() {
  const clusters = [
    { letter: "A", sets: "×4", load: "60 lb" },
    { letter: "B", sets: "×3", load: "25 lb" },
    { letter: "C", sets: "×3", load: "body" },
  ];
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">JUST LIFT</span>
          <span className="text-zinc-500">42:10</span>
        </div>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[30px] font-semibold leading-none tracking-tight text-white">
            10
          </span>
          <span className="whitespace-nowrap text-[9px] font-medium uppercase tracking-widest text-zinc-500">
            sets · 3 movements
          </span>
        </div>
        <div className="mt-2.5 flex flex-1 flex-col justify-center gap-1.5">
          {clusters.map((c) => (
            <div key={c.letter} className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/[0.08] text-[12px] font-semibold text-white ring-1 ring-white/10">
                {c.letter}
              </span>
              <span className="flex-1 text-[12px] font-semibold text-zinc-300">
                {c.sets}
              </span>
              <span className="text-[11px] font-medium text-zinc-500">{c.load}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between whitespace-nowrap text-[9px] font-medium uppercase tracking-widest">
          <span className="text-zinc-600">deposits post after naming</span>
          <span className="text-yellow-400">tonight</span>
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * The evening naming pass — one screen, the whole freeform contract.
 * Cluster A: Otto has seen this movement before, so the suggestion arrives
 * with its evidence (how many named sets it matches) and one tap accepts.
 * Cluster B: no match exists, so no guess is shown — naming it once makes
 * it auto-suggested forever, and the skipped weight backfills every set in
 * one entry. Push-ups never showed a letter at all: past ~95% confidence
 * the naming happens silently, which is where every movement ends up.
 */
export function PhoneNameClusters() {
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
        <span className="flex items-center gap-1">
          <span className="text-zinc-600">‹</span> Just lift
        </span>
        <span className="text-brand-400">Otto</span>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-[17px] font-semibold text-white">Name today&apos;s lifts</span>
        <span className="text-[11px] text-zinc-500">10 sets · 42 min</span>
      </div>

      {/* A — a suggestion with evidence */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-3.5 ring-1 ring-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-[12px] font-semibold text-white ring-1 ring-white/10">
            A
          </span>
          <span className="flex-1 text-[12px] text-zinc-300">4 sets · 60 lb</span>
          <span className="text-[10px] text-zinc-500">matches 12 named sets</span>
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 pl-[34px]">
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 ring-1 ring-emerald-500/25">
            ✓ Overhead Press
          </span>
          <span className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] text-zinc-500">
            not it
          </span>
        </div>
      </div>

      {/* B — no match, no guess */}
      <div className="mt-2 rounded-2xl bg-white/[0.04] p-3.5 ring-1 ring-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-[12px] font-semibold text-white ring-1 ring-white/10">
            B
          </span>
          <span className="flex-1 text-[12px] text-zinc-300">3 sets · 25 lb</span>
          <span className="text-[10px] text-zinc-500">no match yet</span>
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 pl-[34px]">
          <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-zinc-300 ring-1 ring-white/10">
            name it once
          </span>
          <span className="text-[10px] text-zinc-600">→ suggested forever</span>
        </div>
      </div>

      {/* C — resolved silently on the watch */}
      <div className="mt-2 flex items-center gap-2.5 rounded-2xl bg-white/[0.04] px-3.5 py-3 ring-1 ring-white/[0.06]">
        <span className="text-[12px] font-semibold text-emerald-400">✓</span>
        <span className="flex-1 text-[12px] text-zinc-300">
          Push-ups <span className="text-zinc-600">· 3 sets · auto</span>
        </span>
        <span className="text-[10px] text-zinc-500">never showed a letter</span>
      </div>

      {/* the payoff — deposits post on naming */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">On naming</span>
          <span className="text-[10px] text-zinc-500">posts to this week</span>
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="flex items-baseline text-[11px]">
            <span className="flex-1 text-zinc-400">Delts</span>
            <span className="font-semibold text-brand-300">+34</span>
          </div>
          <div className="flex items-baseline text-[11px]">
            <span className="flex-1 text-zinc-400">Biceps</span>
            <span className="font-semibold text-brand-300">+21</span>
          </div>
          <div className="flex items-baseline text-[11px]">
            <span className="flex-1 text-zinc-400">Chest</span>
            <span className="font-semibold text-brand-300">+18</span>
          </div>
        </div>
        <div className="mt-2.5 text-[10px] leading-snug text-zinc-500">
          2 taps tonight, 0 next time — a movement is named once, ever.
        </div>
      </div>
    </PhoneFrame>
  );
}
