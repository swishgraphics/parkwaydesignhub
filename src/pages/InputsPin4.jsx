import { useState } from "react";
import { FRAMEWORKS } from "../tokens.js";
import { RC_INPUT } from "../readycash-tokens.js";
import { useTheme } from "../theme.jsx";
import { Lead, SectionHeader, Tabs, CodeBlock, PreviewStage, ModeRow } from "../components/primitives.jsx";

const STATE_TABS = [
  ["empty",    "Empty"],
  ["partial",  "Partial"],
  ["filled",   "Filled"],
  ["error",    "Error"],
  ["success",  "Success"],
  ["disabled", "Disabled"],
];

const BOX_BORDER = {
  empty:    RC_INPUT.border.default,
  partial:  RC_INPUT.border.focused,
  filled:   RC_INPUT.border.focused,
  error:    RC_INPUT.border.error,
  success:  RC_INPUT.border.success,
  disabled: RC_INPUT.border.disabled,
};

function PinBox({ filled, focused, state }) {
  const borderColor = BOX_BORDER[state];
  const bg = state === "error" ? RC_INPUT.background.filledError
    : state === "success" ? RC_INPUT.background.filledSuccess
    : "transparent";
  return (
    <div style={{
      width: 56, height: 64,
      border: focused ? `2px solid ${borderColor}` : `1px solid ${borderColor}`,
      borderRadius: RC_INPUT.borderRadius,
      background: bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "border-color .15s, background .15s",
      opacity: state === "disabled" ? 0.5 : 1,
    }}>
      {filled && (
        <div style={{
          width: 12, height: 12, borderRadius: "50%",
          background: state === "error" ? RC_INPUT.border.error
            : state === "success" ? RC_INPUT.border.success
            : RC_INPUT.text.input,
        }} />
      )}
      {focused && !filled && (
        <div style={{ width: 2, height: 22, background: RC_INPUT.border.focused, borderRadius: 1 }} />
      )}
    </div>
  );
}

function LivePin4({ state }) {
  const FILL_COUNT = { empty: 0, partial: 2, filled: 4, error: 4, success: 4, disabled: 0 };
  const FOCUS_INDEX = { partial: 2 };
  const filled = FILL_COUNT[state];
  const focusIdx = FOCUS_INDEX[state] ?? -1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
      <div style={{ display: "flex", gap: 10 }}>
        {[0,1,2,3].map(i => (
          <PinBox key={i} filled={i < filled} focused={i === focusIdx} state={state} />
        ))}
      </div>
      {state === "error" && (
        <span style={{ fontFamily: RC_INPUT.font.family, fontSize: RC_INPUT.font.helpSize, color: RC_INPUT.text.errorMsg }}>
          Incorrect PIN. Please try again.
        </span>
      )}
      {state === "success" && (
        <span style={{ fontFamily: RC_INPUT.font.family, fontSize: RC_INPUT.font.helpSize, color: RC_INPUT.border.success }}>
          PIN verified.
        </span>
      )}
    </div>
  );
}

const reactSnippet = `// Use RcPinInput with digits={4}
// RcPinInput.jsx — ReadyCash PIN Input (React)
import { useRef } from "react";

export default function RcPinInput({
  digits = 4,   // ← pass 4 for this variant
  value = "",
  onChange,
  state = "idle",
}) {
  const refs = Array.from({ length: digits }, () => useRef(null));
  const arr  = value.padEnd(digits, "").split("").slice(0, digits);
  const disabled = state === "disabled";

  const BORDER = { idle: "#9ea2b3", error: "#e62e2e", success: "#069952", disabled: "#9ea2b3" };
  const BG     = { error: "rgba(255,230,230,0.6)", success: "rgba(230,255,243,0.6)" };

  const handleKey = (e, i) => {
    if (e.key === "Backspace") {
      onChange(value.slice(0, i === 0 ? 0 : i - 1) + value.slice(i));
      if (i > 0) refs[i - 1].current?.focus();
    } else if (/^[0-9]$/.test(e.key)) {
      const next = (value.slice(0, i) + e.key + value.slice(i + 1)).slice(0, digits);
      onChange(next);
      if (i < digits - 1) refs[i + 1].current?.focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      {arr.map((ch, i) => (
        <input
          key={i} ref={refs[i]} type="text" inputMode="numeric"
          maxLength={1} value={ch || ""} readOnly
          onKeyDown={e => handleKey(e, i)}
          disabled={disabled}
          style={{
            width: 56, height: 64, textAlign: "center", fontSize: 22,
            border: \`1px solid \${BORDER[state]}\`, borderRadius: 4,
            background: BG[state] || "transparent",
            fontFamily: "'Noto Sans', sans-serif", color: "#141519", outline: "none",
            opacity: disabled ? 0.5 : 1,
          }}
        />
      ))}
    </div>
  );
}`;

