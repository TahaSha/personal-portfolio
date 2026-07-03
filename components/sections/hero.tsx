"use client";

import { motion, useReducedMotion } from "motion/react";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { CvMenu } from "@/components/cv-menu";
import { profile } from "@/lib/data/resume";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView();
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-black text-white"
    >
      <WebGLShader />
      <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl items-center justify-center px-5 py-16 md:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="w-full max-w-3xl border border-white/15 p-2"
        >
          <div className="border border-white/15 bg-black/35 px-5 py-12 text-center backdrop-blur-[3px] md:px-10 md:py-16">
            <h1 className="font-display text-6xl font-medium leading-[1.1] tracking-tight text-white sm:text-7xl xl:text-8xl">
              One mind,
              <br />
              <em className="pb-1">full spectrum.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/65 md:text-base">
              I build production AI systems and teach Cambridge Mathematics
              and Computing. Different wavelengths, same light.
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
