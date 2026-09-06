"use client";

import { create } from "zustand";
import type { NodeKind } from "@/lib/graph/data";

interface GraphState {
  expanded: Set<string>;
  activeKinds: Set<NodeKind>;
  selectedId: string | null;
  toggleExpand: (id: string) => void;
  expandAll: (ids: string[]) => void;
  collapseAll: () => void;
  setActiveKinds: (kinds: Set<NodeKind>) => void;
  select: (id: string | null) => void;
}

const ALL_KINDS: NodeKind[] = ["plot", "character", "place", "theme"];

export const useGraphStore = create<GraphState>((set) => ({
  expanded: new Set<string>(["p1"]),
  activeKinds: new Set<NodeKind>(ALL_KINDS),
  selectedId: null,
  toggleExpand: (id) =>
    set((s) => {
      const next = new Set(s.expanded);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { expanded: next };
    }),
  expandAll: (ids) => set({ expanded: new Set(ids) }),
  collapseAll: () => set({ expanded: new Set<string>() }),
  setActiveKinds: (kinds) => set({ activeKinds: kinds }),
  select: (id) => set({ selectedId: id }),
}));
