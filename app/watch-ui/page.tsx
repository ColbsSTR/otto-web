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
        Round 4 — the instrument
      </h1>
      <p className="mt-3 max-w-3xl text-zinc-400">
        Round 3&apos;s three voices, combined and re-tuned: the Ledger&apos;s
        measurement-first DNA carries the hierarchy but drops to one comparison per
        glance, the Bank&apos;s weekly targets stay as plain data, and the Coach survives
        only as timing. Otto reads as a{" "}
        <span className="text-zinc-200">tool that hands you the data to decide</span> —
        not a coach that decides for you.
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
    </div>
  );
}
