/**
 * Watch UI explorations — the post-set / rest moment.
 * Shared data story across all variants: Bench Press, set 3, 8 reps counted,
 * Effort 86 with ~2 reps left, 1:24 into rest, +54 stimulus banked so far.
 * Round 2 adds: readiness resolved during warmups (warmup bar speed +4%
 * vs baseline) and today's per-set Effort trend (72 → 78 → 82 → 86).
 * Color language (Apple workout convention): brand orange = Effort & stimulus
 * earned, white = counted facts, emerald = in the tank / readiness,
 * yellow = time.
 */

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

/** Readiness as a delta to the lifter's baseline — emerald when up, amber when down. */
function ReadinessDelta({ value = "+4%" }: { value?: string }) {
  const up = value.startsWith("+");
  return (
    <span className="flex items-baseline gap-1">
      <span className={`font-semibold ${up ? "text-emerald-400" : "text-amber-400"}`}>
        {value}
      </span>
      <span className="text-zinc-600">BASE</span>
    </span>
  );
}

function WatchFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[208px] rounded-[58px] bg-gradient-to-b from-zinc-700 to-zinc-900 p-[6px] shadow-2xl shadow-black/60 ring-1 ring-white/10">
      {/* digital crown */}
      <div className="absolute -right-[5px] top-[34%] h-12 w-[5px] rounded-r-md bg-zinc-600" />
      <div className="absolute -right-[4px] top-[52%] h-9 w-[4px] rounded-r-md bg-zinc-700" />
      {/* screen */}
      <div className="relative aspect-[184/224] overflow-hidden rounded-[52px] bg-black">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ A */
/**
 * A · Metric stack — straight Apple workout-view grammar: left-aligned rows
 * of big numerals, one metric per line, color does the labeling work.
 * Effort leads but only takes its share of the column.
 */
export function WatchStack() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-6 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-yellow-400">32:14</span>
          <span className="text-zinc-500">BENCH · SET 3</span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-[44px] font-semibold leading-none tracking-tight text-brand-400">
              86
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
              Effort
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-semibold leading-none tracking-tight text-white">
              8
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
              reps
            </span>
            <span className="ml-auto text-[13px] font-semibold text-emerald-400">
              ~2 left
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-semibold leading-none tracking-tight text-yellow-400">
              1:24
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
              rest
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] font-medium text-zinc-600">
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

/* ------------------------------------------------------------------ B */
/**
 * B · Hero + rail — Effort keeps a ring but shrinks to half the screen;
 * the right rail answers the next questions in priority order:
 * reps counted, reps left, rest clock. Stimulus banks along the bottom.
 */
export function WatchHeroRail() {
  const effort = 86;
  const r = 30;
  const c = 2 * Math.PI * r;
  const dash = (effort / 100) * c;

  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-brand-400">SET 3</span>
        </div>
        <div className="flex flex-1 items-center gap-4">
          <div className="relative h-[84px] w-[84px] shrink-0">
            <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
              <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
              <circle
                cx="40"
                cy="40"
                r={r}
                fill="none"
                stroke="url(#hr-ring)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${c}`}
              />
              <defs>
                <linearGradient id="hr-ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fb6a35" />
                  <stop offset="100%" stopColor="#ef4d18" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[26px] font-semibold leading-none text-white">{effort}</span>
              <span className="mt-0.5 text-[7px] font-medium uppercase tracking-widest text-zinc-500">
                Effort
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <div className="text-[20px] font-semibold leading-none text-white">8</div>
              <div className="text-[8px] font-medium uppercase tracking-widest text-zinc-500">reps</div>
            </div>
            <div>
              <div className="text-[20px] font-semibold leading-none text-emerald-400">~2</div>
              <div className="text-[8px] font-medium uppercase tracking-widest text-zinc-500">left</div>
            </div>
            <div>
              <div className="text-[20px] font-semibold leading-none text-yellow-400">1:24</div>
              <div className="text-[8px] font-medium uppercase tracking-widest text-zinc-500">rest</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-600">Stim</span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-brand-400 to-brand-500" />
          </div>
          <span className="text-[10px] font-semibold text-brand-300">+54</span>
        </div>
      </div>
    </WatchFrame>
  );
}

