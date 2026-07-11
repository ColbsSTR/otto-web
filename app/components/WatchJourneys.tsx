/**
 * Round 3 — full-session journeys.
 * Instead of density variants of one moment, each concept carries the lifter
 * through the phases of a session, answering one question per glance:
 *   Warmups    → "Am I on today?"        (readiness from warmup bar speed)
 *   Mid-set    → nothing — hands full    (giant rep count only)
 *   Rack       → "Was that good enough?" (Effort + what it means)
 *   Rest       → "What do I do next?"    (timer + a prescription)
 *   Done       → "Did today count?"      (closure: load, banked, streak)
 *   Evening    → "Am I getting stronger?" (the phone: story + proof)
 *
 * Shared data story: Push Day. Warmup bar speed +4% vs baseline (green light).
 * Bench set 3: 8 reps @ 225, Effort 86, ~2 left. Efforts today 72→78→82→86.
 * Chest stimulus 124/140 for the week (+38 today). Session: Load 8.4, 1 PR,
 * 6-week streak.
 * Color language: brand orange = Effort & stimulus earned, white = counted
 * facts, emerald = readiness / in the tank / verdicts, yellow = time.
 */

const TODAY_EFFORTS = [72, 78, 82, 86];

/* ------------------------------------------------------------- shells */

export function WatchFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[208px] shrink-0 rounded-[58px] bg-gradient-to-b from-zinc-700 to-zinc-900 p-[6px] shadow-2xl shadow-black/60 ring-1 ring-white/10">
      <div className="absolute -right-[5px] top-[34%] h-12 w-[5px] rounded-r-md bg-zinc-600" />
      <div className="absolute -right-[4px] top-[52%] h-9 w-[4px] rounded-r-md bg-zinc-700" />
      <div className="relative aspect-[184/224] overflow-hidden rounded-[52px] bg-black">
        {children}
      </div>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[280px] shrink-0 rounded-[46px] bg-gradient-to-b from-zinc-700 to-zinc-900 p-[10px] shadow-2xl shadow-black/60 ring-1 ring-white/10">
      <div className="relative overflow-hidden rounded-[37px] bg-[#0c0c0e]">
        <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="px-5 pb-7 pt-12">{children}</div>
      </div>
    </div>
  );
}

function TrendBars({
  barWidth = 4,
  height = 14,
}: {
  barWidth?: number;
  height?: number;
}) {
  return (
    <div className="flex items-end gap-[3px]" style={{ height }}>
      {TODAY_EFFORTS.map((v, i) => (
        <div
          key={i}
          className={`rounded-[1px] ${
            i === TODAY_EFFORTS.length - 1 ? "bg-brand-400" : "bg-zinc-700"
          }`}
          style={{ width: barWidth, height: `${v}%` }}
        />
      ))}
    </div>
  );
}

function WatchHeader({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
      <span className="text-zinc-500">{left}</span>
      <span className="text-zinc-500">{right}</span>
    </div>
  );
}

/* =================================================================== */
/* Shared foundation — the mid-set state every concept uses            */
/* =================================================================== */

/**
 * Mid-set, the lifter physically cannot read the watch — arms loaded, head
 * moving. One number, huge enough for peripheral vision, and nothing that
 * changes except it. The reassurance being sold: "it's counting, keep going."
 */
export function WatchLiveSet() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-6 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-yellow-400">32:14</span>
          <span className="text-zinc-500">BENCH · SET 3</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <span className="text-[88px] font-semibold leading-none tracking-tight text-white">
            6
          </span>
          <span className="mt-2 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            reps
          </span>
        </div>
        <div className="flex items-center justify-between text-[10px] font-medium text-zinc-600">
          <span>225 LB</span>
          <span>
            <span className="text-zinc-400">142</span> BPM
          </span>
        </div>
      </div>
    </WatchFrame>
  );
}

/* =================================================================== */
/* Concept 1 · THE COACH — verdict first, numbers as evidence           */
/* =================================================================== */

/** Warmups: the readiness answer as a sentence, not a percentage. */
export function CoachReadiness() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-6 py-6">
        <WatchHeader left="BENCH" right="LAST WARMUP" />
        <div className="flex flex-1 flex-col items-start justify-center">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="text-[26px] font-semibold leading-tight tracking-tight text-emerald-400">
              Green light.
            </span>
          </span>
          <span className="mt-2 text-[12px] leading-snug text-zinc-300">
            Bar speed <span className="font-semibold text-white">+4%</span> vs your
            baseline.
          </span>
        </div>
        <div className="rounded-2xl bg-emerald-500/10 px-3.5 py-2.5 text-[11px] font-medium leading-snug text-emerald-300">
          It&apos;s a day to push. 225 should move well.
        </div>
      </div>
    </WatchFrame>
  );
}

