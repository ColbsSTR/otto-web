/**
 * App home screen — Oura/Whoop grammar: score rings as the hero, each score
 * card pairing a ring with its contributors. Translation decisions:
 * the hero score is the WEEK (stimulus banked vs targets — Otto's closest
 * equivalent to Oura's Readiness as "the one number"), Load and Effort ride
 * as satellite scores at their native timescales (7-day rolling / last
 * session). What we deliberately don't borrow: the adjectives. Oura says
 * "85 · Good"; Otto lets the vs-typical comparison do the interpreting.
 *
 * Data story continues from the watch: yesterday's Push Day (Load 8.4,
 * 12 sets, PR 225×8), week at 446 banked / 76%, 3 of 9 targets closed,
 * bench est 1RM 287 (+7% over 8 weeks).
 */

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[300px] shrink-0 rounded-[46px] bg-gradient-to-b from-zinc-700 to-zinc-900 p-[10px] shadow-2xl shadow-black/60 ring-1 ring-white/10">
      <div className="relative overflow-hidden rounded-[37px] bg-[#0c0c0e]">
        <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="px-5 pb-5 pt-12">{children}</div>
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

function Spark({ points }: { points: string }) {
  return (
    <svg viewBox="0 0 48 16" className="h-[14px] w-[44px]">
      <polyline
        points={points}
        fill="none"
        stroke="#34d399"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.8"
      />
    </svg>
  );
}

