// ════════════════════════════════════════════════════════════════════
// Navigation directory registry (data-driven).
// Add a component later = append an item here + a page module + one line
// in the PAGES registry (ParkwayHub.jsx). Statuses:
//   live      — already built
//   building  — shipped in this redesign
//   soon      — placeholder row → "Coming soon" page
// ════════════════════════════════════════════════════════════════════

import { FIGMA_FILE } from "./tokens.js";

// Parkway Wallet components live in a separate Figma file.
const WALLET_FILE = "https://www.figma.com/design/S0VLTiTi39BsU5sYq0FUyq/ParkwayWallet";
const wfig = (node) => `${WALLET_FILE}?node-id=${node}&m=dev`;

export const MODULES = [
  {
    id: "get-started",
    label: "Get started",
    icon: "BookOpen",
    items: [
      { id: "introduction", label: "Introduction", page: "introduction", status: "building" },
      { id: "installation", label: "Installation", page: "installation", status: "building" },
      { id: "usage", label: "Usage guidelines", page: "usage", status: "building" },
    ],
  },
  {
    id: "components",
    label: "Components",
    icon: "SquaresFour",
    items: [
      { id: "buttons", label: "Buttons", page: "buttons", node: "95:97", status: "live", meta: "2×5×3" },
      { id: "textinput", label: "Text Input", page: "textinput", figma: wfig("31764-10117"), status: "building" },
      { id: "toast", label: "Toast Message", page: "toast", figma: wfig("31766-10180"), status: "building" },
      { id: "badges", label: "Badges", page: "badges", figma: wfig("31766-13029"), status: "building" },
      { id: "toggle", label: "Toggle button", page: "toggle", figma: wfig("31766-13046"), status: "building" },
      { id: "checkbox", label: "Checkbox", page: "checkbox", figma: wfig("31767-13062"), status: "building" },
      { id: "marquee",            label: "Marquee",             page: "marquee",            figma: wfig("31774-13261"), status: "building" },
      { id: "transaction-status", label: "Transaction Status",  page: "transaction-status", figma: wfig("31774-13288"), status: "building" },
      { id: "tabs-toggle",        label: "Tabs Toggle",         page: "tabs-toggle",        figma: wfig("31774-13298"), status: "building" },
      { id: "date-picker",        label: "Date Picker",         page: "date-picker",        figma: wfig("31774-13316"), status: "building" },
      { id: "radio",              label: "Radio Button",        page: "radio",              figma: wfig("31827-38240"), status: "building" },
    ],
  },
  {
    id: "foundations",
    label: "Foundations",
    icon: "Swatches",
    items: [
      {
        id: "colors",
        label: "Colors / Tokens",
        page: "colors",
        node: "87:32",
        status: "live",
        count: 33,
        children: [
          { label: "Primary — Atomic Tangerine", count: 9, anchor: "tangerine" },
          { label: "Secondary — Rich Grey & White", count: 13, anchor: "grey" },
          { label: "Alternative — Buff", count: 9, anchor: "buff" },
          { label: "Messaging", count: 2, anchor: "messaging" },
        ],
      },
      { id: "typography", label: "Typography", page: "typography", node: "88:140", status: "live" },
      { id: "spacing", label: "Spacing", page: "spacing", node: "95:75", status: "live", count: 8 },
      { id: "grid", label: "Grid", page: "grid", status: "building", meta: "4 · 8 pt" },
      { id: "shadows", label: "Shadows", page: "shadows", status: "building", count: 3 },
      { id: "icons", label: "Icons", page: "icons", status: "building", meta: "Phosphor" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    icon: "FolderOpen",
    items: [
      { id: "logo", label: "Logo & brand", page: "logo", node: "86:4", status: "building" },
      { id: "figma", label: "Figma file", href: FIGMA_FILE, external: true },
      { id: "changelog", label: "Changelog", status: "soon" },
    ],
  },
];

export const DEFAULT_PAGE = "introduction";

// Flat lookup for a module set: item id -> { ...item, module } (external excluded).
// Also indexes subItems so hash-routed sub-pages resolve correctly.
export function buildItems(modules) {
  const map = {};
  modules.forEach((m) =>
    m.items.forEach((it) => {
      if (!it.external) {
        map[it.id] = { ...it, module: m.label };
        it.subItems?.forEach((sub) => {
          if (!sub.external) map[sub.id] = { ...sub, module: m.label, parentId: it.id };
        });
      }
    })
  );
  return map;
}

// First navigable item in a module (for rail clicks)
export function firstItemId(modules, moduleId) {
  const m = modules.find((x) => x.id === moduleId);
  const hit = m?.items.find((it) => !it.external);
  return hit ? hit.id : DEFAULT_PAGE;
}

// Which rail module owns a given item id (for active rail highlight)
export function moduleOf(modules, itemId) {
  return modules.find((m) =>
    m.items.some((it) => it.id === itemId || it.subItems?.some((s) => s.id === itemId))
  )?.id;
}

// Scaffold nav for not-yet-branded products: the same module structure and
// item labels as Parkway, but every item is a "soon" placeholder except a
// coming-soon Introduction. Keeps the directory looking real before tokens exist.
export function scaffoldModules() {
  return MODULES.map((m) => ({
    id: m.id,
    label: m.label,
    icon: m.icon,
    items: m.items.map((it) =>
      it.id === "introduction"
        ? { id: "introduction", label: "Introduction", page: "product-soon", status: "building" }
        : { id: it.id, label: it.label, status: "soon" }
    ),
  }));
}