/** Rack moment: the verdict word carries the meaning; 86 is the receipt. */
export function CoachSetVerdict() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-6 py-6">
        <WatchHeader left="BENCH · SET 3" right={<span className="text-yellow-400">32:14</span>} />
        <div className="flex flex-1 flex-col justify-center">
          <span className="text-[24px] font-semibold leading-tight tracking-tight text-white">
            Growth set.
          </span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-[34px] font-semibold leading-none tracking-tight text-brand-400">
              86
            </span>
            <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-500">
              Effort
            </span>
            <span className="ml-auto text-[20px] font-semibold leading-none text-white">8</span>
            <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-500">
              reps
            </span>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5 text-[11px] font-medium leading-snug text-zinc-300">
          Stopped <span className="font-semibold text-emerald-400">~2 shy</span> of failure
          — right where muscle is made.
        </div>
      </div>
    </WatchFrame>
  );
}

/** Rest: a prescription, so the next set starts with a plan instead of a shrug. */
export function CoachRest() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <WatchHeader left="BENCH · REST" right="3 / 4" />
        <div className="flex flex-1 flex-col items-center justify-center">
          <span className="text-[38px] font-semibold leading-none tracking-tight text-yellow-400">
            1:24
          </span>
          <div className="mt-2 h-1 w-28 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[56%] rounded-full bg-yellow-400" />
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
          <div className="text-[8px] font-medium uppercase tracking-widest text-zinc-500">
            Next set
          </div>
          <div className="mt-0.5 text-[14px] font-semibold text-white">
            225 lb · aim for 8
          </div>
          <div className="mt-0.5 text-[10px] font-medium text-emerald-400">
            You&apos;ve got a 9 in you today.
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] font-medium text-zinc-600">
          <span>
            STIM <span className="text-brand-300">+54</span>
          </span>
          <span>
            <span className="text-zinc-400">128</span> BPM
          </span>
        </div>
      </div>
    </WatchFrame>
  );
}

/** Session end: closure in plain words — the "it counted" moment. */
export function CoachDone() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-6 py-6">
        <WatchHeader left="PUSH DAY" right="47:32" />
        <div className="flex flex-1 flex-col justify-center">
          <span className="text-[22px] font-semibold leading-tight tracking-tight text-white">
            Today counted.
          </span>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-[32px] font-semibold leading-none tracking-tight text-brand-400">
              8.4
            </span>
            <span className="whitespace-nowrap text-[9px] font-medium uppercase tracking-widest text-zinc-500">
              Load
            </span>
            <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
              Hard
            </span>
          </div>
          <div className="mt-3 space-y-1 text-[11px] font-medium">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Check /> Chest fully banked for the week
            </div>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Check /> 6-week streak alive
            </div>
          </div>
        </div>
        <div className="text-center text-[10px] font-medium text-zinc-600">
          Full story on your phone →
        </div>
      </div>
    </WatchFrame>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 text-emerald-400" fill="none">
      <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Evening: the debrief — what went well, and what to do next time. */
