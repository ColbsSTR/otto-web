import { WatchLiveSet } from "../components/WatchJourneys";
import {
  InstrumentReadinessProfile,
  InstrumentVerdictZones,
  InstrumentVerdictGauge,
  InstrumentVerdictList,
  InstrumentRest,
  InstrumentDone,
  PhoneInstrument,
  PhoneExerciseDetail,
  PhoneStrengthDetail,
  PhoneTargetsDetail,
} from "../components/WatchInstrument";
import {
  AskExercise,
  AskWeight,
  AskRepFix,
  InstrumentReadinessDown,
  InstrumentVerdictOverreach,
  InstrumentDoneFlat,
  InstrumentWeekClose,
  InstrumentFirstBaseline,
  InstrumentEffortCalibrating,
  PhoneEditPass,
  PhonePlanAsData,
} from "../components/WatchContract";
import {
  AskWeightPlan,
  AskWeightChanged,
  AskWeightCold,
  WatchSessionStart,
  WatchFreeformRest,
  WatchFreeformDone,
  PhoneNameClusters,
} from "../components/WatchWeightFlow";

export const metadata = {
  title: "Watch UI explorations — Otto",
  robots: { index: false },
};

/**
 * Internal comparison page: /watch-ui
 * Round 4 — one unified system. Round 3's three personas (Coach / Ledger /
 * Bank, preserved in WatchJourneys) collapse into a single instrument:
 * Ledger DNA toned down, the Bank's weekly targets as plain data, the Coach
 * reduced to timing. Whoop/Oura layering: digestible headline per glance,
 * raw data one layer deeper.
 */

const MOMENTS = [
  {
    phase: "Warmups",
    question: "“Am I on today?”",
    glance: "Today's warmup dots on the lift's load–velocity baseline",
    device: "Watch",
  },
  {
    phase: "Mid-set",
    question: "(none — hands are full)",
    glance: "A giant rep count, nothing else moving",
    device: "Watch",
  },
  {
    phase: "The ask",
    question: "(none — Otto's turn to ask)",
    glance: "Weight pre-filled from last time; one crown turn fixes it, silence accepts it",
    device: "Watch",
  },
  {
    phase: "The rack moment",
    question: "“Was that good enough?”",
    glance: "Effort + the velocity-loss zone the set landed in",
    device: "Watch",
  },
  {
    phase: "Rest",
    question: "“Where am I in the session?”",
    glance: "The clock + the last set as a receipt: weight, speed vs norm, stimulus",
    device: "Watch",
  },
  {
    phase: "Session end",
    question: "“Did today count?”",
    glance: "Load on the zone band, today's deposits in the weekly bars, the PR",
    device: "Watch",
  },
  {
    phase: "That evening",
    question: "“Am I actually getting stronger?”",
    glance: "Headline cards, with every raw layer one tap deeper",
    device: "Phone",
  },
];

const PHONE_FLOWS = [
  {
    title: "1 · Post-session summary",
    caption:
      "The landing screen after a session: Load on its mini zone band, deposits bright inside the weekly target bars, Effort by set colored by zone. Every card is a door.",
    el: <PhoneInstrument />,
  },
  {
    title: "2 · Exercise detail",
    caption:
      "One tap from “Effort by set.” The set table with zone chips, then the rawest layer Otto has: rep-by-rep bar velocity, each rep colored by cumulative velocity loss — you can watch the set cross into hypertrophy at rep 7.",
    el: <PhoneExerciseDetail />,
  },
  {
    title: "3 · Strength detail",
    caption:
      "One tap from “Bar speed.” The watch warmup chart grown up: today's load–velocity curve against 8 weeks ago, the est. 1RM it implies, and speeds at fixed loads. Proof of progress before the PR ever happens.",
    el: <PhoneStrengthDetail />,
  },
  {
    title: "4 · Weekly targets detail",
    caption:
      "One tap from “Weekly targets.” The full ledger — every muscle's account with today's deposits bright, what's left, and the week's deposits by day.",
    el: <PhoneTargetsDetail />,
  },
];

