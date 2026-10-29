"use client";

import { useState } from "react";
import type { Track } from "@/lib/data/resume";
import { cn } from "@/lib/utils";

export type EraView = {
  range: string;
  title: string;
  summary: string;
  roles: { track: Track | "education"; title: string; org: string; dates: string }[];
};

const DOT = {
  engineering: "bg-eng",
  teaching: "bg-teach",
  education: "bg-muted-foreground",
} as const;

// Desktop: chapters sit side by side and the hovered or focused one opens up.
// Mobile: they stack, all open.
export function EraPanels({ eras }: { eras: EraView[] }) {
  const [open, setOpen] = useState(eras.length - 1);

  return (
    <div className="flex flex-col gap-3 lg:h-[28rem] lg:flex-row">
      {eras.map((era, i) => {
        const isOpen = i === open;
        const muted = cn("text-muted-foreground", isOpen && "lg:text-paper/65");
        return (
          <article
            key={era.range}
            tabIndex={0}
            onPointerEnter={() => setOpen(i)}
            onFocus={() => setOpen(i)}
            onClick={() => setOpen(i)}
            className={cn(
              "relative overflow-hidden rounded-2xl border bg-card p-6 outline-none transition-[flex-grow,background-color,color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none lg:min-w-0 lg:basis-0",
              isOpen
                ? "lg:grow-[2.6] lg:border-ink lg:bg-ink lg:text-paper"
                : "lg:grow lg:cursor-pointer lg:hover:bg-secondary"
            )}
          >
            <p className={cn("font-mono text-xs", muted)}>{era.range}</p>
            <h3 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight lg:text-[1.75rem]">
              {era.title}
            </h3>
            {/* Fixed width so text doesn't reflow while the panel grows. */}
            <div
              className={cn(
                "transition-opacity duration-300 motion-reduce:transition-none lg:w-[26rem]",
                isOpen ? "lg:opacity-100 lg:delay-150" : "lg:opacity-0"
              )}
            >
              <p className={cn("mt-4 max-w-md text-sm leading-relaxed", muted)}>
                {era.summary}
              </p>
              <ul className="mt-6 space-y-3">
                {era.roles.map((role) => (
                  <li key={`${role.org}-${role.dates}`} className="flex gap-3">
                    <span
                      aria-hidden
                      className={cn("mt-1.5 size-2 shrink-0 rounded-full", DOT[role.track])}
                    />
                    <span className="text-sm leading-snug">
                      {role.title}, {role.org}
                      <span className={cn("block font-mono text-xs", muted)}>
                        {role.dates}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Closed-panel summary: which tracks ran in this era. */}
            <p
              aria-hidden
              className={cn(
                "absolute bottom-6 left-6 hidden items-center gap-1.5 text-xs text-muted-foreground transition-opacity duration-300 lg:flex",
                isOpen && "lg:opacity-0"
              )}
            >
              {[...new Set(era.roles.map((role) => role.track))].map((track) => (
                <span key={track} className={cn("size-2 rounded-full", DOT[track])} />
              ))}
              <span className="ml-1">
                {era.roles.length} {era.roles.length === 1 ? "role" : "roles"}
              </span>
            </p>
          </article>
        );
      })}
    </div>
  );
}
