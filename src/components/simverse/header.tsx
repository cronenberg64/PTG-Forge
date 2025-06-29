"use client";

import { Logo } from "@/components/simverse/logo";

export function AppHeader() {
  return (
    <header className="px-4 sm:px-6 md:px-8 py-4 border-b">
      <div className="flex items-center gap-3">
        <Logo className="h-8 w-8 text-primary" />
        <h1 className="text-xl sm:text-2xl font-bold text-foreground font-headline tracking-tight">
          PTG Forge
        </h1>
      </div>
    </header>
  );
}
