/**
 * Round 4 — the instrument.
 * One unified system replacing the three Round-3 personas: Ledger DNA
 * (every number is a measurement or a comparison), the Bank's weekly targets
 * kept as plain data, the Coach reduced to timing — the right metric at the
 * right moment, never a sentence telling you what to do. Whoop/Oura grammar:
 * a digestible headline per glance, raw data one layer deeper on the phone.
 *
 * Shared data story: Push Day. Warmup bar speed +4% vs baseline. Bench set 3:
 * 8 reps @ 225, Effort 86 (+12 stimulus → 54 today). Last set moved +3% vs
 * norm at that load. Session: Load 8.4, 12 sets, 1 PR, chest 140/140 weekly.
 * Color language: brand orange = Effort & stimulus, white = counted facts,
 * emerald = readiness / vs-norm deltas, yellow = time.
 */

import { WatchFrame } from "./WatchJourneys";

const TODAY_EFFORTS = [72, 78, 82, 86];

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

/* ---------------------------------------------------- warmup profile */

/**
 * Warmups — readiness as a picture. The zinc curve is this lift's
 * load–velocity baseline (bar speed at each load, learned from past
 * sessions); today's warmups land on it as dots while they happen.
 * Dots riding above the line = faster than usual. The +4% is the gap.
 */
export function InstrumentReadinessProfile() {
  // x = load (95 / 135 / 185 lb), y = bar speed (down = slower)
  const baseline = "6,17 18,20 78,32 138,46 150,49";
  const today = [
    { x: 18, y: 15, load: "95" },
    { x: 78, y: 26, load: "135" },
    { x: 138, y: 39, load: "185" },
  ];
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH · WU 3/3</span>
          <span className="text-zinc-500">9:41</span>
        </div>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[30px] font-semibold leading-none tracking-tight text-emerald-400">
            +4%
          </span>
          <span className="whitespace-nowrap text-[9px] font-medium uppercase tracking-widest text-zinc-500">
            vs base
          </span>
        </div>
        <div className="mt-1 flex-1">
          <svg viewBox="0 0 156 64" className="h-full w-full">
            {/* baseline load–velocity curve */}
            <polyline
              points={baseline}
              fill="none"
              stroke="#52525b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* today's warmups */}
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
          <span className="flex items-center gap-1">
            <span className="h-[2px] w-3 rounded-full bg-zinc-600" /> baseline
          </span>
        </div>
        <div className="mt-2 flex items-baseline justify-between whitespace-nowrap text-[11px] font-medium">
          <span>
            <span className="font-semibold text-white">0.46</span>
            <span className="text-zinc-500"> m/s @ 185</span>
          </span>
          <span className="text-zinc-500">base 0.44</span>
        </div>
      </div>
    </WatchFrame>
  );
}

/* ------------------------------------------------- velocity-loss zones */

const ZONES = [
  { name: "Recovery", range: "0–10%", color: "#0c4a6e" },
  { name: "Power & speed", range: "11–20%", color: "#115e59" },
  { name: "Strength", range: "21–30%", color: "#166534" },
  { name: "Hypertrophy", range: "31–40%", color: "" }, // active — brand gradient
  { name: "Overreach", range: "41%+", color: "#7f1d1d" },
];

/**
 * The rack moment — Apple's zone-band grammar, but each zone is a training
 * outcome keyed to velocity loss within the set. This set lost 34% bar
 * speed → hypertrophy: the set didn't just feel hard, it trained size.
 * Straight Apple HR-zone treatment on the band: the landed zone expands
 * into a pill carrying its own name (dark text on the zone color), the
 * other zones shrink to squares, and the up-triangle inside the pill marks
 * position within the zone. Layout: dial left, the two fresh signals
 * (speed vs norm, the stimulus deposit) stacked on the right rail, band
 * full-width beneath. Effort stays neutral white; dial and pill wear the
 * zone's color.
 */
export function InstrumentVerdictZones() {
  const effort = 86;
  const activeIndex = 3;
  const markerPct = 33; // 34% loss within the 31–40% zone
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">SET 3</span>
        </div>
        <div className="flex flex-1 items-center">
          {/* Effort dial — filled to the score, colored by the landed zone */}
          <div className="relative h-[104px] w-[104px] shrink-0">
            <svg viewBox={`0 0 ${G_SIZE} ${G_SIZE}`} className="h-full w-full">
              <circle
                cx={G_CX}
                cy={G_CX}
                r={G_R}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${G_SWEEP * G_C} ${G_C}`}
                transform={`rotate(${G_START_DEG} ${G_CX} ${G_CX})`}
              />
              <circle
                cx={G_CX}
                cy={G_CX}
                r={G_R}
                fill="none"
                stroke="url(#verdictZoneRing)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(effort / 100) * G_SWEEP * G_C} ${G_C}`}
                transform={`rotate(${G_START_DEG} ${G_CX} ${G_CX})`}
              />
              <defs>
                <linearGradient id="verdictZoneRing" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fb6a35" />
                  <stop offset="100%" stopColor="#ef4d18" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
              <span className="text-[32px] font-semibold leading-none tracking-tight text-white">
                {effort}
              </span>
              <span className="mt-0.5 text-[8px] font-medium uppercase tracking-widest text-zinc-500">
                Effort
              </span>
            </div>
            {/* odometer in the dial's gap */}
            <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-center gap-1">
              <span className="text-[13px] font-semibold leading-none text-white">8</span>
              <span className="text-[7px] font-medium uppercase tracking-widest text-zinc-500">
                reps
              </span>
            </div>
          </div>
          {/* right rail — the freshest signals, stacked in the dial's shadow */}
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-[17px] font-semibold leading-none text-emerald-400">+3%</span>
              <span className="mt-1 whitespace-nowrap text-[6px] font-medium uppercase tracking-wide text-zinc-500">
                225 · vs norm
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[17px] font-semibold leading-none text-brand-300">+12</span>
              <span className="mt-1 whitespace-nowrap text-[6px] font-medium uppercase tracking-wide text-zinc-500">
                stim · 54 today
              </span>
            </div>
          </div>
        </div>
        {/* zone band — landed zone expands into a labeled pill, Apple HR-zone style */}
        <div className="flex w-full items-center gap-[3px]">
            {ZONES.map((z, i) =>
              i === activeIndex ? (
                <div
                  key={z.name}
                  className="relative flex h-[18px] flex-[2.8] items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-brand-400 to-brand-500"
                >
                  <span className="text-[7px] font-bold uppercase tracking-wide text-black/80">
                    Hypertrophy
                  </span>
                  {/* position within the zone */}
                  <div
                    className="absolute bottom-0 h-0 w-0 -translate-x-1/2 border-x-[3.5px] border-b-[4.5px] border-x-transparent border-b-white"
                    style={{ left: `${markerPct}%` }}
                  />
                </div>
              ) : (
                <div
                  key={z.name}
                  className="h-[10px] flex-1 rounded-[3px]"
                  style={{ backgroundColor: z.color }}
                />
              )
            )}
        </div>
      </div>
    </WatchFrame>
  );
}

