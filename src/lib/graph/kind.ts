import type { NodeKind } from "@/lib/graph/data";

/** Color + soft glow per node kind, driven by CSS variables in globals.css. */
export function kindColor(kind: NodeKind): string {
  switch (kind) {
    case "character":
      return "var(--seal-person)";
    case "place":
      return "var(--seal-place)";
    case "theme":
      return "var(--seal-theme)";
    default:
      return "var(--ink)";
  }
}

export const KIND_LABEL_KEY: Record<NodeKind, string> = {
  plot: "ui.kindPlot",
  character: "ui.kindCharacter",
  place: "ui.kindPlace",
  theme: "ui.kindTheme",
};
