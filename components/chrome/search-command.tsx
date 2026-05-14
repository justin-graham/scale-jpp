"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquareText, Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { notes } from "@/lib/atlas-data";
import { getTutorUrl } from "@/lib/tutor-client";

export function SearchCommand() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const tutorConfigured = useMemo(() => Boolean(getTutorUrl()), []);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || event.key === "/") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const grouped = useMemo(() => {
    return notes.reduce<Record<string, typeof notes>>((acc, note) => {
      acc[note.cluster] ??= [];
      acc[note.cluster].push(note);
      return acc;
    }, {});
  }, []);

  function go(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/n/${slug}`);
  }

  function askTutor(question: string) {
    setOpen(false);
    setQuery("");
    router.push(`/?ask=${encodeURIComponent(question)}`);
  }

  const trimmed = query.trim();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] sm:inline">
          /
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search notes or ask the tutor anything..."
        />
        <CommandList>
          <CommandEmpty>No note found.</CommandEmpty>
          {tutorConfigured && trimmed.length > 0 ? (
            <CommandGroup heading="Tutor">
              <CommandItem
                value={`ask tutor ${trimmed}`}
                onSelect={() => askTutor(trimmed)}
              >
                <MessageSquareText className="mr-2 h-4 w-4 text-agentic" aria-hidden="true" />
                <div>
                  <div className="font-medium">Ask the tutor: &ldquo;{trimmed}&rdquo;</div>
                  <div className="text-xs text-muted-foreground">
                    Grounded answer from JP 5-0 + Scale corpus.
                  </div>
                </div>
              </CommandItem>
            </CommandGroup>
          ) : null}
          {Object.entries(grouped).map(([cluster, clusterNotes]) => (
            <CommandGroup key={cluster} heading={cluster}>
              {clusterNotes.map((note) => (
                <CommandItem key={note.slug} value={`${note.title} ${note.tags.join(" ")}`} onSelect={() => go(note.slug)}>
                  <div>
                    <div className="font-medium">{note.title}</div>
                    <div className="text-xs text-muted-foreground">{note.summary}</div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
