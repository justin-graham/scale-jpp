import type { ComponentType } from "react";

export type ClaimKind = "doctrine" | "scale" | "inference" | "scenario";

export type NoteCluster =
  | "foundations"
  | "jpp"
  | "design"
  | "agentic"
  | "governance"
  | "capstone";

export type SourceClaim = {
  kind: ClaimKind;
  label: string;
  ref: string;
  quote?: string;
};

export type AtlasNote = {
  title: string;
  slug: string;
  cluster: NoteCluster;
  summary: string;
  jppStep?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  sourceClaims: SourceClaim[];
  agenticOverlay?: string;
  tags: string[];
  trailOrder?: number;
};

export type Trail = {
  id: string;
  title: string;
  description: string;
  startSlug: string;
};

export type NoteBodyProps = {
  note: AtlasNote;
  lensOn: boolean;
  openNote: (slug: string) => void;
};

export type NoteBodyComponent = ComponentType<NoteBodyProps>;
