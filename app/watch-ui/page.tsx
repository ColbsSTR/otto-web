import {
  WatchStack,
  WatchHeroRail,
  WatchGrid,
  WatchRest,
  WatchStackStatus,
  WatchTrendHero,
  WatchDashboard,
  WatchRestTrend,
} from "../components/WatchVariants";
import { WatchMockup } from "../components/WatchMockup";

export const metadata = {
  title: "Watch UI explorations — Otto",
  robots: { index: false },
};

/**
 * Internal comparison page: /watch-ui
 * Round 2 (readiness + daily trend) up top, round 1 below for reference.
 * Same data story in every frame so the layouts compete on hierarchy alone.
 */
export default function WatchUiPage() {
  const round2 = [
    {
      title: "E · Stack + status",
      component: <WatchStackStatus />,
      hierarchy: "Readiness header → Effort / reps / rest stack → trend + stim footer",
      pitch:
        "Round-1's stack untouched in the middle; the new signals live at the edges. Readiness is a signed percent to baseline in the header, today's Effort bars and stimulus share the footer.",
    },
    {
      title: "F · Trend hero",
      component: <WatchTrendHero />,
      hierarchy: "Effort + today's chart → reps / left → rest + stim footer",
      pitch:
        "“How hard was that?” and “how am I trending?” become one glance — the set's Effort and today's per-set bars share the hero row. Readiness in the header, rest clock anchors the footer.",
    },
    {
      title: "G · Dashboard",
      component: <WatchDashboard />,
      hierarchy: "Readiness header → 4-cell grid (Effort / reps / rest / stim) → trend strip",
      pitch:
        "Complication grammar: every metric in a fixed position, nothing large, trend as a full-width strip at the bottom. The most information per glance — and the smallest numerals.",
    },
    {
      title: "H · Rest-first II",
      component: <WatchRestTrend />,
      hierarchy: "Rest clock → last-set receipt + trend bars → stim + readiness footer",
      pitch:
        "The rest clock still owns the screen. The receipt card gains today's trend bars beside the set's numbers, and the baseline delta sits in the footer as a persistent status read.",
    },
  ];

  const round1 = [
    {
      title: "A · Metric stack",
      component: <WatchStack />,
      hierarchy: "Effort → reps (+ left) → rest clock",
    },
    {
      title: "B · Hero + rail",
      component: <WatchHeroRail />,
      hierarchy: "Effort ring → reps / left / rest rail → stimulus bar",
    },
    {
      title: "C · Quadrant grid",
      component: <WatchGrid />,
      hierarchy: "Four equal cells — color carries the hierarchy",
    },
    {
      title: "D · Rest-first",
      component: <WatchRest />,
      hierarchy: "Rest clock → last-set receipt → stimulus ticker",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
        Internal · not linked
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
        Watch UI explorations
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Identical data in every frame — Bench Press set 3, Effort 86, 8 reps, ~2 left,
        1:24 into rest, +54 stimulus banked. Round 2 adds readiness (warmup bar speed
        vs your baseline: +4%) and today&apos;s per-set Effort trend (72 → 78 → 82 → 86).
      </p>

      <h2 className="mt-14 text-xl font-semibold text-white">
        Round 2 — with readiness &amp; daily trend
      </h2>
      <div className="mt-6 grid gap-10 sm:grid-cols-2">
        {round2.map((v) => (
          <div
            key={v.title}
            className="flex flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8"
          >
            {v.component}
            <h3 className="mt-6 text-lg font-semibold text-white">{v.title}</h3>
            <p className="mt-1 text-center text-xs font-medium uppercase tracking-wider text-brand-300">
              {v.hierarchy}
            </p>
            <p className="mt-3 text-center text-sm leading-relaxed text-zinc-400">
              {v.pitch}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-xl font-semibold text-white">
        Round 1 — for reference
      </h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {round1.map((v) => (
          <div
            key={v.title}
            className="flex flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            <div className="scale-90">{v.component}</div>
            <h3 className="mt-4 text-base font-semibold text-white">{v.title}</h3>
            <p className="mt-1 text-center text-[11px] font-medium uppercase tracking-wider text-zinc-500">
              {v.hierarchy}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
        <WatchMockup />
        <h2 className="mt-6 text-lg font-semibold text-white">Current — single-metric hero</h2>
        <p className="mt-3 max-w-md text-center text-sm leading-relaxed text-zinc-400">
          What ships on the landing page today: Effort at 90% of the screen, reps as the
          only confirmation.
        </p>
      </div>
    </div>
  );
}