const PRINCIPLES = [
  {
    title: "Measurements, not messages",
    body:
      "Every string on screen is a number, a comparison, a count, or a classification. Meaning lives in the scale — the zone band under Effort, the baseline curve behind today's dots — never in a sentence telling the lifter what to do. The data informs the decision; the lifter makes it.",
  },
  {
    title: "Layered depth, Whoop/Oura-style",
    body:
      "The watch shows one digestible headline per moment. The phone shows the same metrics as cards with context. Every card is a door — tap through to the raw history (every set, every speed reading). Glanceable by default, exhaustive on demand.",
  },
  {
    title: "Right metric, right moment",
    body:
      "What survives from Round 3 is the timing model: readiness resolves during warmups, Effort lands at the rack, the receipt and clock own the rest period, the scoreboard closes the session. Same data story throughout — nothing appears before it's useful.",
  },
];

/* ------------------------------------------------------- Round 5 data */

const CONTRACT = [
  {
    moment: "Setup · once",
    ask: "Units, bodyweight, goal (size vs strength), training days",
    cost: "2 minutes, ever",
    decay: "Never repeats — it's where the weekly targets come from",
  },
  {
    moment: "First set of a lift",
    ask: "Confirm the detected exercise",
    cost: "0–1 taps",
    decay: "Stops appearing past ~95% detection confidence",
  },
  {
    moment: "The rack",
    ask: "Confirm the weight",
    cost: "0–1 crown turns",
    decay: "Prefill from plan or history; later sets carry forward with no screen at all",
  },
  {
    moment: "Freeform evening",
    ask: "Name a new movement's cluster",
    cost: "1 tap, once ever",
    decay: "A named movement is auto-suggested forever; past ~95% match it never asks again",
  },
  {
    moment: "Rest",
    ask: "Fix a miscount (rare)",
    cost: "1 crown turn",
    decay: "Rep counting improves per-exercise as it learns your bar path",
  },
  {
    moment: "That evening",
    ask: "The edit pass — only what Otto flagged",
    cost: "Under a minute",
    decay: "Fixes per week fall as every correction trains the model",
  },
];

const ASKS = [
  {
    title: "First set · exercise confirm",
    note: "Detection with its confidence as plain data; alternates one crown notch away. Silence accepts the top match — and past ~95% confidence this screen stops existing.",
    el: <AskExercise />,
  },
  {
    title: "The rack · the weight",
    note: "The one promised ask. Pre-filled from last session, the crown rail is the whole interaction, and doing nothing costs nothing. Effort holds at “—” until the load is confirmed — it can't finalize without it.",
    el: <AskWeight />,
  },
  {
    title: "Rest · the rep fix",
    note: "For the rare miscount: the receipt's rep number becomes the crown's target, Effort re-scores on save. Hold to flip work ↔ warmup, so a misread warmup never poisons readiness or stimulus.",
    el: <AskRepFix />,
  },
];

const BAD_DAYS = [
  {
    title: "The down morning",
    note: "Identical grammar to +4% — the dots ride below the line, the headline goes amber, and nobody consoles you. “Back-off day” is the lifter's conclusion, not Otto's sentence.",
    el: <InstrumentReadinessDown />,
  },
  {
    title: "The set that went too far",
    note: "The one place red is allowed. Speed collapsed −46%, and the deposit got smaller than the set before — past ~40% loss, extra reps buy recovery debt, and the numbers say so unprompted.",
    el: <InstrumentVerdictOverreach />,
  },
  {
    title: "The flat session",
    note: "Load below average, small deposits, no PR — rendered with exactly the good day's hierarchy. A below-average day that still banked something is simply what the account shows.",
    el: <InstrumentDoneFlat />,
  },
  {
    title: "The week that didn't close",
    note: "Sunday, 9:12pm: seven dots lit, two dark, the shortfall in numbers, the reset as a time. The streak's fate is arithmetic the lifter can do — which is precisely why it stings.",
    el: <InstrumentWeekClose />,
  },
];

const SESSION_ZERO = [
  {
    title: "Warmups · no baseline yet",
    note: "No curve exists, so none is drawn — the headline honestly refuses to be a number. Watching the baseline dots fill in over four sessions is the onboarding.",
    el: <InstrumentFirstBaseline />,
  },
  {
    title: "Rack · Effort, calibrating",
    note: "The number arrives wearing its error bars: ±6, dimmed numeral, hollow marker, the zone tagged “est.” Precision is a measurement too — stated until it's earned, with the countdown to ±2 in the footer.",
    el: <InstrumentEffortCalibrating />,
  },
];

