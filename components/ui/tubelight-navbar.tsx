"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import posthog from "posthog-js";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);

  useEffect(() => {
    const sections = items.flatMap((item) => {
      const el = item.url.startsWith("#")
        ? document.getElementById(item.url.slice(1))
        : null;
      return el ? [{ name: item.name, el }] : [];
    });
    if (sections.length === 0) return;

    const nameByEl = new Map(sections.map((s) => [s.el, s.name]));
    // Thin band around the viewport's vertical middle: whichever section
    // covers it is the one being read. Sections without a nav item keep the
    // previous tab active while they scroll past.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const name = nameByEl.get(entry.target as HTMLElement);
          if (name) setActiveTab(name);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s.el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-1/2 z-50 mb-6 -translate-x-1/2 sm:top-0 sm:bottom-auto sm:mb-0 sm:pt-6",
        className
      )}
    >
      <nav
        aria-label="Primary"
        className="flex items-center gap-1 rounded-full border border-border/70 bg-background/75 px-1 py-1 shadow-lg shadow-ink/5 backdrop-blur-xl"
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => {
                setActiveTab(item.name);
                posthog.capture("nav_item_clicked", { section: item.name, url: item.url });
              }}
              className={cn(
                "relative cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors md:px-5",
                "text-foreground/70 hover:text-foreground",
                isActive && "text-foreground"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2} aria-hidden />
                <span className="sr-only">{item.name}</span>
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 -z-10 w-full rounded-full bg-primary/5"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-primary">
                    <div className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-primary/20 blur-md" />
                    <div className="absolute -top-1 h-6 w-8 rounded-full bg-primary/20 blur-md" />
                    <div className="absolute top-0 left-2 h-4 w-4 rounded-full bg-primary/20 blur-sm" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
