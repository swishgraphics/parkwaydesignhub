import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/csr/CaretDown";
import { Check }     from "@phosphor-icons/react/dist/csr/Check";
import { FRAMEWORKS } from "../tokens.js";
import { RC_INPUT } from "../readycash-tokens.js";
import { useTheme } from "../theme.jsx";
import { Lead, SectionHeader, Tabs, CodeBlock, PreviewStage, ModeRow } from "../components/primitives.jsx";

const THEME_TABS = [["outline", "Outline"], ["filled", "Filled"]];
const STATE_TABS = [
  ["default",  "Default"],
  ["open",     "Open"],
  ["error",    "Error"],
  ["success",  "Success"],
  ["disabled", "Disabled"],
];

const SAMPLE_OPTIONS = ["Savings Account", "Current Account", "Fixed Deposit", "Investment"];

const BORDER_COLOR = {
  default:  RC_INPUT.border.default,
  open:     RC_INPUT.border.focused,
  error:    RC_INPUT.border.error,
  success:  RC_INPUT.border.success,
  disabled: RC_INPUT.border.disabled,
};
const BG_FILLED = {
  default:  RC_INPUT.background.filledDefault,
  open:     RC_INPUT.background.filledFocused,
  error:    RC_INPUT.background.filledError,
  success:  RC_INPUT.background.filledSuccess,
  disabled: RC_INPUT.background.filledDefault,
};

function LiveDropdown({ theme, state }) {
  const disabled = state === "disabled";
  const isOpen = state === "open";
  const hasError = state === "error";

  const borderColor = BORDER_COLOR[state];
  const bg = theme === "filled" ? BG_FILLED[state] : RC_INPUT.background.outline;
  const labelColor = hasError ? RC_INPUT.text.labelError : RC_INPUT.text.label;
  const textColor = disabled ? RC_INPUT.text.disabled : RC_INPUT.text.input;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: RC_INPUT.wrapperGap, width: 340, maxWidth: "100%", position: "relative" }}>
      <label style={{ fontFamily: RC_INPUT.font.family, fontSize: 14, fontWeight: RC_INPUT.font.labelWeight, lineHeight: "20px", color: labelColor }}>
        Account type
      </label>

      <div style={{
        display: "flex", alignItems: "center", gap: RC_INPUT.gap,
        paddingLeft: RC_INPUT.paddingX, paddingRight: RC_INPUT.paddingX,
        paddingTop: RC_INPUT.paddingY, paddingBottom: RC_INPUT.paddingY,
        borderRadius: RC_INPUT.borderRadius,
        border: `1px solid ${borderColor}`,
        background: bg,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}>
        <span style={{ flex: 1, fontFamily: RC_INPUT.font.family, fontSize: RC_INPUT.font.inputSize, color: isOpen ? textColor : RC_INPUT.text.placeholder }}>
          {isOpen ? SAMPLE_OPTIONS[0] : "Select account type"}
        </span>
        <CaretDown size={18} color={RC_INPUT.text.placeholder} style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s ease" }} />
      </div>

      {isOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4,
          background: "var(--pk-surface)", border: `1px solid ${RC_INPUT.border.focused}`,
          borderRadius: RC_INPUT.borderRadius, boxShadow: "0 8px 16px rgba(0,0,0,.12)", zIndex: 10,
          overflow: "hidden",
        }}>
          {SAMPLE_OPTIONS.map((opt, i) => (
            <div key={opt} style={{
              padding: "12px 16px",
              fontFamily: RC_INPUT.font.family, fontSize: RC_INPUT.font.inputSize,
              color: i === 0 ? "var(--pk-accent)" : RC_INPUT.text.input,
              background: i === 0 ? "var(--pk-accent-soft, #FFF0F0)" : "transparent",
              borderBottom: i < SAMPLE_OPTIONS.length - 1 ? `1px solid ${RC_INPUT.border.default}22` : "none",
              cursor: "pointer",
              fontWeight: i === 0 ? 600 : 400,
            }}>
              {opt}
              {i === 0 && <Check size={16} color="var(--pk-accent)" style={{ float: "right" }} />}
            </div>
          ))}
        </div>
      )}

      {hasError && (
        <span style={{ fontFamily: RC_INPUT.font.family, fontSize: RC_INPUT.font.helpSize, lineHeight: RC_INPUT.font.helpLineHeight, color: RC_INPUT.text.errorMsg }}>
          Please select an account type.
        </span>
      )}
    </div>
  );
}

