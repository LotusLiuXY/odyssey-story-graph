import { PLOT_NODES, NODE_MAP, type GraphNode, type NodeKind } from "./data";

export interface PositionedNode {
  node: GraphNode;
  /** normalized canvas coords 0..1 */
  x: number;
  y: number;
  parentId?: string;
}

export interface Edge {
  from: { x: number; y: number };
  to: { x: number; y: number };
  kind: "route" | "branch";
  childKind?: NodeKind;
}

/**
 * Build the positioned node list + edges for the current expand/filter state.
 * Plot nodes always render along the backbone. Children of an expanded plot
 * node fan out on a ring around it, filtered by the active kinds.
 */
export function layoutGraph(
  expanded: Set<string>,
  activeKinds: Set<NodeKind>,
): { nodes: PositionedNode[]; edges: Edge[] } {
  const nodes: PositionedNode[] = [];
  const edges: Edge[] = [];

  // Plot backbone
  const plotPositions: Record<string, { x: number; y: number }> = {};
  for (const p of PLOT_NODES) {
    plotPositions[p.id] = { x: p.x ?? 0.5, y: p.y ?? 0.5 };
    nodes.push({ node: p, x: p.x ?? 0.5, y: p.y ?? 0.5 });
  }

  // Dashed homeward route between consecutive plot beats
  const ordered = [...PLOT_NODES].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  for (let i = 0; i < ordered.length - 1; i++) {
    edges.push({
      from: plotPositions[ordered[i].id],
      to: plotPositions[ordered[i + 1].id],
      kind: "route",
    });
  }

  // Expanded children
  for (const p of PLOT_NODES) {
    if (!expanded.has(p.id) || !p.children) continue;
    const visibleChildren = p.children
      .map((id) => NODE_MAP[id])
      .filter((c): c is GraphNode => !!c && activeKinds.has(c.kind));

    const center = plotPositions[p.id];
    const count = visibleChildren.length;
    const radiusX = 0.185;
    const radiusY = 0.13;
    // start angle offset so rings on the left/right of the S curve fan outward
    const startAngle = center.x < 0.5 ? -Math.PI * 0.5 : Math.PI * 0.5;
    visibleChildren.forEach((child, idx) => {
      const angle =
        startAngle + (idx - (count - 1) / 2) * (Math.PI / Math.max(count, 3));
      const cx = clamp(center.x + Math.cos(angle) * radiusX, 0.06, 0.94);
      const cy = clamp(center.y + Math.sin(angle) * radiusY, 0.05, 0.95);
      nodes.push({ node: child, x: cx, y: cy, parentId: p.id });
      edges.push({
        from: center,
        to: { x: cx, y: cy },
        kind: "branch",
        childKind: child.kind,
      });
    });
  }

  return { nodes, edges };
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}
