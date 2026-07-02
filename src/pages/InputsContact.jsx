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

function LiveContact({ theme, state }) {
  const disabled = state === "disabled";
  const hasError = state === "error";
  const border = BORDER_COLOR[state];
  const bg = theme === "filled" ? BG_FILLED[state] : RC_INPUT.background.outline;
  const labelColor = hasError ? RC_INPUT.text.labelError : RC_INPUT.text.label;
  const textColor = disabled ? RC_INPUT.text.disabled : RC_INPUT.text.input;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: RC_INPUT.wrapperGap, width: 360, maxWidth: "100%" }}>
      <label style={{ fontFamily: RC_INPUT.font.family, fontSize: 14, fontWeight: RC_INPUT.font.labelWeight, lineHeight: "20px", color: labelColor }}>
        Phone number
      </label>

      <div style={{
        display: "flex", alignItems: "center",
        borderRadius: RC_INPUT.borderRadius,
        border: `1px solid ${border}`,
        background: bg,
        opacity: disabled ? 0.5 : 1,
        overflow: "hidden",
      }}>
        {/* Country code prefix */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "12px 12px 12px 16px",
          borderRight: `1px solid ${border}`,
          cursor: disabled ? "not-allowed" : "pointer",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>🇳🇬</span>
          <span style={{ fontFamily: RC_INPUT.font.family, fontSize: 14, color: textColor, fontWeight: 500 }}>+234</span>
          <CaretDown size={12} color={RC_INPUT.text.placeholder} />
        </div>

        {/* Phone number field */}
        <input
          type="tel"
          placeholder={disabled ? "" : "800 000 0000"}
          disabled={disabled}
          defaultValue={["focused", "success", "error"].includes(state) ? "803 456 7890" : ""}
          readOnly
          style={{
            flex: 1, border: 0, background: "transparent", outline: "none",
            padding: `${RC_INPUT.paddingY} ${RC_INPUT.paddingX}`,
            fontFamily: RC_INPUT.font.family,
            fontSize: RC_INPUT.font.inputSize,
            color: textColor,
            cursor: disabled ? "not-allowed" : "text",
          }}
        />

        {state === "success" && (
          <Check size={18} color={RC_INPUT.border.success} style={{ paddingRight: 14 }} />
        )}
      </div>

      <span style={{ fontFamily: RC_INPUT.font.family, fontSize: RC_INPUT.font.helpSize, lineHeight: RC_INPUT.font.helpLineHeight, color: hasError ? RC_INPUT.text.errorMsg : RC_INPUT.text.helpText }}>
        {hasError ? "Enter a valid Nigerian phone number." : "We'll send a verification code to this number."}
      </span>
    </div>
  );
}