/** Full-circle score ring, Oura-style: 270°-equivalent presence, gap-free. */
function ScoreRing({
  size,
  pct,
  color,
  gradient = false,
  children,
}: {
  size: number;
  pct: number;
  color: string;
  gradient?: boolean;
  children: React.ReactNode;
}) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const id = `ring-${color.replace("#", "")}-${size}`;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="9" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={gradient ? `url(#${id})` : color}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${(pct * c).toFixed(2)} ${c.toFixed(2)}`}
        />
        {gradient && (
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fb6a35" />
              <stop offset="100%" stopColor="#ef4d18" />
            </linearGradient>
          </defs>
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

const WEEK_DEPOSITS = [
  { day: "M", value: 118 },
  { day: "T", value: 0 },
  { day: "W", value: 132 },
  { day: "T", value: 0 },
  { day: "F", value: 142 },
  { day: "S", value: 54, today: true },
  { day: "S", value: 0 },
];

const LIFTS = [
  { name: "Bench Press", oneRm: 287, delta: "+7%", spark: "0,12 12,11 24,9 36,6 48,3" },
  { name: "Squat", oneRm: 405, delta: "+3%", spark: "0,11 12,10 24,10 36,8 48,6" },
  { name: "Deadlift", oneRm: 495, delta: "+1%", spark: "0,10 12,9 24,10 36,9 48,8" },
];

export function AppHomeScreen() {
  const maxDeposit = Math.max(...WEEK_DEPOSITS.map((d) => d.value));
  return (
    <PhoneFrame>
      {/* status row */}
      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
        <span>Sat, Jul 12</span>
        <span className="text-brand-400">Otto</span>
      </div>

      {/* 1 · hero score — the week, ring + contributors */}
      <div className="mt-4 rounded-3xl bg-gradient-to-b from-brand-500/12 to-transparent p-5 ring-1 ring-brand-500/20">
        <div className="flex items-center gap-4">
          <ScoreRing size={96} pct={0.76} color="#fb6a35" gradient>
            <span className="text-[24px] font-semibold leading-none tracking-tight text-white">
              446
            </span>
            <span className="mt-1 text-[7px] font-medium uppercase tracking-widest text-zinc-500">
              banked
            </span>
          </ScoreRing>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="whitespace-nowrap text-[13px] font-semibold text-white">
                This week
              </span>
              <Chevron />
            </div>
            <div className="mt-2.5 space-y-2 text-[11px]">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-zinc-500">Closed</span>
                <span className="whitespace-nowrap font-semibold text-white">3 / 9</span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-zinc-500">Today</span>
                <span className="whitespace-nowrap font-semibold text-brand-300">+54</span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="whitespace-nowrap text-zinc-500">vs typical</span>
                <span className="whitespace-nowrap font-semibold text-emerald-400">+8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2 · satellite scores — Load & Effort at their native timescales */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
          <ScoreRing size={56} pct={0.74} color="#a1a1aa">
            <span className="text-[15px] font-semibold leading-none text-white">7.4</span>
          </ScoreRing>
          <div className="mt-2 text-[9px] font-medium uppercase tracking-widest text-zinc-500">
            Load · 7d
          </div>
          <div className="mt-0.5 whitespace-nowrap text-[10px]">
            <span className="font-semibold text-emerald-400">+0.6</span>
            <span className="text-zinc-600"> vs 4-wk</span>
          </div>
        </div>
        <div className="flex flex-col items-center rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
          <ScoreRing size={56} pct={0.83} color="#e4e4e7">
            <span className="text-[15px] font-semibold leading-none text-white">83</span>
          </ScoreRing>
          <div className="mt-2 text-[9px] font-medium uppercase tracking-widest text-zinc-500">
            Effort
          </div>
          <div className="mt-0.5 whitespace-nowrap text-[10px]">
            <span className="font-semibold text-emerald-400">↑ 2</span>
            <span className="text-zinc-600"> last session</span>
          </div>
        </div>
      </div>

      {/* 3 · last session — the continuity door */}
      <div className="mt-3 flex items-center justify-between rounded-3xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/[0.06]">
        <div>
          <div className="text-[12px] font-medium text-white">Push Day</div>
          <div className="mt-0.5 text-[10px] text-zinc-500">
            Yesterday · Load <span className="text-zinc-300">8.4</span> · 12 sets ·{" "}
            <span className="font-semibold text-emerald-400">PR 225 × 8</span>
          </div>
        </div>
        <Chevron />
      </div>

      {/* 4 · stimulus by day — the week's shape */}
      <div className="mt-3 rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">Stimulus · this week</span>
          <span className="text-[10px] text-zinc-500">resets Sun</span>
        </div>
        <div className="mt-3 flex h-[52px] items-end gap-1.5">
          {WEEK_DEPOSITS.map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`w-full rounded-[3px] ${
                  d.value === 0
                    ? "h-[3px] bg-zinc-800"
                    : d.today
                      ? "bg-brand-400"
                      : "bg-brand-500/35"
                }`}
                style={d.value > 0 ? { height: `${(d.value / maxDeposit) * 44}px` } : undefined}
              />
              <span className={`text-[8px] font-medium ${d.today ? "text-brand-300" : "text-zinc-600"}`}>
                {d.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5 · strength — the payoff */}
      <div className="mt-3 rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">Strength · est 1RM</span>
          <span className="flex items-center gap-1.5 text-[10px] text-zinc-500">
            from bar speed <Chevron />
          </span>
        </div>
        <div className="mt-3 space-y-2.5">
          {LIFTS.map((l) => (
            <div key={l.name} className="flex items-center justify-between">
              <span className="text-[12px] text-white">{l.name}</span>
              <span className="flex items-center gap-2.5">
                <Spark points={l.spark} />
                <span className="w-8 text-right text-[13px] font-semibold tabular-nums text-white">
                  {l.oneRm}
                </span>
                <span className="w-8 text-right text-[10px] font-semibold text-emerald-400">
                  {l.delta}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6 · tab bar */}
      <div className="mt-4 flex items-center justify-around border-t border-white/[0.06] pt-3 text-[9px] font-medium uppercase tracking-wider">
        <span className="text-brand-400">Home</span>
        <span className="text-zinc-600">Sessions</span>
        <span className="text-zinc-600">Strength</span>
        <span className="text-zinc-600">Targets</span>
      </div>
    </PhoneFrame>
  );
}
