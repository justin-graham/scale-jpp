import { describe, expect, it } from "vitest";
import { notes, trails } from "@/lib/atlas-data";

describe("atlas content registry", () => {
  it("has unique note slugs", () => {
    const slugs = notes.map((note) => note.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has valid trail starts", () => {
    const slugs = new Set(notes.map((note) => note.slug));
    for (const trail of trails) {
      expect(slugs.has(trail.startSlug)).toBe(true);
    }
  });

  it("marks all source claims with allowed kinds", () => {
    const kinds = new Set(["doctrine", "scale", "inference", "scenario"]);
    for (const note of notes) {
      expect(note.sourceClaims.length).toBeGreaterThan(0);
      for (const claim of note.sourceClaims) {
        expect(kinds.has(claim.kind)).toBe(true);
        expect(claim.label.length).toBeGreaterThan(0);
        expect(claim.ref.length).toBeGreaterThan(0);
      }
    }
  });
});
