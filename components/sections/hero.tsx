"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { CvMenu } from "@/components/cv-menu";
import { profile } from "@/lib/data/resume";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type ActiveTrack = "eng" | "teach" | null;

const subtext: Record<"default" | "eng" | "teach", string> = {
  default: profile.tagline,
  eng: "Agentic LLM systems for cybersecurity, 12+ production ML projects, 2M+ predictions served monthly.",
  teach:
    "Seven years of Cambridge Mathematics and Computing across Cairo's international schools.",
};

function HeadlineLine({
  label,
  track,
  active,
  onActivate,
  accentClass,
}: {
  label: string;
  track: "eng" | "teach";
  active: ActiveTrack;
  onActivate: (track: ActiveTrack) => void;
  accentClass: string;
}) {
  const isActive = active === track;
  const isDimmed = active !== null && !isActive;
  return (
    <span
      className={cn(
        "relative block w-fit cursor-default transition-colors duration-500",
        isActive && accentClass,
        isDimmed && "text-foreground/30"
      )}
      onMouseEnter={() => onActivate(track)}
      onMouseLeave={() => onActivate(null)}
      onClick={() => onActivate(isActive ? null : track)}
    >
      {label}
      <span
        aria-hidden
        className={cn(
          "absolute -bottom-1 left-0 h-[3px] w-full origin-left transition-transform duration-500",
          track === "eng" ? "bg-eng" : "bg-teach",
          isActive ? "scale-x-100" : "scale-x-0"
        )}
      />
    </span>
  );
}

export function Hero({ portraitSrc }: { portraitSrc: string | null }) {
  const [active, setActive] = useState<ActiveTrack>(null);
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 36 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE },
    },
  };

  return (
    <section id="top" className="border-b">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 py-16 md:py-20 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-12 lg:gap-16 lg:py-24"
        >
          <div className="lg:col-span-7">
            <motion.h1
              variants={item}
              className="font-display text-6xl font-medium leading-[1.02] tracking-tight sm:text-7xl xl:text-8xl"
            >
              <HeadlineLine
                label="AI engineer."
                track="eng"
                active={active}
                onActivate={setActive}
                accentClass="text-eng"
              />
              <HeadlineLine
                label="Educator."
                track="teach"
                active={active}
                onActivate={setActive}
                accentClass="text-teach"
              />
            </motion.h1>

            <motion.div
              variants={item}
              className="mt-8 min-h-20 max-w-md sm:min-h-16"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={active ?? "default"}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="text-lg leading-relaxed text-muted-foreground"
                >
                  {subtext[active ?? "default"]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
              <Button asChild className="h-11 px-6 text-sm">
                <a href="#contact">Get in touch</a>
              </Button>
              <CvMenu size="lg" />
            </motion.div>
          </div>

          <motion.div variants={item} className="lg:col-span-5">
            <figure className="mx-auto max-w-sm lg:max-w-none">
              <div className="border bg-card p-2.5">
                <div className="relative aspect-4/5 overflow-hidden bg-secondary">
                  {portraitSrc ? (
                    <Image
                      src={portraitSrc}
                      alt={`Portrait of ${profile.shortName}`}
                      fill
                      priority
                      sizes="(min-width: 1024px) 40vw, (min-width: 640px) 384px, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3">
                      <span className="font-display text-8xl font-medium italic leading-[1.1] pb-1 text-foreground/70">
                        {profile.monogram}
                      </span>
                      <span className="text-xs tracking-wide text-muted-foreground">
                        {profile.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <figcaption className="mt-3 text-xs text-muted-foreground">
                {profile.shortName}. {profile.location}. {profile.citizenship}.
              </figcaption>
            </figure>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