const reactSnippet = `// RcContactInput.jsx — ReadyCash Contact Input (React)
// Figma: Input Fields 350:10987 · requires readycash-tokens.css
// Icons: @phosphor-icons/react

const COUNTRIES = [
  { code: "NG", dial: "+234", flag: "🇳🇬" },
  { code: "GH", dial: "+233", flag: "🇬🇭" },
  { code: "KE", dial: "+254", flag: "🇰🇪" },
];

export default function RcContactInput({
  label = "Phone number",
  theme = "outline",   // "outline" | "filled"
  state = "default",   // "default" | "focused" | "error" | "success" | "disabled"
  helpText, errorMsg, mandatory = false,
  countryCode = "NG",
  onCountryChange, value, onChange,
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const disabled = state === "disabled";
  const hasError  = state === "error";

  const BORDER = { default: "#9ea2b3", focused: "#3e414c", error: "#e62e2e",
                   success: "#069952", disabled: "#9ea2b3" };
  const BG = theme === "filled"
    ? { default: "#f6f7f9", focused: "#f5f8ff", error: "rgba(255,230,230,0.6)",
        success: "rgba(230,255,243,0.6)", disabled: "#f6f7f9" }
    : {};

  const country = COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0];
  const borderColor = BORDER[state];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {label && (
        <label style={{ font: "600 14px/1.6 'Noto Sans',sans-serif",
                        color: hasError ? "#e62e2e" : "#141519" }}>
          {label}{mandatory && <span aria-hidden="true"> *</span>}
        </label>
      )}
      <div style={{
        display: "flex", alignItems: "center",
        border: \`1px solid \${borderColor}\`,
        borderRadius: 4,
        background: BG[state] || "transparent",
        opacity: disabled ? 0.5 : 1,
        overflow: "hidden",
        position: "relative",
      }}>
        {/* prefix dropdown */}
        <button
          type="button"
          onClick={() => !disabled && setPickerOpen(o => !o)}
          disabled={disabled}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "12px 10px 12px 16px",
            borderRight: \`1px solid \${borderColor}\`,
            background: "transparent", border: 0, cursor: disabled ? "not-allowed" : "pointer",
            fontFamily: "'Noto Sans',sans-serif", fontSize: 14, fontWeight: 500, color: "#141519",
            flexShrink: 0,
          }}
        >
          <span>{country.flag}</span>
          <span>{country.dial}</span>
          <CaretDown size={12} color="#838799" style={{ transform: pickerOpen ? "rotate(180deg)" : "none", transition: "transform .2s ease" }} />
        </button>

        {/* number input */}
        <input
          type="tel"
          placeholder="800 000 0000"
          value={value}
          onChange={onChange}
          disabled={disabled}
          style={{
            flex: 1, border: 0, background: "transparent", outline: "none",
            padding: "12px 16px",
            font: "400 16px/24px 'Noto Sans',sans-serif",
            color: disabled ? "#838799" : "#141519",
          }}
        />
      </div>
      {hasError && errorMsg && (
        <span style={{ font: "400 12px/16px 'Noto Sans',sans-serif", color: "#e62e2e" }}>{errorMsg}</span>
      )}
      {!hasError && helpText && (
        <span style={{ font: "400 12px/16px 'Noto Sans',sans-serif", color: "#6b6f80" }}>{helpText}</span>
      )}
    </div>
  );
}`;

const flutterSnippet = `// rc_contact_input.dart — ReadyCash Contact Input (Flutter)
import 'package:flutter/material.dart';
import 'readycash_tokens.dart';

class _Country { const _Country(this.code, this.dial, this.flag); final String code, dial, flag; }

const _countries = [
  _Country('NG', '+234', '🇳🇬'),
  _Country('GH', '+233', '🇬🇭'),
  _Country('KE', '+254', '🇰🇪'),
];

class RcContactInput extends StatefulWidget {
  const RcContactInput({
    super.key, this.label = 'Phone number',
    this.theme = RcInputTheme.outline,
    this.state = RcInputState.idle,
    this.helpText, this.errorText,
    this.controller,
  });
  final String label;
  final RcInputTheme theme;
  final RcInputState state;
  final String? helpText, errorText;
  final TextEditingController? controller;
  @override State<RcContactInput> createState() => _RcContactInputState();
}

class _RcContactInputState extends State<RcContactInput> {
  _Country _selected = _countries.first;

  static const _border = {
    RcInputState.idle:     Color(0xFF9EA2B3),
    RcInputState.focused:  Color(0xFF3E414C),
    RcInputState.error:    Color(0xFFE62E2E),
    RcInputState.success:  Color(0xFF069952),
    RcInputState.disabled: Color(0xFF9EA2B3),
  };

  @override
  Widget build(BuildContext context) {
    final disabled = widget.state == RcInputState.disabled;
    final hasError  = widget.state == RcInputState.error;
    final borderColor = _border[widget.state]!;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min,
      children: [
        Text(widget.label,
          style: TextStyle(fontFamily: 'Noto Sans', fontSize: 14, fontWeight: FontWeight.w600,
            color: hasError ? const Color(0xFFE62E2E) : const Color(0xFF141519))),
        const SizedBox(height: 4),
        Container(
          decoration: BoxDecoration(
            color: widget.theme == RcInputTheme.filled
              ? (hasError ? const Color(0x26FF0000) : const Color(0xFFF6F7F9))
              : Colors.transparent,
            borderRadius: BorderRadius.circular(4),
            border: Border.all(color: borderColor)),
          child: Opacity(
            opacity: disabled ? 0.5 : 1.0,
            child: IntrinsicHeight(
              child: Row(children: [
                // Country picker
                PopupMenuButton<_Country>(
                  initialValue: _selected,
                  onSelected: (c) => setState(() => _selected = c),
                  enabled: !disabled,
                  itemBuilder: (_) => _countries.map((c) =>
                    PopupMenuItem(value: c, child: Text('\${c.flag} \${c.code} \${c.dial}'))).toList(),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                    child: Row(mainAxisSize: MainAxisSize.min, children: [
                      Text(_selected.flag, style: const TextStyle(fontSize: 18)),
                      const SizedBox(width: 6),
                      Text(_selected.dial,
                        style: const TextStyle(fontFamily: 'Noto Sans', fontSize: 14, fontWeight: FontWeight.w500)),
                      const Icon(Icons.arrow_drop_down, size: 16, color: Color(0xFF838799)),
                    ]),
                  ),
                ),
                VerticalDivider(color: borderColor, width: 1, thickness: 1),
                Expanded(
                  child: TextField(
                    controller: widget.controller,
                    enabled: !disabled,
                    keyboardType: TextInputType.phone,
                    style: const TextStyle(fontFamily: 'Noto Sans', fontSize: 16),
                    decoration: const InputDecoration(
                      hintText: '800 000 0000',
                      hintStyle: TextStyle(color: Color(0xFF838799)),
                      contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      border: InputBorder.none,
                    ),
                  ),
                ),
              ]),
            ),
          ),
        ),
        if (hasError && widget.errorText != null)
          Padding(padding: const EdgeInsets.only(top: 4),
            child: Text(widget.errorText!, style: const TextStyle(fontFamily: 'Noto Sans', fontSize: 12, color: Color(0xFFE62E2E)))),
        if (!hasError && widget.helpText != null)
          Padding(padding: const EdgeInsets.only(top: 4),
            child: Text(widget.helpText!, style: const TextStyle(fontFamily: 'Noto Sans', fontSize: 12, color: Color(0xFF6B6F80)))),
      ],
    );
  }
}`;

