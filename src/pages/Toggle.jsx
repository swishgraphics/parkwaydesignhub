import { useState } from "react";
import { FRAMEWORKS } from "../tokens.js";
import { useTheme } from "../theme.jsx";
import { Lead, SectionHeader, Tabs, CodeBlock, PreviewStage, ModeRow } from "../components/primitives.jsx";
import { reactToggle, vueToggle, flutterToggle, usageToggle } from "../snippets/wallet.js";

const ROW = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 2px" };

function LiveToggle({ state, platform, dark, onFlip }) {
  const on = state === "on";
  const disabled = state === "disabled";
  const offTrack = dark ? "#3A3A38" : "#DDDDDD";
  const disabledTrack = dark ? "#5A4034" : "#FDD5C4";
  const track = disabled ? disabledTrack : on ? "#F9956B" : offTrack;
  const mobile = platform === "mobile";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={onFlip}
      style={{
        width: 40, height: 20, border: 0, borderRadius: mobile ? 8 : 999, padding: 2,
        background: track, cursor: disabled ? "not-allowed" : "pointer",
        display: "flex", transition: "background .2s ease",
      }}
    >
      <span style={{
        width: 16, height: 16, borderRadius: mobile ? 5 : "50%", background: "#FFFFFF",
        transform: on ? "translateX(20px)" : "translateX(0)", transition: "transform .2s ease",
      }} />
    </button>
  );
}

const STATES = [
  ["off", "Off", "Grey-04 track, knob left."],
  ["on", "On", "Tangerine-01 track, knob right."],
  ["disabled", "Disabled", "Tangerine-04 track, non-interactive."],
];

const PROPS_ROWS = [
  ["checked / value", "boolean", "false", "On state. Vue/Flutter use v-model / value."],
  ["onChange", "function", "—", "Fires with the next boolean. Flutter: null = disabled."],
  ["disabled", "boolean", "false", "Tangerine-04 track, non-interactive."],
];

export default function Toggle({ fw, setFw }) {
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [state, setState] = useState("on");
  const [platform, setPlatform] = useState("desktop");
  const flip = () => setState((s) => (s === "on" ? "off" : "on"));
  const impl = { react: reactToggle, vue: vueToggle, flutter: flutterToggle };
  const label = { react: "PkToggle.jsx + parkway-toggle.css", vue: "PkToggle.vue", flutter: "pk_toggle.dart" };
  return (
    <>
      <Lead>40×20 switch. Grey track when off, Tangerine-01 when on, 16px white knob. Desktop is a pill; mobile uses an 8px radius. The preview is interactive.</Lead>

      <SectionHeader label="Playground" desc="Toggle it directly, or force a state below." />
      <div style={{ border: "1px solid var(--pk-line)", borderRadius: 12, padding: "2px 18px", marginTop: 6 }}>
        <ModeRow mode={mode} setMode={setMode} />
        <div style={{ ...ROW, borderBottom: "1px solid var(--pk-line-soft)" }}>
          <span className="ph-rowlabel">State</span>
          <Tabs small value={state} onChange={setState} label="State" items={STATES.map(([k, n]) => [k, n])} />
        </div>
        <div style={ROW}>
          <span className="ph-rowlabel">Platform</span>
          <Tabs small value={platform} onChange={setPlatform} label="Platform" items={[["desktop", "Desktop"], ["mobile", "Mobile"]]} />
        </div>
      </div>

      <PreviewStage mode={mode} tall>
        <LiveToggle state={state} platform={platform} dark={mode === "dark"} onFlip={flip} />
      </PreviewStage>

      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock code={usageToggle(fw, state, platform)} label="Usage — reflects the control above" />
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
            <li>Use for an instant on/off setting.</li>
            <li>Apply the change immediately — no save step.</li>
            <li>Label what the toggle controls.</li>
          </ul>
        </div>
        <div>
          <p className="ph-guidehead"><span className="ph-dot err" aria-hidden="true" />Don't</p>
          <ul className="ph-guidelist">
            <li>Don't use where the change needs a save/submit — use a checkbox.</li>
            <li>Don't use for more than two states.</li>
            <li>Don't rely on the track colour alone.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