const EVENING_CONTRACT = [
  {
    title: "The edit pass",
    note: "Otto flags what it's least sure of instead of making you proofread 44 sets. Each fix is one tap — and the accuracy card shows the asks decaying: detection and prefill climbing, fixes per week falling. The review is designed to shrink to zero.",
    el: <PhoneEditPass />,
  },
  {
    title: "The plan, as data",
    note: "Programs without a coach: the plan is yours (or just “repeat last Push Day”), Otto renders deviation as delta and next session's prefill as a capacity estimate. The crown can turn straight past it — the decision never moves.",
    el: <PhonePlanAsData />,
  },
];

/* ------------------------------------------------------- Round 6 data */

const WEIGHT_FLOW = [
  {
    moment: "First set of a planned lift",
    guess: "The plan's prescription, progression step included",
    ask: "Pre-filled — one crown turn to disagree",
    silent: "The plan's weight logs; Effort finalizes",
  },
  {
    moment: "First set of a known lift, no plan",
    guess: "Last session's weight for this lift",
    ask: "Pre-filled from history",
    silent: "Last session's weight logs; Effort finalizes",
  },
  {
    moment: "Later sets, same lift",
    guess: "The set before it",
    ask: "No screen at all — the rest receipt shows what's assumed",
    silent: "The carried weight logs",
  },
  {
    moment: "Bar speed breaks the load's norm",
    guess: "It doesn't re-guess — it shows the evidence",
    ask: "“Still 225?” — anomaly stated in amber",
    silent: "Logs as-is, flagged in tonight's edit pass",
  },
  {
    moment: "First time ever, freeform",
    guess: "Nothing — and it says so",
    ask: "Blank rail; crown or skip, skip is free",
    silent: "Reps bank, Effort waits; one evening entry fills every set",
  },
];

const WEIGHT_ASKS = [
  {
    title: "Planned lift · from the plan",
    note: "The plan pre-answers the ask: the prescription is the number, the provenance line says where it came from — wk 3, +5. On a followed program the whole weight flow is zero crown turns.",
    el: <AskWeightPlan />,
  },
  {
    title: "Known lift · from history",
    note: "Round 5's original ask, now one rung on the ladder: no plan, so last session's weight is the guess. Silence accepts, and Effort holds at “—” until the load is real.",
    el: <AskWeight />,
  },
  {
    title: "Anomaly · evidence, then the ask",
    note: "Set 4 moved +11% fast for 225 — the signature of a back-off set. Otto never silently re-guesses: it states its evidence in amber and asks once. Silence logs 225 with a flag for tonight, not a lie for the history.",
    el: <AskWeightChanged />,
  },
  {
    title: "First time · no guess shown",
    note: "No plan, no history — so no fake prefill. The headline refuses to be a number, the rail starts hollow, and skipping is free: reps still bank, Effort waits, and one evening entry backfills every set of the cluster.",
    el: <AskWeightCold />,
  },
];

const FREEFORM_WATCH = [
  {
    title: "Session start · the prior",
    note: "The program is a prior, not a gate. Pick a routine and every ask pre-answers itself; pick “Just lift” and movements get letters instead. Or pick nothing — the session starts on the first rep either way.",
    el: <WatchSessionStart />,
  },
  {
    title: "Rest · a letter, not a lie",
    note: "The movement has no name yet, so it gets a letter — never a guess. Everything real still works inside the letter: the count, the load, speed vs this movement's own first set. Identity now, the name tonight.",
    el: <WatchFreeformRest />,
  },
  {
    title: "Session end · the honest gap",
    note: "Counted facts render in full — sets, letters, loads. Muscle deposits need names, so the footer states when they post instead of pretending. The gap is the pitch for the evening pass.",
    el: <WatchFreeformDone />,
  },
];

