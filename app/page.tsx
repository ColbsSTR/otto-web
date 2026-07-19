import { WaitlistForm } from "./components/WaitlistForm";
import { RackMomentLive } from "./components/RackMomentLive";
import { WarmupLive } from "./components/WarmupLive";
import {
  InstrumentRest,
  InstrumentDone,
  PhoneInstrument,
} from "./components/WatchInstrument";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-x-hidden">
      <Nav />
      <Hero />
      <Gap />
      <Metrics />
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

        <div className="flex items-center justify-center">
          <div className="scale-110 md:scale-125">
            <div className="animate-float">
              <RackMomentLive />
            </div>
          </div>
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
                  Know how hard every set really was. Otto watches two things as you
                  lift: how much the bar slows down from your first rep to your last,
                  and how close those final reps get to the speed where the bar simply
                  stops — the edge of failure. Together they become one honest 0–100.
                  It looks like RPE, but it isn&apos;t a guess: it&apos;s the correction
                  to the number you would have guessed.
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
              name="Stimulus"
              scale="every muscle"
              desc="Every hard set banks stimulus for the muscle it targeted — an effort-weighted dose of growth that builds across the week. Chest, back, quads: each muscle keeps its own account, filling toward a weekly target you can actually close. You earned it; Otto shows you exactly where it landed and what's left to bank."
            />
            <MetricCard
              name="Training Load"
              scale="every session"
              desc="The systemic strain of the whole session, scored 1–10 and written straight to Apple Health. See what today actually took — right alongside your sleep, your runs, and the rest of your health data."
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

        {/* During — the full session on the watch */}
        <div className="mt-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            During · the watch
          </span>
          <h3 className="mt-3 max-w-2xl text-2xl font-semibold text-white">
            One question per glance, the whole session through.
          </h3>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Your warmups answer &ldquo;am I on today?&rdquo; before the first work set.
            Rack the bar and the verdict lands: Effort, reps, and the zone the set
            trained. Rest gets the clock and the receipt. And when it&apos;s over, the
            scoreboard: what it took, what every muscle earned, and anything special.
          </p>
          <div className="mt-10 grid justify-items-center gap-x-4 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Warm-ups", el: <WarmupLive /> },
              { label: "The rack", el: <RackMomentLive /> },
              { label: "Rest", el: <InstrumentRest /> },
              { label: "Session end", el: <InstrumentDone /> },
            ].map((f) => (
              <div key={f.label} className="flex flex-col items-center">
                {f.el}
                <span className="mt-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  {f.label}
                </span>
              </div>
            ))}
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