const flutterSnippet = `// Use RcPinInput with digits: 4
// rc_pin_input.dart — ReadyCash PIN Input (Flutter)
// Pass digits: 4 to the same RcPinInput widget defined in
// the PIN Input — 6 Digits page:

RcPinInput(
  digits: 4,
  state: RcPinState.idle,
  onCompleted: (pin) => verifyPin(pin),
)`;

const PROPS_ROWS = [
  ["digits",      "number",                              "4",          "Number of digit boxes. 4 for this variant; use 6 for the 6-digit PIN."],
  ["value",       "string",                              '""',         "Current PIN string — one character per box."],
  ["onChange",    "fn(value: string)",                  "—",          "Called on every keystroke."],
  ["onCompleted", "fn(pin: string) (Flutter)",          "—",          "Fired when all boxes are filled."],
  ["state",       '"idle" | "error" | "success" | "disabled"', '"idle"', "Controls border colour and background tint."],
];

const ROW = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 2px", borderBottom: "1px solid var(--pk-line-soft)" };

export default function InputsPin4({ fw, setFw }) {
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [state, setState] = useState("empty");

  const code  = fw === "flutter" ? flutterSnippet : reactSnippet;
  const label = fw === "flutter" ? "rc_pin_input.dart (4-digit)" : "RcPinInput.jsx (digits=4)";

  return (
    <>
      <Lead>
        A 4-digit PIN input — four wider boxes for contexts where a shorter code is used
        (e.g. transaction authorisation). Same state and masking behaviour as the 6-digit
        variant; implemented with the same component by passing <code>digits={4}</code>.
        Specs from Figma node 350:9953.
      </Lead>

      <SectionHeader label="Playground" />
      <div style={{ border: "1px solid var(--pk-line)", borderRadius: 12, padding: "2px 18px", marginTop: 6 }}>
        <ModeRow mode={mode} setMode={setMode} />
        <div style={{ ...ROW, borderBottom: 0 }}>
          <span className="ph-rowlabel">State</span>
          <Tabs small value={state} onChange={setState} label="State" items={STATE_TABS} />
        </div>
      </div>

      <PreviewStage mode={mode} tall stageStyle={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LivePin4 state={state} />
      </PreviewStage>

      <SectionHeader label="State tokens — border colour" />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
        {Object.entries(BOX_BORDER).map(([s, color]) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 8, border: "1px solid var(--pk-line)", background: "var(--pk-surface-raised)" }}>
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: color, flexShrink: 0 }} />
            <span className="ph-rowlabel" style={{ textTransform: "capitalize" }}>{s}</span>
            <code style={{ fontSize: 12, color: "var(--pk-text-faint)" }}>{color}</code>
          </div>
        ))}
      </div>

      <SectionHeader label="Export component" />
      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock code={code} label={label} />

      <SectionHeader label="Props" />
      <div className="ph-tablewrap">
        <table className="ph-table">
          <thead><tr>{["Prop","Type","Default","Notes"].map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {PROPS_ROWS.map(([p, t, d, n]) => (
              <tr key={p}><td className="ph-td-prop">{p}</td><td className="ph-td-type">{t}</td><td className="ph-td-default">{d}</td><td className="ph-td-notes">{n}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