const STATE_ROWS = [
  { label: "Default",  border: RC_INPUT.border.default,  bg: RC_INPUT.background.filledDefault },
  { label: "Open",     border: RC_INPUT.border.focused,  bg: RC_INPUT.background.filledFocused },
  { label: "Error",    border: RC_INPUT.border.error,    bg: RC_INPUT.background.filledError },
  { label: "Success",  border: RC_INPUT.border.success,  bg: RC_INPUT.background.filledSuccess },
  { label: "Disabled", border: RC_INPUT.border.disabled, bg: RC_INPUT.background.filledDefault },
];

const reactSnippet = `// RcDropdown.jsx — ReadyCash dropdown input (React)
import { CaretDown, Check } from "@phosphor-icons/react";
import "./readycash-tokens.css";

const OPTIONS = [{ value: "savings", label: "Savings Account" }, /* … */];

export default function RcDropdown({
  label, theme = "outline", state = "default",
  value, onChange, options = OPTIONS, errorMsg, ...rest
}) {
  const [open, setOpen] = useState(false);
  const disabled = state === "disabled";
  const hasError  = state === "error";

  const BORDER = { default: "#9ea2b3", open: "#3e414c", error: "#e62e2e",
                   success: "#069952", disabled: "#9ea2b3" };
  const BG = theme === "filled"
    ? { default: "#f6f7f9", open: "#f5f8ff", error: "rgba(255,230,230,0.6)",
        success: "rgba(230,255,243,0.6)", disabled: "#f6f7f9" }
    : {};

  const activeState = open ? "open" : state;
  const selected = options.find(o => o.value === value);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, position: "relative" }}>
      {label && <label style={{ font: "600 14px/1.6 'Noto Sans',sans-serif",
                                color: hasError ? "#e62e2e" : "#141519" }}>{label}</label>}
      <button
        type="button"
        onClick={() => !disabled && setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", gap: 8,
                 padding: "12px 16px", borderRadius: 4,
                 border: \`1px solid \${BORDER[activeState]}\`,
                 background: BG[activeState] || "transparent",
                 font: "400 16px/24px 'Noto Sans',sans-serif",
                 color: selected ? "#141519" : "#838799",
                 cursor: disabled ? "not-allowed" : "pointer",
                 opacity: disabled ? 0.5 : 1 }}
        disabled={disabled}
        {...rest}
      >
        <span style={{ flex: 1, textAlign: "left" }}>
          {selected ? selected.label : "Select…"}
        </span>
        <CaretDown style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s ease" }} />
      </button>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4,
                      background: "#fff", border: "1px solid #3e414c",
                      borderRadius: 4, boxShadow: "0 8px 16px rgba(0,0,0,.12)", zIndex: 10 }}>
          {options.map(opt => (
            <div key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{ padding: "12px 16px", cursor: "pointer",
                       fontFamily: "'Noto Sans',sans-serif", fontSize: 16,
                       color: opt.value === value ? "var(--rc-tangerine-01)" : "#141519" }}>
              {opt.label}
            </div>
          ))}
        </div>
      )}
      {hasError && errorMsg && (
        <span style={{ font: "400 12px/16px 'Noto Sans',sans-serif", color: "#e62e2e" }}>{errorMsg}</span>
      )}
    </div>
  );
}`;