const PROPS_ROWS = [
  ["label",         "string",                                              '"Phone number"', "Field label above the input."],
  ["theme",         '"outline" | "filled"',                               '"outline"',      "Outline uses transparent bg; Filled uses light grey."],
  ["state",         '"default" | "focused" | "error" | "success" | "disabled"', '"default"', "Controls border and background."],
  ["countryCode",   "string",                                             '"NG"',           "ISO 3166-1 alpha-2 code for the selected country prefix."],
  ["onCountryChange","fn(code: string)",                                  "—",              "Called when the user picks a different country dial code."],
  ["value",         "string",                                             "—",              "Controlled phone number value (without dial prefix)."],
  ["onChange",      "fn(e)",                                              "—",              "Input change handler."],
  ["helpText",      "string",                                             "—",              "Shown below in default/focused/success states."],
  ["errorMsg",      "string",                                             "—",              "Shown below in error state."],
];

const ROW = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 2px", borderBottom: "1px solid var(--pk-line-soft)" };

export default function InputsContact({ fw, setFw }) {
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [theme, setTheme] = useState("outline");
  const [state, setState] = useState("default");

  const code  = fw === "flutter" ? flutterSnippet : reactSnippet;
  const label = fw === "flutter" ? "rc_contact_input.dart" : fw === "vue" ? "RcContactInput.vue" : "RcContactInput.jsx";

  return (
    <>
      <Lead>
        A phone number input with an integrated country-code prefix selector.
        The left portion is a compact dropdown showing the flag and dial code;
        the right portion is a standard text field. Both share the same border
        and background token driven by theme and state.
        Specs from Figma node 350:10987.
      </Lead>

      <SectionHeader label="Playground" desc="Toggle theme and state to preview the contact input." />
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
        <LiveContact theme={theme} state={state} />
      </PreviewStage>

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

      <SectionHeader label="Usage guidance" />
      <div className="ph-guidance">
        <div>
          <p className="ph-guidehead"><span className="ph-dot ok" />Do</p>
          <ul className="ph-guidelist">
            <li>Default the prefix to NG (+234) for Nigerian users.</li>
            <li>Strip the dial code before storing; re-apply it on display.</li>
            <li>Format the number with spaces as the user types (e.g. 803 456 7890).</li>
          </ul>
        </div>
        <div>
          <p className="ph-guidehead"><span className="ph-dot err" />Don't</p>
          <ul className="ph-guidelist">
            <li>Don't allow letters in the number field — restrict to digits and spaces.</li>
            <li>Don't mix Outline and Filled themes within the same form.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
