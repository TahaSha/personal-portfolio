"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { profile } from "@/lib/data/resume";
import { cn } from "@/lib/utils";

export function CvMenu({
  size = "default",
  className,
}: {
  size?: "default" | "lg";
  className?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            size === "lg" ? "h-11 px-6 text-sm" : "h-9 px-4",
            className
          )}
        >
          <Download strokeWidth={1.5} data-icon="inline-start" />
          Download CV
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-52">
        {profile.cvs.map((cv) => (
          <DropdownMenuItem key={cv.file} asChild>
            <a href={cv.file} download>
              <span
                aria-hidden
                className={cn(
                  "size-1.5",
                  cv.track === "engineering" ? "bg-eng" : "bg-teach"
                )}
              />
              {cv.label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
