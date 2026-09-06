"use client";

import { useRef, useState, useCallback, type PointerEvent } from "react";
import { AnimatePresence } from "framer-motion";
import type { NodeKind } from "@/lib/graph/data";
import { PLOT_NODES } from "@/lib/graph/data";
import { layoutGraph, type Edge } from "@/lib/graph/layout";
import { kindColor } from "@/lib/graph/kind";
import { NodeChip } from "./node-chip";
import { BG_IMAGE_URL } from "@/lib/graph/data";

interface CanvasProps {
  expanded: Set<string>;
  activeKinds: Set<NodeKind>;
  selectedId: string | null;
  onTogglePlot: (id: string) => void;
  onSelect: (id: string) => void;
}

interface View {
  scale: number;
  tx: number;
  ty: number;
}

const MIN_SCALE = 0.55;
const MAX_SCALE = 2.4;

export function GraphCanvas({
  expanded,
  activeKinds,
  selectedId,
  onTogglePlot,
  onSelect,
}: CanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>({ scale: 1, tx: 0, ty: 0 });
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{
    x: number;
    y: number;
    tx: number;
    ty: number;
    moved: boolean;
  } | null>(null);
  const pinch = useRef<{ dist: number; scale: number } | null>(null);

  const { nodes, edges } = layoutGraph(expanded, activeKinds);
  const plotIds = new Set(PLOT_NODES.map((p) => p.id));

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      tx: view.tx,
      ty: view.ty,
      moved: false,
    };
    setDragging(true);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) drag.current.moved = true;
    setView((v) => ({ ...v, tx: drag.current!.tx + dx, ty: drag.current!.ty + dy }));
  };

  const onPointerUp = () => {
    drag.current = null;
    setDragging(false);
  };

  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    setView((v) => {
      const next = clamp(v.scale - e.deltaY * 0.0012, MIN_SCALE, MAX_SCALE);
      return { ...v, scale: next };
    });
  }, []);

  // basic two-finger pinch
  const touchDist = (e: React.TouchEvent) => {
    const [a, b] = [e.touches[0], e.touches[1]];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  };
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      pinch.current = { dist: touchDist(e), scale: view.scale };
    }
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && pinch.current) {
      const ratio = touchDist(e) / pinch.current.dist;
      setView((v) => ({
        ...v,
        scale: clamp(pinch.current!.scale * ratio, MIN_SCALE, MAX_SCALE),
      }));
    }
  };
  const onTouchEnd = () => {
    pinch.current = null;
  };

  return (
    <div
      ref={wrapRef}
      className="parchment-ground relative h-full w-full touch-none overflow-hidden"
      data-el="graph-canvas"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* aged map imagery + fibre overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-35 mix-blend-multiply"
        style={{
          backgroundImage: `url(${BG_IMAGE_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="parchment-fiber pointer-events-none absolute inset-0 opacity-70" />

      <div
        className="absolute left-0 top-0 h-full w-full origin-center"
        style={{
          transform: `translate(${view.tx}px, ${view.ty}px) scale(${view.scale})`,
          transition: dragging ? "none" : "transform 0.12s ease-out",
        }}
      >
        <EdgeLayer edges={edges} />
        <AnimatePresence>
          {nodes.map(({ node }) => {
            const isPlot = plotIds.has(node.id);
            return (
              <NodeChip
                key={node.id}
                node={node}
                isPlot={isPlot}
                isExpanded={expanded.has(node.id)}
                isSelected={selectedId === node.id}
                onTap={() => {
                  if (drag.current?.moved) return;
                  if (isPlot) {
                    onTogglePlot(node.id);
                    onSelect(node.id);
                  } else {
                    onSelect(node.id);
                  }
                }}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function EdgeLayer({ edges }: { edges: Edge[] }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {edges.map((e, i) => {
        const isRoute = e.kind === "route";
        const color = isRoute
          ? "var(--ink)"
          : e.childKind
            ? kindColor(e.childKind)
            : "var(--ink-soft)";
        // gentle curve
        const mx = (e.from.x + e.to.x) / 2;
        const my = (e.from.y + e.to.y) / 2 - (isRoute ? 6 : 1.5);
        return (
          <path
            key={i}
            d={`M ${e.from.x * 100} ${e.from.y * 100} Q ${mx * 100} ${my * 100} ${e.to.x * 100} ${e.to.y * 100}`}
            fill="none"
            stroke={color}
            strokeWidth={isRoute ? 0.7 : 0.4}
            strokeDasharray={isRoute ? "1.4 2.2" : "0.7 1.4"}
            strokeLinecap="round"
            opacity={isRoute ? 0.85 : 0.6}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}
