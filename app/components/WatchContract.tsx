/**
 * Round 5 — the contract.
 * Round 4 designed the glances; this round designs the two things those
 * glances silently assumed:
 *
 *   1. The data contract — the landing page promises "the only thing it ever
 *      asks is the weight," so the ask itself gets designed: pre-filled,
 *      one crown turn to fix, silence accepts. Every correction trains the
 *      prefill, so the asks decay over time.
 *   2. The honest states — every Round 4 mock showed the good day (+4%, PR,
 *      targets closing). "Degrades honestly" extends here to bad days,
 *      overreach sets, flat sessions, unclosed weeks, and the first sessions
 *      before any baseline exists.
 *
 * Same color language as Round 4 — brand orange = Effort & stimulus, white =
 * counted facts, emerald = readiness / vs-norm deltas, yellow = time — plus
 * amber = a measurement running below baseline, red = the overreach zone.
 * Never a sentence telling the lifter what to do; a bad number is allowed
 * to just be bad.
 */

import { WatchFrame } from "./WatchJourneys";

/* =================================================================== */
/* The asks — what Otto needs, at the moment it costs the least         */
/* =================================================================== */

/**
 * First set of a lift — the exercise confirm. Otto names what it detected
 * with its confidence as a plain measurement; alternates sit one crown
 * notch away. Doing nothing accepts the top match. As detection confidence
 * climbs past ~95% this screen stops appearing at all.
 */
