"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { GraphNode } from "@/lib/graph/data";
import { kindColor } from "@/lib/graph/kind";
import { KindGlyph } from "./kind-glyph";

interface NodeChipProps {
  node: GraphNode;
  isPlot: boolean;
  isExpanded?: boolean;
  isSelected?: boolean;
  onTap: () => void;
}

/**
 * A single graph node rendered as a hand-inked seal. Plot beats are larger
 * with a compass mark; child nodes are smaller, colour-coded by kind.
 */
export function NodeChip({
  node,
  isPlot,
  isExpanded,
  isSelected,
  onTap,
}: NodeChipProps) {
  const { t } = useTranslation();
  const color = kindColor(node.kind);

  return (
    <motion.button
      type="button"
      onClick={onTap}
      initial={isPlot ? false : { opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
      whileTap={{ scale: 0.92 }}
      data-el={isPlot ? "plot-node" : "child-node"}
      data-eazo-component="graph-node"
      className="pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 focus:outline-none"
      style={{ left: `${node.x! * 100}%`, top: `${node.y! * 100}%` }}
    >
      <span
        className="relative grid place-items-center rounded-full transition-shadow"
        style={{
          width: isPlot ? 62 : 42,
          height: isPlot ? 62 : 42,
          background: isPlot ? "var(--parchment-warm)" : "var(--parchment)",
          border: `2px solid ${isPlot ? "var(--ink)" : color}`,
          color: isPlot ? "var(--ink)" : color,
          boxShadow: isSelected
            ? `0 0 0 3px ${color}55, 0 8px 20px rgba(58,25,23,.3)`
            : "0 3px 0 rgba(100,54,49,.18)",
        }}
      >
        <KindGlyph
          kind={node.kind}
          className={isPlot ? "h-7 w-7" : "h-5 w-5"}
        />
        {isPlot && (
          <span
            className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold"
            style={{
              background: "var(--ink)",
              color: "var(--parchment-warm)",
            }}
          >
            {node.order}
          </span>
        )}
        {isPlot && (
          <span
            className="absolute -bottom-1 grid h-4 w-4 place-items-center rounded-full text-[11px] leading-none"
            style={{
              background: color,
              color: "var(--parchment-warm)",
            }}
          >
            {isExpanded ? "−" : "+"}
          </span>
        )}
      </span>
      <span
        className="max-w-[92px] text-center font-heading text-[11px] font-semibold leading-tight drop-shadow-[0_1px_0_rgba(239,224,188,.9)]"
        style={{ color: "var(--ink)" }}
      >
        {t(node.title)}
      </span>
    </motion.button>
  );
}
