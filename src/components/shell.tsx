import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

export const btnPrimary =
  "inline-flex h-12 min-h-12 items-center justify-center gap-2 bg-pine px-5 font-medium text-pine-ink transition-colors duration-200 hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50";

export const btnGhost =
  "inline-flex h-12 min-h-12 items-center justify-center gap-2 border border-ink px-5 font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-paper";
