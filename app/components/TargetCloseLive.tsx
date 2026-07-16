"use client";

/**
 * The close — the one moment Otto breaks its instrument calm, and only on
 * a weekly muscle target completing (Apple's own rule: rings get fireworks,
 * nothing else does). A deposit lands, chest reaches 140/140: the bar fills
 * its last chunk, flips emerald, the check draws in with a restrained burst.
 * ~2s takeover with a distinct haptic, then back to the session. Still a
 * measurement — a bar literally completing — so no praise copy needed.
 * Loops for demo.
 */

import { useEffect, useState } from "react";
import { WatchFrame } from "./WatchJourneys";

export function TargetCloseLive() {
  const [fill, setFill] = useState(91);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setFill(91);
      setClosed(false);
      timers.push(setTimeout(() => setFill(100), 500));
      timers.push(setTimeout(() => setClosed(true), 1250));
    };
    run();
    const loop = setInterval(run, 5200);
    return () => {
      clearInterval(loop);
      timers.forEach(clearTimeout);
    };
  }, []);

  // toFixed keeps server/client HTML identical — Math.cos/sin aren't
  // bit-identical across JS engines, which trips React hydration
  const bursts = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * 2 * Math.PI + Math.PI / 8;
    return {
      x1: (30 + 22 * Math.cos(a)).toFixed(2),
      y1: (30 + 22 * Math.sin(a)).toFixed(2),
      x2: (30 + 27 * Math.cos(a)).toFixed(2),
      y2: (30 + 27 * Math.sin(a)).toFixed(2),
    };
  });

  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">WEEKLY TARGET</span>
          <span className="text-zinc-500">PUSH DAY</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2.5">
          {/* the check, drawn in with a restrained burst */}
          <div className="relative h-[60px] w-[60px]">
            <svg viewBox="0 0 60 60" className="absolute inset-0 h-full w-full">
              {bursts.map((b, i) => (
                <line
                  key={i}
                  x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2}
                  stroke="#34d399" strokeWidth="2" strokeLinecap="round"
                  className={`transition-opacity duration-300 ${closed ? "opacity-60" : "opacity-0"}`}
                />
              ))}
            </svg>
            <div
              className={`absolute inset-[9px] flex items-center justify-center rounded-full ring-2 transition-all duration-300 ${
                closed
                  ? "scale-100 bg-emerald-500/15 opacity-100 ring-emerald-400"
                  : "scale-50 bg-transparent opacity-0 ring-emerald-400/0"
              }`}
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5 text-emerald-400" fill="none">
                <path d="M5 10.5l3.5 3.5L15.5 6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">
            Chest
          </span>
          <span
            className={`text-[26px] font-semibold leading-none tracking-tight tabular-nums transition-colors duration-300 ${
              closed ? "text-emerald-400" : "text-white"
            }`}
          >
            {Math.round((fill / 100) * 140)} / 140
          </span>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                closed ? "bg-emerald-400" : "bg-gradient-to-r from-brand-400 to-brand-500"
              }`}
              style={{ width: `${fill}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-[9px] font-medium uppercase tracking-wider text-zinc-600">
          <span>
            <span className={closed ? "text-emerald-400" : "text-zinc-400"}>3</span> of 9 closed
          </span>
          <span>resets Sun</span>
        </div>
      </div>
    </WatchFrame>
  );
}
