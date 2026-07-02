import { useState } from "react";
import { TYPE_DESKTOP, TYPE_MOBILE, FRAMEWORKS } from "../tokens.js";
import { Lead, SectionHeader, Tabs, CodeBlock } from "../components/primitives.jsx";
import { DownloadSimple } from "../iconography/index.js";
import { typoCssDesktop, typoFlutter } from "../snippets/index.js";

const SAMPLE = "The Future of African Banking & Financial Services.";
const BODY_SAMPLE =
  "Shorten route-to-market for innovators with a suite of everything they need to launch and grow.";

function specimenStyle([, face, size, lh, ls, upper], cap = 56) {
  const gothic = face.includes("Gothic");
  return {
    margin: 0,
    fontFamily: gothic ? "'PP Right Gothic', sans-serif" : "'Manrope', sans-serif",
    fontWeight: face.includes("Bold") && !face.includes("Semi") ? 700 : face.includes("SemiBold") ? 600 : gothic ? 500 : 400,
    fontSize: Math.min(size, cap),
    lineHeight: parseFloat(lh) / 100,
    letterSpacing: ls,
    textTransform: upper ? "uppercase" : "none",
    overflowWrap: "break-word",
  };
}

function Ramp({ rows, body }) {
  return (
    <div className="ph-ramp">
      {rows.map((r) => (
        <div key={r[0]} className="ph-rampitem" style={{ cursor: "default" }}>
          <span className="ph-rampmeta">
            {r[0]} · {r[2]}pt · {r[3]}{r[4] ? ` · ${r[4]}px` : ""} · {r[1]}
          </span>
          <span style={{ ...specimenStyle(r), color: r[0].startsWith("P") ? "var(--pk-text-2)" : "var(--pk-text)" }}>
            {r[0].startsWith("P") ? body : SAMPLE}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Typography({ fw, setFw, product }) {
  const [device, setDevice] = useState("desktop");
  const ramp = device === "desktop" ? TYPE_DESKTOP : TYPE_MOBILE;
  const isRC = product?.id === "readycash";
  const cssLabel = isRC ? "readycash-type.css (Vue & React)" : "parkway-type.css (Vue & React)";
  const dartLabel = isRC ? "readycash_text_theme.dart" : "parkway_text_theme.dart";
  return (
    <>
      <Lead>
        {isRC
          ? "Display headings are set in PP Right Gothic Wide Medium; H5/H6 and all paragraph styles use Manrope. These specimens render in the real PP Right Gothic — bundled with the hub."
          : "Display headings are set in PP Right Gothic Wide Medium; H5/H6 and all paragraph styles use Manrope. These specimens render in the real PP Right Gothic — bundled with the hub."}
      </Lead>

      <SectionHeader label="Typeface" desc="PP Right Gothic Wide — the licensed display face, bundled with the hub. Download it to install on your system." />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap", borderTop: "1px solid var(--pk-line-soft)", padding: "16px 2px" }}>
        <div>
          <div className="ph-rowlabel" style={{ fontSize: 14 }}>PP Right Gothic Wide</div>
          <div style={{ font: "400 12px var(--pk-sans)", color: "var(--pk-text-muted)", marginTop: 2 }}>Variable &amp; OpenType · all weights</div>
        </div>
        <div className="ph-dlrow">
          <a className="ph-dlbtn" href="/fonts/Right%20Gothic%20Wide/variable/PP%20Right%20Gothic%20Wide%20Variable.ttf" download="PP Right Gothic Wide Variable.ttf">
            <DownloadSimple size={13} weight="bold" /> Download font
          </a>
          <a className="ph-dlbtn" href="/fonts/Right%20Gothic%20Wide/otf/PPRightGothic-WideMedium.otf" download="PPRightGothic-WideMedium.otf">
            <DownloadSimple size={13} weight="bold" /> .otf
          </a>
        </div>
      </div>

      <SectionHeader label="Ramp" desc="Switch between the desktop and mobile scales." />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
        <Tabs value={device} onChange={setDevice} label="Device ramp" items={[["desktop", "Desktop"], ["mobile", "Mobile"]]} />
        <span style={{ font: "500 11px var(--pk-mono)", color: "var(--pk-text-faint)" }}>
          Figma {device === "desktop" ? "88:140" : "530:6673"}
        </span>
      </div>

      <SectionHeader label="Headings" desc="PP Right Gothic Wide Medium (H1–H4) and Manrope (H5–H6)." />
      <Ramp rows={ramp.filter((r) => r[0].startsWith("H"))} body={BODY_SAMPLE} />

      <SectionHeader label="Paragraphs" desc="Manrope, Regular / Medium." />
      <Ramp rows={ramp.filter((r) => r[0].startsWith("P"))} body={BODY_SAMPLE} />

      <SectionHeader label="Export type styles" />
      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock
        code={fw === "flutter" ? typoFlutter : typoCssDesktop}
        label={fw === "flutter" ? dartLabel : cssLabel}
      />
    </>
  );
}
