import Link from "next/link";
import { Suspense } from "react";
import { LensToggle } from "@/components/lens/lens-toggle";
import { SearchCommand } from "@/components/chrome/search-command";
import { ScaleWordmark } from "@/components/chrome/scale-wordmark";

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <ScaleWordmark className="h-5 w-[78px] shrink-0" />
          <span className="truncate text-sm font-semibold">Thunderforge JPP Guide</span>
        </Link>
        <nav className="flex items-center gap-2" aria-label="Primary navigation">
          <SearchCommand />
          <Suspense
            fallback={
              <div className="rounded-md border px-3 py-2 text-sm text-muted-foreground">
                Agentic Lens
              </div>
            }
          >
            <LensToggle />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
