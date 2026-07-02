import { useState } from "react";
import { COLOR_GROUPS, FRAMEWORKS } from "../tokens.js";
import { copyText } from "../lib/copy.js";
import { Lead, SectionHeader, Tabs, CodeBlock } from "../components/primitives.jsx";
import { cssTokens, tailwindTokens, flutterTokens } from "../snippets/index.js";

const PARKWAY_NEAR_WHITE = new Set(["#FFFFFF", "#FBFBFB", "#FCF8E8", "#FEEAE1", "#FAF1D2"]);

function isNearWhite(hex) {
  if (PARKWAY_NEAR_WHITE.has(hex)) return true;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r > 230 && g > 230 && b > 230;
}

function Swatch({ name, hex, note, prefix }) {
  const [ok, setOk] = useState(false);
  return (
    <button type="button" onClick={() => copyText(hex, setOk)} title="Click to copy hex" className="ph-swatch">
      <span
        className="ph-swatchchip"
        style={{ background: hex, boxShadow: isNearWhite(hex) ? "inset 0 0 0 1px var(--pk-line)" : "none" }}
        aria-hidden="true"
      />
      <span className="ph-swatchname">{prefix}{name}</span>
      <span className={`ph-swatchmeta${ok ? " ok" : ""}`} aria-live="polite">
        {ok ? "Copied" : `${hex} · ${note}`}
      </span>
    </button>
  );
}

export default function Colors({ fw, setFw, product }) {
  const t = product?.tokens;
  const colorGroups  = t?.colorGroups  || COLOR_GROUPS;
  const exportCode   = t?.exportCode   || { react: cssTokens, vue: cssTokens, flutter: flutterTokens };
  const exportLabel  = t?.exportLabel  || { react: "parkway-tokens.css", vue: "parkway-tokens.css", flutter: "parkway_tokens.dart" };
  const twTokens     = t?.tailwindTokens || tailwindTokens;
  const lead         = t?.colorsLead   || "Parkway's palette is built around Atomic Tangerine as the primary, Rich Grey as the secondary, and Buff as the alternative. Click any swatch to copy its hex.";
  const prefix       = t ? "--rc-" : "--pk-";

  return (
    <>
      <Lead>{lead}</Lead>

      {colorGroups.map(([key, label, items]) => (
        <section key={key} id={`pk-color-${key}`} style={{ scrollMarginTop: 88 }}>
          <SectionHeader label={label} />
          <div className="ph-swatchgrid">
            {items.map(([n, h, note]) => (
              <Swatch key={n} name={n} hex={h} note={note} prefix={prefix} />
            ))}
          </div>
        </section>
      ))}

      <SectionHeader label="Export tokens" />
      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock code={exportCode[fw]} label={exportLabel[fw]} />
      {fw !== "flutter" && (
        <>
          <p className="ph-note">Using Tailwind? The same palette as a config extension:</p>
          <CodeBlock code={twTokens} label="tailwind.config.js" />
        </>
      )}
    </>
  );
}