export function AskExercise() {
  const candidates = [
    { name: "Incline Bench", match: "92%", sel: true },
    { name: "Flat Bench", match: "6%", sel: false },
    { name: "DB Shoulder Press", match: "2%", sel: false },
  ];
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">SET 1 · DETECTED</span>
          <span className="text-zinc-500">9:41</span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-1.5">
          {candidates.map((c) => (
            <div
              key={c.name}
              className={`flex items-baseline justify-between rounded-xl px-3 py-2 ${
                c.sel ? "bg-white/[0.07] ring-1 ring-white/10" : ""
              }`}
            >
              <span
                className={
                  c.sel
                    ? "text-[16px] font-semibold text-white"
                    : "text-[12px] font-medium text-zinc-600"
                }
              >
                {c.name}
              </span>
              <span
                className={`text-[10px] font-semibold ${
                  c.sel ? "text-zinc-400" : "text-zinc-700"
                }`}
              >
                {c.match}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-[9px] font-medium uppercase tracking-widest">
          <span className="text-zinc-600">crown ↕ to change</span>
          <span className="text-yellow-400">✓ in 3s</span>
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * The rack moment, half a second before the verdict — the weight ask.
 * Pre-filled from last session; the crown rail on the right is the whole
 * interaction. If the guess is right the lifter does nothing and this
 * screen dissolves into the Effort verdict. Effort holds as "—" until the
 * load is confirmed, because Effort can't finalize without it.
 */
export function AskWeight() {
  const rail = [
    { v: "235", sel: false },
    { v: "230", sel: false },
    { v: "225", sel: true },
    { v: "220", sel: false },
    { v: "215", sel: false },
  ];
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">SET 3</span>
        </div>
        <div className="flex flex-1 items-center justify-between pl-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[46px] font-semibold leading-none tracking-tight text-white">
                225
              </span>
              <span className="text-[11px] font-medium text-zinc-500">lb</span>
            </div>
            <div className="mt-2 whitespace-nowrap text-[9px] font-medium uppercase tracking-widest text-zinc-500">
              last session · 225
            </div>
          </div>
          {/* crown rail */}
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
 * Rest — the rep fix, for the rare miscount. The receipt's rep number
 * becomes the crown's target; everything else stays put. Effort re-scores
 * on the corrected count. Hold the number to flip the set work ↔ warmup.
 */
export function AskRepFix() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH · SET 3</span>
          <span className="text-yellow-400">1:24</span>
        </div>
        <div className="flex flex-1 items-center justify-center gap-4">
          <div className="flex flex-col items-center">
            <span className="text-[15px] font-medium text-zinc-700">7</span>
            <span className="rounded-xl bg-white/[0.08] px-4 py-0.5 text-[44px] font-semibold leading-tight tracking-tight text-white ring-1 ring-white/15">
              8
            </span>
            <span className="text-[15px] font-medium text-zinc-700">9</span>
          </div>
          <div className="text-[9px] font-medium uppercase tracking-widest text-zinc-500">
            reps
          </div>
        </div>
        <div className="flex items-center justify-between whitespace-nowrap text-[10px] font-medium">
          <span className="text-zinc-500">
            225 lb · Effort <span className="font-semibold text-brand-400">86</span>
            <span className="text-zinc-600"> re-scores</span>
          </span>
        </div>
        <div className="mt-1.5 text-[8px] font-medium uppercase tracking-widest text-zinc-700">
          hold → warmup
        </div>
      </div>
    </WatchFrame>
  );
}

/* =================================================================== */
/* Bad days — same grammar, no cheerleading                             */
/* =================================================================== */

/**
 * The down morning. Identical grammar to the +4% screen — the dots just
 * ride below the line and the headline goes amber. No consolation copy;
 * the measurement is the message, and "back-off day" is the lifter's
 * conclusion to draw.
 */
export function InstrumentReadinessDown() {
  const baseline = "6,17 18,20 78,32 138,46 150,49";
  const today = [
    { x: 18, y: 26, load: "95" },
    { x: 78, y: 40, load: "135" },
    { x: 138, y: 55, load: "185" },
  ];
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH · WU 3/3</span>
          <span className="text-zinc-500">9:41</span>
        </div>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[30px] font-semibold leading-none tracking-tight text-amber-400">
            −6%
          </span>
          <span className="whitespace-nowrap text-[9px] font-medium uppercase tracking-widest text-zinc-500">
            vs base
          </span>
        </div>
        <div className="mt-1 flex-1">
          <svg viewBox="0 0 156 64" className="h-full w-full">
            <polyline
              points={baseline}
              fill="none"
              stroke="#52525b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {today.map((d, i) => (
              <g key={d.load}>
                {i === today.length - 1 && (
                  <circle cx={d.x} cy={d.y} r="6.5" fill="none" stroke="#fbbf24" strokeOpacity="0.35" strokeWidth="1.5" />
                )}
                <circle cx={d.x} cy={d.y} r={i === today.length - 1 ? 4 : 3} fill="#fbbf24" />
                <text
                  x={d.x}
                  y="61"
                  textAnchor="middle"
                  fill="#52525b"
                  style={{ fontSize: 8, fontWeight: 500 }}
                >
                  {d.load}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="flex items-center justify-between text-[8px] font-medium uppercase tracking-widest text-zinc-600">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> today
          </span>
          <span className="flex items-center gap-1">
            <span className="h-[2px] w-3 rounded-full bg-zinc-600" /> baseline
          </span>
        </div>
        <div className="mt-2 flex items-baseline justify-between whitespace-nowrap text-[11px] font-medium">
          <span>
            <span className="font-semibold text-white">0.41</span>
            <span className="text-zinc-500"> m/s @ 185</span>
          </span>
          <span className="text-zinc-500">base 0.44</span>
        </div>
      </div>
    </WatchFrame>
  );
}

const ZONES = [
  { name: "Recovery", color: "#0c4a6e" },
  { name: "Power & speed", color: "#115e59" },
  { name: "Strength", color: "#166534" },
  { name: "Hypertrophy", color: "#7c2d12" },
  { name: "Overreach", color: "" }, // active — red gradient
];

/**
 * The set that went too far. Same band, marker in the last zone — the one
 * place red is allowed. The footer states the cost as data: bar speed
 * collapsed vs norm, and the stimulus deposit got smaller, not bigger,
 * than the set before it. Past ~40% velocity loss the extra reps buy
 * recovery debt, and the numbers say so without a sentence.
 */
export function InstrumentVerdictOverreach() {
  const activeIndex = 4;
  const markerPct = 42; // 46% loss within the 41%+ zone
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">SET 4</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <span className="text-[44px] font-semibold leading-none tracking-tight text-white">
            97
          </span>
          <span className="mt-1 text-[9px] font-medium uppercase tracking-widest text-zinc-500">
            Effort
          </span>
          <div className="mt-3.5 flex w-full items-center gap-[3px]">
            {ZONES.map((z, i) =>
              i === activeIndex ? (
                <div
                  key={z.name}
                  className="relative h-[13px] flex-[1.35] rounded-full bg-gradient-to-r from-red-500 to-red-600"
                >
                  <div
                    className="absolute top-1/2 h-[17px] w-[3px] -translate-y-1/2 rounded-full bg-white shadow-sm shadow-black/40"
                    style={{ left: `${markerPct}%` }}
                  />
                </div>
              ) : (
                <div
                  key={z.name}
                  className="h-[10px] flex-1 rounded-full"
                  style={{ backgroundColor: z.color }}
                />
              )
            )}
          </div>
          <div className="mt-2 flex w-full items-baseline justify-between">
            <span className="whitespace-nowrap text-[11px] font-medium">
              <span className="font-semibold text-white">−46%</span>
              <span className="text-zinc-500"> speed</span>
            </span>
            <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-widest text-red-400">
              Overreach
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="text-center">
            <div className="text-[15px] font-semibold leading-none text-amber-400">−5%</div>
            <div className="mt-1 whitespace-nowrap text-[7px] font-medium uppercase tracking-widest text-zinc-500">
              225 · vs norm
            </div>
          </div>
          <div className="text-center">
            <div className="text-[15px] font-semibold leading-none text-brand-400">+6</div>
            <div className="mt-1 whitespace-nowrap text-[7px] font-medium uppercase tracking-widest text-zinc-500">
              stim · less than S3
            </div>
          </div>
        </div>
      </div>
    </WatchFrame>
  );
}

const LOAD_ZONES = [
  { name: "Light", color: "#0c4a6e" },
  { name: "Moderate", color: "" }, // active on the flat day
  { name: "Hard", color: "#166534" },
  { name: "Max", color: "#7f1d1d" },
];

const FLAT_DEPOSITS = [
  { name: "Chest", before: 89, today: 11, target: 140 },
  { name: "Triceps", before: 54, today: 7, target: 140 },
  { name: "Delts", before: 48, today: 5, target: 140 },
];

/**
 * The flat session end. Load below average, small deposits, no PR — and
 * the screen renders it with exactly the hierarchy of the good day. The
 * account is stated, not apologized for: a below-average day that still
 * banked something is simply what the numbers show.
 */
export function InstrumentDoneFlat() {
  const activeIndex = 1;
  const markerPct = 53; // Load 4.6 within the 3–6 zone
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">PUSH DAY</span>
          <span className="text-zinc-500">38:07</span>
        </div>

        <div className="mt-1 flex flex-col items-center">
          <span className="text-[34px] font-semibold leading-none tracking-tight text-white">
            4.6
          </span>
          <span className="mt-0.5 text-[8px] font-medium uppercase tracking-widest text-zinc-500">
            Load
          </span>
          <div className="mt-2 flex w-full items-center gap-[3px]">
            {LOAD_ZONES.map((z, i) =>
              i === activeIndex ? (
                <div
                  key={z.name}
                  className="relative h-[11px] flex-[1.35] rounded-full bg-gradient-to-r from-brand-400 to-brand-500"
                >
                  <div
                    className="absolute top-1/2 h-[15px] w-[3px] -translate-y-1/2 rounded-full bg-white shadow-sm shadow-black/40"
                    style={{ left: `${markerPct}%` }}
                  />
                </div>
              ) : (
                <div
                  key={z.name}
                  className="h-[8px] flex-1 rounded-full"
                  style={{ backgroundColor: z.color }}
                />
              )
            )}
          </div>
          <div className="mt-1.5 flex w-full items-baseline justify-between">
            <span className="whitespace-nowrap text-[10px] font-medium">
              <span className="font-semibold text-amber-400">−1.6</span>
              <span className="text-zinc-500"> vs avg</span>
            </span>
            <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-widest text-brand-400">
              Moderate
            </span>
          </div>
        </div>

        <div className="mt-2.5 flex flex-1 flex-col justify-center gap-1.5">
          {FLAT_DEPOSITS.map((m) => (
            <div key={m.name} className="flex items-center gap-2">
              <span className="w-[42px] text-[9px] font-medium text-zinc-400">
                {m.name}
              </span>
              <div className="flex h-[5px] flex-1 gap-px overflow-hidden rounded-full bg-white/10">
                <div
                  className="bg-brand-500/35"
                  style={{ width: `${(m.before / m.target) * 100}%` }}
                />
                <div
                  className="rounded-r-full bg-brand-400"
                  style={{ width: `${(m.today / m.target) * 100}%` }}
                />
              </div>
              <span className="w-[34px] whitespace-nowrap text-right text-[10px] font-semibold text-brand-300">
                +{m.today}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between whitespace-nowrap text-[10px] font-medium">
          <span className="text-zinc-600">no PR</span>
          <span className="text-zinc-600">8 SETS</span>
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * Sunday night, two muscles short. The week's account closes whether it
 * balanced or not: seven dots lit, two dark, the shortfall in plain
 * numbers, and the reset stated as a time — yellow, like every time.
 * The streak's fate is arithmetic the lifter can do themselves.
 */
export function InstrumentWeekClose() {
  const dots = [true, true, true, true, true, true, true, false, false];
  const owed = [
    { name: "Glutes", before: 41, target: 140 },
    { name: "Calves", before: 28, target: 140 },
  ];
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">THIS WEEK</span>
          <span className="text-zinc-500">SUN 9:12</span>
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex items-baseline gap-2">
            <span className="text-[38px] font-semibold leading-none tracking-tight text-white">
              7<span className="text-zinc-600">/9</span>
            </span>
            <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-500">
              closed
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5">
            {dots.map((d, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${
                  d ? "bg-emerald-400" : "bg-zinc-800 ring-1 ring-zinc-700"
                }`}
              />
            ))}
          </div>
          <div className="mt-3.5 space-y-2">
            {owed.map((m) => (
              <div key={m.name} className="flex items-center gap-2">
                <span className="w-[42px] text-[9px] font-medium text-zinc-400">
                  {m.name}
                </span>
                <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-brand-500/35"
                    style={{ width: `${(m.before / m.target) * 100}%` }}
                  />
                </div>
                <span className="w-[52px] whitespace-nowrap text-right text-[10px] font-semibold text-zinc-400">
                  {m.target - m.before} left
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between whitespace-nowrap text-[10px] font-medium">
          <span className="text-zinc-600">🔥 6 WK STREAK</span>
          <span className="text-yellow-400">RESETS 2:48</span>
        </div>
      </div>
    </WatchFrame>
  );
}

/* =================================================================== */
/* Session zero — before there's a baseline                             */
/* =================================================================== */

/**
 * Warmups, session two of four. No baseline curve yet, so none is drawn —
 * just today's dots and a progress count for the baseline itself. The
 * headline honestly refuses to exist: there is no delta without a base.
 */
export function InstrumentFirstBaseline() {
  const today = [
    { x: 18, y: 20, load: "95" },
    { x: 78, y: 34, load: "135" },
  ];
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH · WU 2/3</span>
          <span className="text-zinc-500">9:41</span>
        </div>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[30px] font-semibold leading-none tracking-tight text-zinc-600">
            —
          </span>
          <span className="whitespace-nowrap text-[9px] font-medium uppercase tracking-widest text-zinc-600">
            no baseline yet
          </span>
        </div>
        <div className="mt-1 flex-1">
          <svg viewBox="0 0 156 64" className="h-full w-full">
            {today.map((d, i) => (
              <g key={d.load}>
                {i === today.length - 1 && (
                  <circle cx={d.x} cy={d.y} r="6.5" fill="none" stroke="#34d399" strokeOpacity="0.35" strokeWidth="1.5" />
                )}
                <circle cx={d.x} cy={d.y} r={i === today.length - 1 ? 4 : 3} fill="#34d399" />
                <text
                  x={d.x}
                  y="61"
                  textAnchor="middle"
                  fill="#52525b"
                  style={{ fontSize: 8, fontWeight: 500 }}
                >
                  {d.load}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="flex items-center justify-between text-[8px] font-medium uppercase tracking-widest text-zinc-600">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> today
          </span>
          <span className="flex items-center gap-1.5">
            baseline
            <span className="flex items-center gap-1">
              {[true, true, false, false].map((d, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${
                    d ? "bg-zinc-400" : "bg-zinc-800 ring-1 ring-zinc-700"
                  }`}
                />
              ))}
            </span>
          </span>
        </div>
        <div className="mt-2 flex items-baseline justify-between whitespace-nowrap text-[11px] font-medium">
          <span>
            <span className="font-semibold text-white">0.49</span>
            <span className="text-zinc-500"> m/s @ 135</span>
          </span>
          <span className="text-zinc-500">session 2 of 4</span>
        </div>
      </div>
    </WatchFrame>
  );
}

const CAL_ZONES = [
  { name: "Recovery", color: "#0c4a6e" },
  { name: "Power & speed", color: "#115e59" },
  { name: "Strength", color: "#166534" },
  { name: "Hypertrophy", color: "" }, // likely zone — dimmed brand
  { name: "Overreach", color: "#7f1d1d" },
];

/**
 * The rack moment before Effort is calibrated. The number arrives with its
 * error bars showing — ±6, dimmed numeral, hollow marker on a dimmed band,
 * the zone tagged "est." Precision is a measurement too, and it's stated
 * until it's earned; the footer counts down the sessions to ±2.
 */
export function InstrumentEffortCalibrating() {
  const activeIndex = 3;
  const markerPct = 33;
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">SET 3</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[44px] font-semibold leading-none tracking-tight text-zinc-300">
              84
            </span>
            <span className="text-[13px] font-semibold text-zinc-600">±6</span>
          </div>
          <span className="mt-1 text-[9px] font-medium uppercase tracking-widest text-zinc-500">
            Effort · calibrating
          </span>
          <div className="mt-3.5 flex w-full items-center gap-[3px] opacity-50">
            {CAL_ZONES.map((z, i) =>
              i === activeIndex ? (
                <div
                  key={z.name}
                  className="relative h-[13px] flex-[1.35] rounded-full bg-gradient-to-r from-brand-400 to-brand-500"
                >
                  <div
                    className="absolute top-1/2 h-[17px] w-[3px] -translate-y-1/2 rounded-full border border-white bg-transparent"
                    style={{ left: `${markerPct}%` }}
                  />
                </div>
              ) : (
                <div
                  key={z.name}
                  className="h-[10px] flex-1 rounded-full"
                  style={{ backgroundColor: z.color }}
                />
              )
            )}
          </div>
          <div className="mt-2 flex w-full items-baseline justify-between">
            <span className="whitespace-nowrap text-[11px] font-medium">
              <span className="font-semibold text-white">−31%</span>
              <span className="text-zinc-500"> speed</span>
            </span>
            <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-widest text-brand-400/60">
              Hypertrophy · est
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="text-center">
            <div className="text-[15px] font-semibold leading-none text-white">8</div>
            <div className="mt-1 whitespace-nowrap text-[7px] font-medium uppercase tracking-widest text-zinc-500">
              reps · 225 lb
            </div>
          </div>
          <div className="text-center">
            <div className="text-[15px] font-semibold leading-none text-zinc-400">2</div>
            <div className="mt-1 whitespace-nowrap text-[7px] font-medium uppercase tracking-widest text-zinc-500">
              sessions to ±2
            </div>
          </div>
        </div>
      </div>
    </WatchFrame>
  );
}

/* =================================================================== */
/* Phone — the evening contract                                         */
/* =================================================================== */

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[280px] shrink-0 rounded-[46px] bg-gradient-to-b from-zinc-700 to-zinc-900 p-[10px] shadow-2xl shadow-black/60 ring-1 ring-white/10">
      <div className="relative overflow-hidden rounded-[37px] bg-[#0c0c0e]">
        <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="px-5 pb-7 pt-12">{children}</div>
      </div>
    </div>
  );
}

