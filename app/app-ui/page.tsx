import { AppHomeScreen } from "../components/AppHome";

export const metadata = {
  title: "App UI — the home screen — Otto",
  robots: { index: false },
};

/**
 * Internal comparison page: /app-ui
 * The phone app's home screen. Different job from the post-session summary
 * (on /watch-ui): the summary answers "how was today?"; the home answers
 * "where am I in the week, and is it working?"
 */

const ANNOTATIONS = [
  {
    n: "1",
    title: "Hero score — the week, in Oura's card grammar",
    body: "Oura leads with one score (Readiness); Otto's equivalent of 'the one number' is the week — stimulus banked, drawn as a ring filling toward the weekly targets. Beside it, the contributors pattern: targets closed, today's deposit, vs your typical week. What we deliberately don't borrow is the adjective — Oura says '85 · Good'; here the vs-typical comparison does the interpreting, keeping 'measurements, not messages' intact.",
  },
  {
    n: "2",
    title: "Satellite scores — Load & Effort as rings",
    body: "Whoop's row-of-gauges grammar, at each metric's native timescale: Load as the 7-day average (+0.6 vs the 4-week — Apple's Training Load comparison), Effort as last session's average. Rings stay neutral zinc/white so the brand color remains exclusively the earnings story — only the stimulus ring is orange.",
  },
  {
    n: "3",
    title: "Last session — the continuity door",
    body: "One row: name, Load, sets, the PR. Tapping opens the full post-session summary. This is where 'how was today?' lives — the home doesn't restate it, it links it.",
  },
  {
    n: "4",
    title: "Stimulus by day — the week's shape",
    body: "Seven bars, rest days as visible stubs (a rest day is data, not absence), today bright. The Whoop-trend instinct: the rhythm of the week at a glance, and whether the remaining days need to carry weight.",
  },
  {
    n: "5",
    title: "Strength — the payoff",
    body: "Est. 1RM per lift, derived from bar speed, with the 8-week spark and delta. This is the 'is it working?' answer — proof of progress before the PR ever happens, sitting quietly at the bottom because it changes on the scale of months, not days.",
  },
  {
    n: "—",
    title: "What's deliberately absent",
    body: "Readiness — it resolves during warmups, so the home screen doesn't pretend to know it. No greeting, no streaks, no score adjectives, no coaching sentence. Every card is a door; the raw layers live one tap deeper. The weekly-targets detail moved behind the hero card's chevron — the ring already carries the week's headline.",
  },
];

export default function AppUiPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
        Internal · not linked
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
        App UI — the home screen
      </h1>
      <p className="mt-3 max-w-3xl text-zinc-400">
        What you open cold — rest day, pre-gym, or the evening after. A different job
        from the post-session summary: the summary answers &ldquo;how was today?&rdquo;;
        the home answers{" "}
        <span className="text-zinc-200">
          &ldquo;where am I in the week, and is it working?&rdquo;
        </span>{" "}
        Data story continues from the watch: yesterday&apos;s Push Day, 446 banked this
        week, 3 of 9 targets closed, bench trending +7%.
      </p>

      <div className="mt-12 flex flex-col items-center gap-12 lg:flex-row lg:items-start">
        <div className="lg:sticky lg:top-12">
          <AppHomeScreen />
        </div>
        <div className="max-w-xl space-y-5">
          {ANNOTATIONS.map((a) => (
            <div
              key={a.title}
              className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6"
            >
              <h2 className="text-sm font-semibold text-white">
                <span className="mr-2 text-brand-400">{a.n}</span>
                {a.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
