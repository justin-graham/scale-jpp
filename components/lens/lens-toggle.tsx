"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Eye } from "lucide-react";
import { lensIsOn } from "@/lib/stack-state";

export function LensToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const enabled = lensIsOn(searchParams.get("lens"));

  useEffect(() => {
    if (!searchParams.get("lens") && localStorage.getItem("atlas:lens") === "on") {
      const next = new URLSearchParams(searchParams.toString());
      next.set("lens", "on");
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    }
  }, [pathname, router, searchParams]);

  function toggle() {
    const next = new URLSearchParams(searchParams.toString());
    if (enabled) {
      next.delete("lens");
      localStorage.setItem("atlas:lens", "off");
    } else {
      next.set("lens", "on");
      localStorage.setItem("atlas:lens", "on");
    }
    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition ${
        enabled
          ? "border-agentic bg-agentic/15 text-amber-800 dark:text-agentic"
          : "border-border hover:bg-muted"
      }`}
      aria-pressed={enabled}
    >
      <Eye className="h-4 w-4" aria-hidden="true" />
      Agentic Lens
    </button>
  );
}
