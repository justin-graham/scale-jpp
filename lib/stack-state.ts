export function parseStack(value: string | null | undefined) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function buildStack(columns: string[], columnIndex: number, nextSlug: string) {
  const kept = columns.slice(0, columnIndex + 1);
  if (kept[kept.length - 1] !== nextSlug) {
    kept.push(nextSlug);
  }
  return kept;
}

export function nextStackQuery(columns: string[]) {
  return columns.slice(1).join(",");
}

export function lensIsOn(value: string | null | undefined) {
  return value === "on";
}

export function withBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
