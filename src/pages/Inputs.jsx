import { useState } from "react";
import { Envelope } from "@phosphor-icons/react/dist/csr/Envelope";
import { Check }    from "@phosphor-icons/react/dist/csr/Check";
import { FRAMEWORKS } from "../tokens.js";
import { RC_INPUT } from "../readycash-tokens.js";
import { useTheme } from "../theme.jsx";
import { Lead, SectionHeader, Tabs, CodeBlock, PreviewStage, ModeRow } from "../components/primitives.jsx";
import { rcReactInput, rcVueInput, rcFlutterInput } from "../snippets/readycash-snippets.js";

const THEME_TABS  = [["outline", "Outline"], ["filled", "Filled"]];
const STATE_TABS  = [
  ["default",  "Default"],
  ["focused",  "Focused"],
  ["error",    "Error"],
  ["success",  "Success"],
  ["disabled", "Disabled"],
];

const BORDER_COLOR = {
  default:  RC_INPUT.border.default,
  focused:  RC_INPUT.border.focused,
  error:    RC_INPUT.border.error,
  success:  RC_INPUT.border.success,
  disabled: RC_INPUT.border.disabled,
};

const BG_FILLED = {
  default:  RC_INPUT.background.filledDefault,
  focused:  RC_INPUT.background.filledFocused,
  error:    RC_INPUT.background.filledError,
  success:  RC_INPUT.background.filledSuccess,
  disabled: RC_INPUT.background.filledDefault,
};

const HELP_TEXT  = "We'll only use this for account notifications.";
const ERROR_TEXT = "Please enter a valid email address.";

function LiveInput({ theme, state }) {
  const disabled = state === "disabled";
  const hasError  = state === "error";
  const hasSuccess = state === "success";

  const borderColor = BORDER_COLOR[state];
  const bg = theme === "filled" ? BG_FILLED[state] : RC_INPUT.background.outline;

  const labelColor = hasError ? RC_INPUT.text.labelError : RC_INPUT.text.label;
  const textColor  = disabled ? RC_INPUT.text.disabled : RC_INPUT.text.input;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: RC_INPUT.wrapperGap, width: 340, maxWidth: "100%" }}>
      <label style={{
        fontFamily: RC_INPUT.font.family,
        fontSize: 14,
        fontWeight: RC_INPUT.font.labelWeight,
        lineHeight: "20px",
        color: labelColor,
      }}>
        Email address
      </label>

      <div style={{
        display: "flex", alignItems: "center",
        gap: RC_INPUT.gap,
        paddingLeft: RC_INPUT.paddingX, paddingRight: RC_INPUT.paddingX,
        paddingTop: RC_INPUT.paddingY, paddingBottom: RC_INPUT.paddingY,
        borderRadius: RC_INPUT.borderRadius,
        border: `1px solid ${borderColor}`,
        background: bg,
        opacity: disabled ? 0.5 : 1,
        transition: "border-color .15s ease, background .15s ease",
      }}>
        <Envelope size={20} color={textColor} style={{ flexShrink: 0 }} />
        <input
          type="email"
          placeholder={disabled ? "" : "name@example.com"}
          disabled={disabled}
          defaultValue={["focused", "success", "error"].includes(state) ? "hello@parkway.ng" : ""}
          style={{
            flex: 1, border: 0, background: "transparent", outline: "none",
            fontFamily: RC_INPUT.font.family,
            fontSize: RC_INPUT.font.inputSize,
            fontWeight: RC_INPUT.font.inputWeight,
            lineHeight: RC_INPUT.font.inputLineHeight,
            color: textColor,
            cursor: disabled ? "not-allowed" : "text",
          }}
          readOnly
        />
        {hasSuccess && <Check size={18} color={RC_INPUT.border.success} style={{ flexShrink: 0 }} />}
      </div>

      <span style={{
        fontFamily: RC_INPUT.font.family,
        fontSize: RC_INPUT.font.helpSize,
        lineHeight: RC_INPUT.font.helpLineHeight,
        color: hasError ? RC_INPUT.text.errorMsg : RC_INPUT.text.helpText,
      }}>
        {hasError ? ERROR_TEXT : HELP_TEXT}
      </span>
    </div>
  );
}

const STATE_TOKENS = [
  { state: "Default",  border: RC_INPUT.border.default,  bgFilled: RC_INPUT.background.filledDefault,  bgOutline: "transparent" },
  { state: "Focused",  border: RC_INPUT.border.focused,  bgFilled: RC_INPUT.background.filledFocused,  bgOutline: "transparent" },
  { state: "Error",    border: RC_INPUT.border.error,    bgFilled: RC_INPUT.background.filledError,    bgOutline: "transparent" },
  { state: "Success",  border: RC_INPUT.border.success,  bgFilled: RC_INPUT.background.filledSuccess,  bgOutline: "transparent" },
  { state: "Disabled", border: RC_INPUT.border.disabled, bgFilled: RC_INPUT.background.filledDefault,  bgOutline: "transparent" },
];

