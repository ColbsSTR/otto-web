import { WaitlistForm } from "./components/WaitlistForm";
import { WatchMockup } from "./components/WatchMockup";
import { PhoneMockup } from "./components/PhoneMockup";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-x-hidden">
      <Nav />
      <Hero />
      <Gap />
      <Metrics />
      <Progress />
      <Experience />
      <Ecosystem />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------------------- Nav */

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Wordmark />
        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#metrics" className="transition hover:text-white">The metrics</a>
          <a href="#experience" className="transition hover:text-white">The experience</a>
          <a href="#ecosystem" className="transition hover:text-white">Apple ecosystem</a>
        </nav>
        <a
          href="#waitlist"
          className="rounded-full bg-white/[0.06] px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition hover:bg-white/[0.1]"
        >
          Join waitlist
        </a>
      </div>
    </header>
  );
}

function Wordmark() {
  return (
    <span className="text-xl font-bold tracking-tight text-white">
      OT<span className="text-brand-500">T</span>O
    </span>
  );
}

/* ---------------------------------------------------------------- Hero */

function Hero() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 glow-brand" />
      <div className="pointer-events-none absolute inset-0 grid-texture" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-16 md:grid-cols-2 md:pb-28 md:pt-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            For the Apple Watch you already own
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Make the invisible work of lifting{" "}
            <span className="text-brand-500">visible.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Your watch tracks every run in detail and goes blind the moment you pick up a
            barbell. Otto fills the gap — measuring how hard you pushed, what the session
            took, and what you earned for it, all from your wrist.
          </p>
          <div id="waitlist" className="mt-8 scroll-mt-24">
            <WaitlistForm />
            <p className="mt-3 text-sm text-zinc-500">
              Early access launching soon. Be first in the gym with it.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
            {[
              "Auto-tracks every exercise, set & rep",
              "Measures Effort, Training Load & Stimulus",
              "Knows a PR day by your last warmup",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-brand-400" fill="none">
                  <path d="M5 10.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center justify-center gap-6">
          <PhoneMockup className="animate-float" />
          <WatchMockup className="absolute -bottom-2 -left-2 hidden sm:block md:-left-6" />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Why */

function Gap() {
  const rows = [
    {
      problem: "You finish a punishing session with nothing to show for it but a calorie estimate and a “rate it 1–10” you made up yourself.",
      benefit: "Real metrics for the gym, measured straight from your wrist instead of guessed at.",
    },
    {
      problem: "You finish a set with no idea how close to failure you got — so you under-push, or grind too hard.",
      benefit: "See exactly how hard each set was, set after set, until you know the line and train right up to it.",
    },
    {
      problem: "Logging every weight, set, and rep by hand is a chore — so progress is a blur you can't actually see.",
      benefit: "It tracks itself. Your work, your records, and your progress over time are just there, no logging.",
    },
    {
      problem: "The data that could tell you all this used to mean $300 of bar sensors and fiddly setup every set.",
      benefit: "None of that. Otto runs on the Apple Watch already on your wrist — nothing to buy, nothing to clip on.",
    },
  ];
  return (
    <section id="why" className="scroll-mt-20 border-t border-white/[0.06] bg-white/[0.015]">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Why Otto
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Lifting has been flying blind.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            It&apos;s half your training, and you&apos;ve never really known how it&apos;s
            going — not how hard you pushed, not how much you did, not whether you&apos;re
            getting stronger. Here&apos;s what you&apos;ve been missing, and what Otto hands
            you instead.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-white/[0.08]">
          {rows.map((r, i) => (
            <div
              key={i}
              className={`grid md:grid-cols-2 ${
                i > 0 ? "border-t border-white/[0.08]" : ""
              }`}
            >
              <div className="flex gap-4 p-6 sm:p-8">
                <span className="mt-0.5 text-zinc-600">
                  <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none">
                    <circle cx="10" cy="10" r="8.5" stroke="currentColor" />
                    <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <p className="text-sm leading-relaxed text-zinc-400">{r.problem}</p>
              </div>
              <div className="flex gap-4 border-t border-white/[0.08] bg-brand-500/[0.05] p-6 sm:p-8 md:border-l md:border-t-0">
                <span className="mt-0.5 text-brand-400">
                  <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none">
                    <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeOpacity="0.5" />
                    <path d="M6 10.5l2.5 2.5L14 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="text-sm font-medium leading-relaxed text-zinc-200">{r.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Metrics */

function Metrics() {
  return (
    <section id="metrics" className="scroll-mt-20 border-t border-white/[0.06]">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            The metric system
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Every set. Every session. Every muscle.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Effort tells you how hard each set really was. Training Load shows what the
            session took. Stimulus shows what you earned for it — muscle by muscle.
          </p>
        </div>

        {/* Effort hero card */}
        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/12 to-transparent p-8 lg:col-span-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">Effort</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
                  Know how hard every set really was. Otto reads how close your rep speed
                  got to the point where the bar simply stops — objective proximity to
                  failure, 0 to 100. It looks like RPE, but it isn&apos;t a guess: it&apos;s
                  the correction to the number you would have guessed.
                </p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">86</div>
                <div className="text-xs uppercase tracking-widest text-zinc-500">last set</div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/[0.06] px-3 py-1.5 text-zinc-300 ring-1 ring-white/10">
                Measured from bar speed
              </span>
              <span className="rounded-full bg-white/[0.06] px-3 py-1.5 text-zinc-300 ring-1 ring-white/10">
                0–100, every set
              </span>
              <span className="rounded-full bg-white/[0.06] px-3 py-1.5 text-zinc-300 ring-1 ring-white/10">
                No more guessing RPE
              </span>
            </div>
            <p className="mt-4 text-xs text-zinc-500">
              So “two reps left” stops being a feeling and becomes a number you&apos;ve
              seen a hundred times — and every set after gets sharper. It spends its
              first few sessions learning your lifts, and wears its precision openly
              (±6, then ±2) until it&apos;s earned your trust.
            </p>
          </div>

          <div className="grid gap-6 lg:col-span-2">
            <MetricCard
              name="Training Load"
              scale="every session"
              desc="The systemic strain of the whole session, scored 1–10 and written straight to Apple Health. See what today actually took — right alongside your sleep, your runs, and the rest of your health data."
            />
            <MetricCard
              name="Stimulus"
              scale="every muscle"
              desc="Every hard set banks stimulus for the muscle it targeted — an effort-weighted dose of growth that builds across the week. You earned it; Otto shows you exactly where."
            />
          </div>
        </div>

        {/* Readiness + Progress — the answers Otto keeps resolving */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Resolved during warmups
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white">Readiness</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              No morning quiz, no wellness score. Otto compares your warmup-set bar speed
              against your own baseline for that exact lift — so by your last warmup set,
              you know: PR day, or back-off day. And on the down mornings it says so,
              in the same plain numbers — no cheerleading, no consolation prize.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-zinc-300 ring-1 ring-white/10">
                Answered before your first work set
              </span>
              <span className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-zinc-300 ring-1 ring-white/10">
                Per exercise, not per vibe
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
              The payoff, in months
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white">Progress</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              The same weight, moving faster — that&apos;s strength you can see weeks
              before it ever shows up on a one-rep max. Otto tracks your bar speed at
              comparable loads over months, so you know your program is actually working.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-zinc-300 ring-1 ring-white/10">
                Is your baseline climbing?
              </span>
              <span className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-zinc-300 ring-1 ring-white/10">
                Proof before the PR
              </span>
            </div>
          </div>
        </div>

        {/* visibility banner */}
        <div className="relative mt-6 overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/12 to-transparent p-8">
          <h3 className="text-2xl font-semibold text-white">
            Just wearing it makes you stronger.
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Otto isn&apos;t just a tracker. The moment you can see how hard you&apos;re
            actually pushing, you push closer to your limit — and produce more force than
            when you&apos;re guessing. Measuring the set quietly makes the set better.
          </p>
          <p className="mt-4 text-sm font-medium text-brand-300">
            Visibility is the upgrade.
          </p>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ name, scale, desc }: { name: string; scale: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7">
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        <span className="text-xs uppercase tracking-wider text-zinc-500">{scale}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- Progress */

function Progress() {
  const board = [
    { name: "Maya R.", score: 94, you: false },
    { name: "You", score: 91, you: true },
    { name: "Devon K.", score: 88, you: false },
    { name: "Sam T.", score: 83, you: false },
  ];
  const badges = [
    "First 100 Effort set",
    "30-day streak",
    "1M lb lifted",
    "Every muscle this week",
    "10 PRs",
  ];

  // weekly stimulus goal ring
  const pct = 82;
  const r = 52;
  const c = 2 * Math.PI * r;

  return (
    <section id="progress" className="scroll-mt-20 border-t border-white/[0.06]">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Progress worth chasing
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A number only motivates you if you can chase it.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            So Otto gives every metric a goal. Bank the stimulus every muscle needs each
            week, keep your streak alive, beat your records, and see exactly where you
            stand.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Weekly Stimulus goal ring */}
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/12 to-transparent p-8">
            <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
              <div className="relative h-[160px] w-[160px] shrink-0">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="11" />
                  <circle
                    cx="60"
                    cy="60"
                    r={r}
                    fill="none"
                    stroke="url(#stimulusRing)"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeDasharray={`${(pct / 100) * c} ${c}`}
                  />
                  <defs>
                    <linearGradient id="stimulusRing" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fb6a35" />
                      <stop offset="100%" stopColor="#ef4d18" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-semibold text-white">{pct}%</span>
                  <span className="text-[11px] uppercase tracking-widest text-zinc-500">banked</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Weekly Stimulus goal</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  <span className="text-white">7 of 9</span> muscle groups fully banked this
                  week — your best week in two months.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/15 px-3 py-1.5 text-xs font-semibold text-brand-200 ring-1 ring-brand-500/20">
                    🔥 6-week streak
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-zinc-300 ring-1 ring-white/10">
                    Top 10% session today
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Effort leaderboard */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Effort · this week</h3>
              <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-zinc-400 ring-1 ring-white/10">
                Friends beta · after launch
              </span>
            </div>
            <div className="mt-5 space-y-2">
              {board.map((row, i) => (
                <div
                  key={row.name}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${
                    row.you
                      ? "bg-brand-500/12 ring-1 ring-brand-500/25"
                      : "bg-white/[0.03]"
                  }`}
                >
                  <span className="w-4 text-sm font-semibold text-zinc-500">{i + 1}</span>
                  <span className="h-7 w-7 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 ring-1 ring-white/10" />
                  <span className={`flex-1 text-sm ${row.you ? "font-semibold text-white" : "text-zinc-300"}`}>
                    {row.name}
                  </span>
                  <span className={`text-sm font-semibold ${row.you ? "text-brand-300" : "text-zinc-400"}`}>
                    {row.score}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-zinc-500">
              Ranked by how hard everyone pushed — not how much they lift. The only score in
              the gym a beginner and a veteran can fairly compare.
            </p>
          </div>
        </div>

        {/* milestone badges */}
        <div className="mt-6 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">Milestones to collect</h3>
              <p className="mt-1 text-sm text-zinc-500">
                Earn them for honest work — effort, consistency, and pushing close to the line.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-zinc-300 ring-1 ring-white/10"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Experience */

function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-white/[0.06] bg-white/[0.015]">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
          The experience
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Built around how lifters actually train.
        </h2>

        {/* Auto-tracking — the no-logging promise */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 sm:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
                No logging
              </span>
              <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                Otto logs your workout for you.
              </h3>
              <p className="mt-4 text-zinc-400">
                Every other strength app makes you tap in each set by hand. Otto reads it
                straight off your wrist — it knows which exercise you&apos;re doing, counts
                your sets, and counts your reps automatically. The only thing it ever asks
                is the weight: pre-filled from last time, fixed with one turn of the crown,
                and when the guess is right you do nothing at all.
              </p>
              <p className="mt-3 text-zinc-400">
                Anything it misreads, you fix in seconds that evening — and every fix
                teaches it, so the asks get rarer every week. Full bar-speed metrics on
                barbell lifts; dumbbells, machines, and bodyweight get sets, reps, and
                effort — always labeled for what they are, never faked.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              {["Exercise type", "Sets", "Reps", "Tempo"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-200 ring-1 ring-brand-500/20"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid items-center gap-12 md:grid-cols-2">
          {/* During — watch */}
          <div className="order-2 flex justify-center md:order-1">
            <WatchMockup />
          </div>
          <div className="order-1 md:order-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              During · the watch
            </span>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              A sub-two-second glance, right after you rack the bar.
            </h3>
            <p className="mt-4 text-zinc-400">
              You finish your set, drop your arm, and the watch shows the set&apos;s Effort —
              big — with rep count as confirmation. And the day&apos;s real question was
              already answered before your first work set: your warmup bar speed told Otto
              whether it&apos;s a PR day or a back-off day.
            </p>
          </div>
        </div>

        <div className="mt-20 grid items-center gap-12 md:grid-cols-2">
          {/* After — phone */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              After · the phone
            </span>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              The session story, rich enough to screenshot.
            </h3>
            <p className="mt-4 text-zinc-400">
              Training Load up top as the headline, written to Apple Health. Beneath it,
              the stimulus each muscle banked today, your Effort set by set, and any
              records. The satisfaction payload, waiting for you when you sit down.
            </p>
          </div>
          <div className="flex justify-center">
            <PhoneMockup />
          </div>
        </div>

        {/* History + programs */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
              Your history, kept
            </span>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              A record you never wrote is still yours to read.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Every session lands in a log you can actually browse — any lift, months
              back: every set, every speed reading, every PR. Auto-tracked doesn&apos;t
              mean locked away; it means the record was free.
            </p>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
              Your program, as data
            </span>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Bring your program. Otto keeps score against it.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Run whatever plan you already believe in — or just repeat last week.
              Otto pre-fills every set from it, shows planned-vs-actual as plain
              deltas, and estimates the capacity you&apos;ve earned for next time.
              You stay the coach; it keeps the books.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Ecosystem */

function Ecosystem() {
  const points = [
    { t: "Your lifts finally close your rings", d: "Otto writes your energy and minutes back to Apple, so a heavy session counts toward the rings you already chase." },
    { t: "All your training in one place", d: "Lifting shows up right next to your runs and walks in the Fitness and Health apps — exactly where you already look." },
    { t: "The Training Load you've been missing", d: "Otto writes each session's Training Load to Apple Health, so your strength work finally counts in the same system as your runs and rides." },
  ];
  return (
    <section id="ecosystem" className="scroll-mt-20 border-t border-white/[0.06]">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
              Completes the Apple ecosystem
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Apple built lifting-shaped slots it can&apos;t fill. Otto fills them.
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              The rich, motivating experience lives in Otto. Only the clean workout record
              flows back to Apple — so your lifting becomes a first-class citizen of the
              ecosystem you already use, without Otto ever becoming invisible plumbing.
            </p>
          </div>
          <div className="space-y-3">
            {points.map((p) => (
              <div
                key={p.t}
                className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5"
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                    <path d="M4 10.5l3.5 3.5L16 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{p.t}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Final CTA */

function FinalCta() {
  return (
    <section className="relative border-t border-white/[0.06]">
      <div className="pointer-events-none absolute inset-0 glow-brand" />
      <div className="relative mx-auto w-full max-w-3xl px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Make every set count — and watch yourself get stronger.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-400">
          Otto turns the invisible work of lifting into something you can see, trust, and
          build on. Get early access and be first in your gym with it.
        </p>
        <div className="mt-8 flex justify-center">
          <WaitlistForm variant="footer" />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Footer */

function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-3">
          <Wordmark />
          <span className="text-sm text-zinc-600">Strength, made visible.</span>
        </div>
        <p className="text-sm text-zinc-600">
          © {new Date().getFullYear()} Otto. Not affiliated with Apple Inc.
        </p>
      </div>
    </footer>
  );
}
