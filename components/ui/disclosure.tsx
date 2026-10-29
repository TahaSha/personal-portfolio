"use client";

// Adapted from Motion's official Accordion example on 21st.dev, as a single
// item. Closed content stays in the DOM (inert) so crawlers still index it.
import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { motion, MotionConfig, useReducedMotion } from "motion/react";

export function Disclosure({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const id = useId();

  return (
    <MotionConfig
      transition={
        reduce ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
      }
    >
      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        className={className}
      >
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {label}
          <motion.span
            variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }}
            className="inline-flex"
          >
            <ChevronDown strokeWidth={1.5} className="size-3.5" />
          </motion.span>
        </button>
        <motion.div
          id={id}
          inert={!open}
          variants={{ open: { height: "auto" }, closed: { height: 0 } }}
          className="overflow-hidden"
        >
          <motion.div
            variants={{
              open: { opacity: 1, filter: "blur(0px)" },
              closed: { opacity: 0, filter: "blur(2px)" },
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