/* ------------------------------------------------------------- gauge */

const G_SIZE = 160;
const G_CX = G_SIZE / 2;
const G_R = 60;
const G_C = 2 * Math.PI * G_R;
const G_SWEEP = 0.75; // 270° arc, gap at the bottom
const G_START_DEG = 135; // arc begins lower-left, sweeps clockwise

function gaugePoint(fraction: number, radius: number) {
  const rad = ((G_START_DEG + fraction * G_SWEEP * 360) * Math.PI) / 180;
  return { x: G_CX + radius * Math.cos(rad), y: G_CX + radius * Math.sin(rad) };
}

function GaugeTick({
  at,
  className,
  length = 5,
}: {
  at: number;
  className: string;
  length?: number;
}) {
  const inner = gaugePoint(at, G_R - length);
  const outer = gaugePoint(at, G_R + length);
  return (
    <line
      x1={inner.x}
      y1={inner.y}
      x2={outer.x}
      y2={outer.y}
      className={className}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  );
}

/**
 * The rack moment, gauge treatment. Effort as a 270° dial with the rep count
 * as its odometer. Meaning is encoded in the scale, not in words: the emerald
 * marker at 80 is the growth-zone threshold — the needle past the mark says
 * what a sentence would, without saying it.
 */
export function InstrumentVerdictGauge() {
  const effort = 86;
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">SET 3</span>
        </div>
        <div className="relative flex flex-1 items-center justify-center">
          <svg viewBox={`0 0 ${G_SIZE} ${G_SIZE}`} className="h-[136px] w-[136px]">
            {/* track */}
            <circle
              cx={G_CX}
              cy={G_CX}
              r={G_R}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${G_SWEEP * G_C} ${G_C}`}
              transform={`rotate(${G_START_DEG} ${G_CX} ${G_CX})`}
            />
            {/* fill */}
            <circle
              cx={G_CX}
              cy={G_CX}
              r={G_R}
              fill="none"
              stroke="url(#gaugeFill)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${(effort / 100) * G_SWEEP * G_C} ${G_C}`}
              transform={`rotate(${G_START_DEG} ${G_CX} ${G_CX})`}
            />
            {/* minor scale ticks */}
            <GaugeTick at={0.25} className="text-zinc-800" length={3} />
            <GaugeTick at={0.5} className="text-zinc-800" length={3} />
            {/* growth-zone threshold at 80 */}
            <GaugeTick at={0.8} className="text-emerald-400" length={7} />
            <defs>
              <linearGradient id="gaugeFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fb6a35" />
                <stop offset="100%" stopColor="#ef4d18" />
              </linearGradient>
            </defs>
          </svg>
          {/* pt offsets the label's height so the numeral sits on the gauge's optical center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-3">
            <span className="text-[40px] font-semibold leading-none tracking-tight text-white">
              {effort}
            </span>
            <span className="mt-1 text-[8px] font-medium uppercase tracking-widest text-zinc-500">
              Effort
            </span>
          </div>
          {/* odometer in the gauge gap */}
          <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-center gap-1">
            <span className="text-[15px] font-semibold leading-none text-white">8</span>
            <span className="text-[8px] font-medium uppercase tracking-widest text-zinc-500">
              reps
            </span>
          </div>
        </div>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <div className="text-[15px] font-semibold leading-none text-emerald-400">+4%</div>
            <div className="mt-0.5 text-[7px] font-medium uppercase tracking-widest text-zinc-500">
              readiness
            </div>
          </div>
          <div className="text-right">
            <div className="text-[15px] font-semibold leading-none text-brand-400">+12</div>
            <div className="mt-0.5 text-[7px] font-medium uppercase tracking-widest text-zinc-500">
              stim · 54 today
            </div>
          </div>
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * The rack moment, list treatment — same data, no dial. The today-curve
 * carries the session shape instead of the gauge carrying the scale.
 */
export function InstrumentVerdictList() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-6 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH · SET 3</span>
          <span className="text-emerald-400">+4%</span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2.5">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[42px] font-semibold leading-none tracking-tight text-brand-400">
                86
              </span>
              <div className="mt-1 text-[9px] font-medium uppercase tracking-widest text-zinc-500">
                Effort
              </div>
            </div>
            <div className="flex flex-col items-end">
              <TrendBars barWidth={7} height={28} />
              <span className="mt-1 text-[9px] font-medium uppercase tracking-widest text-zinc-600">
                today
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
            STIM <span className="text-brand-300">+12 · 54 today</span>
          </span>
          <span>
            <span className="text-zinc-400">128</span> BPM
          </span>
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * The rest state — a separate job from the verdict, so a separate screen
 * (~15s after racking). The clock owns the screen; beneath it, the receipt:
 * weight moved, speed vs your norm at that load, stimulus total today.
 */
export function InstrumentRest() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">3 / 4</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-500">
            Rest
          </span>
          <span className="mt-1 text-[44px] font-semibold leading-none tracking-tight text-yellow-400">
            1:24
          </span>
          <div className="mt-2.5 h-1 w-28 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[56%] rounded-full bg-yellow-400" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <div className="text-[15px] font-semibold leading-none text-white">
              225<span className="text-[9px] text-zinc-500"> lb</span>
            </div>
            <div className="mt-1 whitespace-nowrap text-[7px] font-medium uppercase tracking-widest text-zinc-500">
              last set
            </div>
          </div>
          <div className="text-center">
            <div className="text-[15px] font-semibold leading-none text-emerald-400">+3%</div>
            <div className="mt-1 text-[7px] font-medium uppercase tracking-widest text-zinc-500">
              vs norm
            </div>
          </div>
          <div className="text-right">
            <div className="text-[15px] font-semibold leading-none text-brand-400">54</div>
            <div className="mt-1 text-[7px] font-medium uppercase tracking-widest text-zinc-500">
              stim today
            </div>
          </div>
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * Session end — "did today count?", answered in three layers with clear
 * hierarchy: what it took (Load on the same band grammar as the rack
 * moment: light / moderate / hard / max), what it earned (today's stimulus
 * as the bright chunk inside each weekly target bar), and anything special
 * (the PR as the footer fact). Sets demote to the footer; the per-set
 * story lives on the phone.
 */
const LOAD_ZONES = [
  { name: "Light", color: "#0c4a6e" }, // 0–3
  { name: "Moderate", color: "#166534" }, // 3–6
  { name: "Hard", color: "" }, // 6–9, active — brand gradient
  { name: "Max", color: "#7f1d1d" }, // 9–10
];

const DEPOSITS = [
  { name: "Chest", before: 102, today: 38, target: 140 },
  { name: "Triceps", before: 61, today: 26, target: 140 },
  { name: "Delts", before: 56, today: 19, target: 140 },
];