const JOURNEY = [
  {
    phase: "Warmups",
    note: "Today's warmups plotted live on this lift's load–velocity baseline — dots riding above the line are the readiness read, resolved before the first work set.",
    el: <InstrumentReadinessProfile />,
  },
  {
    phase: "Rack moment",
    note: "Effort in neutral white; the velocity-loss zone band underneath says what the set trained. Footer: last-set speed vs norm and the stimulus deposit. No clock — you're not resting yet.",
    el: <InstrumentVerdictZones />,
  },
  {
    phase: "Rest · ~15s later",
    note: "A different job, so a different screen: the clock takes over, and the receipt beneath it is the last set as data — weight, speed vs your norm at that load, stimulus total.",
    el: <InstrumentRest />,
  },
  {
    phase: "Session end",
    note: "Three layers: what it took (Load on the same band grammar as the rack moment), what it earned (today's stimulus as the bright chunk inside each weekly target bar), anything special (the PR). Sets demote to the footer.",
    el: <InstrumentDone />,
  },
];

export default function WatchUiPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
        Internal · not linked
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
        Rounds 4–6 — the instrument, its contract, and the weight
      </h1>
      <p className="mt-3 max-w-3xl text-zinc-400">
        Round 3&apos;s three voices, combined and re-tuned: the Ledger&apos;s
        measurement-first DNA carries the hierarchy but drops to one comparison per
        glance, the Bank&apos;s weekly targets stay as plain data, and the Coach survives
        only as timing. Otto reads as a{" "}
        <span className="text-zinc-200">tool that hands you the data to decide</span> —
        not a coach that decides for you. Round 5 (below) designs what Round 4 silently
        assumed: <span className="text-zinc-200">the data contract</span> — what Otto
        asks, when, and how the asks decay — and{" "}
        <span className="text-zinc-200">the honest states</span>: bad days, first
        sessions, and the week that didn&apos;t close.
      </p>

      {/* Moment map */}
      <h2 className="mt-14 text-xl font-semibold text-white">The moment map</h2>
      <p className="mt-2 max-w-2xl text-sm text-zinc-400">
        The contract everything below follows: one question per glance, the right data at
        the right time, answered in under two seconds.
      </p>
      <div className="mt-6 overflow-hidden rounded-3xl border border-white/[0.08]">
        <div className="grid grid-cols-[120px_1fr_1.5fr_70px] gap-x-4 border-b border-white/[0.08] bg-white/[0.03] px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 max-sm:hidden">
          <span>Phase</span>
          <span>Their question</span>
          <span>The glance</span>
          <span>Where</span>
        </div>
        {MOMENTS.map((m, i) => (
          <div
            key={m.phase}
            className={`grid gap-x-4 px-6 py-3.5 text-sm sm:grid-cols-[120px_1fr_1.5fr_70px] ${
              i > 0 ? "border-t border-white/[0.06]" : ""
            }`}
          >
            <span className="font-semibold text-white">{m.phase}</span>
            <span className="text-zinc-300">{m.question}</span>
            <span className="text-zinc-400">{m.glance}</span>
            <span className="text-brand-300">{m.device}</span>
          </div>
        ))}
      </div>

      {/* Principles */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {PRINCIPLES.map((p) => (
          <div
            key={p.title}
            className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            <h2 className="text-base font-semibold text-white">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.body}</p>
          </div>
        ))}
      </div>

      {/* The journey */}
      <h2 className="mt-16 text-xl font-semibold text-white">The session, one system</h2>
      <p className="mt-2 max-w-2xl text-sm text-zinc-400">
        Bench Press day throughout: readiness +4%, set 3 = 8 reps @ 225 at Effort 86
        with 34% velocity loss (hypertrophy zone), +12 stimulus (54 today), session
        Load 8.4.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {JOURNEY.map((f) => (
          <div
            key={f.phase}
            className="flex flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            {f.el}
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-300">
              {f.phase}
            </p>
            <p className="mt-2 text-center text-xs leading-relaxed text-zinc-500">
              {f.note}
            </p>
          </div>
        ))}
      </div>

      {/* Rack moment — velocity-loss zones */}
      <h2 className="mt-16 text-xl font-semibold text-white">
        The rack moment — velocity-loss zones
      </h2>
      <p className="mt-2 max-w-3xl text-sm text-zinc-400">
        Apple&apos;s zone-band grammar — the one every Watch user already reads on HR
        zones — repurposed so each zone is a training outcome keyed to velocity loss
        within the set: recovery (0–10%), power &amp; speed (11–20%), strength (21–30%),
        hypertrophy (31–40%), overreach (41%+). This set lost 34% bar speed, so the
        marker lands in hypertrophy — the set didn&apos;t just feel hard, it trained
        size. The zone name is a classification, not a message; Effort goes neutral
        white and the zone carries the color.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        <div className="flex flex-col items-center rounded-3xl border border-brand-500/25 bg-white/[0.02] p-6">
          <InstrumentVerdictZones />
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-300">
            Zones — selected
          </p>
          <p className="mt-2 max-w-xs text-center text-xs leading-relaxed text-zinc-500">
            Outcome as a position on a familiar band. Instantly readable, zero prose.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 opacity-70">
          <div className="scale-90">
            <InstrumentVerdictGauge />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Gauge — considered
          </p>
          <p className="mt-2 max-w-xs text-center text-xs leading-relaxed text-zinc-600">
            Strong 2-second read, but one threshold mark carries less than five named
            zones.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 opacity-70">
          <div className="scale-90">
            <InstrumentVerdictList />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            List — considered
          </p>
          <p className="mt-2 max-w-xs text-center text-xs leading-relaxed text-zinc-600">
            Most data per glance; the session curve moves to the phone instead.
          </p>
        </div>
      </div>

      {/* Warmups — load–velocity profile */}
      <div className="mt-16 flex flex-col items-center gap-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:flex-row">
        <InstrumentReadinessProfile />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Warmups · the readiness picture
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">
            Today&apos;s dots on your load–velocity curve
          </h2>
          <div className="mt-2 max-w-xl space-y-3 text-sm leading-relaxed text-zinc-400">
            <p>
              Every lift has a signature: how fast the bar moves at each load. Otto
              learns that curve from past sessions (the zinc line), and today&apos;s
              warmups land on it as dots, one per set, as they happen. Dots riding
              above the line mean faster than usual at that weight — the readiness
              read as a picture, with the +4% average as the headline and the raw m/s
              in the footer.
            </p>
            <p>
              It degrades honestly: with no history there&apos;s no line, just
              today&apos;s dots — and watching the baseline assemble over the first
              few sessions communicates “it&apos;s learning your lift” better than any
              onboarding copy could.
            </p>
          </div>
        </div>
      </div>

      {/* Shared mid-set state */}
      <div className="mt-16 flex flex-col items-center gap-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 sm:flex-row sm:items-center">
        <WatchLiveSet />
        <div>
          <h2 className="text-lg font-semibold text-white">Mid-set stays sacred</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
            Unchanged from Round 3: under load the lifter can&apos;t read, so the only
            job is confirming the count is climbing. One huge number, nothing else
            moving. The verdict waits for the rack — which is also why it lands.
          </p>
        </div>
      </div>

      {/* Phone — key flows */}
      <h2 className="mt-16 text-xl font-semibold text-white">
        That evening — the phone, four flows
      </h2>
      <p className="mt-2 max-w-3xl text-sm text-zinc-400">
        The Whoop/Oura layering, now speaking the watch&apos;s language: the same zone
        palette colors every chart, deposits appear as the same bright chunk inside the
        weekly bars, and Load carries the same band. The summary answers “how was
        today?”; each chevron opens a detail flow that holds the raw layer — annotations
        state what the data shows, never what to do about it.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {PHONE_FLOWS.map((f) => (
          <div
            key={f.title}
            className="flex flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            {f.el}
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-300">
              {f.title}
            </p>
            <p className="mt-2 text-center text-xs leading-relaxed text-zinc-500">
              {f.caption}
            </p>
          </div>
        ))}
      </div>

      {/* What carried over */}
      <div className="mt-16 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
        <h2 className="text-lg font-semibold text-white">What each persona contributed</h2>
        <div className="mt-4 grid gap-6 text-sm leading-relaxed text-zinc-400 md:grid-cols-3">
          <p>
            <span className="font-semibold text-zinc-200">From the Ledger</span> — the
            hierarchy: every value paired with its comparison (vs baseline, vs norm, vs
            the 80 line), trimmed to one comparison per glance instead of three.
          </p>
          <p>
            <span className="font-semibold text-zinc-200">From the Bank</span> — weekly
            muscle targets as the retention metric, restated as data: “140/140 ✓”, not
            “you closed chest!”. The progress is the motivator; no cheerleading on top.
          </p>
          <p>
            <span className="font-semibold text-zinc-200">From the Coach</span> — only
            the timing model and the outcome semantics: “growth set” became the
            hypertrophy zone on the velocity-loss band. Interpretation moved from
            sentences into the scale.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Round 5 — the contract                                       */}
      {/* ============================================================ */}

      <div className="mt-24 border-t border-white/[0.08] pt-14">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
          Round 5
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          The contract
        </h2>
        <p className="mt-3 max-w-3xl text-zinc-400">
          The landing page promises <span className="text-zinc-200">“the only thing it
          ever asks is the weight”</span> — so the ask itself has to be designed, along
          with everything the instrument was silently assuming: what happens on the bad
          days, in the first sessions before any baseline exists, and in the evening
          when a wrong number needs fixing. One rule everywhere:{" "}
          <span className="text-zinc-200">an ask costs at most one crown turn, silence
          accepts, and every correction trains the prefill</span> — the asks are
          designed to decay.
        </p>
      </div>

      {/* The ask ledger */}
      <h3 className="mt-12 text-xl font-semibold text-white">The ask ledger</h3>
      <p className="mt-2 max-w-2xl text-sm text-zinc-400">
        Everything Otto will ever need from the lifter, priced per moment — and how
        each ask disappears over time.
      </p>
      <div className="mt-6 overflow-hidden rounded-3xl border border-white/[0.08]">
        <div className="grid grid-cols-[140px_1.5fr_110px_1.5fr] gap-x-4 border-b border-white/[0.08] bg-white/[0.03] px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 max-sm:hidden">
          <span>Moment</span>
          <span>The ask</span>
          <span>Cost</span>
          <span>How it decays</span>
        </div>
        {CONTRACT.map((c, i) => (
          <div
            key={c.moment}
            className={`grid gap-x-4 px-6 py-3.5 text-sm sm:grid-cols-[140px_1.5fr_110px_1.5fr] ${
              i > 0 ? "border-t border-white/[0.06]" : ""
            }`}
          >
            <span className="font-semibold text-white">{c.moment}</span>
            <span className="text-zinc-300">{c.ask}</span>
            <span className="text-zinc-400">{c.cost}</span>
            <span className="text-brand-300/90">{c.decay}</span>
          </div>
        ))}
      </div>

      {/* The asks */}
      <h3 className="mt-16 text-xl font-semibold text-white">
        The asks — three screens, one rule
      </h3>
      <p className="mt-2 max-w-3xl text-sm text-zinc-400">
        Mid-set stays sacred, so every ask lands where a glance is already happening:
        the first set of a lift, the rack, the rest clock. Each is pre-answered with
        Otto&apos;s best guess, and silence accepts — when the guess is right, the ask
        costs literally nothing.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {ASKS.map((f) => (
          <div
            key={f.title}
            className="flex flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            {f.el}
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-300">
              {f.title}
            </p>
            <p className="mt-2 text-center text-xs leading-relaxed text-zinc-500">
              {f.note}
            </p>
          </div>
        ))}
      </div>

      {/* Bad days */}
      <h3 className="mt-16 text-xl font-semibold text-white">
        Bad days — same grammar, no cheerleading
      </h3>
      <p className="mt-2 max-w-3xl text-sm text-zinc-400">
        Every Round 4 mock showed the good day. Retention is won on the other ones —
        so the down morning, the overreached set, the flat session, and the unclosed
        week get the same hierarchy, the same bands, the same typography. A bad number
        is allowed to just be bad; amber marks a measurement running below baseline,
        and red exists only as the overreach zone.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {BAD_DAYS.map((f) => (
          <div
            key={f.title}
            className="flex flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            {f.el}
            <p className="mt-4 text-center text-xs font-semibold uppercase tracking-wider text-amber-300/90">
              {f.title}
            </p>
            <p className="mt-2 text-center text-xs leading-relaxed text-zinc-500">
              {f.note}
            </p>
          </div>
        ))}
      </div>

      {/* Session zero */}
      <h3 className="mt-16 text-xl font-semibold text-white">
        Session zero — before there&apos;s a baseline
      </h3>
      <p className="mt-2 max-w-3xl text-sm text-zinc-400">
        Effort claims proximity to failure, and for the first few sessions that claim
        isn&apos;t yet earned. So the instrument shows its own precision: no baseline
        means no delta, an uncalibrated Effort wears ±error bars, and the countdown to
        full precision is itself a number. Trust is built by the instrument admitting
        what it doesn&apos;t know yet.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:max-w-3xl">
        {SESSION_ZERO.map((f) => (
          <div
            key={f.title}
            className="flex flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            {f.el}
            <p className="mt-4 text-center text-xs font-semibold uppercase tracking-wider text-brand-300">
              {f.title}
            </p>
            <p className="mt-2 text-center text-xs leading-relaxed text-zinc-500">
              {f.note}
            </p>
          </div>
        ))}
      </div>

      {/* The evening contract */}
      <h3 className="mt-16 text-xl font-semibold text-white">
        The evening contract — the phone closes the loop
      </h3>
      <p className="mt-2 max-w-3xl text-sm text-zinc-400">
        Two flows that make auto-tracking trustworthy and programs possible without
        breaking “tool, not coach.” The edit pass reviews only what Otto flagged and
        visibly shrinks as accuracy climbs; the plan is data the lifter authored, so
        planned-vs-actual is a measurement and next session&apos;s prefill is a
        capacity estimate — never an order.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:max-w-4xl">
        {EVENING_CONTRACT.map((f) => (
          <div
            key={f.title}
            className="flex flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            {f.el}
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-300">
              {f.title}
            </p>
            <p className="mt-2 text-center text-xs leading-relaxed text-zinc-500">
              {f.note}
            </p>
          </div>
        ))}
      </div>

      {/* Modality honesty */}
      <div className="mt-16 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
        <h3 className="text-lg font-semibold text-white">
          Modality honesty — what each lift can support
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
          Bar speed means something on a barbell. It means less on a cable stack and
          nothing on a leg press — so every exercise carries a stated tier, and no
          metric is ever faked down a tier. The zone band simply doesn&apos;t render
          where velocity loss isn&apos;t real.
        </p>
        <div className="mt-4 grid gap-6 text-sm leading-relaxed text-zinc-400 md:grid-cols-3">
          <p>
            <span className="font-semibold text-zinc-200">Full instrument</span> —
            barbell lifts: Effort, velocity-loss zones, load–velocity baseline,
            readiness, est. 1RM. The whole Round 4 system.
          </p>
          <p>
            <span className="font-semibold text-zinc-200">Effort-lite</span> — dumbbells
            &amp; most machines: sets, reps, tempo, and Effort from rep-speed decay;
            no absolute bar speed, so no baseline curve or est. 1RM. Weight logged
            per-hand for dumbbells.
          </p>
          <p>
            <span className="font-semibold text-zinc-200">Count</span> — cables,
            leg press, bodyweight: sets, reps, and stimulus from effort-weighted
            volume. Bodyweight moves use the bodyweight Otto already knows.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Round 6 — the weight, and the two ways to lift               */}
      {/* ============================================================ */}

      <div className="mt-24 border-t border-white/[0.08] pt-14">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
          Round 6
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          The weight, and the two ways to lift
        </h2>
        <p className="mt-3 max-w-3xl text-zinc-400">
          Round 5 designed the weight ask as one screen. This round prices the whole
          flow — where the guess comes from, when the screen doesn&apos;t appear at
          all, and exactly what silence costs — because{" "}
          <span className="text-zinc-200">every serious metric hangs off the load</span>:
          Effort, Load, est. 1RM, and eventually telling a back squat from a goblet.
          And it designs the split that decides how every other ask behaves:{" "}
          <span className="text-zinc-200">programmed</span>, where the plan
          pre-answers everything, and <span className="text-zinc-200">freeform</span>,
          where Otto would rather call a movement &ldquo;A&rdquo; than call it wrong.
        </p>
      </div>

      {/* The weight ladder */}
      <h3 className="mt-12 text-xl font-semibold text-white">
        The weight flow — one ask, fully priced
      </h3>
      <p className="mt-2 max-w-3xl text-sm text-zinc-400">
        The provenance ladder: plan, then history, then the set before — and each
        screen states where its number came from, because a prefill you can&apos;t
        audit is just a guess. Two rules hold on every rung:{" "}
        <span className="text-zinc-300">silence always accepts</span>, and{" "}
        <span className="text-zinc-300">a suspect number gets flagged, never
        silently rewritten</span>.
      </p>
      <div className="mt-6 overflow-hidden rounded-3xl border border-white/[0.08]">
        <div className="grid grid-cols-[1.1fr_1.1fr_1.1fr_1.1fr] gap-x-4 border-b border-white/[0.08] bg-white/[0.03] px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 max-sm:hidden">
          <span>The moment</span>
          <span>The guess comes from</span>
          <span>The ask</span>
          <span>If you stay silent</span>
        </div>
        {WEIGHT_FLOW.map((w, i) => (
          <div
            key={w.moment}
            className={`grid gap-x-4 px-6 py-3.5 text-sm sm:grid-cols-[1.1fr_1.1fr_1.1fr_1.1fr] ${
              i > 0 ? "border-t border-white/[0.06]" : ""
            }`}
          >
            <span className="font-semibold text-white">{w.moment}</span>
            <span className="text-zinc-400">{w.guess}</span>
            <span className="text-zinc-300">{w.ask}</span>
            <span className="text-brand-300/90">{w.silent}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {WEIGHT_ASKS.map((f) => (
          <div
            key={f.title}
            className="flex flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            {f.el}
            <p className="mt-4 text-center text-xs font-semibold uppercase tracking-wider text-brand-300">
              {f.title}
            </p>
            <p className="mt-2 text-center text-xs leading-relaxed text-zinc-500">
              {f.note}
            </p>
          </div>
        ))}
      </div>

      {/* Two ways to lift */}
      <h3 className="mt-16 text-xl font-semibold text-white">
        Two ways to lift — the program is a prior, not a gate
      </h3>
      <p className="mt-2 max-w-3xl text-sm text-zinc-400">
        <span className="text-zinc-200">Programmed</span>: the plan pre-answers
        names and weights, deviation renders as delta — the Round 5 flows.{" "}
        <span className="text-zinc-200">Freeform</span>: &ldquo;Just lift,&rdquo; and
        movements Otto can&apos;t yet name get letters. The principle is the same one
        behind the ±error bars:{" "}
        <span className="text-zinc-300">a wrong name corrupts your history
        silently; a letter is just an unnamed measurement</span>. Comparison needs
        identity, not a name — so speed-vs-set-1 works mid-session, and one tap
        tonight names the whole cluster, once, forever.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {FREEFORM_WATCH.map((f) => (
          <div
            key={f.title}
            className="flex flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            {f.el}
            <p className="mt-4 text-center text-xs font-semibold uppercase tracking-wider text-brand-300">
              {f.title}
            </p>
            <p className="mt-2 text-center text-xs leading-relaxed text-zinc-500">
              {f.note}
            </p>
          </div>
        ))}
      </div>

      {/* The naming pass */}
      <div className="mt-12 flex flex-col items-center gap-10 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:flex-row md:items-start">
        <PhoneNameClusters />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            That evening · the naming pass
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">
            Letters become names — once, ever
          </h3>
          <div className="mt-2 max-w-xl space-y-3 text-sm leading-relaxed text-zinc-400">
            <p>
              Three states, three honesty levels.{" "}
              <span className="text-zinc-200">A</span> arrives with a suggestion and
              its evidence — &ldquo;matches 12 named sets&rdquo; is a measurement, not
              a plea — and one tap accepts for all four sets.{" "}
              <span className="text-zinc-200">B</span> has no match, so Otto shows no
              guess: naming it once makes it auto-suggested forever, and the weight
              skipped at the rack backfills every set in one entry.{" "}
              <span className="text-zinc-200">Push-ups never showed a letter at
              all</span> — past ~95% match the naming happens silently, which is where
              every movement ends up.
            </p>
            <p>
              The payoff card is the reason to do it tonight: deposits post to the
              week the moment names exist. And the whole pass is the flywheel — every
              confirm and correction is a labeled example, which is why the letters
              get rarer every week. Freeform isn&apos;t a degraded mode; it&apos;s the
              programmed experience minus the prior, with the honesty dialed up
              instead of the guessing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
