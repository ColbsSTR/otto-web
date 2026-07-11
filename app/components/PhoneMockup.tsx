/**
 * iPhone — the session story. Training Load as the headline (written to
 * Apple Health), the stimulus each muscle banked today, and the auto-detected
 * exercise list: reps, sets, and exercise type tracked with no logging.
 */
export function PhoneMockup({ className = "" }: { className?: string }) {
  const muscles = [
    { name: "Chest", total: 124, banked: 38, pct: 90 },
    { name: "Triceps", total: 87, banked: 26, pct: 62 },
    { name: "Front delts", total: 75, banked: 19, pct: 45 },
  ];
  const totalStimulus = muscles.reduce((sum, m) => sum + m.total, 0);
  const totalBanked = muscles.reduce((sum, m) => sum + m.banked, 0);
  const exercises = [
    { name: "Bench Press", sets: "4 × 8", note: "225 lb" },
    { name: "Incline DB Press", sets: "3 × 10", note: "70 lb" },
    { name: "Cable Fly", sets: "3 × 12", note: "auto" },
  ];

  return (
    <div className={className}>
      <div className="relative w-[280px] rounded-[46px] bg-gradient-to-b from-zinc-700 to-zinc-900 p-[10px] shadow-2xl shadow-black/60 ring-1 ring-white/10">
        {/* screen */}
        <div className="relative overflow-hidden rounded-[37px] bg-[#0c0c0e]">
          {/* dynamic island */}
          <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          <div className="px-5 pb-7 pt-12">
            {/* status row */}
            <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
              <span>Push Day · Today</span>
              <span className="text-brand-400">Otto</span>
            </div>

            {/* Training Load hero */}
            <div className="mt-4 rounded-3xl bg-gradient-to-b from-brand-500/15 to-transparent p-5 ring-1 ring-brand-500/20">
              <div className="text-[11px] font-medium uppercase tracking-widest text-brand-300">
                Training Load
              </div>
              <div className="mt-1 flex items-end gap-2">
                <span className="text-[60px] font-semibold leading-none tracking-tight text-white">
                  8.4
                </span>
                <span className="mb-2.5 text-[15px] font-medium text-zinc-500">/ 10</span>
                <span className="mb-2 ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                  Hard
                </span>
              </div>
              <div className="mt-1.5 text-[12px] text-zinc-400">
                Written to Apple Health · your biggest session in 3 weeks.
              </div>
            </div>

            {/* stimulus banked by muscle */}
            <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-zinc-300">Stimulus</span>
                <span className="rounded-full bg-brand-500/15 px-2 py-0.5 text-[10px] font-semibold text-brand-300">
                  +{totalBanked} earned today
                </span>
              </div>
              <div className="mt-1 flex items-end gap-1.5">
                <span className="text-[26px] font-semibold leading-none tracking-tight text-white">
                  {totalStimulus}
                </span>
                <span className="mb-0.5 text-[10px] text-zinc-500">banked this week</span>
              </div>
              <div className="mt-3 space-y-2.5">
                {muscles.map((m) => (
                  <div key={m.name} className="flex items-center gap-2.5">
                    <span className="w-[64px] text-[11px] text-zinc-400">{m.name}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-500"
                        style={{ width: `${m.pct}%` }}
                      />
                    </div>
                    <span className="w-6 text-right text-[11px] font-semibold text-white">
                      {m.total}
                    </span>
                    <span className="w-7 text-right text-[11px] font-semibold text-brand-300">
                      +{m.banked}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* auto-detected exercises */}
            <div className="mt-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-zinc-300">This session</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/15 px-2 py-0.5 text-[10px] font-semibold text-brand-300">
                  <BoltIcon /> Auto-tracked
                </span>
              </div>
              <div className="mt-3 space-y-2.5">
                {exercises.map((ex) => (
                  <div key={ex.name} className="flex items-center justify-between">
                    <span className="text-[13px] text-white">{ex.name}</span>
                    <span className="text-[12px] text-zinc-500">
                      <span className="text-zinc-300">{ex.sets}</span>
                      <span className="mx-1.5 text-zinc-700">·</span>
                      {ex.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="currentColor">
      <path d="M7 1L2 7h3l-1 4 5-6H6l1-4z" />
    </svg>
  );
}
