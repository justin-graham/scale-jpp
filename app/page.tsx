import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TopBar } from "@/components/chrome/top-bar";
import { notes } from "@/lib/atlas-data";

export default function Home() {
  return (
    <>
      <TopBar />
      <main id="main" className="min-h-[calc(100vh-4rem)]">
        <section className="border-b">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_0.85fr] lg:py-14">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-normal md:text-6xl">
                Thunderforge JPP Guide
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                An interactive bridge between JP 5-0 and Scale AI&apos;s public agentic
                planning thesis. Use it as a first-month mental scaffold for TPMs and
                engineers joining Thunderforge-adjacent work.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/n/start-here"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Start the Guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="rounded-md border bg-card p-4">
              <div className="rounded-md border bg-background">
                <label htmlFor="future-guide-prompt" className="sr-only">
                  Future guide prompt
                </label>
                <textarea
                  id="future-guide-prompt"
                  disabled
                  rows={6}
                  placeholder="Ask the guide about mission analysis, COA development, wargaming, or Thunderforge's agentic overlay..."
                  className="min-h-36 w-full resize-none bg-transparent p-4 text-sm leading-6 text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-100"
                />
                <div className="flex items-center justify-between border-t px-4 py-3">
                  <span className="text-xs text-muted-foreground">Future AI guide</span>
                  <button
                    type="button"
                    disabled
                    className="rounded-md border px-3 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    Ask
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <h2 className="text-2xl font-semibold">Browse the graph</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                The graph is intentionally small in V1: one polished vertical with source
                labels and working interactions.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {notes.map((note) => (
                <Link
                  key={note.slug}
                  href={`/n/${note.slug}`}
                  className="rounded-md border bg-card p-4 transition hover:border-agentic hover:bg-background"
                >
                  <div className="mb-2 font-mono text-xs uppercase text-muted-foreground">
                    {note.cluster}
                  </div>
                  <h3 className="text-sm font-semibold leading-5">{note.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{note.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <a
              href="https://github.com/justin-graham/scale-jpp"
              className="text-sm font-medium text-doctrine underline underline-offset-4"
            >
              GitHub repository
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