export function PhoneCoach() {
  const highlights = [
    "All 4 bench sets in the growth zone",
    "Top-set bar speed +3% vs last week",
    "Chest banked for the week (+38)",
  ];
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
        <span>Push Day · Today</span>
        <span className="text-brand-400">Otto</span>
      </div>

      <div className="mt-4 rounded-3xl bg-gradient-to-b from-brand-500/15 to-transparent p-5 ring-1 ring-brand-500/20">
        <div className="text-[11px] font-medium uppercase tracking-widest text-brand-300">
          The verdict
        </div>
        <div className="mt-1.5 text-[19px] font-semibold leading-snug text-white">
          Your strongest push day in six weeks.
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[26px] font-semibold leading-none text-white">8.4</span>
          <span className="whitespace-nowrap text-[11px] text-zinc-500">/ 10 Load</span>
          <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
            Hard
          </span>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <span className="text-[12px] font-medium text-zinc-300">What went well</span>
        <div className="mt-2.5 space-y-2">
          {highlights.map((h) => (
            <div key={h} className="flex items-start gap-2 text-[12px] leading-snug text-zinc-300">
              <span className="mt-0.5">
                <Check />
              </span>
              {h}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-emerald-500/[0.07] p-4 ring-1 ring-emerald-500/15">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-400">
          Next time
        </span>
        <p className="mt-1.5 text-[12px] leading-snug text-zinc-200">
          Add 5 lb to bench. 225 is moving faster than it did all month — you&apos;ve
          earned the jump.
        </p>
      </div>
    </PhoneFrame>
  );
}

/* =================================================================== */
/* Concept 2 · THE LEDGER — every number is a delta or a trend          */
/* =================================================================== */

/** Warmups: readiness as the raw measurement, with the baseline receipts. */
export function LedgerReadiness() {
  const baseline = [38, 42, 40, 46, 44, 52];
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-6 py-6">
        <WatchHeader left="BENCH · WU 3/3" right="9:41" />
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex items-baseline gap-2">
            <span className="text-[42px] font-semibold leading-none tracking-tight text-emerald-400">
              +4%
            </span>
            <span className="whitespace-nowrap text-[9px] font-medium uppercase tracking-widest text-zinc-500">
              vs base
            </span>
          </div>
          <div className="mt-2.5 flex items-baseline gap-1 whitespace-nowrap text-[11px] font-medium">
            <span className="font-semibold text-white">0.46</span>
            <span className="text-zinc-500">m/s</span>
            <span className="text-zinc-700">·</span>
            <span className="text-zinc-500">base 0.44</span>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-[3px]" style={{ height: 16 }}>
            {baseline.map((v, i) => (
              <div
                key={i}
                className={`w-[5px] rounded-[1px] ${
                  i === baseline.length - 1 ? "bg-emerald-400" : "bg-zinc-700"
                }`}
                style={{ height: `${(v / 52) * 100}%` }}
              />
            ))}
          </div>
          <span className="whitespace-nowrap text-[9px] font-medium uppercase tracking-widest text-zinc-600">
            baseline ↗
          </span>
        </div>
      </div>
    </WatchFrame>
  );
}

/** Rack moment: Effort with its delta, today's curve beside it. */
export function LedgerSet() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-6 py-6">
        <WatchHeader
          left="BENCH · SET 3"
          right={<span className="text-emerald-400">+4% BASE</span>}
        />
        <div className="flex flex-1 flex-col justify-center gap-2.5">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[42px] font-semibold leading-none tracking-tight text-brand-400">
                86
              </span>
              <div className="mt-1 text-[9px] font-medium uppercase tracking-widest text-zinc-500">
                Effort <span className="text-emerald-400">+4 vs S2</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <TrendBars barWidth={7} height={28} />
              <span className="mt-1 text-[9px] font-medium uppercase tracking-widest text-zinc-600">
                today ↗
              </span>
            </div>
          </div>
          <div className="flex items-baseline gap-1 whitespace-nowrap text-[12px] font-medium">
            <span className="font-semibold text-white">8</span>
            <span className="text-zinc-500">reps</span>
            <span className="text-zinc-700">·</span>
            <span className="font-semibold text-emerald-400">~2 left</span>
            <span className="text-zinc-700">·</span>
            <span className="text-zinc-500">225 lb</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] font-medium text-zinc-600">
          <span>
            STIM <span className="text-brand-300">+18 → 54</span>
          </span>
          <span>
            <span className="text-zinc-400">128</span> BPM
          </span>
        </div>
      </div>
    </WatchFrame>
  );
}

/** Rest: the clock plus the exact spec for the next set. */
export function LedgerRest() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <WatchHeader left="BENCH · REST" right="3 / 4" />
        <div className="flex flex-1 items-center justify-between px-1">
          <div>
            <span className="text-[36px] font-semibold leading-none tracking-tight text-yellow-400">
              1:24
            </span>
            <div className="mt-1 text-[9px] font-medium uppercase tracking-widest text-zinc-500">
              of 2:30
            </div>
          </div>
          <div className="text-right">
            <span className="text-[22px] font-semibold leading-none text-white">128</span>
            <div className="mt-1 text-[9px] font-medium uppercase tracking-widest text-zinc-500">
              BPM <span className="text-emerald-400">↘ 71%</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 rounded-2xl bg-white/[0.06] px-3 py-2.5 text-center">
          <div>
            <div className="text-[13px] font-semibold text-white">S4</div>
            <div className="text-[8px] font-medium uppercase tracking-widest text-zinc-500">next</div>
          </div>
          <div className="border-l border-white/10">
            <div className="text-[13px] font-semibold text-white">225</div>
            <div className="text-[8px] font-medium uppercase tracking-widest text-zinc-500">lb</div>
          </div>
          <div className="border-l border-white/10">
            <div className="text-[13px] font-semibold text-white">8</div>
            <div className="text-[8px] font-medium uppercase tracking-widest text-zinc-500">target</div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] font-medium text-zinc-600">
          <span>
            STIM <span className="text-brand-300">+54</span>
          </span>
          <TrendBars />
        </div>
      </div>
    </WatchFrame>
  );
}

