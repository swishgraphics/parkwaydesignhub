import { useState } from "react";
import { FRAMEWORKS } from "../tokens.js";
import { useTheme } from "../theme.jsx";
import { Lead, SectionHeader, Tabs, CodeBlock, PreviewStage, ModeRow } from "../components/primitives.jsx";
import { reactBadge, vueBadge, flutterBadge, usageBadge } from "../snippets/wallet.js";

// [key, label, { light:[bg,fg], dark:[bg,fg] }]
const BADGES = [
  ["success", "Successful", { light: ["#E7F7EA", "#1F8A3B"], dark: ["#16331C", "#6BBF74"] }],
  ["failed", "Failed", { light: ["#FDECEC", "#E5484D"], dark: ["#3A1D1E", "#FF6166"] }],
  ["pending", "Pending", { light: ["#FAF1D2", "#918455"], dark: ["#2A2414", "#D8B86A"] }],
  ["alternate", "Not linked", { light: ["#EFEFEF", "#444444"], dark: ["#262626", "#A5A5A0"] }],
];

function Badge({ bg, fg, children, dim }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", height: 22, padding: "0 10px",
      borderRadius: 11, font: "600 11px Manrope", background: bg, color: fg,
      opacity: dim ? 0.4 : 1, transition: "opacity .15s ease",
    }}>{children}</span>
  );
}

const PROPS_ROWS = [
  ["status", '"success" | "failed" | "pending" | "alternate"', '"success"', "Maps to the semantic colour pair (light & dark)."],
  ["children / label", "string", "—", "One word where possible — Successful, Failed, Pending."],
];

export default function Badges({ fw, setFw }) {
  const [status, setStatus] = useState("success");
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const dark = mode === "dark";
  const impl = { react: reactBadge, vue: vueBadge, flutter: flutterBadge };
  const label = { react: "PkBadge.jsx + parkway-badge.css", vue: "PkBadge.vue", flutter: "pk_badge.dart" };
  return (
    <>
      <Lead>Small status pill, 22px tall, Manrope SemiBold 11 on a soft tint. Four semantic statuses, each with a light and dark pairing.</Lead>

      <SectionHeader label="Playground" desc="Pick a status; the usage snippet updates. All four shown for reference." />
      <div style={{ border: "1px solid var(--pk-line)", borderRadius: 12, padding: "2px 18px", marginTop: 6 }}>
        <ModeRow mode={mode} setMode={setMode} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 2px" }}>
          <span className="ph-rowlabel">Status</span>
          <Tabs small value={status} onChange={setStatus} label="Status" items={BADGES.map(([k, n]) => [k, n])} />
        </div>
      </div>

      <PreviewStage mode={mode} tall>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          {BADGES.map(([k, n, c]) => {
            const [bg, fg] = dark ? c.dark : c.light;
            return <Badge key={k} bg={bg} fg={fg} dim={status !== k}>{n}</Badge>;
          })}
        </div>
      </PreviewStage>

      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock code={usageBadge(fw, status)} label="Usage — reflects the control above" />
      <CodeBlock code={impl[fw]} label={label[fw]} />

      <SectionHeader label="Statuses" desc={`Showing ${dark ? "dark" : "light"}-mode values — use the preview toggle to see the other set.`} />
      <div className="ph-statelist">
        {BADGES.map(([k, n, c]) => {
          const [bg, fg] = dark ? c.dark : c.light;
          return (
            <div key={k} className={`ph-stateline${status === k ? " act" : ""}`}>
              <button type="button" className="ph-statedot" onClick={() => setStatus(k)} aria-label={`Preview ${n}`} />
              <span className="ph-statelabel">{n}</span>
              <span className="ph-statedesc" translate="no">{bg} · {fg}</span>
            </div>
          );
        })}
      </div>

      <SectionHeader label="Props" />
      <div className="ph-tablewrap">
        <table className="ph-table">
          <thead><tr>{["Prop", "Type", "Default", "Notes"].map((h) => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {PROPS_ROWS.map(([p, t, d, n]) => (
              <tr key={p}>
                <td className="ph-td-prop">{p}</td>
                <td className="ph-td-type">{t}</td>
                <td className="ph-td-default">{d}</td>
                <td className="ph-td-notes">{n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