const flutterSnippet = `// rc_dropdown.dart — ReadyCash dropdown (Flutter)
import 'package:flutter/material.dart';
import 'readycash_tokens.dart';

class RcDropdown<T> extends StatefulWidget {
  const RcDropdown({
    super.key, required this.label, required this.items,
    this.value, this.onChanged, this.theme = RcInputTheme.outline,
    this.state = RcInputState.idle, this.errorText,
  });
  final String label;
  final List<DropdownMenuItem<T>> items;
  final T? value;
  final ValueChanged<T?>? onChanged;
  final RcInputTheme theme;
  final RcInputState state;
  final String? errorText;

  @override
  State<RcDropdown<T>> createState() => _RcDropdownState<T>();
}

class _RcDropdownState<T> extends State<RcDropdown<T>> {
  static const _border = {
    RcInputState.idle:     Color(0xFF9EA2B3),
    RcInputState.focused:  Color(0xFF3E414C),
    RcInputState.error:    Color(0xFFE62E2E),
    RcInputState.success:  Color(0xFF069952),
    RcInputState.disabled: Color(0xFF9EA2B3),
  };
  static const _bgFilled = {
    RcInputState.idle:    Color(0xFFF6F7F9),
    RcInputState.focused: Color(0xFFF5F8FF),
    RcInputState.error:   Color(0x26FF0000),
    RcInputState.success: Color(0x26069952),
    RcInputState.disabled:Color(0xFFF6F7F9),
  };

  @override
  Widget build(BuildContext context) {
    final disabled = widget.state == RcInputState.disabled;
    final hasError  = widget.state == RcInputState.error;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min,
      children: [
        Text(widget.label, style: TextStyle(fontFamily: 'Noto Sans', fontSize: 14,
          fontWeight: FontWeight.w600,
          color: hasError ? const Color(0xFFE62E2E) : const Color(0xFF141519))),
        const SizedBox(height: 4),
        Container(
          decoration: BoxDecoration(
            color: widget.theme == RcInputTheme.filled ? _bgFilled[widget.state] : Colors.transparent,
            borderRadius: BorderRadius.circular(4),
            border: Border.all(color: _border[widget.state]!)),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<T>(
              value: widget.value,
              items: widget.items,
              onChanged: disabled ? null : widget.onChanged,
              isExpanded: true,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
              style: const TextStyle(fontFamily: 'Noto Sans', fontSize: 16,
                                     color: Color(0xFF141519)),
            ),
          ),
        ),
        if (hasError && widget.errorText != null)
          Padding(padding: const EdgeInsets.only(top: 4),
            child: Text(widget.errorText!, style: const TextStyle(
              fontFamily: 'Noto Sans', fontSize: 12, color: Color(0xFFE62E2E)))),
      ],
    );
  }
}`;

const PROPS_ROWS = [
  ["label",    "string",                                              "—",          "Field label shown above the dropdown."],
  ["theme",    '"outline" | "filled"',                               '"outline"',  "Outline uses transparent bg; Filled uses light grey."],
  ["state",    '"default" | "open" | "error" | "success" | "disabled"', '"default"', "Controls border and background. Error changes label colour."],
  ["options",  "{ value, label }[]",                                 "—",          "Array of selectable options."],
  ["value",    "string",                                             "—",          "Currently selected value (controlled)."],
  ["onChange", "fn(value)",                                          "—",          "Called when the user selects an option."],
  ["errorMsg", "string",                                             "—",          "Validation message shown in the error state."],
];

const ROW = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 2px", borderBottom: "1px solid var(--pk-line-soft)" };

export default function InputsDropdown({ fw, setFw }) {
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [theme, setTheme] = useState("outline");
  const [state, setState] = useState("default");

  const code   = fw === "flutter" ? flutterSnippet : reactSnippet;
  const label  = fw === "flutter" ? "rc_dropdown.dart" : fw === "vue" ? "RcDropdown.vue" : "RcDropdown.jsx";

  return (
    <>
      <Lead>
        A select-style dropdown in two themes and five states. When open, the panel renders
        below the trigger with a visible selected indicator. Keyboard and screen-reader accessible
        via native select semantics (Flutter) or a custom listbox role (React/Vue).
        Specs from Figma node 350:9499.
      </Lead>

      <SectionHeader label="Playground" desc="Switch theme and state to preview the dropdown trigger." />
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

      <PreviewStage mode={mode} tall stageStyle={{ display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible", minHeight: state === "open" ? 240 : undefined }}>
        <LiveDropdown theme={theme} state={state} />
      </PreviewStage>

      <SectionHeader label="State tokens" />
      <div style={{ borderRadius: 10, border: "1px solid var(--pk-line)", overflow: "hidden", marginTop: 8 }}>
        <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr", padding: "10px 16px", background: "var(--pk-surface-raised)", borderBottom: "1px solid var(--pk-line)" }}>
          {["State", "Border", "Background (Filled)"].map(h => <span key={h} className="ph-rowlabel" style={{ fontWeight: 600 }}>{h}</span>)}
        </div>
        {STATE_ROWS.map(({ label: s, border, bg }) => (
          <div key={s} style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr", padding: "10px 16px", borderBottom: "1px solid var(--pk-line-soft)", alignItems: "center" }}>
            <span className="ph-rowlabel">{s}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 14, height: 14, borderRadius: "50%", background: border, flexShrink: 0 }} />
              <code style={{ fontSize: 12 }}>{border}</code>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 14, height: 14, borderRadius: "50%", background: bg, flexShrink: 0, border: "1px solid var(--pk-line)" }} />
              <code style={{ fontSize: 12 }}>{bg}</code>
            </div>
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
