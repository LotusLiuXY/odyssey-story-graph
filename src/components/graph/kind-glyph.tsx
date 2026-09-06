import type { NodeKind } from "@/lib/graph/data";

/**
 * Hand-inked seal / island / rune glyphs for each node kind. Rendered inside
 * a node chip; `className` controls sizing and stroke color inherits.
 */
export function KindGlyph({
  kind,
  className,
}: {
  kind: NodeKind;
  className?: string;
}) {
  switch (kind) {
    case "character":
      // Wax seal — a star sigil in a ring
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle
            cx="12"
            cy="12"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M12 6.5l1.7 3.4 3.8.5-2.8 2.6.7 3.7L12 15l-3.4 1.9.7-3.7-2.8-2.6 3.8-.5z"
            fill="currentColor"
          />
        </svg>
      );
    case "place":
      // Little island with a peak
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            d="M4 17c2-.6 3-1.6 4-1.6s1.6 1 4 1 3-1 4-1 2 1 4 1.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M8.5 15.5L12 6l3.5 9.5z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
      );
    case "theme":
      // Rune mark
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            d="M12 4v16M12 8l5-3M12 13l5 3M12 11L7 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      // Plot beat — compass rose
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle
            cx="12"
            cy="12"
            r="8.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path d="M12 3.5l2.4 8.5-2.4 8.5-2.4-8.5z" fill="currentColor" />
          <path
            d="M3.5 12l8.5-2.4 8.5 2.4-8.5 2.4z"
            fill="currentColor"
            opacity="0.55"
          />
        </svg>
      );
  }
}
