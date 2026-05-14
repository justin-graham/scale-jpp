import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TopBar } from "@/components/chrome/top-bar";
import { TutorChat } from "@/components/tutor/tutor-chat";
import { notes } from "@/lib/atlas-data";

export default function Home() {
  return (
    <>
      <TopBar />
      <main id="main" className="min-h-[calc(100vh-4rem)]">
        <section className="border-b">
          <div className="mx-auto max-w-7xl px-4 py-10 lg:py-14">
            <TutorChat variant="full" />
          </div>
        </section>

        <section>
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-lg leading-8 text-muted-foreground">
                An interactive guide for the JP 5-0 and Scale&apos;s agentic planning
                whitepaper.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/n/start-here"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Start the Guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
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