/** Session end: the full ledger in one glance — a scoreboard, not a story. */
export function LedgerDone() {
  const week = [62, 0, 78, 0, 84, 91, 0];
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <WatchHeader left="PUSH DAY" right="47:32" />
        <div className="mt-1 grid flex-1 grid-cols-2">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[26px] font-semibold leading-none tracking-tight text-brand-400">
              8.4
            </span>
            <span className="mt-0.5 text-[8px] font-medium uppercase tracking-widest text-zinc-500">
              load
            </span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-white/10">
            <span className="text-[26px] font-semibold leading-none tracking-tight text-brand-300">
              +54
            </span>
            <span className="mt-0.5 text-[8px] font-medium uppercase tracking-widest text-zinc-500">
              stim
            </span>
          </div>
          <div className="flex flex-col items-center justify-center border-t border-white/10">
            <span className="text-[26px] font-semibold leading-none tracking-tight text-white">
              12
            </span>
            <span className="mt-0.5 text-[8px] font-medium uppercase tracking-widest text-zinc-500">
              sets
            </span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-t border-white/10">
            <span className="text-[26px] font-semibold leading-none tracking-tight text-emerald-400">
              1
            </span>
            <span className="mt-0.5 text-[8px] font-medium uppercase tracking-widest text-zinc-500">
              PR
            </span>
          </div>
        </div>
        <div className="mt-1.5 flex items-end justify-between">
          <div className="flex items-end gap-[3px]" style={{ height: 14 }}>
            {week.map((v, i) => (
              <div
                key={i}
                className={`w-[6px] rounded-[1px] ${
                  v === 0
                    ? "h-[2px] bg-zinc-800"
                    : i === 5
                      ? "bg-brand-400"
                      : "bg-zinc-700"
                }`}
                style={v ? { height: `${v}%` } : undefined}
              />
            ))}
          </div>
          <span className="text-[8px] font-medium uppercase tracking-widest text-zinc-600">
            biggest in 3 wk
          </span>
        </div>
      </div>
    </WatchFrame>
  );
}

