import { useState } from "react";
import { FRAMEWORKS } from "../tokens.js";
import { useTheme } from "../theme.jsx";
import { Lead, SectionHeader, Tabs, CodeBlock, PreviewStage, ModeRow } from "../components/primitives.jsx";
import {
  reactTabsToggle,
  vueTabsToggle,
  flutterTabsToggle,
  usageTabsToggle,
} from "../snippets/wallet.js";

const TAB_OPTIONS = [
  ["pay-now",   "Pay Now"],
  ["scheduled", "Scheduled"],
];

function LiveTabsToggle({ value, onChange }) {
  const idx = TAB_OPTIONS.findIndex(([k]) => k === value);
  return (
    <div style={{
      position: "relative",
      display: "flex",
      width: 343,
      height: 48,
      background: "var(--pk-tabs-toggle-bg)",
      borderRadius: 40,
      padding: 4,
      gap: 15,
    }}>
      {/* sliding pill */}
      <div style={{
        position: "absolute",
        top: 4,
        left: 4,
        width: 160,
        height: 40,
        borderRadius: 20,
        background: "var(--pk-tabs-toggle-pill-bg)",
        border: "1px solid var(--pk-tabs-toggle-pill-border)",
        transform: `translateX(${idx * 175}px)`,
        transition: "transform .2s ease",
        pointerEvents: "none",
      }} />
      {TAB_OPTIONS.map(([key, label]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          style={{
            flex: "0 0 160px",
            height: 40,
            borderRadius: 20,
            border: 0,
            background: "transparent",
            position: "relative",
            zIndex: 1,
            font: "600 14px/1 Manrope, sans-serif",
            color: "var(--pk-tabs-toggle-text)",
            cursor: "pointer",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

const STATES = [
  ["active",   "Active pill",    "var(--pk-tabs-toggle-pill-bg) background with var(--pk-tabs-toggle-pill-border) border — the selected tab."],
  ["inactive", "Inactive tab",   "No pill — sits directly on the var(--pk-tabs-toggle-bg) container."],
];

const PROPS_ROWS = [
  ["tabs",                   "Array<[string, string]>", "required", "Array of [key, label] pairs. Two items."],
  ["value / modelValue",     "string",                  "required", "Key of the active tab."],
  ["onChange / onChanged",   "function",                "—",        "Called with the new key on tab press."],
];

export default function TabsToggle({ fw, setFw }) {
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [active, setActive] = useState("pay-now");

  const impl = { react: reactTabsToggle, vue: vueTabsToggle, flutter: flutterTabsToggle };
  const label = {
    react:   "PkTabsToggle.jsx + parkway-tabs-toggle.css",
    vue:     "PkTabsToggle.vue",
    flutter: "pk_tabs_toggle.dart",
  };

  return (
    <>
      <Lead>
        Two-option pill toggle for switching payment modes. A sliding pill marks the active tab;
        its colours follow the light/dark theme.
      </Lead>

      <SectionHeader label="Playground" desc="Switch tabs, or switch the preview between light and dark." />
      <div style={{ border: "1px solid var(--pk-line)", borderRadius: 12, padding: "2px 18px", marginTop: 6 }}>
        <ModeRow mode={mode} setMode={setMode} divider={false} />
      </div>

      <PreviewStage mode={mode} tall>
        <LiveTabsToggle value={active} onChange={setActive} />
      </PreviewStage>

      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock code={usageTabsToggle(fw, active)} label="Usage — reflects active tab above" />
      <CodeBlock code={impl[fw]} label={label[fw]} />

      <SectionHeader label="States" />
      <div className="ph-statelist">
        {STATES.map(([k, name, desc]) => (
          <div key={k} className="ph-stateline">
            <span className="ph-statedot" style={{
              background: k === "active" ? "var(--pk-tabs-toggle-pill-border)" : "transparent",
              border: "2px solid var(--pk-tabs-toggle-pill-border)",
            }} />
            <span className="ph-statelabel">{name}</span>
            <span className="ph-statedesc">{desc}</span>
          </div>
        ))}
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

      <SectionHeader label="Usage guidelines" />
      <div className="ph-guidance">
        <div>
          <p className="ph-guidehead"><span className="ph-dot ok" aria-hidden="true" />Do</p>
          <ul className="ph-guidelist">
            <li>Use for binary switching at the top of a payment form.</li>
            <li>Keep labels short — one or two words each to fit the 160 px pill.</li>
            <li>Let CSS vars drive dark mode; no manual theme prop needed.</li>
          </ul>
        </div>
        <div>
          <p className="ph-guidehead"><span className="ph-dot err" aria-hidden="true" />Don't</p>
          <ul className="ph-guidelist">
            <li>Don't add a third option — the geometry is fixed for two tabs.</li>
            <li>Don't nest this inside a modal without verifying it fits the container width.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
