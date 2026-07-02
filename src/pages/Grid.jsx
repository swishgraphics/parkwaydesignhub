import { FRAMEWORKS } from "../tokens.js";
import { Lead, SectionHeader, Tabs, CodeBlock } from "../components/primitives.jsx";

const FOUR  = [4, 8, 12, 16, 20, 24, 32, 40];
const EIGHT = [8, 16, 24, 32, 40, 48, 56, 64];

function Scale({ base, steps, accent, accentSoft }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {steps.map((v) => (
        <div key={v} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ font: "500 11px var(--pk-mono)", color: "var(--pk-text-muted)", width: 96, flex: "none" }}>
            {v / base}× · {v}px
          </span>
          <span style={{ height: 12, width: v * 4, maxWidth: "100%", borderRadius: 3, background: v >= base * 4 ? accent : accentSoft }} />
        </div>
      ))}
    </div>
  );
}

const pkCssGrid = `:root {
  /* Grid base units — every spacing value is a multiple of one of these */
  --pk-grid-4: 4px;   /* 4-pt: 4 8 12 16 20 24 32 40 — fine adjustments */
  --pk-grid-8: 8px;   /* 8-pt: 8 16 24 32 40 48 56 64 — layout default */
}

/* Derive any step as a multiple of the base */
.stack    { gap: calc(var(--pk-grid-8) * 3); }  /* 24px */
.icon-gap { gap: calc(var(--pk-grid-4) * 2); }  /* 8px  */`;

const rcCssGrid = `:root {
  /* Grid base units — every spacing value is a multiple of one of these */
  --rc-grid-4: 4px;   /* 4-pt: 4 8 12 16 20 24 32 40 — fine adjustments */
  --rc-grid-8: 8px;   /* 8-pt: 8 16 24 32 40 48 56 64 — layout default */
}

/* Derive any step as a multiple of the base */
.stack    { gap: calc(var(--rc-grid-8) * 3); }  /* 24px */
.icon-gap { gap: calc(var(--rc-grid-4) * 2); }  /* 8px  */`;

const pkDartGrid = `// parkway_grid.dart
abstract class PkGrid {
  static const double base4 = 4; // fine adjustments
  static const double base8 = 8; // layout default

  /// Snap any value to a multiple of the base unit.
  static double step(double base, int n) => base * n;
  // PkGrid.step(PkGrid.base8, 3) == 24
}`;

const rcDartGrid = `// readycash_grid.dart
abstract class RcGrid {
  static const double base4 = 4; // fine adjustments
  static const double base8 = 8; // layout default

  /// Snap any value to a multiple of the base unit.
  static double step(double base, int n) => base * n;
  // RcGrid.step(RcGrid.base8, 3) == 24
}`;

export default function Grid({ fw, setFw, product }) {
  const isRC   = product?.id === "readycash";
  const prefix = isRC ? "rc" : "pk";
  const cssGrid  = isRC ? rcCssGrid  : pkCssGrid;
  const dartGrid = isRC ? rcDartGrid : pkDartGrid;
  const cssLabel  = `${prefix}-grid.css (Vue & React)`;
  const dartLabel = `${prefix === "rc" ? "readycash" : "parkway"}_grid.dart`;

  return (
    <>
      <Lead>An 8-point grid for layout, 4-point for fine adjustments. Every spacing value is a multiple of its base — no off-grid values like 5, 13, or 18.</Lead>

      <SectionHeader label="8-point grid" desc="The layout default — section, card, and stack spacing. Matches the Spacing tokens." />
      <div className="ph-stage" style={{ marginTop: 6 }}>
        <Scale base={8} steps={EIGHT} accent="var(--pk-accent)" accentSoft="var(--pk-accent-hover)" />
      </div>

      <SectionHeader label="4-point grid" desc="Half-steps for tight spots — icon-to-label gaps, dense controls, optical nudges." />
      <div className="ph-stage" style={{ marginTop: 6 }}>
        <Scale base={4} steps={FOUR} accent="var(--pk-accent)" accentSoft="var(--pk-accent-soft)" />
      </div>

      <SectionHeader label="How values derive" desc="Pick a base (8 for layout, 4 for fine work), then multiply." />

      <SectionHeader label="Export grid" />
      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock
        code={fw === "flutter" ? dartGrid : cssGrid}
        label={fw === "flutter" ? dartLabel : cssLabel}
      />
    </>
  );
}
