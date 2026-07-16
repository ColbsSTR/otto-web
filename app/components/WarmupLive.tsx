"use client";

/**
 * The warmup screen, animated — two states, looping for demo.
 * State 1 (0–3s): the answer as a sentence, full size. Nothing else.
 * State 2 (3s+): the sentence compresses to a one-line headline and the
 * load–velocity profile fades in beneath — today's dots landing on the
 * lift's usual curve, staggered. Progressive disclosure in time: the
 * glance for everyone, the evidence for whoever's still looking.
 * Footer stays history-only throughout: last time's top set.
 */

import { useEffect, useState } from "react";
import { WatchFrame } from "./WatchJourneys";

const BASELINE = "6,17 18,20 78,32 138,46 150,49";
const DOTS = [
  { x: 18, y: 15, load: "95" },
  { x: 78, y: 26, load: "135" },
  { x: 138, y: 39, load: "185" },
];

export function WarmupLive() {
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const run = () => {
      setProfile(false);
      timer = setTimeout(() => setProfile(true), 3000);
    };
    run();
    const loop = setInterval(run, 8000);
    return () => {
      clearTimeout(timer);
      clearInterval(loop);
    };
  }, []);

  return (
    <WatchFrame>
      <div className="flex h-full flex-col px-6 py-6">
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide">
          <span className="text-zinc-500">BENCH PRESS</span>
          <span className="text-zinc-500">WARM-UP 3/3</span>
        </div>
        <div className="relative flex-1">
          {/* state 1 — the sentence, full size */}
          <div
            className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
              profile ? "pointer-events-none scale-75 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <div className="text-[23px] font-semibold leading-[1.25] tracking-tight">
              <div className="text-zinc-200">Moving</div>
              <div className="text-emerald-400">4% faster</div>
              <div className="text-zinc-200">than usual</div>
            </div>
          </div>
          {/* state 2 — compact headline + the profile */}
          <div
            className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
              profile ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
            }`}
          >
            <div className="text-[13px] font-semibold tracking-tight">
              <span className="text-emerald-400">4% faster</span>{" "}
              <span className="text-zinc-300">than usual</span>
            </div>
            <div className="mt-2 h-[64px]">
              <svg viewBox="0 0 156 64" className="h-full w-full">
                {/* the usual curve — dotted emerald, dim enough that today's
                    solid dots stay the foreground */}
                <polyline
                  points={BASELINE}
                  fill="none"
                  stroke="#34d399"
                  strokeOpacity="0.35"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="1 6"
                />
                {DOTS.map((d, i) => (
                  <g
                    key={d.load}
                    className="transition-opacity duration-300"
                    style={{
                      opacity: profile ? 1 : 0,
                      transitionDelay: `${300 + i * 180}ms`,
                    }}
                  >
                    {i === DOTS.length - 1 && (
                      <circle cx={d.x} cy={d.y} r="6.5" fill="none" stroke="#34d399" strokeOpacity="0.35" strokeWidth="1.5" />
                    )}
                    <circle cx={d.x} cy={d.y} r={i === DOTS.length - 1 ? 4 : 3} fill="#34d399" />
                    <text
                      x={d.x}
                      y="61"
                      textAnchor="middle"
                      fill="#52525b"
                      style={{ fontSize: 8, fontWeight: 500 }}
                    >
                      {d.load}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
        <div className="text-[10px] font-medium text-zinc-600">
          LAST SET <span className="text-white">225 LB × 8</span>
        </div>
      </div>
    </WatchFrame>
  );
}
