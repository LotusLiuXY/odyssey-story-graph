"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Info, Layers, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ALL_NODES, PLOT_NODES, type NodeKind } from "@/lib/graph/data";
import { GraphCanvas } from "@/components/graph/graph-canvas";
import { DetailDrawer } from "@/components/graph/detail-drawer";
import { FilterStrip } from "@/components/graph/filter-strip";
import { LangToggle } from "@/components/graph/lang-toggle";
import { ShareGraphButton } from "@/components/graph/share-graph-button";

const ALL_KINDS: NodeKind[] = ["plot", "character", "place", "theme"];

export default function Home() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["p1"]));
  const [activeKinds, setActiveKinds] = useState<Set<NodeKind>>(
    new Set(ALL_KINDS),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  const allExpanded = useMemo(
    () => PLOT_NODES.every((p) => expanded.has(p.id)),
    [expanded],
  );

  const togglePlot = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (allExpanded) setExpanded(new Set());
    else setExpanded(new Set(PLOT_NODES.map((p) => p.id)));
  };

  return (
    <main
      className="parchment-ground relative flex h-full w-full flex-col overflow-hidden"
      data-el="graph-screen"
    >
      {/* Header */}
      <header
        className="relative z-10 flex items-start justify-between gap-2 px-4 pb-2"
        style={{ paddingTop: "max(56px, env(safe-area-inset-top, 0px))" }}
        data-el="app-header"
      >
        <div className="min-w-0">
          <h1
            className="truncate font-heading text-lg font-bold leading-tight"
            style={{ color: "var(--ink)" }}
          >
            {t("ui.appTitle")}
          </h1>
          <p
            className="truncate text-xs italic"
            style={{ color: "var(--ink-soft)" }}
          >
            {t("ui.subtitle")}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => setAboutOpen(true)}
            data-el="about-button"
            aria-label={t("ui.aboutTitle")}
            className="grid h-9 w-9 place-items-center rounded-full border"
            style={{
              borderColor: "var(--ink)",
              color: "var(--ink)",
              background: "var(--parchment-warm)",
            }}
          >
            <Info className="h-4 w-4" />
          </button>
          <ShareGraphButton />
          <LangToggle />
        </div>
      </header>

      {/* Filter + expand controls */}
      <div className="relative z-10 flex items-center gap-2 px-4 pb-2">
        <div className="min-w-0 flex-1">
          <FilterStrip activeKinds={activeKinds} onChange={setActiveKinds} />
        </div>
        <button
          type="button"
          onClick={toggleAll}
          data-el="toggle-all"
          className="flex h-8 shrink-0 items-center gap-1 rounded-full border px-2.5 font-heading text-xs font-semibold"
          style={{
            borderColor: "var(--ink)",
            color: allExpanded ? "var(--parchment-warm)" : "var(--ink)",
            background: allExpanded ? "var(--ink)" : "var(--parchment-warm)",
          }}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>{allExpanded ? t("ui.collapseAll") : t("ui.expandAll")}</span>
        </button>
      </div>

      {/* Canvas */}
      <div className="relative min-h-0 flex-1">
        <GraphCanvas
          expanded={expanded}
          activeKinds={activeKinds}
          selectedId={selectedId}
          onTogglePlot={togglePlot}
          onSelect={setSelectedId}
        />

        {/* Tap hint */}
        {selectedId === null && (
          <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center px-4">
            <span
              className="rounded-full px-3 py-1.5 text-center text-xs font-medium shadow-[0_3px_0_rgba(100,54,49,.18)]"
              style={{
                background: "var(--parchment-warm)",
                color: "var(--ink-soft)",
                border: "1px solid var(--ink)",
              }}
            >
              {t("ui.tapHint")}
            </span>
          </div>
        )}

        <DetailDrawer
          nodeId={selectedId}
          onClose={() => setSelectedId(null)}
          onSelect={setSelectedId}
        />
      </div>

      {/* About sheet */}
      <AnimatePresence>
        {aboutOpen && (
          <>
            <motion.div
              className="absolute inset-0 z-40 bg-[rgba(58,25,23,0.3)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAboutOpen(false)}
            />
            <motion.div
              className="map-drawer absolute inset-x-0 bottom-0 z-50 rounded-t-[22px] px-5 pb-[max(28px,env(safe-area-inset-bottom,0px))] pt-4"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              data-el="about-sheet"
            >
              <div className="flex items-start justify-between">
                <h2
                  className="font-heading text-xl font-bold"
                  style={{ color: "var(--ink)" }}
                >
                  {t("ui.aboutTitle")}
                </h2>
                <button
                  type="button"
                  onClick={() => setAboutOpen(false)}
                  aria-label={t("common.close")}
                  className="grid h-8 w-8 place-items-center rounded-full text-[var(--ink)]/70 hover:bg-[var(--ink)]/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p
                className="mt-2 text-[15px] leading-relaxed"
                style={{ color: "var(--ink)" }}
              >
                {t("ui.aboutBody")}
              </p>
              <p className="mt-3 text-xs" style={{ color: "var(--ink-soft)" }}>
                {ALL_NODES.length} nodes · {PLOT_NODES.length} plot beats
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
