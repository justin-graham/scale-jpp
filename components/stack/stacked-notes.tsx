"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { NoteBody } from "@/components/notes/note-body";
import { getNote, getRelatedNotes } from "@/lib/atlas-data";
import { buildStack, lensIsOn, nextStackQuery, parseStack } from "@/lib/stack-state";
import { claimCardClassName, claimLabel } from "@/lib/claim-style";
import { cn } from "@/lib/utils";

type StackedNotesProps = {
  rootSlug: string;
};

export function StackedNotes({ rootSlug }: StackedNotesProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stack = parseStack(searchParams.get("stack"));
  const lensOn = lensIsOn(searchParams.get("lens"));

  const columns = useMemo(() => {
    const seen = new Set<string>();
    return [rootSlug, ...stack].filter((slug) => {
      const exists = getNote(slug);
      if (!exists || seen.has(slug)) return false;
      seen.add(slug);
      return true;
    });
  }, [rootSlug, stack]);

  function pushColumns(nextColumns: string[]) {
    const root = nextColumns[0] ?? rootSlug;
    const params = new URLSearchParams();
    const stackQuery = nextStackQuery(nextColumns);
    if (stackQuery) params.set("stack", stackQuery);
    if (lensOn) params.set("lens", "on");
    const query = params.toString();
    router.push(`/n/${root}${query ? `?${query}` : ""}`, { scroll: false });
  }

  function openFrom(index: number, slug: string) {
    pushColumns(buildStack(columns, index, slug));
  }

  function closeFrom(index: number) {
    if (index === 0) {
      router.push("/", { scroll: false });
      return;
    }
    pushColumns(columns.slice(0, index));
  }

  function goBackMobile() {
    if (columns.length <= 1) {
      router.push("/", { scroll: false });
      return;
    }
    closeFrom(columns.length - 1);
  }

  const visibleMobile = columns[columns.length - 1] ?? rootSlug;

  return (
    <main id="main" className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="border-b bg-muted/40 px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={goBackMobile}
          className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </button>
      </div>
      <div className="note-grid hidden flex-1 gap-4 overflow-x-auto px-4 py-5 md:flex" tabIndex={0}>
        {columns.map((slug, index) => {
          const note = getNote(slug);
          if (!note) return null;
          return (
            <NoteColumn
              key={`${slug}-${index}`}
              noteSlug={slug}
              columnIndex={index}
              isRoot={index === 0}
              closeColumn={() => closeFrom(index)}
              openNote={(nextSlug) => openFrom(index, nextSlug)}
              lensOn={lensOn}
            />
          );
        })}
      </div>
      <div className="px-4 py-5 md:hidden">
        <NoteColumn
          noteSlug={visibleMobile}
          columnIndex={columns.length - 1}
          isRoot={columns.length === 1}
          closeColumn={goBackMobile}
          openNote={(nextSlug) => openFrom(columns.length - 1, nextSlug)}
          lensOn={lensOn}
        />
      </div>
      <div className="sr-only" aria-live="polite">
        Current path: {pathname}
      </div>
    </main>
  );
}

function NoteColumn({
  noteSlug,
  columnIndex,
  isRoot,
  closeColumn,
  openNote,
  lensOn,
}: {
  noteSlug: string;
  columnIndex: number;
  isRoot: boolean;
  closeColumn: () => void;
  openNote: (slug: string) => void;
  lensOn: boolean;
}) {
  const note = getNote(noteSlug);
  if (!note) return null;
  const related = getRelatedNotes(note);

  return (
    <article
      className="note-column flex min-w-0 shrink-0 flex-col overflow-hidden rounded-md border bg-background shadow-sm"
      aria-labelledby={`note-title-${note.slug}-${columnIndex}`}
    >
      <header className="border-b p-5">
        <div className="flex items-start justify-between gap-3">
          <h1 id={`note-title-${note.slug}-${columnIndex}`} className="text-2xl font-semibold tracking-normal">
            {note.title}
          </h1>
          <button
            type="button"
            onClick={closeColumn}
            className="shrink-0 rounded-md border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label={isRoot ? "Close note and return home" : "Close note column"}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </header>
      <div className="atlas-prose flex-1 p-5">
        <NoteBody note={note} lensOn={lensOn} openNote={openNote} />
      </div>
      <footer className="border-t bg-muted/20 p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <section>
            <h2 className="text-sm font-semibold">Source Claims</h2>
            <div className="mt-3 space-y-3">
              {note.sourceClaims.map((claim) => (
                <div
                  key={`${claim.kind}-${claim.label}`}
                  className={cn("rounded-md border px-3 py-2 text-xs leading-5", claimCardClassName(claim.kind))}
                >
                  <div className="font-semibold">{claimLabel(claim.kind)}</div>
                  <div className="text-current opacity-90">{claim.label}</div>
                  {claim.quote ? (
                    <blockquote className="mt-2 border-l-2 border-current/25 pl-2 text-[11px] leading-5 text-current opacity-80">
                      &ldquo;{claim.quote}&rdquo;
                    </blockquote>
                  ) : null}
                  <div className="mt-1 font-mono text-[11px] text-current opacity-60">{claim.ref}</div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-sm font-semibold">Related Notes</h2>
            <div className="mt-3 space-y-2">
              {related.map((relatedNote) => (
                <button
                  key={relatedNote.slug}
                  type="button"
                  onClick={() => openNote(relatedNote.slug)}
                  className="block w-full rounded-md border bg-background px-3 py-2 text-left text-sm transition hover:bg-muted"
                >
                  {relatedNote.title}
                </button>
              ))}
            </div>
          </section>
        </div>
      </footer>
    </article>
  );
}