const CHIP = { display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid var(--pk-line-soft)" };
const DOT  = (color, border) => ({
  width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
  background: color,
  boxShadow: border ? `inset 0 0 0 1px var(--pk-line)` : "none",
});

const PROPS_ROWS = [
  ["label",       "string",                                           "—",           "Field label, displayed above the input."],
  ["placeholder", "string",                                           '""',          "Ghost text shown when input is empty."],
  ["theme",       '"outline" | "filled"',                             '"outline"',   "Outline uses a transparent bg with border only; Filled uses a light grey bg."],
  ["state",       '"default" | "focused" | "error" | "success" | "disabled"', '"default"', "Controls border color and background. Error/Success change the label color too."],
  ["helpText",    "string",                                           "—",           "Shown below the field in idle/focused/success states; hidden in error state."],
  ["errorMsg",    "string",                                           "—",           "Replaces helpText when state is error. Always pair with a descriptive message."],
  ["mandatory",   "boolean",                                          "false",       "Appends an asterisk (*) to the label."],
  ["leadingIcon", "ReactNode / Widget",                               "—",           "Icon or glyph rendered inside the left edge of the field."],
];

const ROW = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 2px", borderBottom: "1px solid var(--pk-line-soft)" };

export default function Inputs({ fw, setFw }) {
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [theme, setTheme] = useState("outline");
  const [state, setState] = useState("default");

  const implCode  = { vue: rcVueInput,  react: rcReactInput,  flutter: rcFlutterInput };
  const implLabel = {
    vue:     "RcInput.vue",
    react:   "RcInput.jsx",
    flutter: "rc_input.dart",
  };

  return (
    <>
      <Lead>
        Text inputs in two themes — Outline and Filled — across five states. Each state is encoded
        as a border colour and (for Filled) a background tint. Two sizes of supporting text sit
        below the field: a help line for idle guidance and an error message for validation feedback.
        Specs pulled from Figma node 350:9154.
      </Lead>

      <SectionHeader label="Playground" desc="Switch theme and state; the live field and snippet update together." />
      <div style={{ border: "1px solid var(--pk-line)", borderRadius: 12, padding: "2px 18px", marginTop: 6 }}>
        <ModeRow mode={mode} setMode={setMode} />
        <div style={ROW}>
          <span className="ph-rowlabel">Theme</span>
          <Tabs small value={theme} onChange={setTheme} label="Theme" items={THEME_TABS} />
        </div>
        <div style={{ ...ROW, borderBottom: 0 }}>
          <span className="ph-rowlabel">State</span>
          <Tabs small value={state} onChange={setState} label="State" items={STATE_TABS} />
        </div>
      </div>

      <PreviewStage mode={mode} tall stageStyle={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LiveInput theme={theme} state={state} />
      </PreviewStage>

      <SectionHeader label="State tokens" />
      <div style={{ borderRadius: 10, border: "1px solid var(--pk-line)", overflow: "hidden", marginTop: 8 }}>
        <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr", padding: "10px 16px", background: "var(--pk-surface-raised)", borderBottom: "1px solid var(--pk-line)" }}>
          <span className="ph-rowlabel" style={{ fontWeight: 600 }}>State</span>
          <span className="ph-rowlabel" style={{ fontWeight: 600 }}>Border</span>
          <span className="ph-rowlabel" style={{ fontWeight: 600 }}>Background (Filled)</span>
        </div>
        {STATE_TOKENS.map(({ state: s, border, bgFilled }) => {
          const nearWhite = bgFilled === "transparent" || bgFilled === RC_INPUT.background.filledDefault || bgFilled === RC_INPUT.background.filledFocused;
          return (
            <div key={s} style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr", padding: "10px 16px", borderBottom: "1px solid var(--pk-line-soft)", alignItems: "center" }}>
              <span className="ph-rowlabel">{s}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={DOT(border, false)} />
                <code style={{ fontSize: 12 }}>{border}</code>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ ...DOT(bgFilled === "transparent" ? "var(--pk-surface)" : bgFilled, nearWhite), border: "1px solid var(--pk-line)" }} />
                <code style={{ fontSize: 12 }}>{bgFilled}</code>
              </div>
            </div>
          );
        })}
      </div>

      <SectionHeader label="Export component" />
      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock code={implCode[fw]} label={implLabel[fw]} />

      <SectionHeader label="Props" />
      <div className="ph-tablewrap">
        <table className="ph-table">
          <thead>
            <tr>{["Prop", "Type", "Default", "Notes"].map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
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

      <SectionHeader label="Usage guidance" />
      <div className="ph-guidance">
        <div>
          <p className="ph-guidehead"><span className="ph-dot ok" aria-hidden="true" />Do</p>
          <ul className="ph-guidelist">
            <li>Always pair an input with a visible label — never rely on placeholder alone.</li>
            <li>Use the Filled theme on white/light surfaces; Outline on tinted or card surfaces.</li>
            <li>Show the error message immediately after blur when validation fails.</li>
            <li>Use mandatory=true + server-side validation; never block submission on empty optionals.</li>
          </ul>
        </div>
        <div>
          <p className="ph-guidehead"><span className="ph-dot err" aria-hidden="true" />Don't</p>
          <ul className="ph-guidelist">
            <li>Don't mix Outline and Filled themes within the same form.</li>
            <li>Don't use the Success state until the field value is actually validated.</li>
            <li>Don't recolor borders or backgrounds manually — use the state prop instead.</li>
            <li>Don't hide the help text on focus; it provides needed guidance while typing.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
