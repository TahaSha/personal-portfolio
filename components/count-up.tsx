"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

// Counts "12+" or "2M+" up from 0 on first view. Server HTML keeps the real value.
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();
  const [, digits, suffix = ""] = value.match(/^(\d+)(.*)$/) ?? [];

  useEffect(() => {
    const el = ref.current;
    if (!el || !digits || reduce) return;
    if (!inView) {
      el.textContent = `0${suffix}`;
      return;
    }
    const controls = animate(0, Number(digits), {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, digits, suffix]);

  return <span ref={ref}>{value}</span>;
}