/* ------------------------------------------------------------------ C */
/**
 * C · Quadrant grid — four equal cells, no hierarchy fights: the eye lands
 * on color. Effort, reps, in-the-tank, rest. Densest of the set, still
 * one-number-per-cell legible.
 */
export function WatchGrid() {
  const cells = [
    { value: "86", label: "Effort", color: "text-brand-400" },
    { value: "8", label: "reps", color: "text-white" },
    { value: "~2", label: "left", color: "text-emerald-400" },
    { value: "1:24", label: "rest", color: "text-yellow-400" },
  ];
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-yellow-400">32:14</span>
          <span className="text-zinc-500">BENCH · SET 3</span>
        </div>
        <div className="mt-2 grid flex-1 grid-cols-2">
          {cells.map((cell, i) => (
            <div
              key={cell.label}
              className={`flex flex-col items-center justify-center ${
                i % 2 === 1 ? "border-l border-white/10" : ""
              } ${i > 1 ? "border-t border-white/10" : ""}`}
            >
              <span className={`text-[30px] font-semibold leading-none tracking-tight ${cell.color}`}>
                {cell.value}
              </span>
              <span className="mt-1 text-[8px] font-medium uppercase tracking-widest text-zinc-500">
                {cell.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 text-center text-[10px] font-medium text-zinc-600">
          STIM <span className="text-brand-300">+54</span> BANKED
        </div>
      </div>
    </WatchFrame>
  );
}

/* ------------------------------------------------------------------ D */
/**
 * D · Rest-first — leans into when lifters actually look: the rest period.
 * The clock owns the screen, the finished set is a one-line receipt,
 * stimulus banks quietly at the bottom.
 */
export function WatchRest() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">3 / 4</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-500">Rest</span>
          <span className="mt-1 text-[46px] font-semibold leading-none tracking-tight text-yellow-400">
            1:24
          </span>
          <div className="mt-2.5 h-1 w-28 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[56%] rounded-full bg-yellow-400" />
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
          <div className="flex items-center justify-between text-[8px] font-medium uppercase tracking-widest text-zinc-500">
            <span>Last set</span>
            <span className="text-emerald-400 normal-case tracking-normal text-[11px] font-semibold">
              ~2 left
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-[20px] font-semibold leading-none text-brand-400">86</span>
            <span className="text-[9px] uppercase tracking-widest text-zinc-500">Effort</span>
            <span className="ml-auto text-[20px] font-semibold leading-none text-white">8</span>
            <span className="text-[9px] uppercase tracking-widest text-zinc-500">reps</span>
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

/* ------------------------------------------------------------------ E */
/**
 * E · Stack + status — round-1 winner grammar with the new signals at the
 * edges: readiness lives in the header, today's Effort trend + stimulus
 * share the footer. The mid-screen stack is untouched.
 */
export function WatchStackStatus() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-6 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <ReadinessDelta />
          <span className="text-zinc-500">BENCH · SET 3</span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-[40px] font-semibold leading-none tracking-tight text-brand-400">
              86
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
              Effort
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-semibold leading-none tracking-tight text-white">
              8
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
              reps
            </span>
            <span className="ml-auto text-[13px] font-semibold text-emerald-400">
              ~2 left
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-semibold leading-none tracking-tight text-yellow-400">
              1:24
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
              rest
            </span>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-1.5">
            <TrendBars />
            <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-600">
              today
            </span>
          </div>
          <span className="text-[10px] font-medium text-zinc-600">
            STIM <span className="text-brand-300">+54</span>
          </span>
        </div>
      </div>
    </WatchFrame>
  );
}

/* ------------------------------------------------------------------ F */
/**
 * F · Trend hero — Effort and today's per-set chart share the hero row, so
 * "how hard was that?" and "how am I trending?" are one glance. Readiness
 * in the header, rest + stimulus in the footer.
 */
export function WatchTrendHero() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-6 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH · SET 3</span>
          <ReadinessDelta />
        </div>
        <div className="mt-2 flex flex-1 flex-col justify-center gap-2.5">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[44px] font-semibold leading-none tracking-tight text-brand-400">
                86
              </span>
              <div className="mt-1 text-[9px] font-medium uppercase tracking-widest text-zinc-500">
                Effort
              </div>
            </div>
            <div className="flex flex-col items-end">
              <TrendBars barWidth={7} height={30} />
              <span className="mt-1 text-[9px] font-medium uppercase tracking-widest text-zinc-600">
                today ↗
              </span>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 text-[14px] font-medium">
            <span className="font-semibold text-white">8</span>
            <span className="text-zinc-500">reps</span>
            <span className="text-zinc-700">·</span>
            <span className="font-semibold text-emerald-400">~2 left</span>
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-[20px] font-semibold leading-none text-yellow-400">
            1:24
            <span className="ml-1.5 text-[9px] font-medium uppercase tracking-widest text-zinc-500">
              rest
            </span>
          </span>
          <span className="text-[10px] font-medium text-zinc-600">
            STIM <span className="text-brand-300">+54</span>
          </span>
        </div>
      </div>
    </WatchFrame>
  );
}

