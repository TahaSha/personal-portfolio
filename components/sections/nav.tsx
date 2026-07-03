"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CvMenu } from "@/components/cv-menu";
import { profile } from "@/lib/data/resume";

const links = [
  { href: "#about", label: "About" },
  { href: "#engineering", label: "Engineering" },
  { href: "#teaching", label: "Teaching" },
  { href: "#timeline", label: "Timeline" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link
          href="#top"
          className="font-display text-xl font-semibold tracking-tight"
        >
          {profile.shortName}
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <CvMenu className="hidden sm:inline-flex" />
          <Button asChild className="h-9 px-4">
            <a href="#contact">Get in touch</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
