"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Reveal } from "@/components/reveal";
import { timeline } from "@/lib/data/resume";
import { cn } from "@/lib/utils";

const trackStyles = {
  engineering: { node: "bg-eng", label: "Engineering" },
  teaching: { node: "bg-teach", label: "Teaching" },
  education: { node: "bg-foreground/40", label: "Education" },
} as const;

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.75"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="timeline" className="scroll-mt-16 border-b">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="max-w-xl font-display text-4xl font-medium tracking-tight md:text-5xl">
            Two tracks, one decade.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Teaching since 2017, shipping AI since 2019, and never one at the
            expense of the other.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
            {Object.values(trackStyles).map((style) => (
              <li key={style.label} className="flex items-center gap-2.5">
                <span aria-hidden className={cn("size-2.5", style.node)} />
                <span className="text-sm text-muted-foreground">
                  {style.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div ref={ref} className="relative mt-16">
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[5px] w-px -translate-x-1/2 bg-border md:left-1/2"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: reduce ? 1 : scaleY }}
            className="absolute top-0 bottom-0 left-[5px] w-px origin-top -translate-x-1/2 bg-foreground/50 md:left-1/2"
          />
          <ol className="space-y-12 md:space-y-16">
            {timeline.map((entry, i) => {
              const style = trackStyles[entry.track];
              const onLeft = entry.track === "engineering";
              return (
                <li
                  key={`${entry.year}-${entry.org}`}
                  className="relative md:grid md:grid-cols-2"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-1.5 left-[5px] size-2.5 -translate-x-1/2 outline-4 outline-background md:left-1/2",
                      style.node
                    )}
                  />
                  <Reveal
                    delay={i % 2 === 0 ? 0 : 0.05}
                    className={cn(
                      "pl-9 md:pl-0",
                      onLeft
                        ? "md:col-start-1 md:pr-14 md:text-right"
                        : "md:col-start-2 md:pl-14"
                    )}
                  >
                    <p className="font-mono text-xs text-muted-foreground">
                      {entry.year}
                      {entry.ongoing ? " to present" : ""}
                    </p>
                    <h3 className="mt-1.5 text-base font-medium">
                      {entry.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {entry.org}
                    </p>
                    {entry.note && (
                      <p
                        className={cn(
                          "mt-2.5 max-w-xs text-sm leading-relaxed text-muted-foreground",
                          onLeft && "md:ml-auto"
                        )}
                      >
                        {entry.note}
                      </p>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