export function InstrumentDone() {
  const activeIndex = 2;
  const markerPct = 80; // Load 8.4 within the 6–9 zone
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">PUSH DAY</span>
          <span className="text-zinc-500">47:32</span>
        </div>

        {/* what it took */}
        <div className="mt-1 flex flex-col items-center">
          <span className="text-[34px] font-semibold leading-none tracking-tight text-white">
            8.4
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
              <span className="font-semibold text-white">+1.2</span>
              <span className="text-zinc-500"> vs avg</span>
            </span>
            <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-widest text-brand-400">
              Hard
            </span>
          </div>
        </div>

        {/* what it earned — today's chunk bright inside the weekly bar */}
        <div className="mt-2.5 flex flex-1 flex-col justify-center gap-1.5">
          {DEPOSITS.map((m) => {
            const closed = m.before + m.today >= m.target;
            return (
              <div key={m.name} className="flex items-center gap-2">
                <span className="w-[42px] text-[9px] font-medium text-zinc-400">
                  {m.name}
                </span>
                <div className="flex h-[5px] flex-1 gap-px overflow-hidden rounded-full bg-white/10">
                  <div
                    className={closed ? "bg-emerald-500/40" : "bg-brand-500/35"}
                    style={{ width: `${(m.before / m.target) * 100}%` }}
                  />
                  <div
                    className={`rounded-r-full ${closed ? "bg-emerald-400" : "bg-brand-400"}`}
                    style={{ width: `${(m.today / m.target) * 100}%` }}
                  />
                </div>
                <span
                  className={`w-[34px] whitespace-nowrap text-right text-[10px] font-semibold ${
                    closed ? "text-emerald-400" : "text-brand-300"
                  }`}
                >
                  +{m.today}
                  {closed && " ✓"}
                </span>
              </div>
            );
          })}
        </div>

        {/* anything special */}
        <div className="flex items-center justify-between whitespace-nowrap text-[10px] font-medium">
          <span className="font-semibold text-emerald-400">PR · 225 × 8</span>
          <span className="text-zinc-600">12 SETS</span>
        </div>
      </div>
    </WatchFrame>
  );
}

/* ------------------------------------------------------------- phone */

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

function Chevron() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3 text-zinc-600" fill="none">
      <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Zone palette shared by every phone chart — same hues as the watch bands. */
const ZONE_COLORS = {
  recovery: "#0c4a6e",
  power: "#115e59",
  strength: "#16a34a",
  hypertrophy: "#fb6a35",
  overreach: "#b91c1c",
} as const;

function ZoneChip({ zone }: { zone: "strength" | "hypertrophy" | "overreach" }) {
  const label = { strength: "STR", hypertrophy: "HYP", overreach: "OVR" }[zone];
  return (
    <span
      className="rounded-full px-1.5 py-0.5 text-[8px] font-semibold tracking-wider"
      style={{ backgroundColor: `${ZONE_COLORS[zone]}26`, color: ZONE_COLORS[zone] }}
    >
      {label}
    </span>
  );
}

/** The weekly-target bar with today's deposit as the bright chunk — same
 * grammar as the watch's session-end screen. */
function TargetBar({
  name,
  before,
  today,
  target,
}: {
  name: string;
  before: number;
  today: number;
  target: number;
}) {
  const closed = before + today >= target;
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-[64px] text-[11px] text-zinc-400">{name}</span>
      <div className="flex h-1.5 flex-1 gap-px overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={closed ? "bg-emerald-500/40" : "bg-brand-500/35"}
          style={{ width: `${(before / target) * 100}%` }}
        />
        {today > 0 && (
          <div
            className={`rounded-r-full ${closed ? "bg-emerald-400" : "bg-brand-400"}`}
            style={{ width: `${(today / target) * 100}%` }}
          />
        )}
      </div>
      <span
        className={`w-12 whitespace-nowrap text-right text-[11px] font-semibold ${
          closed ? "text-emerald-400" : today > 0 ? "text-brand-300" : "text-zinc-500"
        }`}
      >
        {closed ? (today > 0 ? `+${today} ✓` : "✓") : today > 0 ? `+${today}` : `${target - before} left`}
      </span>
    </div>
  );
}

/**
 * Flow 1 · Post-session summary — Whoop/Oura layering. Headline tiles up
 * top (Load carries a mini zone band, same grammar as the watch), context
 * cards beneath, every card a door (chevron) into a detail flow below.
 */
export function PhoneInstrument() {
  const sets: { v: number; z: "strength" | "hypertrophy" }[] = [
    { v: 72, z: "strength" },
    { v: 78, z: "strength" },
    { v: 82, z: "hypertrophy" },
    { v: 86, z: "hypertrophy" },
    { v: 74, z: "strength" },
    { v: 80, z: "hypertrophy" },
    { v: 84, z: "hypertrophy" },
    { v: 70, z: "strength" },
    { v: 76, z: "hypertrophy" },
    { v: 81, z: "hypertrophy" },
  ];
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
        <span>Push Day · Today</span>
        <span className="text-brand-400">Otto</span>
      </div>

      {/* headline tiles */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-2xl bg-gradient-to-b from-brand-500/15 to-transparent p-3 ring-1 ring-brand-500/20">
          <div className="text-[22px] font-semibold leading-none text-white">8.4</div>
          <div className="mt-1.5 flex items-center gap-[2px]">
            {[ZONE_COLORS.recovery, ZONE_COLORS.strength, "", ZONE_COLORS.overreach].map(
              (c, i) =>
                c === "" ? (
                  <div key={i} className="relative h-[4px] flex-[1.35] rounded-full bg-gradient-to-r from-brand-400 to-brand-500">
                    <div className="absolute left-[80%] top-1/2 h-[6px] w-[2px] -translate-y-1/2 rounded-full bg-white" />
                  </div>
                ) : (
                  <div key={i} className="h-[3px] flex-1 rounded-full" style={{ backgroundColor: c }} />
                )
            )}
          </div>
          <div className="mt-1.5 text-[8px] font-medium uppercase tracking-widest text-zinc-500">
            Load
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/[0.06]">
          <div className="text-[22px] font-semibold leading-none text-brand-400">+54</div>
          <div className="mt-[13px] text-[8px] font-medium uppercase tracking-widest text-zinc-500">
            Stimulus
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/[0.06]">
          <div className="text-[22px] font-semibold leading-none text-emerald-400">+4%</div>
          <div className="mt-[13px] text-[8px] font-medium uppercase tracking-widest text-zinc-500">
            Readiness
          </div>
        </div>
      </div>

      {/* weekly targets — today's deposit bright, same as the watch */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">Weekly targets</span>
          <Chevron />
        </div>
        <div className="mt-2.5 space-y-2">
          <TargetBar name="Chest" before={102} today={38} target={140} />
          <TargetBar name="Triceps" before={61} today={26} target={140} />
          <TargetBar name="Front delts" before={56} today={19} target={140} />
        </div>
      </div>

      {/* effort by set — bars colored by velocity-loss zone */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">Effort by set</span>
          <Chevron />
        </div>
        <div className="mt-3 flex h-[60px] items-end gap-[5px]">
          {sets.map((s, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-[2px]"
              style={{ height: `${s.v}%`, backgroundColor: ZONE_COLORS[s.z] }}
            />
          ))}
        </div>
        <div className="mt-2 flex items-center gap-3 text-[10px] text-zinc-500">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ZONE_COLORS.hypertrophy }} />
            <span className="font-semibold text-brand-300">6</span> hypertrophy
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ZONE_COLORS.strength }} />
            4 strength
          </span>
        </div>
      </div>

      {/* bar speed trend */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="whitespace-nowrap text-[12px] font-medium text-zinc-300">
            Bar speed @ 225 lb
          </span>
          <div className="flex items-center gap-1.5">
            <span className="whitespace-nowrap text-[11px] font-semibold text-emerald-400">
              +7% · 8 wk
            </span>
            <Chevron />
          </div>
        </div>
        <svg viewBox="0 0 220 48" className="mt-2 h-[48px] w-full">
          <polyline
            points="4,38 36,34 68,36 100,29 132,26 164,20 196,15 216,10"
            fill="none"
            stroke="#34d399"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="216" cy="10" r="3" fill="#34d399" />
        </svg>
      </div>
    </PhoneFrame>
  );
}

