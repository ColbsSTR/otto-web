/**
 * App UI — Oura/Whoop grammar (score rings + contributors), split across
 * real tabs so no screen is longer than an actual phone viewport:
 *   Home     — the week's headline: hero ring, satellite scores, last session
 *   Targets  — the week's body: muscle map, deposits by day, leaderboard
 *   Strength — the payoff: est. 1RM per lift, the bar-speed trend
 * What we deliberately don't borrow from Oura: the adjectives. No "85 ·
 * Good" — the vs-typical comparison does the interpreting.
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

function Spark({ points, className = "h-[14px] w-[44px]" }: { points: string; className?: string }) {
  return (
    <svg viewBox="0 0 48 16" className={className} preserveAspectRatio="none">
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

/** Full-circle score ring, Oura-style. */
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

/* ------------------------------------------------------------- tab bar */

const TABS = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L10 3l7 6.5" />
        <path d="M5 8.5V16a1 1 0 001 1h8a1 1 0 001-1V8.5" />
      </svg>
    ),
  },
  {
    id: "sessions",
    label: "Sessions",
    icon: (
      <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <rect x="3" y="4" width="14" height="13" rx="2.5" />
        <path d="M3 8.5h14M7 4V2.5M13 4V2.5" />
      </svg>
    ),
  },
  {
    id: "strength",
    label: "Strength",
    icon: (
      <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M3 10h2.5M14.5 10H17" />
        <rect x="5.5" y="6" width="2.5" height="8" rx="1" />
        <rect x="12" y="6" width="2.5" height="8" rx="1" />
        <path d="M8 10h4" />
      </svg>
    ),
  },
  {
    id: "targets",
    label: "Targets",
    icon: (
      <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="10" cy="10" r="7" />
        <circle cx="10" cy="10" r="3.5" />
        <circle cx="10" cy="10" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
] as const;

function TabBar({ active }: { active: (typeof TABS)[number]["id"] }) {
  return (
    <div className="mt-4 flex items-start justify-around border-t border-white/[0.06] pt-2.5">
      {TABS.map((t) => (
        <span
          key={t.id}
          className={`flex flex-col items-center gap-1 ${
            active === t.id ? "text-brand-400" : "text-zinc-600"
          }`}
        >
          {t.icon}
          <span
            className={`text-[8px] uppercase tracking-wider ${
              active === t.id ? "font-semibold" : "font-medium"
            }`}
          >
            {t.label}
          </span>
        </span>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- data */

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

/* ----------------------------------------------------------- Home tab */

export function AppHomeScreen() {
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
        <span>Sat, Jul 12</span>
        <span className="text-brand-400">Otto</span>
      </div>

      {/* hero score — the week, ring + contributors */}
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

      {/* satellite scores */}
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

      {/* last session — the continuity door */}
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

      <TabBar active="home" />
    </PhoneFrame>
  );
}

/* -------------------------------------------------------- Targets tab */

export function AppTargetsScreen() {
  const maxDeposit = Math.max(...WEEK_DEPOSITS.map((d) => d.value));
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
        <span>This week · resets Sun</span>
        <span className="text-brand-400">Otto</span>
      </div>

      {/* muscle map — stimulus per muscle as heat */}
      <div className="mt-4 rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">Muscle map</span>
          <span className="flex gap-0.5 rounded-full bg-white/[0.06] p-0.5 text-[9px] font-medium">
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-white">Front</span>
            <span className="px-2 py-0.5 text-zinc-600">Back</span>
          </span>
        </div>
        <div className="mt-3 flex items-center gap-4">
          {/* brighter = more stimulus banked toward the weekly target */}
          <svg viewBox="0 0 120 196" className="h-[148px] shrink-0">
            <circle cx="60" cy="12" r="9" fill="#27272a" />
            <rect x="46" y="22" width="28" height="6" rx="3" fill="#fb6a35" fillOpacity="0.3" />
            <circle cx="37" cy="33" r="7.5" fill="#fb6a35" fillOpacity="0.7" />
            <circle cx="83" cy="33" r="7.5" fill="#fb6a35" fillOpacity="0.7" />
            <rect x="44" y="28" width="15" height="20" rx="5" fill="#fb6a35" fillOpacity="1" />
            <rect x="61" y="28" width="15" height="20" rx="5" fill="#fb6a35" fillOpacity="1" />
            <rect x="26.5" y="40" width="9" height="22" rx="4.5" fill="#fb6a35" fillOpacity="0.55" />
            <rect x="84.5" y="40" width="9" height="22" rx="4.5" fill="#fb6a35" fillOpacity="0.55" />
            <rect x="24" y="66" width="8" height="24" rx="4" fill="#fb6a35" fillOpacity="0.18" />
            <rect x="88" y="66" width="8" height="24" rx="4" fill="#fb6a35" fillOpacity="0.18" />
            <rect x="47" y="52" width="26" height="30" rx="6" fill="#fb6a35" fillOpacity="0.3" />
            <rect x="44" y="86" width="32" height="14" rx="5" fill="#27272a" />
            <rect x="44" y="104" width="14" height="38" rx="6" fill="#fb6a35" fillOpacity="0.15" />
            <rect x="62" y="104" width="14" height="38" rx="6" fill="#fb6a35" fillOpacity="0.15" />
            <rect x="45.5" y="148" width="11" height="30" rx="5" fill="#fb6a35" fillOpacity="0.08" />
            <rect x="63.5" y="148" width="11" height="30" rx="5" fill="#fb6a35" fillOpacity="0.08" />
          </svg>
          <div className="flex-1 space-y-2 text-[11px]">
            <div className="flex items-baseline justify-between">
              <span className="text-zinc-400">Chest</span>
              <span className="font-semibold text-emerald-400">140 ✓</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-zinc-400">Delts</span>
              <span className="font-semibold text-white">81</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-zinc-400">Arms</span>
              <span className="font-semibold text-white">64</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-zinc-400">Quads</span>
              <span className="font-semibold text-zinc-500">21</span>
            </div>
            <div className="pt-1 text-[9px] leading-relaxed text-zinc-600">
              Brighter = more banked
            </div>
          </div>
        </div>
      </div>

      {/* deposits by day */}
      <div className="mt-3 rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">Deposits by day</span>
          <span className="text-[10px] text-zinc-500">
            <span className="font-semibold text-zinc-300">446</span> banked
          </span>
        </div>
        <div className="mt-3 flex h-[48px] items-end gap-1.5">
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
                style={d.value > 0 ? { height: `${(d.value / maxDeposit) * 40}px` } : undefined}
              />
              <span className={`text-[8px] font-medium ${d.today ? "text-brand-300" : "text-zinc-600"}`}>
                {d.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* leaderboard — stimulus accumulated */}
      <div className="mt-3 rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">Leaderboard</span>
          <span className="flex items-center gap-1.5 text-[10px] text-zinc-500">
            stimulus banked <Chevron />
          </span>
        </div>
        <div className="mt-3 space-y-1.5">
          {[
            { name: "Maya R.", score: 512, you: false },
            { name: "You", score: 446, you: true },
            { name: "Devon K.", score: 401, you: false },
          ].map((row, i) => (
            <div
              key={row.name}
              className={`flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 ${
                row.you ? "bg-brand-500/12 ring-1 ring-brand-500/25" : "bg-white/[0.03]"
              }`}
            >
              <span className="w-3 text-[11px] font-semibold text-zinc-500">{i + 1}</span>
              <span className="h-5 w-5 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 ring-1 ring-white/10" />
              <span className={`flex-1 text-[11px] ${row.you ? "font-semibold text-white" : "text-zinc-300"}`}>
                {row.name}
              </span>
              <span className={`text-[11px] font-semibold tabular-nums ${row.you ? "text-brand-300" : "text-zinc-400"}`}>
                {row.score}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[9px] leading-relaxed text-zinc-600">
          Ranked by stimulus banked — work done, not weight lifted.
        </p>
      </div>

      <TabBar active="targets" />
    </PhoneFrame>
  );
}

/* ------------------------------------------------------- Strength tab */

export function AppStrengthScreen() {
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
        <span>Strength</span>
        <span className="text-brand-400">Otto</span>
      </div>

      {/* est 1RM per lift */}
      <div className="mt-4 rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">Est. 1RM</span>
          <span className="text-[10px] text-zinc-500">from bar speed</span>
        </div>
        <div className="mt-3 space-y-3">
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

      {/* the trend, full width */}
      <div className="mt-3 rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-300">Bench · bar speed @ 225</span>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
            +7% · 8 wk <Chevron />
          </span>
        </div>
        <Spark points="0,13 6,12.5 12,12 18,11 24,10.5 30,9 36,7.5 42,5.5 48,4" className="mt-3 h-[56px] w-full" />
        <p className="mt-2 text-[9px] leading-relaxed text-zinc-600">
          Same weight, moving faster — strength you can see before the PR happens.
        </p>
      </div>

      <TabBar active="strength" />
    </PhoneFrame>
  );
}
