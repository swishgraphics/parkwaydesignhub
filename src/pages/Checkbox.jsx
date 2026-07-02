import { useState } from "react";
import { FRAMEWORKS } from "../tokens.js";
import { useTheme } from "../theme.jsx";
import { Lead, SectionHeader, Tabs, CodeBlock, PreviewStage, ModeRow } from "../components/primitives.jsx";
import { reactCheckbox, vueCheckbox, flutterCheckbox, usageCheckbox } from "../snippets/wallet.js";

const ROW = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 2px" };

function LiveCheck({ state, dark, onFlip }) {
  const checked = state === "checked";
  const indeterminate = state === "indeterminate";
  const disabled = state === "disabled";
  const filled = checked || indeterminate;
  const emptyBorder = dark ? "#3A3A38" : "#DDDDDD";
  const emptyBg = dark ? "transparent" : "#FFFFFF";
  const disabledBg = dark ? "transparent" : "#FBFBFB";
  const disabledBorder = dark ? "#2A2A2A" : "#DDDDDD";
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      disabled={disabled}
      onClick={onFlip}
      style={{
        width: 20, height: 20, borderRadius: 6, padding: 0, cursor: disabled ? "not-allowed" : "pointer",
        border: `1.5px solid ${disabled ? disabledBorder : filled ? "#F9956B" : emptyBorder}`,
        background: disabled ? disabledBg : filled ? "#F9956B" : emptyBg,
        display: "grid", placeItems: "center", transition: "all .15s ease",
      }}
    >
      {checked && (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3.5 8.5l3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {indeterminate && <span style={{ width: 8, height: 2, borderRadius: 1, background: "#fff" }} />}
    </button>
  );
}

const STATES = [
  ["default", "Unchecked", "Hairline Grey-04 border on white."],
  ["checked", "Checked", "Tangerine-01 fill with a white check."],
  ["indeterminate", "Indeterminate", "Tangerine-01 fill with a dash — partial selection."],
  ["disabled", "Disabled", "Grey-06 fill, non-interactive."],
];

const PROPS_ROWS = [
  ["checked / value", "boolean", "false", "Checked state. Vue/Flutter use v-model / value."],
  ["indeterminate", "boolean", "false", "Mixed state for parent-of-many selections."],
  ["onChange", "function", "—", "Fires with the next boolean."],
  ["disabled", "boolean", "false", "Grey-06 fill, non-interactive."],
  ["label", "string", "—", "Optional inline label sharing the hit target."],
];

export default function Checkbox({ fw, setFw }) {
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [state, setState] = useState("checked");
  const flip = () => setState((s) => (s === "checked" ? "default" : "checked"));
  const impl = { react: reactCheckbox, vue: vueCheckbox, flutter: flutterCheckbox };
  const label = { react: "PkCheckbox.jsx + parkway-checkbox.css", vue: "PkCheckbox.vue", flutter: "pk_checkbox.dart" };
  return (
    <>
      <Lead>20px box, 6px radius. Tangerine-01 fill with a white check when on; supports an indeterminate (mixed) state. The preview is interactive.</Lead>

      <SectionHeader label="Playground" desc="Click to toggle, or force a state below." />
      <div style={{ border: "1px solid var(--pk-line)", borderRadius: 12, padding: "2px 18px", marginTop: 6 }}>
        <ModeRow mode={mode} setMode={setMode} />
        <div style={ROW}>
          <span className="ph-rowlabel">State</span>
          <Tabs small value={state} onChange={setState} label="State" items={STATES.map(([k, n]) => [k, n])} />
        </div>
      </div>

      <PreviewStage mode={mode} tall>
        <LiveCheck state={state} dark={mode === "dark"} onFlip={flip} />
      </PreviewStage>

      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock code={usageCheckbox(fw, state === "checked")} label="Usage — reflects the control above" />
      <CodeBlock code={impl[fw]} label={label[fw]} />

      <SectionHeader label="States" />
      <div className="ph-statelist">
        {STATES.map(([k, n, d]) => (
          <div key={k} className={`ph-stateline${state === k ? " act" : ""}`}>
            <button type="button" className="ph-statedot" onClick={() => setState(k)} aria-label={`Preview ${n}`} />
            <span className="ph-statelabel">{n}</span>
            <span className="ph-statedesc">{d}</span>
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
            <li>Use for opt-in and multi-select.</li>
            <li>Keep the label part of the hit target.</li>
            <li>Use the indeterminate state for a parent of many.</li>
          </ul>
        </div>
        <div>
          <p className="ph-guidehead"><span className="ph-dot err" aria-hidden="true" />Don't</p>
          <ul className="ph-guidelist">
            <li>Don't use a single checkbox where a toggle fits a setting.</li>
            <li>Don't rely on colour alone for the checked state.</li>
            <li>Don't nest checkboxes more than one level.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
