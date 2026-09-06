// The Odyssey story graph dataset — the plot backbone plus the characters,
// places, and themes attached to each plot beat. This is static content, not
// user data. Copy is intentionally rendered through i18n keys in the UI.

export type NodeKind = "plot" | "character" | "place" | "theme";

export interface Relation {
  /** i18n key for the related entity's short label */
  label: string;
  /** i18n key for how they relate, e.g. "夫妻 / spouse" */
  relation: string;
}

export interface GraphNode {
  id: string;
  kind: NodeKind;
  /** i18n key */
  title: string;
  /** i18n key — one-line summary */
  blurb: string;
  /** i18n key — a longer paragraph of background / detail */
  detail: string;
  /** i18n key — an original-text highlight or memorable moment */
  quote?: string;
  relations?: Relation[];
  /** plot ordering along the homeward route (plot nodes only) */
  order?: number;
  /** normalized canvas position 0..1 for plot backbone */
  x?: number;
  y?: number;
  /** child node ids attached to a plot node */
  children?: string[];
}

export const KIND_META: Record<
  Exclude<NodeKind, "plot">,
  { colorVar: string; icon: string }
> = {
  character: { colorVar: "var(--seal-person)", icon: "seal" },
  place: { colorVar: "var(--seal-place)", icon: "island" },
  theme: { colorVar: "var(--seal-theme)", icon: "rune" },
};

/** The five-beat homeward backbone, laid along a hand-inked S curve. */
export const PLOT_NODES: GraphNode[] = [
  {
    id: "p1",
    kind: "plot",
    order: 1,
    x: 0.2,
    y: 0.16,
    title: "graph.p1.title",
    blurb: "graph.p1.blurb",
    detail: "graph.p1.detail",
    quote: "graph.p1.quote",
    children: ["c_odysseus", "c_athena", "pl_troy", "th_nostos"],
  },
  {
    id: "p2",
    kind: "plot",
    order: 2,
    x: 0.72,
    y: 0.33,
    title: "graph.p2.title",
    blurb: "graph.p2.blurb",
    detail: "graph.p2.detail",
    quote: "graph.p2.quote",
    children: [
      "c_polyphemus",
      "c_poseidon",
      "c_circe",
      "pl_cyclops",
      "pl_underworld",
      "th_hubris",
      "th_cunning",
    ],
  },
  {
    id: "p3",
    kind: "plot",
    order: 3,
    x: 0.24,
    y: 0.52,
    title: "graph.p3.title",
    blurb: "graph.p3.blurb",
    detail: "graph.p3.detail",
    quote: "graph.p3.quote",
    children: ["c_calypso", "c_hermes", "pl_ogygia", "th_temptation"],
  },
  {
    id: "p4",
    kind: "plot",
    order: 4,
    x: 0.74,
    y: 0.68,
    title: "graph.p4.title",
    blurb: "graph.p4.blurb",
    detail: "graph.p4.detail",
    quote: "graph.p4.quote",
    children: ["c_nausicaa", "c_alcinous", "pl_scheria", "th_hospitality"],
  },
  {
    id: "p5",
    kind: "plot",
    order: 5,
    x: 0.3,
    y: 0.86,
    title: "graph.p5.title",
    blurb: "graph.p5.blurb",
    detail: "graph.p5.detail",
    quote: "graph.p5.quote",
    children: [
      "c_penelope",
      "c_telemachus",
      "c_eurycleia",
      "c_antinous",
      "pl_ithaca",
      "th_loyalty",
      "th_identity",
    ],
  },
];

