import { useState } from "react";
import { FRAMEWORKS } from "../tokens.js";
import { useTheme } from "../theme.jsx";
import { Lead, SectionHeader, Tabs, CodeBlock, PreviewStage, ModeRow } from "../components/primitives.jsx";
import { CaretDown } from "../iconography/index.js";
import { reactTextInput, vueTextInput, flutterTextInput, usageTextInput } from "../snippets/wallet.js";

const ROW = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 2px", borderBottom: "1px solid var(--pk-line-soft)" };

function InfoDot() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" stroke="#868686" strokeWidth="1.2" />
      <path d="M7 6.2v3.2M7 4.6v.2" stroke="#868686" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function LiveInput({ addon, state }) {
  const [val, setVal] = useState("");
  const error = state === "error";
  const disabled = state === "disabled";
  return (
    <div className="ph-tfield">
      <label className="ph-tfield__label" htmlFor="pk-demo-input">Amount</label>
      <span className={`ph-tfield__box${error ? " err" : ""}${disabled ? " dis" : ""}`}>
        <input
          id="pk-demo-input"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          disabled={disabled}
          placeholder="Placeholder text"
          aria-invalid={error || undefined}
          autoComplete="off"
        />
        {addon === "icon" && <span className="ph-tfield__chev"><CaretDown size={16} /></span>}
      </span>
      {addon === "helper" && !error && (
        <span className="ph-tfield__help">
          <InfoDot />Your remaining daily transfer limit is&nbsp;<strong>N200,000.00</strong>
        </span>
      )}
      {error && <span className="ph-tfield__help err">Enter a valid amount</span>}
    </div>
  );
}

const STATES = [
  ["default", "Default", "Resting field, hairline border."],
  ["error", "Error", "Red border + message, sets aria-invalid."],
  ["disabled", "Disabled", "Dimmed, non-interactive."],
];

const PROPS_ROWS = [
  ["label", "string", "—", "Field label set in Manrope SemiBold 12."],
  ["placeholder", "string", "—", "Grey-02 placeholder; ends with the example pattern where useful."],
  ["helper", "string", "—", "Muted helper line under the field (e.g. limits)."],
  ["error", "string", "—", "Error message; turns the border and helper red, sets aria-invalid."],
  ["trailingIcon", "node", "—", "Optional trailing glyph — e.g. a caret for select-style inputs."],
  ["disabled", "boolean", "false", "Grey-06 fill, non-interactive."],
];

export default function TextInput({ fw, setFw }) {
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [addon, setAddon] = useState("none");
  const [state, setState] = useState("default");
  const impl = { react: reactTextInput, vue: vueTextInput, flutter: flutterTextInput };
  const label = { react: "PkTextInput.jsx + parkway-input.css", vue: "PkTextInput.vue", flutter: "pk_text_input.dart" };
  return (
    <>
      <Lead>A real, focusable field — click in and type. 45px, 8px radius; the border and a light ring turn tangerine on focus.</Lead>

      <SectionHeader label="Playground" desc="Adjust the controls; the preview and snippet update together." />
      <div style={{ border: "1px solid var(--pk-line)", borderRadius: 12, padding: "2px 18px", marginTop: 6 }}>
        <ModeRow mode={mode} setMode={setMode} />
        <div style={ROW}>
          <span className="ph-rowlabel">Add-on</span>
          <Tabs small value={addon} onChange={setAddon} label="Add-on" items={[["none", "None"], ["icon", "Icon"], ["helper", "Helper"]]} />
        </div>
        <div style={{ ...ROW, borderBottom: 0 }}>
          <span className="ph-rowlabel">State</span>
          <Tabs small value={state} onChange={setState} label="State" items={STATES.map(([k, n]) => [k, n])} />
        </div>
      </div>

      <PreviewStage mode={mode} tall>
        <LiveInput addon={addon} state={state} />
      </PreviewStage>

      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock code={usageTextInput(fw, addon, state)} label="Usage — reflects the controls above" />
      <CodeBlock code={impl[fw]} label={label[fw]} />

      <SectionHeader label="States" desc="Every interaction state the field can take." />
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
            <li>Always pair the field with a visible label.</li>
            <li>Show the expected format in the placeholder.</li>
            <li>Surface errors inline with text, not colour alone.</li>
          </ul>
        </div>
        <div>
          <p className="ph-guidehead"><span className="ph-dot err" aria-hidden="true" />Don't</p>
          <ul className="ph-guidelist">
            <li>Don't use the placeholder as the label.</li>
            <li>Don't disable a field without explaining why.</li>
            <li>Don't validate on every keystroke — wait for blur or submit.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
