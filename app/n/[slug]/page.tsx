import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TopBar } from "@/components/chrome/top-bar";
import { StackedNotes } from "@/components/stack/stacked-notes";
import { getNote, notes } from "@/lib/atlas-data";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) {
    return {};
  }
  return {
    title: "Thunderforge",
    description: note.summary,
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return (
    <>
      <TopBar />
      <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading note stack...</div>}>
        <StackedNotes rootSlug={note.slug} />
      </Suspense>
    </>
  );
}