/** Evening: the proof — set-by-set efforts and the strength curve itself. */
export function PhoneLedger() {
  const sets = [
    { ex: "B", v: 72 },
    { ex: "B", v: 78 },
    { ex: "B", v: 82 },
    { ex: "B", v: 86 },
    { ex: "I", v: 74 },
    { ex: "I", v: 80 },
    { ex: "I", v: 84 },
    { ex: "C", v: 70 },
    { ex: "C", v: 76 },
    { ex: "C", v: 81 },
  ];
  const muscles = [
    { name: "Chest", banked: 124, target: 140 },
    { name: "Triceps", banked: 87, target: 140 },
    { name: "Front delts", banked: 75, target: 140 },
  ];
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
        <span>Push Day · Today</span>
        <span className="text-brand-400">Otto</span>
      </div>

      {/* Effort by set */}
      <div className="mt-4 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] font-medium text-zinc-300">Effort by set</span>
          <span className="text-[10px] text-zinc-500">growth zone ≥ 80</span>
        </div>
        <div className="relative mt-3 h-[72px]">
          {/* zone line */}
          <div className="absolute inset-x-0 top-[20%] border-t border-dashed border-white/15" />
          <div className="flex h-full items-end gap-[5px]">
            {sets.map((s, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-[2px] ${
                  s.v >= 80 ? "bg-gradient-to-t from-brand-500 to-brand-400" : "bg-zinc-700"
                }`}
                style={{ height: `${s.v}%` }}
              />
            ))}
          </div>
        </div>
        <div className="mt-2 text-[10px] text-zinc-500">
          <span className="font-semibold text-brand-300">6 of 10</span> sets in the growth
          zone — your densest session this month.
        </div>
      </div>

      {/* Bar speed trend */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] font-medium text-zinc-300">Bar speed @ 225 lb</span>
          <span className="text-[11px] font-semibold text-emerald-400">+7% / 8 wks</span>
        </div>
        <svg viewBox="0 0 220 56" className="mt-2 h-[56px] w-full">
          <polyline
            points="4,44 36,40 68,42 100,34 132,30 164,24 196,18 216,12"
            fill="none"
            stroke="#34d399"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="216" cy="12" r="3" fill="#34d399" />
        </svg>
        <div className="text-[10px] text-zinc-500">
          Same weight, moving faster — strength you can see before the PR.
        </div>
      </div>

      {/* Weekly muscle ledger */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <span className="text-[12px] font-medium text-zinc-300">Stimulus · this week</span>
        <div className="mt-2.5 space-y-2">
          {muscles.map((m) => (
            <div key={m.name} className="flex items-center gap-2.5">
              <span className="w-[64px] text-[11px] text-zinc-400">{m.name}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-500"
                  style={{ width: `${(m.banked / m.target) * 100}%` }}
                />
              </div>
              <span className="w-14 text-right text-[11px] font-semibold text-white">
                {m.banked}
                <span className="font-normal text-zinc-600"> / {m.target}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

/* =================================================================== */
/* Concept 3 · THE BANK — every set visibly fills something             */
/* =================================================================== */

function MuscleBar({
  name,
  pct,
  note,
  highlight = false,
}: {
  name: string;
  pct: number;
  note?: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-[10px] font-medium">
        <span className={highlight ? "text-white" : "text-zinc-400"}>{name}</span>
        {note && <span className="text-zinc-500">{note}</span>}
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${
            pct >= 100
              ? "bg-emerald-400"
              : "bg-gradient-to-r from-brand-400 to-brand-500"
          }`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  );
}

/** Warmups: what today can close, plus the readiness pill as a go signal. */
export function BankStart() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-6 py-6">
        <WatchHeader
          left="PUSH DAY"
          right={<span className="text-emerald-400">+4% · GO</span>}
        />
        <div className="flex flex-1 flex-col justify-center">
          <span className="text-[19px] font-semibold leading-tight tracking-tight text-white">
            Chest is 16 from closing.
          </span>
          <div className="mt-3.5 space-y-3">
            <MuscleBar name="Chest" pct={89} note="124 / 140" highlight />
            <MuscleBar name="Triceps" pct={62} note="87 / 140" />
            <MuscleBar name="Front delts" pct={54} note="75 / 140" />
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] font-medium text-zinc-600">
          <span>🔥 6-WEEK STREAK</span>
          <span>WK 42</span>
        </div>
      </div>
    </WatchFrame>
  );
}

/** Rack moment: the deposit is the hero; Effort explains its size. */
export function BankSet() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-6 py-6">
        <WatchHeader left="BENCH · SET 3" right="32:14" />
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex items-baseline gap-2">
            <span className="text-[40px] font-semibold leading-none tracking-tight text-brand-400">
              +18
            </span>
            <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-500">
              chest
            </span>
          </div>
          <div className="mt-2.5">
            <MuscleBar name="Chest · this week" pct={89} note="124 / 140" highlight />
          </div>
          <div className="mt-3 flex items-baseline gap-1.5 text-[12px] font-medium">
            <span className="font-semibold text-brand-400">86</span>
            <span className="text-zinc-500">effort</span>
            <span className="text-zinc-700">·</span>
            <span className="font-semibold text-white">8</span>
            <span className="text-zinc-500">reps</span>
          </div>
        </div>
        <div className="rounded-2xl bg-brand-500/10 px-3.5 py-2 text-[10px] font-medium text-brand-200">
          Hard set, big deposit — that&apos;s the deal.
        </div>
      </div>
    </WatchFrame>
  );
}

/** Rest: the goal-gradient nudge — one set from closing the week. */
export function BankRest() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <WatchHeader left="BENCH · REST" right="3 / 4" />
        <div className="flex flex-1 flex-col items-center justify-center">
          <span className="text-[38px] font-semibold leading-none tracking-tight text-yellow-400">
            1:24
          </span>
          <div className="mt-2 h-1 w-28 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[56%] rounded-full bg-yellow-400" />
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
          <div className="text-[12px] font-semibold leading-snug text-white">
            One more hard set closes chest for the week.
          </div>
          <div className="mt-2">
            <MuscleBar name="Chest" pct={89} note="16 to go" highlight />
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] font-medium text-zinc-600">
          <span>
            STIM <span className="text-brand-300">+54</span>
          </span>
          <span>
            <span className="text-zinc-400">128</span> BPM
          </span>
        </div>
      </div>
    </WatchFrame>
  );
}

