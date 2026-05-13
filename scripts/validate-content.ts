import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notes } from "../lib/atlas-data";
import type { ClaimKind } from "../lib/atlas-types";

const root = process.cwd();
const contentDir = path.join(root, "content", "notes");
const validClaimKinds = new Set<ClaimKind>(["doctrine", "scale", "inference", "scenario"]);
const required = [
  "title",
  "slug",
  "cluster",
  "summary",
  "audience",
  "sourceClaims",
  "tags",
  "trailOrder",
];

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".mdx"));
const mdxSlugs = new Set<string>();
const appSlugs = new Set(notes.map((note) => note.slug));

for (const file of files) {
  const fullPath = path.join(contentDir, file);
  const parsed = matter(fs.readFileSync(fullPath, "utf8"));
  for (const field of required) {
    if (parsed.data[field] === undefined) {
      fail(`${file} is missing required frontmatter field: ${field}`);
    }
  }

  const slug = parsed.data.slug;
  if (typeof slug !== "string") {
    fail(`${file} has non-string slug`);
  }
  if (mdxSlugs.has(slug)) {
    fail(`Duplicate MDX slug: ${slug}`);
  }
  mdxSlugs.add(slug);

  if (!appSlugs.has(slug)) {
    fail(`${file} slug is not registered in lib/atlas-data.ts: ${slug}`);
  }

  const claims = parsed.data.sourceClaims;
  if (!Array.isArray(claims) || claims.length === 0) {
    fail(`${file} needs at least one source claim`);
  }

  for (const claim of claims) {
    if (!claim || !validClaimKinds.has(claim.kind)) {
      fail(`${file} has invalid source claim kind`);
    }
    if (!claim.label || !claim.ref) {
      fail(`${file} has source claim without label/ref`);
    }
  }
}

for (const note of notes) {
  if (!mdxSlugs.has(note.slug)) {
    fail(`Registered note lacks content/notes MDX stub: ${note.slug}`);
  }

  for (const claim of note.sourceClaims) {
    if (!validClaimKinds.has(claim.kind)) {
      fail(`Registered note ${note.slug} has invalid claim kind: ${claim.kind}`);
    }
  }

  if (note.agenticOverlay && !appSlugs.has(note.agenticOverlay)) {
    fail(`Registered note ${note.slug} has invalid agenticOverlay: ${note.agenticOverlay}`);
  }
}

console.log(`Validated ${files.length} MDX notes and ${notes.length} registered notes.`);