/**
 * Flow 2 · Exercise detail — one tap from "Effort by set". The set table
 * with zone chips, then the raw layer: rep-by-rep bar velocity for the
 * selected set, each rep colored by its cumulative velocity-loss zone —
 * the set literally marches through the zones as it fatigues.
 */
export function PhoneExerciseDetail() {
  const setRows = [
    { s: "S1", line: "225 × 8", effort: 78, zone: "strength" as const, sel: false },
    { s: "S2", line: "225 × 8", effort: 82, zone: "hypertrophy" as const, sel: false },
    { s: "S3", line: "225 × 8", effort: 86, zone: "hypertrophy" as const, sel: true },
    { s: "S4", line: "225 × 7", effort: 88, zone: "hypertrophy" as const, sel: false },
  ];
  // rep velocities 0.52 → 0.34 m/s; color = cumulative loss zone
  const reps = [
    { h: 100, c: ZONE_COLORS.recovery },
    { h: 96, c: ZONE_COLORS.recovery },
    { h: 92, c: ZONE_COLORS.power },
    { h: 87, c: ZONE_COLORS.power },
    { h: 81, c: ZONE_COLORS.strength },
    { h: 75, c: ZONE_COLORS.strength },
    { h: 69, c: ZONE_COLORS.hypertrophy },
    { h: 65, c: ZONE_COLORS.hypertrophy },
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
        <span className="text-[17px] font-semibold text-white">Bench Press</span>
        <span className="text-[11px] text-zinc-500">4 sets · +28 chest</span>
      </div>

      {/* set table */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-2 ring-1 ring-white/[0.06]">
        {setRows.map((r) => (
          <div
            key={r.s}
            className={`flex items-center gap-3 rounded-xl px-2.5 py-2 ${
              r.sel ? "bg-white/[0.05]" : ""
            }`}
          >
            <span className="w-5 text-[11px] font-semibold text-zinc-500">{r.s}</span>
            <span className="flex-1 text-[12px] text-zinc-300">{r.line}</span>
            <span className="text-[13px] font-semibold text-white">{r.effort}</span>
            <ZoneChip zone={r.zone} />
          </div>
        ))}
      </div>

      {/* rep-by-rep velocity — the raw layer */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">Set 3 · rep velocity</span>
          <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider text-brand-400">
            −34% · hyp
          </span>
        </div>
        <div className="mt-3 flex h-[56px] items-end gap-[5px]">
          {reps.map((r, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-[2px]"
              style={{ height: `${r.h}%`, backgroundColor: r.c }}
            />
          ))}
        </div>
        <div className="mt-1.5 flex items-baseline justify-between text-[10px]">
          <span className="text-zinc-500">
            <span className="font-semibold text-white">0.52</span> m/s
          </span>
          <span className="text-zinc-500">
            <span className="font-semibold text-white">0.34</span> m/s
          </span>
        </div>
        <div className="mt-1.5 text-[10px] leading-snug text-zinc-500">
          Each rep colored by cumulative velocity loss — the set crosses into
          hypertrophy at rep 7.
        </div>
      </div>
    </PhoneFrame>
  );
}

/**
 * Flow 3 · Strength detail — one tap from "Bar speed". The full
 * load–velocity profile (the watch warmup chart, grown up): today's curve
 * vs 8 weeks ago, the estimated 1RM it implies, and speeds at fixed loads.
 */
export function PhoneStrengthDetail() {
  const speeds = [
    { load: "135 lb", speed: "0.52", delta: "+5%" },
    { load: "185 lb", speed: "0.46", delta: "+4%" },
    { load: "225 lb", speed: "0.38", delta: "+7%" },
  ];
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
        <span className="flex items-center gap-1">
          <span className="text-zinc-600">‹</span> Strength
        </span>
        <span className="text-brand-400">Otto</span>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-[17px] font-semibold text-white">Bench Press</span>
        <span className="text-[11px] text-zinc-500">last 8 weeks</span>
      </div>

      {/* load–velocity profile */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <span className="text-[12px] font-medium text-zinc-300">Load–velocity profile</span>
        <svg viewBox="0 0 220 76" className="mt-2 h-[76px] w-full">
          {/* 8 weeks ago */}
          <polyline
            points="10,26 70,40 130,54 200,68"
            fill="none"
            stroke="#52525b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1 5"
          />
          {/* today */}
          <polyline
            points="10,18 70,30 130,42 200,54"
            fill="none"
            stroke="#34d399"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {[
            [10, 18],
            [70, 30],
            [130, 42],
            [200, 54],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="3" fill="#34d399" />
          ))}
          {["95", "135", "185", "225"].map((l, i) => (
            <text key={l} x={[10, 70, 130, 200][i]} y="75" textAnchor="middle" fill="#52525b" style={{ fontSize: 8 }}>
              {l}
            </text>
          ))}
        </svg>
        <div className="mt-1.5 flex items-center gap-3 text-[10px] text-zinc-500">
          <span className="flex items-center gap-1">
            <span className="h-[2px] w-3 rounded-full bg-emerald-400" /> this week
          </span>
          <span className="flex items-center gap-1">
            <span className="h-[2px] w-3 rounded-full bg-zinc-600" /> 8 wks ago
          </span>
        </div>
      </div>

      {/* est. 1RM */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">Est. 1RM</span>
          <span className="text-[11px] font-semibold text-emerald-400">+7%</span>
        </div>
        <div className="mt-1 flex items-end justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-[26px] font-semibold leading-none text-white">287</span>
            <span className="text-[11px] text-zinc-500">lb · from bar speed</span>
          </div>
          <svg viewBox="0 0 90 28" className="h-[28px] w-[90px]">
            <polyline
              points="2,24 15,22 28,23 41,18 54,16 67,12 80,8 88,5"
              fill="none"
              stroke="#34d399"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* speeds at fixed loads */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <span className="text-[12px] font-medium text-zinc-300">Speed at load</span>
        <div className="mt-2 space-y-1.5">
          {speeds.map((s) => (
            <div key={s.load} className="flex items-baseline text-[11px]">
              <span className="w-14 text-zinc-400">{s.load}</span>
              <span className="flex-1 font-semibold text-white">
                {s.speed} <span className="font-normal text-zinc-600">m/s</span>
              </span>
              <span className="font-semibold text-emerald-400">{s.delta}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

/**
 * Flow 4 · Weekly targets detail — one tap from "Weekly targets". The full
 * ledger: every muscle's account with today's deposits bright, and the
 * week's deposits by day.
 */
export function PhoneTargetsDetail() {
  const days = [
    { d: "M", v: 62 },
    { d: "T", v: 0 },
    { d: "W", v: 78 },
    { d: "T", v: 0 },
    { d: "F", v: 84 },
    { d: "S", v: 91 },
    { d: "S", v: 0 },
  ];
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
        <span className="flex items-center gap-1">
          <span className="text-zinc-600">‹</span> This week
        </span>
        <span className="text-brand-400">Otto</span>
      </div>

      {/* headline tiles */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-2xl bg-gradient-to-b from-brand-500/15 to-transparent p-3 ring-1 ring-brand-500/20">
          <div className="text-[20px] font-semibold leading-none text-white">7/9</div>
          <div className="mt-1.5 text-[8px] font-medium uppercase tracking-widest text-zinc-500">
            Closed
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/[0.06]">
          <div className="text-[20px] font-semibold leading-none text-brand-400">82%</div>
          <div className="mt-1.5 text-[8px] font-medium uppercase tracking-widest text-zinc-500">
            Banked
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/[0.06]">
          <div className="text-[20px] font-semibold leading-none text-white">2</div>
          <div className="mt-1.5 text-[8px] font-medium uppercase tracking-widest text-zinc-500">
            Days left
          </div>
        </div>
      </div>

      {/* full ledger */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">All targets</span>
          <span className="text-[10px] text-zinc-500">resets Sun</span>
        </div>
        <div className="mt-2.5 space-y-2">
          <TargetBar name="Chest" before={102} today={38} target={140} />
          <TargetBar name="Back" before={140} today={0} target={140} />
          <TargetBar name="Triceps" before={61} today={26} target={140} />
          <TargetBar name="Front delts" before={56} today={19} target={140} />
          <TargetBar name="Glutes" before={41} today={0} target={140} />
          <TargetBar name="Calves" before={28} today={0} target={140} />
        </div>
      </div>

      {/* deposits by day */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <span className="text-[12px] font-medium text-zinc-300">Deposits by day</span>
        <div className="mt-3 flex h-[44px] items-end gap-2">
          {days.map((day, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1 self-stretch justify-end">
              <div
                className={`w-full rounded-t-[2px] ${
                  day.v === 0 ? "h-[2px] bg-zinc-800" : i === 5 ? "bg-brand-400" : "bg-brand-500/40"
                }`}
                style={day.v ? { height: `${day.v}%` } : undefined}
              />
              <span className={`text-[8px] ${i === 5 ? "font-semibold text-zinc-300" : "text-zinc-600"}`}>
                {day.d}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

/* -------------------------------------------- rack moment, decrowded */

/**
 * R1 · Flanked — the footer stats move into the dial's shoulders (the dead
 * space a circle leaves on a rectangular screen). −34% moves to the phone's
 * exercise detail; the zone name alone classifies. Four layers → three.
 */
export function InstrumentRackFlanked() {
  const effort = 86;
  const activeIndex = 3;
  const markerPct = 33;
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">SET 3</span>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col items-center">
            <span className="text-[15px] font-semibold leading-none text-emerald-400">+3%</span>
            <span className="mt-1 text-[6px] font-medium uppercase tracking-widest text-zinc-500">
              vs norm
            </span>
          </div>
          <div className="relative h-[98px] w-[98px] shrink-0">
            <svg viewBox={`0 0 ${G_SIZE} ${G_SIZE}`} className="h-full w-full">
              <circle
                cx={G_CX} cy={G_CX} r={G_R} fill="none"
                stroke="rgba(255,255,255,0.08)" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${G_SWEEP * G_C} ${G_C}`}
                transform={`rotate(${G_START_DEG} ${G_CX} ${G_CX})`}
              />
              <circle
                cx={G_CX} cy={G_CX} r={G_R} fill="none"
                stroke="url(#rackFlankRing)" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${(effort / 100) * G_SWEEP * G_C} ${G_C}`}
                transform={`rotate(${G_START_DEG} ${G_CX} ${G_CX})`}
              />
              <defs>
                <linearGradient id="rackFlankRing" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fb6a35" />
                  <stop offset="100%" stopColor="#ef4d18" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-1.5">
              <span className="text-[30px] font-semibold leading-none tracking-tight text-white">
                {effort}
              </span>
              <span className="mt-0.5 text-[7px] font-medium uppercase tracking-widest text-zinc-500">
                Effort
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-center gap-1">
              <span className="text-[12px] font-semibold leading-none text-white">8</span>
              <span className="text-[7px] font-medium uppercase tracking-widest text-zinc-500">
                reps
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[15px] font-semibold leading-none text-brand-400">+12</span>
            <span className="mt-1 text-[6px] font-medium uppercase tracking-widest text-zinc-500">
              stim · 54
            </span>
          </div>
        </div>
        <div className="flex w-full items-center gap-[3px]">
          {ZONES.map((z, i) =>
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
              <div key={z.name} className="h-[8px] flex-1 rounded-full" style={{ backgroundColor: z.color }} />
            )
          )}
        </div>
        <div className="mt-1.5 text-center text-[9px] font-semibold uppercase tracking-widest text-brand-400">
          Hypertrophy
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * R2 · Chip — the band leaves the watch entirely (its full scale lives on
 * the phone); the dial wears the zone's color and a chip names it, using
 * the same STR/HYP chip grammar as the phone's set table. Stimulus gets
 * the payoff row at real size — the landing zone for the tick-up moment.
 */
export function InstrumentRackChip() {
  const effort = 86;
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">SET 3</span>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col items-center">
            <span className="text-[15px] font-semibold leading-none text-emerald-400">+3%</span>
            <span className="mt-1 text-[6px] font-medium uppercase tracking-widest text-zinc-500">
              vs norm
            </span>
          </div>
          <div className="relative h-[106px] w-[106px] shrink-0">
            <svg viewBox={`0 0 ${G_SIZE} ${G_SIZE}`} className="h-full w-full">
              <circle
                cx={G_CX} cy={G_CX} r={G_R} fill="none"
                stroke="rgba(255,255,255,0.08)" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${G_SWEEP * G_C} ${G_C}`}
                transform={`rotate(${G_START_DEG} ${G_CX} ${G_CX})`}
              />
              <circle
                cx={G_CX} cy={G_CX} r={G_R} fill="none"
                stroke="url(#rackChipRing)" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${(effort / 100) * G_SWEEP * G_C} ${G_C}`}
                transform={`rotate(${G_START_DEG} ${G_CX} ${G_CX})`}
              />
              <defs>
                <linearGradient id="rackChipRing" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fb6a35" />
                  <stop offset="100%" stopColor="#ef4d18" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-1.5">
              <span className="text-[32px] font-semibold leading-none tracking-tight text-white">
                {effort}
              </span>
              <span className="mt-0.5 text-[7px] font-medium uppercase tracking-widest text-zinc-500">
                Effort
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-center gap-1">
              <span className="text-[12px] font-semibold leading-none text-white">8</span>
              <span className="text-[7px] font-medium uppercase tracking-widest text-zinc-500">
                reps
              </span>
            </div>
          </div>
          <span
            className="rounded-full px-1.5 py-0.5 text-[8px] font-semibold tracking-wider"
            style={{ backgroundColor: "#fb6a3526", color: "#fb6a35" }}
          >
            HYP
          </span>
        </div>
        {/* the payoff row — where the tick-up lands */}
        <div className="flex items-baseline justify-center gap-1.5">
          <span className="text-[22px] font-semibold leading-none text-brand-300">+12</span>
          <span className="text-[8px] font-medium uppercase tracking-widest text-zinc-500">
            stim
          </span>
          <span className="text-[10px] text-zinc-700">·</span>
          <span className="text-[13px] font-semibold leading-none text-zinc-300">54</span>
          <span className="text-[8px] font-medium uppercase tracking-widest text-zinc-600">
            today
          </span>
        </div>
      </div>
    </WatchFrame>
  );
}

/* ------------------------- vs-norm & stimulus — making them land */

/* Shared top half for the stat experiments: header, a slightly smaller
   Effort dial, and the zone pill — so the three variants compete on the
   bottom third alone. */
function StatExperimentTop({ ringId }: { ringId: string }) {
  const effort = 86;
  const activeIndex = 3;
  const markerPct = 33;
  return (
    <>
      <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
        <span className="text-zinc-500">BENCH PRESS</span>
        <span className="text-zinc-500">SET 3</span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative h-[92px] w-[92px]">
          <svg viewBox={`0 0 ${G_SIZE} ${G_SIZE}`} className="h-full w-full">
            <circle
              cx={G_CX} cy={G_CX} r={G_R} fill="none"
              stroke="rgba(255,255,255,0.08)" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${G_SWEEP * G_C} ${G_C}`}
              transform={`rotate(${G_START_DEG} ${G_CX} ${G_CX})`}
            />
            <circle
              cx={G_CX} cy={G_CX} r={G_R} fill="none"
              stroke={`url(#${ringId})`} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${(effort / 100) * G_SWEEP * G_C} ${G_C}`}
              transform={`rotate(${G_START_DEG} ${G_CX} ${G_CX})`}
            />
            <defs>
              <linearGradient id={ringId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fb6a35" />
                <stop offset="100%" stopColor="#ef4d18" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-1.5">
            <span className="text-[26px] font-semibold leading-none tracking-tight text-white">
              86
            </span>
            <span className="mt-0.5 text-[7px] font-medium uppercase tracking-widest text-zinc-500">
              Effort
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-center gap-1">
            <span className="text-[11px] font-semibold leading-none text-white">8</span>
            <span className="text-[6px] font-medium uppercase tracking-widest text-zinc-500">
              reps
            </span>
          </div>
        </div>
        <div className="mt-2 flex w-full items-center gap-[3px]">
          {ZONES.map((z, i) =>
            i === activeIndex ? (
              <div
                key={z.name}
                className="relative flex h-[16px] flex-[2.8] items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-brand-400 to-brand-500"
              >
                <span className="text-[6.5px] font-bold uppercase tracking-wide text-black/80">
                  Hypertrophy
                </span>
                <div
                  className="absolute bottom-0 h-0 w-0 -translate-x-1/2 border-x-[3px] border-b-[4px] border-x-transparent border-b-white"
                  style={{ left: `${markerPct}%` }}
                />
              </div>
            ) : (
              <div key={z.name} className="h-[9px] flex-1 rounded-[3px]" style={{ backgroundColor: z.color }} />
            )
          )}
        </div>
      </div>
    </>
  );
}

/**
 * S1 · Twin dials — vs norm as a center-zero meter (needle tilt IS the
 * read: right of the zero tick = faster than usual, scale ±10%), stimulus
 * as a deposit ring: the day's earlier 42 dim, the fresh +12 bright —
 * the session-end bar grammar bent into a dial.
 */
export function InstrumentStatDials() {
  // center-zero meter: ±10% maps to ±90° from the top
  const delta = 3;
  const a = (delta / 10) * 90 * (Math.PI / 180);
  const mx = 34 + 26 * Math.sin(a);
  const my = 36 - 26 * Math.cos(a);
  // deposit ring: 42 dim + 12 bright of a 64-capacity sweep
  const sr = 15;
  const sc = 2 * Math.PI * sr;
  const cap = 64;

  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <StatExperimentTop ringId="statDialsRing" />
        <div className="mt-2.5 flex items-end justify-around">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 68 40" className="h-[34px] w-[58px]">
              <path d="M 8 36 A 26 26 0 0 1 60 36" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" strokeLinecap="round" />
              <line x1="34" y1="8" x2="34" y2="13" stroke="#52525b" strokeWidth="1.5" strokeLinecap="round" />
              <path d={`M 34 10 A 26 26 0 0 1 ${mx.toFixed(1)} ${my.toFixed(1)}`} fill="none" stroke="#34d399" strokeWidth="5" strokeLinecap="round" />
            </svg>
            <span className="mt-1 text-[13px] font-semibold leading-none text-emerald-400">+3%</span>
            <span className="mt-1 text-[6px] font-medium uppercase tracking-widest text-zinc-500">
              225 · vs norm
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative h-[38px] w-[38px]">
              <svg viewBox="0 0 44 44" className="h-full w-full">
                <circle
                  cx="22" cy="22" r={sr} fill="none"
                  stroke="rgba(255,255,255,0.08)" strokeWidth="5" strokeLinecap="round"
                  strokeDasharray={`${0.75 * sc} ${sc}`} transform="rotate(135 22 22)"
                />
                <circle
                  cx="22" cy="22" r={sr} fill="none"
                  stroke="#9a3412" strokeWidth="5"
                  strokeDasharray={`${(42 / cap) * 0.75 * sc} ${sc}`} transform="rotate(135 22 22)"
                />
                <circle
                  cx="22" cy="22" r={sr} fill="none"
                  stroke="#fb6a35" strokeWidth="5" strokeLinecap="round"
                  strokeDasharray={`${(12 / cap) * 0.75 * sc} ${sc}`}
                  transform={`rotate(${135 + (42 / cap) * 270} 22 22)`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pt-0.5">
                <span className="text-[11px] font-semibold leading-none text-brand-300">+12</span>
              </div>
            </div>
            <span className="mt-1 text-[6px] font-medium uppercase tracking-widest text-zinc-500">
              stim · 54 today
            </span>
          </div>
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * S2 · Strips — both stats as the phone's own graph grammar, inline.
 * Vs norm as a Vitals-style range bar (gray band = your typical speed at
 * 225, the dot = today, riding above it). Stimulus as the deposit bar:
 * earlier 42 dim, the fresh +12 bright — identical to the session-end
 * weekly bars, so the grammar is learned once.
 */
export function InstrumentStatStrips() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <StatExperimentTop ringId="statStripsRing" />
        <div className="mt-3 space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="w-[38px] whitespace-nowrap text-[8px] font-medium uppercase tracking-wider text-zinc-500">
              225 lb
            </span>
            <div className="relative h-1 flex-1 rounded-full bg-white/10">
              <div className="absolute inset-y-0 left-[26%] w-[36%] rounded-full bg-white/25" />
              <div className="absolute -top-[2.5px] left-[72%] h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-emerald-400 ring-2 ring-black" />
            </div>
            <span className="w-7 text-right text-[11px] font-semibold leading-none text-emerald-400">
              +3%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-[38px] whitespace-nowrap text-[8px] font-medium uppercase tracking-wider text-zinc-500">
              stim
            </span>
            <div className="flex h-[5px] flex-1 gap-px overflow-hidden rounded-full bg-white/10">
              <div className="bg-brand-500/35" style={{ width: "60%" }} />
              <div className="rounded-r-full bg-brand-400" style={{ width: "17%" }} />
            </div>
            <span className="w-7 whitespace-nowrap text-right text-[11px] font-semibold leading-none text-brand-300">
              +12
            </span>
          </div>
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * S3 · Spark & burst — vs norm as a set-by-set sparkline (today's speeds
 * at 225 against the dashed norm line: the drift story, not just the last
 * reading). Stimulus as the pop itself: the +12 with burst ticks — the
 * frozen frame of the tick-up animation, one haptic per point on hardware.
 */
export function InstrumentStatSpark() {
  const bursts = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * 2 * Math.PI;
    return {
      x1: 22 + 13 * Math.cos(a),
      y1: 22 + 13 * Math.sin(a),
      x2: 22 + 17 * Math.cos(a),
      y2: 22 + 17 * Math.sin(a),
    };
  });
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <StatExperimentTop ringId="statSparkRing" />
        <div className="mt-2.5 flex items-end justify-around">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 70 26" className="h-[24px] w-[64px]">
              <line x1="2" y1="15" x2="68" y2="15" stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="2.5 3" />
              <polyline points="8,18 26,16.5 44,14 62,10" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" />
              {[
                { x: 8, y: 18 },
                { x: 26, y: 16.5 },
                { x: 44, y: 14 },
              ].map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="2" fill="#34d399" fillOpacity="0.55" />
              ))}
              <circle cx="62" cy="10" r="3" fill="#34d399" />
            </svg>
            <span className="mt-1 flex items-baseline gap-1">
              <span className="text-[13px] font-semibold leading-none text-emerald-400">+3%</span>
            </span>
            <span className="mt-1 text-[6px] font-medium uppercase tracking-widest text-zinc-500">
              225 · by set
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative flex h-[38px] w-[44px] items-center justify-center">
              <svg viewBox="0 0 44 44" className="absolute inset-0 h-full w-full">
                {bursts.map((b, i) => (
                  <line
                    key={i}
                    x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2}
                    stroke="#fb6a35" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round"
                  />
                ))}
              </svg>
              <span className="text-[15px] font-semibold leading-none text-brand-300">+12</span>
            </div>
            <span className="mt-1 text-[6px] font-medium uppercase tracking-widest text-zinc-500">
              stim · 54 today
            </span>
          </div>
        </div>
      </div>
    </WatchFrame>
  );
}

/* ------------------------- weekly muscle targets — exploration */

/**
 * The approach — the goal-gradient state of the selected rack screen.
 * When a deposit brings a muscle's weekly account within one hard set of
 * closing, the rail names the destination: "chest · 12 left". Anticipation
 * as data — the takeover only happens if the next set actually closes it.
 */
export function InstrumentRackNearTarget() {
  const effort = 86;
  const activeIndex = 3;
  const markerPct = 33;
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">SET 3</span>
        </div>
        <div className="flex flex-1 items-center">
          <div className="relative h-[104px] w-[104px] shrink-0">
            <svg viewBox={`0 0 ${G_SIZE} ${G_SIZE}`} className="h-full w-full">
              <circle
                cx={G_CX} cy={G_CX} r={G_R} fill="none"
                stroke="rgba(255,255,255,0.08)" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${G_SWEEP * G_C} ${G_C}`}
                transform={`rotate(${G_START_DEG} ${G_CX} ${G_CX})`}
              />
              <circle
                cx={G_CX} cy={G_CX} r={G_R} fill="none"
                stroke="url(#rackNearRing)" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${(effort / 100) * G_SWEEP * G_C} ${G_C}`}
                transform={`rotate(${G_START_DEG} ${G_CX} ${G_CX})`}
              />
              <defs>
                <linearGradient id="rackNearRing" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fb6a35" />
                  <stop offset="100%" stopColor="#ef4d18" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
              <span className="text-[32px] font-semibold leading-none tracking-tight text-white">
                {effort}
              </span>
              <span className="mt-0.5 text-[8px] font-medium uppercase tracking-widest text-zinc-500">
                Effort
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-center gap-1">
              <span className="text-[13px] font-semibold leading-none text-white">8</span>
              <span className="text-[7px] font-medium uppercase tracking-widest text-zinc-500">
                reps
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-[17px] font-semibold leading-none text-emerald-400">+3%</span>
              <span className="mt-1 whitespace-nowrap text-[6px] font-medium uppercase tracking-wide text-zinc-500">
                225 · vs norm
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[17px] font-semibold leading-none text-brand-300">+12</span>
              <span className="mt-1 whitespace-nowrap text-[6px] font-medium uppercase tracking-wide text-brand-300">
                chest · 12 left
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center gap-[3px]">
          {ZONES.map((z, i) =>
            i === activeIndex ? (
              <div
                key={z.name}
                className="relative flex h-[18px] flex-[2.8] items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-brand-400 to-brand-500"
              >
                <span className="text-[7px] font-bold uppercase tracking-wide text-black/80">
                  Hypertrophy
                </span>
                <div
                  className="absolute bottom-0 h-0 w-0 -translate-x-1/2 border-x-[3.5px] border-b-[4.5px] border-x-transparent border-b-white"
                  style={{ left: `${markerPct}%` }}
                />
              </div>
            ) : (
              <div key={z.name} className="h-[10px] flex-1 rounded-[3px]" style={{ backgroundColor: z.color }} />
            )
          )}
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * The week at a glance — every muscle's account on the watch. Closed
 * accounts read ✓ emerald; open ones state what's left, never what was
 * missed. Targets are earnings goals: a week that doesn't close simply
 * resets — no debt, no red states.
 */
const WEEK_ACCOUNTS = [
  { name: "Chest", done: 140, target: 140 },
  { name: "Back", done: 140, target: 140 },
  { name: "Triceps", done: 64, target: 90 },
  { name: "Delts", done: 81, target: 100 },
  { name: "Glutes", done: 21, target: 120 },
];

export function InstrumentWeekAccount() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">THIS WEEK</span>
          <span className="text-zinc-500">RESETS SUN</span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2">
          {WEEK_ACCOUNTS.map((m) => {
            const closed = m.done >= m.target;
            return (
              <div key={m.name} className="flex items-center gap-2">
                <span className="w-[44px] text-[9px] font-medium text-zinc-400">{m.name}</span>
                <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${closed ? "bg-emerald-400" : "bg-brand-500/70"}`}
                    style={{ width: `${(m.done / m.target) * 100}%` }}
                  />
                </div>
                <span
                  className={`w-[38px] whitespace-nowrap text-right text-[9px] font-semibold ${
                    closed ? "text-emerald-400" : "text-zinc-500"
                  }`}
                >
                  {closed ? "✓" : `${m.target - m.done} left`}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between text-[9px] font-medium uppercase tracking-widest text-zinc-600">
          <span>
            <span className="text-zinc-400">76%</span> banked
          </span>
          <span>2 days left</span>
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * Setting the targets — the phone side. Otto suggests a per-muscle weekly
 * number from the lifter's own 8-week average; overriding is a stepper,
 * not a questionnaire. The provenance line under each name says where the
 * number came from — a measurement, not a plan Otto is imposing.
 */
const TARGET_ROWS = [
  { name: "Chest", value: 140, source: "suggested · 8-wk avg" },
  { name: "Back", value: 140, source: "suggested · 8-wk avg" },
  { name: "Triceps", value: 90, source: "custom" },
  { name: "Front delts", value: 100, source: "suggested · 8-wk avg" },
  { name: "Glutes", value: 120, source: "suggested · 8-wk avg" },
];

export function InstrumentTargetsEditor() {
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
        <span>‹ Settings</span>
        <span className="text-brand-400">Otto</span>
      </div>
      <h3 className="mt-4 text-[17px] font-semibold text-white">Weekly targets</h3>
      <p className="mt-0.5 text-[11px] text-zinc-500">Stimulus per muscle · resets Sunday</p>
      <div className="mt-4 space-y-1.5">
        {TARGET_ROWS.map((row) => (
          <div
            key={row.name}
            className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-3.5 py-2.5 ring-1 ring-white/[0.06]"
          >
            <div>
              <div className="text-[13px] font-medium text-white">{row.name}</div>
              <div className={`text-[9px] ${row.source === "custom" ? "text-brand-300" : "text-zinc-600"}`}>
                {row.source}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06] text-[13px] text-zinc-400">
                −
              </span>
              <span className="w-8 text-center text-[14px] font-semibold tabular-nums text-white">
                {row.value}
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06] text-[13px] text-zinc-400">
                +
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] leading-relaxed text-zinc-600">
        Suggestions come from your own 8-week average. A week that doesn&apos;t close
        simply resets — targets never carry debt.
      </p>
    </PhoneFrame>
  );
}

/* ----------------------------- warmups, made glanceable */

/**
 * Warmups, simplified — the answer first, in words anyone's girlfriend
 * reads correctly at a glance: "+4% · faster than usual". The picture is
 * two bars at the same weight — today (emerald) longer than usual (zinc),
 * longer = faster. No m/s, no "baseline", no downward-sloping curve
 * (falling lines read as "getting worse" to everyone outside the VBT
 * literature). The load–velocity profile moves to the phone's strength
 * detail, where it belongs.
 */
export function InstrumentWarmupBars() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">WARM-UP 3/3</span>
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <span className="text-[38px] font-semibold leading-none tracking-tight text-emerald-400">
            +4%
          </span>
          <span className="mt-1.5 text-[10px] font-medium uppercase tracking-widest text-zinc-400">
            faster than usual
          </span>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-9 text-[8px] font-medium uppercase tracking-widest text-emerald-400">
                today
              </span>
              <div className="h-2.5 flex-1">
                <div className="h-full w-[86%] rounded-full bg-emerald-400" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-9 text-[8px] font-medium uppercase tracking-widest text-zinc-500">
                usual
              </span>
              <div className="h-2.5 flex-1">
                <div className="h-full w-[78%] rounded-full bg-zinc-600" />
              </div>
            </div>
          </div>
          <div className="mt-2 text-[8px] font-medium uppercase tracking-widest text-zinc-600">
            bar speed · same weight
          </div>
        </div>
        <div className="text-center text-[10px] font-medium text-zinc-600">
          LAST SET <span className="text-white">225 LB × 8</span>
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * Warmups, dots variant — keeps the "readiness forming set by set" story
 * but flips the axis so up = faster. Three dots climbing past the dashed
 * "usual" line; the last one is ringed as the current read.
 */
export function InstrumentWarmupDots() {
  // x spread across the chart, y as % from top (up = faster than usual)
  const dots = [
    { x: 18, y: 40 }, // w1 · a touch slow
    { x: 78, y: 26 }, // w2 · above usual
    { x: 138, y: 14 }, // w3 · well above
  ];
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">WARM-UP 3/3</span>
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <span className="text-[38px] font-semibold leading-none tracking-tight text-emerald-400">
            +4%
          </span>
          <span className="mt-1.5 text-[10px] font-medium uppercase tracking-widest text-zinc-400">
            faster than usual
          </span>
          <div className="relative mt-4 h-[52px]">
            <svg viewBox="0 0 156 52" className="h-full w-full">
              <line x1="0" y1="34" x2="156" y2="34" stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="3 4" />
              <polyline
                points={dots.map((d) => `${d.x},${d.y}`).join(" ")}
                fill="none"
                stroke="#34d399"
                strokeWidth="2"
                strokeOpacity="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {dots.map((d, i) => (
                <g key={i}>
                  {i === dots.length - 1 && (
                    <circle cx={d.x} cy={d.y} r="7" fill="none" stroke="#34d399" strokeOpacity="0.35" strokeWidth="1.5" />
                  )}
                  <circle cx={d.x} cy={d.y} r={i === dots.length - 1 ? 4 : 3} fill="#34d399" />
                </g>
              ))}
            </svg>
            <span className="absolute right-0 top-[38px] text-[7px] font-medium uppercase tracking-widest text-zinc-600">
              usual
            </span>
          </div>
          <div className="mt-1 text-[8px] font-medium uppercase tracking-widest text-zinc-600">
            each warm-up set
          </div>
        </div>
        <div className="text-center text-[10px] font-medium text-zinc-600">
          LAST SET <span className="text-white">225 LB × 8</span>
        </div>
      </div>
    </WatchFrame>
  );
}

/**
 * Warmups, text-based — the most watchOS-native treatment: typography is
 * the interface, like Activity notifications. Three lines, the key phrase
 * in the readiness color. Still a measurement, just spoken. No trend
 * widget: the sentence updates after every warm-up set, so the forming
 * story is experienced in time rather than drawn in space (the header's
 * 3/3 carries progress). Footer states history, not prescription: Otto
 * knows last time's top set; it doesn't know your plan.
 */
export function InstrumentWarmupText() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-6 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">WARM-UP 3/3</span>
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <div className="text-[23px] font-semibold leading-[1.25] tracking-tight">
            <div className="text-zinc-200">Moving</div>
            <div className="text-emerald-400">4% faster</div>
            <div className="text-zinc-200">than usual</div>
          </div>
        </div>
        <div className="text-[10px] font-medium text-zinc-600">
          LAST SET <span className="text-white">225 LB × 8</span>
        </div>
      </div>
    </WatchFrame>
  );
}
