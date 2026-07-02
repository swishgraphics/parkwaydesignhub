// ════════════════════════════════════════════════════════════════════
// Product registry — Parkway Projects ships three products on one hub.
// Switching a product swaps its logo, accent, nav directory, and content;
// the neutral light/dark chrome stays constant. Everything is static —
// no backend. Add a product = append an entry here.
//
// To brand a scaffolded product later: give it real `accent`, a `logo`
// (set hasLogo:true), and replace `scaffoldModules()` with real modules.
// ════════════════════════════════════════════════════════════════════

import { MODULES, buildItems, scaffoldModules } from "./nav.js";
import { COLOR_GROUPS } from "./tokens.js";
import { RC_BTN, RC_INPUT, RC_ACCENT_GROUPS } from "./readycash-tokens.js";
import { cssTokens, tailwindTokens, flutterTokens } from "./snippets/index.js";
import { rcCssTokens, rcTailwindTokens, rcFlutterTokens } from "./snippets/readycash-snippets.js";

// Neutral accent for products without finalised brand tokens yet.
export const NEUTRAL_ACCENT = { base: "#8A8A85", hover: "#75756F", soft: "#EFEFED", ink: "#52524C" };

const withItems = (p) => ({ ...p, items: buildItems(p.modules) });

export const PRODUCTS = [
  withItems({
    id: "parkway",
    name: "Parkway",
    tagline: "Design system",
    status: "live",
    accent: { base: "#F9956B", hover: "#FBBFA6", soft: "#FEF1EA", ink: "#C77756" },
    hasLogo: true,
    logo: { light: "/logos/logo-light.svg", dark: "/logos/logo-dark.svg", mark: "/logos/parkway-mark.svg" },
    lettermark: "P",
    modules: MODULES,
  }),
  withItems({
    id: "readycash",
    name: "ReadyCash",
    tagline: "Design system",
    status: "live",
    accent: { base: "#F9956B", hover: "#FBBFA6", soft: "#FEF1EA", ink: "#C77756" },
    hasLogo: true,
    logo: { light: "/logos/rc-logo-light.svg", dark: "/logos/rc-logo-dark.svg", mark: "/logos/parkway-mark.svg" },
    lettermark: "R",
    tokens: {
      colorGroups: [...COLOR_GROUPS, ...RC_ACCENT_GROUPS],
      btn: RC_BTN,
      input: RC_INPUT,
      colorsLead: "ReadyCash's palette is built around Atomic Tangerine as the primary, Rich Grey as the secondary, and Buff as the alternative. Click any swatch to copy its hex.",
      buttonsLead: "Rectangular or pill-shaped, in two variants (Primary, Secondary) across four sizes and three states. Primary actions use Atomic Tangerine; Secondary uses grey.",
      exportCode: { react: rcCssTokens, vue: rcCssTokens, flutter: rcFlutterTokens },
      exportLabel: { react: "readycash-tokens.css", vue: "readycash-tokens.css", flutter: "readycash_tokens.dart" },
      tailwindTokens: rcTailwindTokens,
    },
    modules: [
      {
        id: "get-started",
        label: "Get started",
        icon: "BookOpen",
        items: [
          { id: "introduction", label: "Introduction", page: "introduction", status: "building" },
          { id: "installation", label: "Installation", status: "soon" },
          { id: "usage", label: "Usage guidelines", status: "soon" },
        ],
      },
      {
        id: "components",
        label: "Components",
        icon: "SquaresFour",
        items: [
          { id: "buttons", label: "Buttons", page: "buttons", node: "350:702", status: "live", meta: "3×4×3" },
          {
            id: "inputs", label: "Inputs", status: "live",
            subItems: [
              { id: "inputs-text",     label: "Text Fields",             page: "inputs-text",     node: "350:9156",  status: "live" },
              { id: "inputs-dropdown", label: "Dropdown",                page: "inputs-dropdown", node: "350:9499",  status: "live" },
              { id: "inputs-pin-6",    label: "PIN Input — 6 Digits",    page: "inputs-pin-6",    node: "350:9953",  status: "live" },
              { id: "inputs-pin-4",    label: "PIN Input — 4 Digits",    page: "inputs-pin-4",    node: "350:9953",  status: "live" },
              { id: "inputs-contact",  label: "Contact Input",           page: "inputs-contact",  node: "350:10987", status: "live" },
              { id: "inputs-search",  label: "Search Bar",  page: "inputs-search",  node: "350:12586", status: "live" },
            ],
          },
          { id: "navigation", label: "Navigation", status: "soon" },
          { id: "inputs-datepicker", label: "Date Picker", page: "inputs-datepicker", node: "29639:419449", status: "live" },
          { id: "rc-toggle", label: "Toggle", page: "rc-toggle", node: "29767:419932", status: "live" },
          { id: "rc-toasts", label: "Toasts", page: "rc-toasts", node: "29629:419386", status: "live" },
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
            node: "350:28550",
            status: "live",
            count: 66,
            children: [
              { label: "Primary — Atomic Tangerine", count: 9 },
              { label: "Secondary — Rich Grey & White", count: 13 },
              { label: "Alternative — Buff", count: 9 },
              { label: "Messaging", count: 2 },
              { label: "Accent — Magenta", count: 11 },
              { label: "Accent — Green", count: 11 },
              { label: "Accent — Orange", count: 11 },
            ],
          },
          { id: "typography", label: "Typography", page: "typography", status: "live" },
          { id: "spacing",    label: "Spacing",    page: "spacing",    status: "live" },
          { id: "grid",       label: "Grid",       page: "grid",       status: "live" },
          { id: "shadows",    label: "Shadows",    page: "shadows",    status: "building" },
          { id: "icons",      label: "Icons",      page: "icons",      status: "building" },
        ],
      },
      {
        id: "resources",
        label: "Resources",
        icon: "FolderOpen",
        items: [
          { id: "logo", label: "Logo & brand", page: "logo", status: "live" },
          { id: "changelog", label: "Changelog", status: "soon" },
        ],
      },
    ],
  }),
  withItems({
    id: "swwwipe",
    name: "Swwwipe",
    tagline: "Coming soon",
    status: "soon",
    accent: NEUTRAL_ACCENT,
    hasLogo: false,
    lettermark: "S",
    modules: scaffoldModules(),
    blurb:
      "Swwwipe on the Parkway hub. Its colours, type, components, and logo populate here once finalised in Figma.",
  }),
];

export const DEFAULT_PRODUCT = "parkway";

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);

export const linkTo = (productId, pageId) => `#/${productId}/${pageId}`;

// Apply a product's accent hue to the live theme. Only the base + hover are
// set inline; the soft/ink derivatives stay theme-aware in the stylesheet so
// dark mode keeps a readable accent.
export function applyAccent(product) {
  const a = (product && product.accent) || NEUTRAL_ACCENT;
  const s = document.documentElement.style;
  s.setProperty("--pk-accent", a.base);
  s.setProperty("--pk-accent-hover", a.hover);
}
