"use client";

import { useTranslation } from "react-i18next";
import type { NodeKind } from "@/lib/graph/data";
import { kindColor } from "@/lib/graph/kind";
import { KindGlyph } from "./kind-glyph";

type FilterKind = NodeKind;

const CHILD_KINDS: FilterKind[] = ["character", "place", "theme"];

interface FilterStripProps {
  activeKinds: Set<NodeKind>;
  onChange: (kinds: Set<NodeKind>) => void;
}

/**
 * Top scrollable type filter. "All" toggles every child kind; individual chips
 * toggle a single kind. Plot beats are always shown.
 */
export function FilterStrip({ activeKinds, onChange }: FilterStripProps) {
  const { t } = useTranslation();
  const allOn = CHILD_KINDS.every((k) => activeKinds.has(k));

  const setAll = () => {
    const next = new Set<NodeKind>(["plot", ...CHILD_KINDS]);
    onChange(next);
  };

  const toggle = (k: FilterKind) => {
    const next = new Set(activeKinds);
    next.add("plot");
    if (next.has(k)) next.delete(k);
    else next.add(k);
    onChange(next);
  };

  return (
    <div
      className="no-scrollbar flex items-center gap-2 overflow-x-auto"
      data-el="filter-strip"
    >
      <Chip
        label={t("ui.filterAll")}
        active={allOn}
        color="var(--ink)"
        onClick={setAll}
      />
      {CHILD_KINDS.map((k) => (
        <Chip
          key={k}
          label={t(`ui.filter${cap(k)}`)}
          active={activeKinds.has(k)}
          color={kindColor(k)}
          glyph={<KindGlyph kind={k} className="h-3.5 w-3.5" />}
          onClick={() => toggle(k)}
        />
      ))}
    </div>
  );
}

function Chip({
  label,
  active,
  color,
  glyph,
  onClick,
}: {
  label: string;
  active: boolean;
  color: string;
  glyph?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-el={`filter-${label}`}
      className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 font-heading text-xs font-semibold transition-colors"
      style={{
        background: active ? color : "transparent",
        color: active ? "var(--parchment-warm)" : color,
        border: `1.5px solid ${color}`,
        opacity: active ? 1 : 0.7,
      }}
    >
      {glyph}
      {label}
    </button>
  );
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