/**
 * The edit pass — the whole trust loop in one screen. Otto flags what it's
 * least sure of instead of making the lifter proofread everything; each
 * fix is one tap; and the accuracy card shows the payoff — detection and
 * prefill rates climbing, corrections per week falling. The review is
 * designed to shrink toward zero.
 */
export function PhoneEditPass() {
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
        <span className="flex items-center gap-1">
          <span className="text-zinc-600">‹</span> Push Day
        </span>
        <span className="text-brand-400">Otto</span>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-[17px] font-semibold text-white">Review</span>
        <span className="text-[11px] text-zinc-500">3 flags · 41 sets clean</span>
      </div>

      {/* flags */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/[0.06]">
        {/* flag 1 — expanded, rep count */}
        <div className="rounded-xl bg-white/[0.05] p-2.5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
            <span className="flex-1 text-[12px] text-zinc-300">Incline DB · S2</span>
            <span className="text-[10px] text-zinc-500">low confidence</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 pl-3.5">
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 ring-1 ring-emerald-500/25">
              10
            </span>
            <span className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] text-zinc-500">
              11
            </span>
            <span className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] text-zinc-600 line-through">
              12
            </span>
            <span className="ml-1 text-[9px] uppercase tracking-wider text-zinc-600">
              logged 12
            </span>
          </div>
        </div>
        {/* flag 2 — rename */}
        <div className="mt-1 flex items-center gap-2 rounded-xl px-2.5 py-2.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
          <span className="flex-1 text-[12px] text-zinc-300">
            Pec Deck <span className="text-zinc-600">→</span>{" "}
            <span className="font-semibold text-white">Cable Fly</span>
          </span>
          <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-zinc-400 ring-1 ring-white/10">
            rename
          </span>
        </div>
        {/* flag 3 — warmup flip */}
        <div className="mt-1 flex items-center gap-2 rounded-xl px-2.5 py-2.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
          <span className="flex-1 text-[12px] text-zinc-300">
            Bench · S1 @ 135 <span className="text-zinc-600">· 61% of top set</span>
          </span>
          <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-zinc-400 ring-1 ring-white/10">
            → warmup
          </span>
        </div>
      </div>

      {/* accuracy — the asks decaying, as data */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">Otto&apos;s accuracy</span>
          <span className="text-[10px] text-zinc-500">30 days</span>
        </div>
        <div className="mt-2.5 space-y-2">
          <div className="flex items-baseline text-[11px]">
            <span className="flex-1 text-zinc-400">Exercise detection</span>
            <span className="font-semibold text-white">96%</span>
            <span className="ml-1.5 font-semibold text-emerald-400">↗</span>
          </div>
          <div className="flex items-baseline text-[11px]">
            <span className="flex-1 text-zinc-400">Weight prefill</span>
            <span className="font-semibold text-white">91%</span>
            <span className="ml-1.5 font-semibold text-emerald-400">↗</span>
          </div>
          <div className="flex items-baseline text-[11px]">
            <span className="flex-1 text-zinc-400">Fixes per week</span>
            <span className="font-semibold text-white">3</span>
            <span className="ml-1.5 whitespace-nowrap text-zinc-500">was 9</span>
          </div>
        </div>
        <div className="mt-2.5 text-[10px] leading-snug text-zinc-500">
          Every fix trains the prefill — the review is designed to shrink.
        </div>
      </div>
    </PhoneFrame>
  );
}