/** Session end: things visibly closed — the ring-culture payoff for lifting. */
export function BankDone() {
  const muscleWeek = [
    { name: "Chest", done: true },
    { name: "Tri", done: true },
    { name: "Delt", done: true },
    { name: "Back", done: true },
    { name: "Bi", done: true },
    { name: "Quad", done: true },
    { name: "Ham", done: true },
    { name: "Glute", done: false },
    { name: "Calf", done: false },
  ];
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-6 py-6">
        <WatchHeader left="PUSH DAY" right="47:32" />
        <div className="flex flex-1 flex-col justify-center">
          <span className="flex items-center gap-1.5 text-[20px] font-semibold leading-tight tracking-tight text-emerald-400">
            <Check /> Chest closed.
          </span>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {muscleWeek.map((m) => (
              <div
                key={m.name}
                className={`rounded-lg py-1 text-center text-[8px] font-semibold uppercase tracking-wider ${
                  m.done
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-white/[0.05] text-zinc-600"
                }`}
              >
                {m.name}
              </div>
            ))}
          </div>
          <div className="mt-2.5 text-[11px] font-medium text-zinc-400">
            <span className="font-semibold text-white">7 of 9</span> muscles banked this
            week — best in 2 months.
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] font-medium text-zinc-600">
          <span>🔥 STREAK ALIVE</span>
          <span>
            LOAD <span className="text-brand-300">8.4</span>
          </span>
        </div>
      </div>
    </WatchFrame>
  );
}

/** Evening: the weekly bank — what's closed, what's owed, streak on the line. */
export function PhoneBank() {
  const muscles = [
    { name: "Chest", banked: 140, target: 140 },
    { name: "Back", banked: 140, target: 140 },
    { name: "Triceps", banked: 87, target: 140 },
    { name: "Front delts", banked: 75, target: 140 },
    { name: "Glutes", banked: 41, target: 140 },
  ];
  const pct = 82;
  const r = 40;
  const c = 2 * Math.PI * r;
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
        <span>This week · Wk 42</span>
        <span className="text-brand-400">Otto</span>
      </div>

      <div className="mt-4 flex items-center gap-4 rounded-3xl bg-gradient-to-b from-brand-500/15 to-transparent p-5 ring-1 ring-brand-500/20">
        <div className="relative h-[76px] w-[76px] shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
            <circle
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke="url(#bankRing)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * c} ${c}`}
            />
            <defs>
              <linearGradient id="bankRing" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fb6a35" />
                <stop offset="100%" stopColor="#ef4d18" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[17px] font-semibold text-white">{pct}%</span>
            <span className="text-[7px] uppercase tracking-widest text-zinc-500">banked</span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-semibold leading-snug text-white">
            7 of 9 muscles closed
          </div>
          <div className="mt-1 text-[11px] leading-snug text-zinc-400">
            Best week in two months. Glutes &amp; calves still owe you a session.
          </div>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand-500/15 px-2 py-0.5 text-[10px] font-semibold text-brand-200 ring-1 ring-brand-500/20">
            🔥 6-week streak
          </span>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">The bank</span>
          <span className="text-[10px] text-zinc-500">resets Sunday</span>
        </div>
        <div className="mt-3 space-y-2.5">
          {muscles.map((m) => (
            <div key={m.name} className="flex items-center gap-2.5">
              <span className="w-[64px] text-[11px] text-zinc-400">{m.name}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={`h-full rounded-full ${
                    m.banked >= m.target
                      ? "bg-emerald-400"
                      : "bg-gradient-to-r from-brand-400 to-brand-500"
                  }`}
                  style={{ width: `${(m.banked / m.target) * 100}%` }}
                />
              </div>
              {m.banked >= m.target ? (
                <span className="w-12 text-right text-[11px] font-semibold text-emerald-400">
                  closed
                </span>
              ) : (
                <span className="w-12 text-right text-[11px] font-semibold text-white">
                  {m.target - m.banked}
                  <span className="font-normal text-zinc-600"> owed</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-emerald-500/[0.07] p-4 ring-1 ring-emerald-500/15">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-400">
          To finish the week
        </span>
        <p className="mt-1.5 text-[12px] leading-snug text-zinc-200">
          One leg day closes everything. Saturday works — your readiness is usually
          highest after a rest day.
        </p>
      </div>
    </PhoneFrame>
  );
}
