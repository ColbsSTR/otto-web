"use client";

/**
 * The selected rack screen, animated — two beats, looping for demo.
 * Beat 1 (0–1.2s): the verdict — dial sweeps to 86, number counting; the
 * band's landed zone expands into its pill as the sweep finishes.
 * Beat 2 (1.6–2.6s): the deposit — +12 ticks up one point at a time (one
 * haptic per point on hardware) while the day's total rolls 42 → 54 in the
 * label: the deposit visibly joins the pile. After the pop, the label
 * flashes the destination account ("chest · 124/140") before settling.
 * No confetti, no praise copy — the celebration is the measurement arriving.
 */

import { useEffect, useState } from "react";
import { WatchFrame } from "./WatchJourneys";

const SIZE = 160;
const CX = SIZE / 2;
const R = 60;
const C = 2 * Math.PI * R;
const SWEEP = 0.75;
const START_DEG = 135;

const EFFORT = 86;
const STIM = 12;
const TOTAL_BEFORE = 42;
const MARKER_PCT = 33;

// zone identity colors (dim) — hypertrophy dims to burnt brand before landing
const ZONE_DIM = ["#0c4a6e", "#115e59", "#166534", "#7c2d12", "#7f1d1d"];
const ACTIVE = 3;

export function RackMomentLive() {
  const [effort, setEffort] = useState(0);
  const [landed, setLanded] = useState(false);
  const [stim, setStim] = useState(0);
  const [total, setTotal] = useState(TOTAL_BEFORE);
  const [pop, setPop] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  useEffect(() => {
    let raf = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      setEffort(0);
      setLanded(false);
      setStim(0);
      setTotal(TOTAL_BEFORE);
      setPop(false);
      setShowAccount(false);

      // beat 1 — the verdict sweeps in
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 1200, 1);
        setEffort(Math.round(EFFORT * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      timers.push(setTimeout(() => setLanded(true), 1250));

      // beat 2 — the deposit lands, one point per haptic tick
      for (let i = 1; i <= STIM; i++) {
        timers.push(setTimeout(() => setStim(i), 1600 + i * 75));
        timers.push(setTimeout(() => setTotal(TOTAL_BEFORE + i), 1700 + i * 75));
      }
      timers.push(setTimeout(() => setPop(true), 1600 + STIM * 75 + 120));
      timers.push(setTimeout(() => setPop(false), 1600 + STIM * 75 + 420));
      // the destination account, then settle
      timers.push(setTimeout(() => setShowAccount(true), 3100));
      timers.push(setTimeout(() => setShowAccount(false), 4900));
    };

    run();
    const loop = setInterval(run, 7500);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(loop);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">SET 3</span>
        </div>
        <div className="flex flex-1 items-center">
          {/* Effort dial */}
          <div className="relative h-[104px] w-[104px] shrink-0">
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full">
              <circle
                cx={CX} cy={CX} r={R} fill="none"
                stroke="rgba(255,255,255,0.08)" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${SWEEP * C} ${C}`}
                transform={`rotate(${START_DEG} ${CX} ${CX})`}
              />
              <circle
                cx={CX} cy={CX} r={R} fill="none"
                stroke="url(#rackLiveRing)" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${(effort / 100) * SWEEP * C} ${C}`}
                transform={`rotate(${START_DEG} ${CX} ${CX})`}
              />
              <defs>
                <linearGradient id="rackLiveRing" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fb6a35" />
                  <stop offset="100%" stopColor="#ef4d18" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
              <span className="text-[32px] font-semibold leading-none tracking-tight text-white tabular-nums">
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
          {/* right rail */}
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-[17px] font-semibold leading-none text-emerald-400">+3%</span>
              <span className="mt-1 whitespace-nowrap text-[6px] font-medium uppercase tracking-wide text-zinc-500">
                225 · vs norm
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span
                className={`text-[17px] font-semibold leading-none text-brand-300 tabular-nums transition-all duration-150 ${
                  stim > 0 ? "opacity-100" : "opacity-0"
                } ${pop ? "scale-125" : ""}`}
              >
                +{stim}
              </span>
              <span
                className={`mt-1 whitespace-nowrap text-[6px] font-medium uppercase tracking-wide transition-colors duration-300 ${
                  showAccount ? "text-brand-300" : "text-zinc-500"
                }`}
              >
                {showAccount ? "chest · 124 / 140" : `stim · ${total} today`}
              </span>
            </div>
          </div>
        </div>
        {/* zone band — the pill expands when the zone lands */}
        <div className="flex w-full items-center gap-[3px]">
          {ZONE_DIM.map((color, i) =>
            i === ACTIVE ? (
              <div
                key={i}
                className={`relative flex items-center justify-center overflow-hidden rounded-full transition-all duration-300 ${
                  landed ? "bg-gradient-to-r from-brand-400 to-brand-500" : ""
                }`}
                style={{
                  flexGrow: landed ? 2.8 : 1,
                  flexBasis: 0,
                  height: landed ? 18 : 10,
                  ...(landed ? {} : { backgroundColor: color }),
                }}
              >
                <span
                  className={`text-[7px] font-bold uppercase tracking-wide text-black/80 transition-opacity duration-200 ${
                    landed ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Hypertrophy
                </span>
                <div
                  className={`absolute bottom-0 h-0 w-0 -translate-x-1/2 border-x-[3.5px] border-b-[4.5px] border-x-transparent border-b-white transition-opacity duration-200 ${
                    landed ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ left: `${MARKER_PCT}%` }}
                />
              </div>
            ) : (
              <div
                key={i}
                className="h-[10px] rounded-[3px]"
                style={{ flexGrow: 1, flexBasis: 0, backgroundColor: color }}
              />
            )
          )}
        </div>
      </div>
    </WatchFrame>
  );
}
