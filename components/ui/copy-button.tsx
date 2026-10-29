"use client";

// Adapted from ddoemonn's Copy Button on 21st.dev, restyled to the house Button.
import { useEffect, useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "copied" | "error";

const FADE = { type: "spring", stiffness: 260, damping: 34, mass: 0.8 } as const;
const ICONS = { idle: Copy, copied: Check, error: X } as const;

export function CopyButton({
  value,
  label = "Copy",
  onCopy,
}: {
  value: string;
  label?: string;
  onCopy?: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const reduce = useReducedMotion();
  const labels: Record<Status, string> = {
    idle: label,
    copied: "Copied",
    error: "Copy failed",
  };

  useEffect(() => {
    if (status === "idle") return;
    const id = setTimeout(() => setStatus("idle"), 2000);
    return () => clearTimeout(id);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
      onCopy?.();
    } catch {
      setStatus("error");
    }
  }

  const transition = reduce ? { duration: 0 } : FADE;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-label={label}
      onClick={copy}
    >
      {/* Every state sits in the same grid cell so the button never changes width. */}
      <span aria-hidden="true" className="grid">
        {(Object.keys(labels) as Status[]).map((key) => {
          const Icon = ICONS[key];
          return (
            <motion.span
              key={key}
              initial={false}
              animate={
                key === status
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 3, filter: "blur(3px)" }
              }
              transition={transition}
              className="col-start-1 row-start-1 inline-flex items-center gap-1.5"
            >
              <Icon strokeWidth={1.5} />
              {labels[key]}
            </motion.span>
          );
        })}
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {status === "idle" ? "" : labels[status]}
      </span>
    </Button>
  );
}
