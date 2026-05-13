import Link from "next/link";
import { TopBar } from "@/components/chrome/top-bar";
import { notes } from "@/lib/atlas-data";

export const metadata = {
  title: "Search",
  description: "Browse searchable Atlas notes.",
};

export default function SearchPage() {
  return (
    <>
      <TopBar />
      <main id="main" className="mx-auto min-h-[calc(100vh-4rem)] max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-semibold">Search Index</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Use Cmd-K or slash for the in-app command palette. Pagefind indexes the exported
          static HTML during production builds.
        </p>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {notes.map((note) => (
            <Link
              key={note.slug}
              href={`/n/${note.slug}`}
              className="rounded-md border bg-card p-4 transition hover:border-agentic"
            >
              <div className="font-mono text-xs uppercase text-muted-foreground">{note.cluster}</div>
              <h2 className="mt-2 text-base font-semibold">{note.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{note.summary}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
