import { useState } from "react";
import { FRAMEWORKS } from "../tokens.js";
import { useTheme } from "../theme.jsx";
import { Lead, SectionHeader, Tabs, CodeBlock, PreviewStage, ModeRow } from "../components/primitives.jsx";
import { reactRadio, vueRadio, flutterRadio, usageRadio } from "../snippets/wallet.js";

const ROW = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 2px" };

function LiveRadio({ state, dark, onFlip }) {
  const checked  = state === "active" || state === "disabled-active";
  const disabled = state === "disabled" || state === "disabled-active";
  const ringDefault = dark ? "#3A3A38" : "#C6C6C6";
  const ringDisabled = dark ? "#4A4A46" : "#BBBBBB";
  const ring = disabled ? ringDisabled : checked ? "#F9956B" : ringDefault;
  const dot  = disabled ? ringDisabled : "#F9956B";
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      disabled={disabled}
      onClick={onFlip}
      style={{
        width: 20, height: 20, borderRadius: "50%", padding: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        border: `1.5px solid ${ring}`,
        background: dark ? "transparent" : "#fff",
        display: "grid", placeItems: "center",
        transition: "border-color .15s ease",
      }}
    >
      {checked && (
        <span style={{
          width: 10, height: 10, borderRadius: "50%",
          background: dot,
          transition: "background .15s ease",
        }} />
      )}
    </button>
  );
}

const STATES = [
  ["default",          "Unselected",          "Grey ring (#C6C6C6), no dot — waiting for selection."],
  ["active",           "Selected",            "Tangerine-01 ring and inner dot — the chosen option."],
  ["disabled",         "Disabled unselected", "Rich Grey 07 ring (#BBBBBB), non-interactive."],
  ["disabled-active",  "Disabled selected",   "Rich Grey 07 ring with dot — selected but locked."],
];

const PROPS_ROWS = [
  ["checked / value",    "boolean",  "false",     "Whether the radio is selected."],
  ["disabled",           "boolean",  "false",     "Prevents interaction; renders with grey ring and dot."],
  ["onChange / onChanged", "function", "—",       "Fires when the radio is selected."],
  ["label / child",      "string",   "—",         "Optional inline label sharing the hit target."],
  ["options (group)",    "array",    "required",  "Array of { key, label, disabled? } for PkRadioGroup."],
  ["value (group)",      "string",   "required",  "Key of the currently selected option in the group."],
];

export default function Radio({ fw, setFw }) {
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [state, setState] = useState("active");
  const flip = () =>
    setState((s) =>
      s === "disabled" || s === "disabled-active" ? s : s === "active" ? "default" : "active"
    );
  const impl  = { react: reactRadio, vue: vueRadio, flutter: flutterRadio };
  const label = {
    react:   "PkRadio.jsx + parkway-radio.css",
    vue:     "PkRadio.vue",
    flutter: "pk_radio.dart",
  };

  return (
    <>
      <Lead>
        20 × 20 px radio button following the Wallet Figma spec. Active state: Tangerine-01 ring
        and inner dot. Disabled state: Rich Grey 07 ring, no interaction. Built on a native{" "}
        <code style={{ font: "inherit", background: "var(--pk-stage)", padding: "1px 4px", borderRadius: 4 }}>
          &lt;input type="radio"&gt;
        </code>{" "}
        for full keyboard and screen-reader support.
      </Lead>

      <SectionHeader label="Playground" desc="Click to toggle, or force a state below." />
      <div style={{ border: "1px solid var(--pk-line)", borderRadius: 12, padding: "2px 18px", marginTop: 6 }}>
        <ModeRow mode={mode} setMode={setMode} />
        <div style={ROW}>
          <span className="ph-rowlabel">State</span>
          <Tabs small value={state} onChange={setState} label="State" items={STATES.map(([k, n]) => [k, n])} />
        </div>
      </div>

      <PreviewStage mode={mode} tall>
        <LiveRadio state={state} dark={mode === "dark"} onFlip={flip} />
      </PreviewStage>

      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock code={usageRadio(fw, state === "active")} label="Usage — reflects the control above" />
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
            <li>Always group related radios under a single <code>radiogroup</code> with a visible legend.</li>
            <li>Pre-select the most likely option to reduce friction.</li>
            <li>Keep the label part of the hit target.</li>
          </ul>
        </div>
        <div>
          <p className="ph-guidehead"><span className="ph-dot err" aria-hidden="true" />Don't</p>
          <ul className="ph-guidelist">
            <li>Don't use for binary on/off — use a Toggle instead.</li>
            <li>Don't disable all options; at least one must remain selectable.</li>
            <li>Don't use for more than ~5 options — prefer a select dropdown.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
