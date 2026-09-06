"use client";

import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { NODE_MAP, PLOT_NODES, type GraphNode } from "@/lib/graph/data";
import { kindColor, KIND_LABEL_KEY } from "@/lib/graph/kind";
import { KindGlyph } from "./kind-glyph";

interface DetailDrawerProps {
  nodeId: string | null;
  onClose: () => void;
  onSelect: (id: string) => void;
}

/** Aged-parchment bottom sheet showing a node's background, relations, quote. */
export function DetailDrawer({ nodeId, onClose, onSelect }: DetailDrawerProps) {
  const { t } = useTranslation();
  const node: GraphNode | undefined = nodeId ? NODE_MAP[nodeId] : undefined;
  const color = node ? kindColor(node.kind) : "var(--ink)";
  const plotIndex = node
    ? PLOT_NODES.findIndex((p) => p.id === node.id)
    : -1;

  return (
    <AnimatePresence>
      {node && (
        <>
          <motion.div
            className="absolute inset-0 z-20 bg-[rgba(58,25,23,0.28)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            data-el="drawer-scrim"
          />
          <motion.div
            className="map-drawer absolute inset-x-0 bottom-0 z-30 max-h-[72%] overflow-y-auto rounded-t-[22px] px-5 pb-[max(24px,env(safe-area-inset-bottom,0px))] pt-3"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            data-el="detail-drawer"
          >
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[var(--ink)]/30" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
                  style={{
                    border: `2px solid ${color}`,
                    color,
                    background: "var(--parchment)",
                  }}
                >
                  <KindGlyph kind={node.kind} className="h-6 w-6" />
                </span>
                <div>
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wide"
                    style={{ color }}
                  >
                    {t(KIND_LABEL_KEY[node.kind])}
                    {plotIndex >= 0 && ` · ${t("ui.beat", { n: plotIndex + 1 })}`}
                  </span>
                  <h2
                    className="font-heading text-xl font-bold leading-tight"
                    style={{ color: "var(--ink)" }}
                  >
                    {t(node.title)}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t("common.close")}
                data-el="drawer-close"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[var(--ink)]/70 hover:bg-[var(--ink)]/10"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <p
              className="mt-3 text-sm italic"
              style={{ color: "var(--ink-soft)" }}
            >
              {t(node.blurb)}
            </p>

            <Section title={t("ui.background")} color={color}>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "var(--ink)" }}
              >
                {t(node.detail)}
              </p>
            </Section>

            {node.relations && node.relations.length > 0 && (
              <Section title={t("ui.relations")} color={color}>
                <ul className="flex flex-col gap-1.5">
                  {node.relations.map((r, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "var(--ink)" }}
                    >
                      <span
                        className="rounded-full px-2 py-0.5 text-xs font-semibold"
                        style={{
                          background: `${"var(--ink)"}12`,
                          color: "var(--ink-soft)",
                        }}
                      >
                        {t(r.relation)}
                      </span>
                      <span className="font-heading font-semibold">
                        {t(r.label)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {node.quote && (
              <Section title={t("ui.quote")} color={color}>
                <blockquote
                  className="border-l-2 pl-3 font-heading text-[15px] italic leading-relaxed"
                  style={{ borderColor: color, color: "var(--ink-soft)" }}
                >
                  {t(node.quote)}
                </blockquote>
              </Section>
            )}

            {node.children && node.children.length > 0 && (
              <Section title={t("ui.relations")} color={color}>
                <div className="flex flex-wrap gap-2">
                  {node.children.map((cid) => {
                    const c = NODE_MAP[cid];
                    if (!c) return null;
                    const cc = kindColor(c.kind);
                    return (
                      <button
                        key={cid}
                        type="button"
                        onClick={() => onSelect(cid)}
                        data-el="drawer-child-link"
                        className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                        style={{ border: `1.5px solid ${cc}`, color: cc }}
                      >
                        <KindGlyph kind={c.kind} className="h-3.5 w-3.5" />
                        {t(c.title)}
                      </button>
                    );
                  })}
                </div>
              </Section>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <h3
        className="mb-1.5 font-heading text-xs font-bold uppercase tracking-wider"
        style={{ color }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
