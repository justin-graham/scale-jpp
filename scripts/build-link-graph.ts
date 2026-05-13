import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notes } from "../lib/atlas-data";

const root = process.cwd();
const contentDir = path.join(root, "content", "notes");
const outputPath = path.join(root, "lib", "generated", "link-graph.json");
const slugs = new Set(notes.map((note) => note.slug));
const graph: Record<string, { outgoing: string[]; incoming: string[] }> = {};

for (const note of notes) {
  graph[note.slug] = { outgoing: [], incoming: [] };
}

const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".mdx"));
const linkPattern = /\]\((?:\/n\/)?([a-z0-9-]+)\)|slug="([a-z0-9-]+)"/g;

for (const file of files) {
  const parsed = matter(fs.readFileSync(path.join(contentDir, file), "utf8"));
  const slug = parsed.data.slug as string;
  const outgoing = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(parsed.content))) {
    const target = match[1] || match[2];
    if (target && target !== slug && slugs.has(target)) {
      outgoing.add(target);
    }
  }

  graph[slug].outgoing = [...outgoing].sort();
}

for (const [slug, entry] of Object.entries(graph)) {
  for (const target of entry.outgoing) {
    graph[target]?.incoming.push(slug);
  }
}

for (const entry of Object.values(graph)) {
  entry.incoming.sort();
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(graph, null, 2)}\n`);
console.log(`Wrote ${outputPath}`);