export const CHILD_NODES: GraphNode[] = [
  // ── Characters ──────────────────────────────────────────────
  {
    id: "c_odysseus",
    kind: "character",
    title: "graph.c_odysseus.title",
    blurb: "graph.c_odysseus.blurb",
    detail: "graph.c_odysseus.detail",
    quote: "graph.c_odysseus.quote",
    relations: [
      { label: "graph.c_penelope.title", relation: "rel.spouse" },
      { label: "graph.c_telemachus.title", relation: "rel.father" },
      { label: "graph.c_athena.title", relation: "rel.patron" },
      { label: "graph.c_poseidon.title", relation: "rel.enemy" },
    ],
  },
  {
    id: "c_penelope",
    kind: "character",
    title: "graph.c_penelope.title",
    blurb: "graph.c_penelope.blurb",
    detail: "graph.c_penelope.detail",
    quote: "graph.c_penelope.quote",
    relations: [
      { label: "graph.c_odysseus.title", relation: "rel.spouse" },
      { label: "graph.c_telemachus.title", relation: "rel.mother" },
      { label: "graph.c_antinous.title", relation: "rel.besieged" },
    ],
  },
  {
    id: "c_telemachus",
    kind: "character",
    title: "graph.c_telemachus.title",
    blurb: "graph.c_telemachus.blurb",
    detail: "graph.c_telemachus.detail",
    relations: [
      { label: "graph.c_odysseus.title", relation: "rel.son" },
      { label: "graph.c_penelope.title", relation: "rel.son" },
      { label: "graph.c_athena.title", relation: "rel.guided" },
    ],
  },
  {
    id: "c_athena",
    kind: "character",
    title: "graph.c_athena.title",
    blurb: "graph.c_athena.blurb",
    detail: "graph.c_athena.detail",
    quote: "graph.c_athena.quote",
    relations: [
      { label: "graph.c_odysseus.title", relation: "rel.protects" },
      { label: "graph.c_telemachus.title", relation: "rel.guides" },
    ],
  },
  {
    id: "c_poseidon",
    kind: "character",
    title: "graph.c_poseidon.title",
    blurb: "graph.c_poseidon.blurb",
    detail: "graph.c_poseidon.detail",
    quote: "graph.c_poseidon.quote",
    relations: [
      { label: "graph.c_odysseus.title", relation: "rel.enemy" },
      { label: "graph.c_polyphemus.title", relation: "rel.father" },
    ],
  },
  {
    id: "c_polyphemus",
    kind: "character",
    title: "graph.c_polyphemus.title",
    blurb: "graph.c_polyphemus.blurb",
    detail: "graph.c_polyphemus.detail",
    quote: "graph.c_polyphemus.quote",
    relations: [
      { label: "graph.c_poseidon.title", relation: "rel.son" },
      { label: "graph.c_odysseus.title", relation: "rel.blinded_by" },
    ],
  },
  {
    id: "c_circe",
    kind: "character",
    title: "graph.c_circe.title",
    blurb: "graph.c_circe.blurb",
    detail: "graph.c_circe.detail",
    relations: [
      { label: "graph.c_odysseus.title", relation: "rel.lover" },
    ],
  },
  {
    id: "c_calypso",
    kind: "character",
    title: "graph.c_calypso.title",
    blurb: "graph.c_calypso.blurb",
    detail: "graph.c_calypso.detail",
    quote: "graph.c_calypso.quote",
    relations: [
      { label: "graph.c_odysseus.title", relation: "rel.captor" },
      { label: "graph.c_hermes.title", relation: "rel.ordered_by" },
    ],
  },
  {
    id: "c_hermes",
    kind: "character",
    title: "graph.c_hermes.title",
    blurb: "graph.c_hermes.blurb",
    detail: "graph.c_hermes.detail",
    relations: [
      { label: "graph.c_calypso.title", relation: "rel.messenger" },
    ],
  },
  {
    id: "c_nausicaa",
    kind: "character",
    title: "graph.c_nausicaa.title",
    blurb: "graph.c_nausicaa.blurb",
    detail: "graph.c_nausicaa.detail",
    relations: [
      { label: "graph.c_alcinous.title", relation: "rel.daughter" },
      { label: "graph.c_odysseus.title", relation: "rel.helps" },
    ],
  },
  {
    id: "c_alcinous",
    kind: "character",
    title: "graph.c_alcinous.title",
    blurb: "graph.c_alcinous.blurb",
    detail: "graph.c_alcinous.detail",
    relations: [
      { label: "graph.c_nausicaa.title", relation: "rel.father" },
      { label: "graph.c_odysseus.title", relation: "rel.host" },
    ],
  },
  {
    id: "c_eurycleia",
    kind: "character",
    title: "graph.c_eurycleia.title",
    blurb: "graph.c_eurycleia.blurb",
    detail: "graph.c_eurycleia.detail",
    quote: "graph.c_eurycleia.quote",
    relations: [
      { label: "graph.c_odysseus.title", relation: "rel.nurse" },
    ],
  },
  {
    id: "c_antinous",
    kind: "character",
    title: "graph.c_antinous.title",
    blurb: "graph.c_antinous.blurb",
    detail: "graph.c_antinous.detail",
    relations: [
      { label: "graph.c_penelope.title", relation: "rel.suitor" },
      { label: "graph.c_odysseus.title", relation: "rel.slain_by" },
    ],
  },

  // ── Places ──────────────────────────────────────────────────
  {
    id: "pl_troy",
    kind: "place",
    title: "graph.pl_troy.title",
    blurb: "graph.pl_troy.blurb",
    detail: "graph.pl_troy.detail",
  },
  {
    id: "pl_cyclops",
    kind: "place",
    title: "graph.pl_cyclops.title",
    blurb: "graph.pl_cyclops.blurb",
    detail: "graph.pl_cyclops.detail",
  },
  {
    id: "pl_underworld",
    kind: "place",
    title: "graph.pl_underworld.title",
    blurb: "graph.pl_underworld.blurb",
    detail: "graph.pl_underworld.detail",
  },
  {
    id: "pl_ogygia",
    kind: "place",
    title: "graph.pl_ogygia.title",
    blurb: "graph.pl_ogygia.blurb",
    detail: "graph.pl_ogygia.detail",
  },
  {
    id: "pl_scheria",
    kind: "place",
    title: "graph.pl_scheria.title",
    blurb: "graph.pl_scheria.blurb",
    detail: "graph.pl_scheria.detail",
  },
  {
    id: "pl_ithaca",
    kind: "place",
    title: "graph.pl_ithaca.title",
    blurb: "graph.pl_ithaca.blurb",
    detail: "graph.pl_ithaca.detail",
  },

  // ── Themes ──────────────────────────────────────────────────
  {
    id: "th_nostos",
    kind: "theme",
    title: "graph.th_nostos.title",
    blurb: "graph.th_nostos.blurb",
    detail: "graph.th_nostos.detail",
  },
  {
    id: "th_hubris",
    kind: "theme",
    title: "graph.th_hubris.title",
    blurb: "graph.th_hubris.blurb",
    detail: "graph.th_hubris.detail",
  },
  {
    id: "th_cunning",
    kind: "theme",
    title: "graph.th_cunning.title",
    blurb: "graph.th_cunning.blurb",
    detail: "graph.th_cunning.detail",
  },
  {
    id: "th_temptation",
    kind: "theme",
    title: "graph.th_temptation.title",
    blurb: "graph.th_temptation.blurb",
    detail: "graph.th_temptation.detail",
  },
  {
    id: "th_hospitality",
    kind: "theme",
    title: "graph.th_hospitality.title",
    blurb: "graph.th_hospitality.blurb",
    detail: "graph.th_hospitality.detail",
  },
  {
    id: "th_loyalty",
    kind: "theme",
    title: "graph.th_loyalty.title",
    blurb: "graph.th_loyalty.blurb",
    detail: "graph.th_loyalty.detail",
  },
  {
    id: "th_identity",
    kind: "theme",
    title: "graph.th_identity.title",
    blurb: "graph.th_identity.blurb",
    detail: "graph.th_identity.detail",
  },
];

export const ALL_NODES: GraphNode[] = [...PLOT_NODES, ...CHILD_NODES];
export const NODE_MAP: Record<string, GraphNode> = Object.fromEntries(
  ALL_NODES.map((n) => [n.id, n]),
);

export const BG_IMAGE_URL =
  "https://cdn.eazo.ai/user-contents/design-variant-images/976116a36b0341bea8366d2e3a0c83fa.png";