/* ------------------------------------------------------------------ G */
/**
 * G · Dashboard — complication-style grid: Effort, reps, rest, stimulus in
 * four fixed positions, readiness in the header, trend as a full-width
 * strip at the bottom. Everything on screen, nothing large.
 */
export function WatchDashboard() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <ReadinessDelta />
          <span className="text-zinc-500">BENCH · S3</span>
        </div>
        <div className="mt-1 grid flex-1 grid-cols-2">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[27px] font-semibold leading-none tracking-tight text-brand-400">86</span>
            <span className="mt-0.5 text-[8px] font-medium uppercase tracking-widest text-zinc-500">Effort</span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-white/10">
            <span className="text-[27px] font-semibold leading-none tracking-tight text-white">8</span>
            <span className="mt-0.5 text-[8px] font-medium uppercase tracking-widest text-zinc-500">
              reps · <span className="text-emerald-400">~2 left</span>
            </span>
          </div>
          <div className="flex flex-col items-center justify-center border-t border-white/10">
            <span className="text-[27px] font-semibold leading-none tracking-tight text-yellow-400">1:24</span>
            <span className="mt-0.5 text-[8px] font-medium uppercase tracking-widest text-zinc-500">rest</span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-t border-white/10">
            <span className="text-[27px] font-semibold leading-none tracking-tight text-brand-300">+54</span>
            <span className="mt-0.5 text-[8px] font-medium uppercase tracking-widest text-zinc-500">stim</span>
          </div>
        </div>
        <div className="mt-1.5 flex items-end justify-center gap-1.5">
          <TrendBars barWidth={5} height={12} />
          <span className="text-[8px] font-medium uppercase tracking-widest text-zinc-600">
            effort today ↗
          </span>
        </div>
      </div>
    </WatchFrame>
  );
}

/* ------------------------------------------------------------------ H */
/**
 * H · Rest-first II — the rest clock still owns the screen; the receipt
 * card now carries the trend bars next to the set's numbers, and the
 * footer pairs stimulus with the baseline delta.
 */
export function WatchRestTrend() {
  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">3 / 4</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-500">Rest</span>
          <span className="mt-0.5 text-[42px] font-semibold leading-none tracking-tight text-yellow-400">
            1:24
          </span>
          <div className="mt-2 h-1 w-28 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[56%] rounded-full bg-yellow-400" />
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
          <div className="flex items-center justify-between text-[8px] font-medium uppercase tracking-widest text-zinc-500">
            <span>Last set</span>
            <span className="text-[11px] font-semibold normal-case tracking-normal text-emerald-400">
              ~2 left
            </span>
          </div>
          <div className="mt-1 flex items-end gap-1.5">
            <span className="text-[19px] font-semibold leading-none text-brand-400">86</span>
            <span className="text-[9px] uppercase tracking-widest text-zinc-500">Effort</span>
            <span className="ml-2 text-[19px] font-semibold leading-none text-white">8</span>
            <span className="text-[9px] uppercase tracking-widest text-zinc-500">reps</span>
            <span className="ml-auto">
              <TrendBars barWidth={4} height={16} />
            </span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] font-medium text-zinc-600">
          <span>
            STIM <span className="text-brand-300">+54</span>
          </span>
          <ReadinessDelta />
        </div>
      </div>
    </WatchFrame>
  );
}