/**
 * The plan, as data. The lifter authored it (or just repeated last Push
 * Day); Otto's whole job is deviation-as-delta. The prefill card is a
 * capacity measurement, not a coach's order — it's what the crown rail
 * will show at the rack, and the lifter can turn straight past it.
 */
export function PhonePlanAsData() {
  const rows = [
    {
      name: "Bench Press",
      plan: "4×8 @ 225",
      done: "4×8",
      delta: "+3% speed",
      skipped: false,
    },
    {
      name: "Incline DB",
      plan: "3×10 @ 70",
      done: "3×10",
      delta: "+1% speed",
      skipped: false,
    },
    {
      name: "Cable Fly",
      plan: "3×12 @ 42.5",
      done: "0 sets",
      delta: "skipped",
      skipped: true,
    },
  ];
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
        <span className="flex items-center gap-1">
          <span className="text-zinc-600">‹</span> Push Day
        </span>
        <span className="text-brand-400">Otto</span>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-[17px] font-semibold text-white">Plan</span>
        <span className="text-[11px] text-zinc-500">yours · repeat of last Push Day</span>
      </div>

      {/* plan vs session */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">Plan vs session</span>
          <span className="text-[10px] text-zinc-500">10 of 13 sets</span>
        </div>
        <div className="mt-2.5 space-y-2.5">
          {rows.map((r) => (
            <div key={r.name} className="flex items-baseline gap-2 text-[11px]">
              <span className={`w-[74px] ${r.skipped ? "text-zinc-600" : "text-zinc-300"}`}>
                {r.name}
              </span>
              <span className="flex-1 text-zinc-500">{r.plan}</span>
              <span className={`font-semibold ${r.skipped ? "text-zinc-600" : "text-white"}`}>
                {r.done}
              </span>
              <span
                className={`w-[64px] whitespace-nowrap text-right font-semibold ${
                  r.skipped ? "text-zinc-600" : "text-emerald-400"
                }`}
              >
                {r.delta}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* next-session prefill */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">Next session prefill</span>
          <span className="text-[10px] text-zinc-500">crown past it anytime</span>
        </div>
        <div className="mt-2.5 space-y-2">
          <div className="flex items-baseline text-[11px]">
            <span className="w-[74px] text-zinc-300">Bench Press</span>
            <span className="flex-1 font-semibold text-white">
              230 <span className="font-normal text-zinc-600">lb</span>
            </span>
            <span className="whitespace-nowrap text-zinc-500">
              est. capacity <span className="font-semibold text-emerald-400">236</span>
            </span>
          </div>
          <div className="flex items-baseline text-[11px]">
            <span className="w-[74px] text-zinc-300">Incline DB</span>
            <span className="flex-1 font-semibold text-white">
              72.5 <span className="font-normal text-zinc-600">lb</span>
            </span>
            <span className="whitespace-nowrap text-zinc-500">
              est. capacity <span className="font-semibold text-emerald-400">74</span>
            </span>
          </div>
        </div>
      </div>

      {/* the ledger the plan feeds */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">If Friday repeats</span>
          <span className="text-[10px] text-zinc-500">projection</span>
        </div>
        <div className="mt-2 flex items-baseline text-[11px]">
          <span className="flex-1 text-zinc-400">Chest weekly target</span>
          <span className="font-semibold text-emerald-400">closes ✓</span>
        </div>
        <div className="mt-1.5 flex items-baseline text-[11px]">
          <span className="flex-1 text-zinc-400">Front delts</span>
          <span className="font-semibold text-white">
            11 <span className="font-normal text-zinc-600">short</span>
          </span>
        </div>
      </div>
    </PhoneFrame>
  );
}
