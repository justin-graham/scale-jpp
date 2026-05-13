import { describe, expect, it } from "vitest";
import { buildStack, lensIsOn, nextStackQuery, parseStack } from "@/lib/stack-state";

describe("stack state helpers", () => {
  it("parses comma-separated stack values", () => {
    expect(parseStack("a,b,, c ")).toEqual(["a", "b", "c"]);
    expect(parseStack(null)).toEqual([]);
  });

  it("opens a new note from a column and truncates right-side columns", () => {
    expect(buildStack(["root", "a", "b"], 1, "c")).toEqual(["root", "a", "c"]);
  });

  it("serializes only non-root columns", () => {
    expect(nextStackQuery(["root", "a", "b"])).toBe("a,b");
  });

  it("reads lens query state", () => {
    expect(lensIsOn("on")).toBe(true);
    expect(lensIsOn("off")).toBe(false);
  });
});
