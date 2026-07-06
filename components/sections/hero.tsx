"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import posthog from "posthog-js";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { CvMenu } from "@/components/cv-menu";
import { profile, type Track } from "@/lib/data/resume";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero({ portraitSrc }: { portraitSrc: string | null }) {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Track | null>(null);

  const scrollToContact = () => {
    posthog.capture("hero_cta_clicked");
    document.getElementById("contact")?.scrollIntoView();
  };

  // Spans, not buttons: buttons are atomic inline-blocks and orphan the
  // punctuation after them when the phrase wraps mid-sentence.
  const identityTrigger = (m: Track) => ({
    role: "button" as const,
    tabIndex: 0,
    "aria-pressed": mode === m,
    className: cn(
      "cursor-pointer text-white/85 underline underline-offset-4 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/60",
      mode === m
        ? "decoration-white/80"
        : "decoration-dotted decoration-white/30 hover:decoration-white/60"
    ),
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") {
        setMode(m);
        posthog.capture("hero_identity_mode_activated", { mode: m, trigger: "hover" });
      }
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setMode(null);
    },
    onClick: (e: React.MouseEvent) => {
      // Mouse users shift on hover; tap toggles, tapping the other switches.
      if ((e.nativeEvent as PointerEvent).pointerType === "mouse") return;
      setMode((prev) => {
        const next = prev === m ? null : m;
        if (next !== null) posthog.capture("hero_identity_mode_activated", { mode: next, trigger: "tap" });
        return next;
      });
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setMode((prev) => (prev === m ? null : m));
      }
    },
    // Gate to keyboard focus: on touch, focus fires before click and would
    // cancel the tap toggle.
    onFocus: (e: React.FocusEvent<HTMLSpanElement>) => {
      if (e.target.matches(":focus-visible")) setMode(m);
    },
    onBlur: () => setMode(null),
  });

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-black text-white"
    >
      <WebGLShader mode={mode} />
      <div className="relative mx-auto flex min-h-[100dvh] max-w-6xl items-center justify-center px-5 py-16 md:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="w-full max-w-3xl rounded-[2rem] border border-white/15 p-2"
        >
          <div className="rounded-3xl border border-white/15 bg-black/35 px-5 py-10 text-center backdrop-blur-[3px] md:px-10 md:py-14">
            {portraitSrc && (
              <div className="mx-auto mb-6 w-fit rounded-full border border-white/20 p-1.5">
                <Image
                  src={portraitSrc}
                  alt={`Portrait of ${profile.shortName}`}
                  width={112}
                  height={112}
                  priority
                  className="size-20 rounded-full object-cover object-top md:size-24"
                />
              </div>
            )}
            <h1 className="font-display text-6xl font-medium leading-[1.1] tracking-tight text-white sm:text-7xl xl:text-8xl">
              One mind,
              <br />
              <em className="pb-1">full spectrum.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/65 md:text-base">
              I{" "}
              <span {...identityTrigger("engineering")}>
                build production AI systems
              </span>{" "}
              and{" "}
              <span {...identityTrigger("teaching")}>
                teach Cambridge Mathematics and Computing
              </span>
              . Different wavelengths, same light.
            </p>
            <div className="mt-8 flex items-center justify-center gap-2">
              <span className="relative flex size-3 items-center justify-center">
                <span
                  className={
                    reduce
                      ? "hidden"
                      : "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"
                  }
                />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <p className="text-xs text-emerald-400">
                Open to engineering and teaching roles
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <LiquidButton
                size="xl"
                onClick={scrollToContact}
                className="rounded-full text-white"
              >
                Get in touch
              </LiquidButton>
              <CvMenu
                size="lg"
                className="h-12 rounded-full border-white/30 bg-transparent px-8 text-white hover:bg-white/10 hover:text-white"
              />
            </div>
          </div>
        </motion.div>
      </div>
      <span className="sr-only">
        {profile.name}, {profile.roles.join(" and ")}
      </span>
    </section>
  );
}
