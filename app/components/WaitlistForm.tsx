"use client";

import { useState } from "react";

export function WaitlistForm({
  variant = "hero",
}: {
  variant?: "hero" | "footer";
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div
        className={`flex items-center gap-2 rounded-full bg-brand-500/10 px-5 py-3 text-sm font-medium text-brand-200 ring-1 ring-brand-500/25 ${
          variant === "footer" ? "justify-center" : ""
        }`}
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4 text-brand-400" fill="none">
          <path
            d="M5 10.5l3 3 7-7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        You&apos;re on the list — see you in the gym.
      </div>
    );
  }

  return (
    <form
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setDone(true);
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="h-12 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-brand-500/50 focus:bg-white/[0.06]"
      />
      <button
        type="submit"
        className="h-12 shrink-0 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white transition hover:bg-brand-400"
      >
        Get early access
      </button>
    </form>
  );
}
