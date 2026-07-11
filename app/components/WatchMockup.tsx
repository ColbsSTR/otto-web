/**
 * Apple Watch — the post-set glance.
 * Big Effort number (objective proximity to failure, 0–100) with rep count
 * as confirmation, plus a ring showing how close to the line you pushed.
 */
export function WatchMockup({ className = "" }: { className?: string }) {
  // Effort 0–100 → ring fill
  const effort = 86;
  const r = 86;
  const c = 2 * Math.PI * r;
  const dash = (effort / 100) * c;

  return (
    <div className={className}>
      {/* watch body */}
      <div className="relative w-[208px] rounded-[58px] bg-gradient-to-b from-zinc-700 to-zinc-900 p-[6px] shadow-2xl shadow-black/60 ring-1 ring-white/10">
        {/* digital crown */}
        <div className="absolute -right-[5px] top-[34%] h-12 w-[5px] rounded-r-md bg-zinc-600" />
        <div className="absolute -right-[4px] top-[52%] h-9 w-[4px] rounded-r-md bg-zinc-700" />
        {/* screen */}
        <div className="relative aspect-[184/224] overflow-hidden rounded-[52px] bg-black">
          <div className="flex h-full flex-col items-center justify-center px-4 py-5">
            <div className="flex w-full items-center justify-between text-[10px] font-medium text-zinc-400">
              <span>9:41</span>
              <span className="text-brand-400">SET 3</span>
            </div>

            <div className="relative mt-1 flex flex-1 items-center justify-center">
              <svg viewBox="0 0 200 200" className="h-[150px] w-[150px] -rotate-90">
                <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
                <circle
                  cx="100"
                  cy="100"
                  r={r}
                  fill="none"
                  stroke="url(#wg)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${c}`}
                />
                <defs>
                  <linearGradient id="wg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fb6a35" />
                    <stop offset="100%" stopColor="#ef4d18" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[52px] font-semibold leading-none tracking-tight text-white">
                  {effort}
                </span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-zinc-400">
                  Effort
                </span>
              </div>
            </div>

            <div className="mb-1 flex w-full items-center justify-center gap-1.5 text-[13px] font-medium text-zinc-300">
              <span className="text-white">8</span>
              <span className="text-zinc-500">reps</span>
              <span className="mx-1 text-zinc-700">·</span>
              <span className="text-zinc-400">~2 left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
