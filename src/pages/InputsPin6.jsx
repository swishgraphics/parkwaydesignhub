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
  const activeBorder = focused ? `2px solid ${borderColor}` : `1px solid ${borderColor}`;
  const bg = state === "disabled" ? RC_INPUT.background.filledDefault
    : state === "error" ? RC_INPUT.background.filledError
    : state === "success" ? RC_INPUT.background.filledSuccess
    : "transparent";

  return (
    <div style={{
      width: 48, height: 56,
      border: activeBorder,
      borderRadius: RC_INPUT.borderRadius,
      background: bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "border-color .15s, background .15s",
      opacity: state === "disabled" ? 0.5 : 1,
    }}>
      {filled && (
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: state === "error" ? RC_INPUT.border.error
            : state === "success" ? RC_INPUT.border.success
            : RC_INPUT.text.input,
        }} />
      )}
      {focused && !filled && (
        <div style={{ width: 2, height: 20, background: RC_INPUT.border.focused, borderRadius: 1, animation: "none" }} />
      )}
    </div>
  );
}

function LivePin6({ state }) {
  const FILL_COUNT = { empty: 0, partial: 3, filled: 6, error: 6, success: 6, disabled: 0 };
  const FOCUS_INDEX = { partial: 3 };
  const filled = FILL_COUNT[state];
  const focusIdx = FOCUS_INDEX[state] ?? -1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
      <div style={{ display: "flex", gap: 8 }}>
        {[0,1,2,3,4,5].map(i => (
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
          PIN accepted.
        </span>
      )}
    </div>
  );
}

const reactSnippet = `// RcPinInput.jsx — ReadyCash PIN Input 6 Digits (React)
import { useRef, useState } from "react";
import "./readycash-tokens.css";

export default function RcPinInput({
  digits = 6,
  value = "",
  onChange,
  state = "idle",  // "idle" | "error" | "success" | "disabled"
}) {
  const refs = Array.from({ length: digits }, () => useRef(null));
  const [focused, setFocused] = useState(-1);
  const arr  = value.padEnd(digits, "").split("").slice(0, digits);
  const disabled = state === "disabled";

  const BORDER = { idle: "#9ea2b3", error: "#e62e2e", success: "#069952", disabled: "#9ea2b3" };
  const BG     = { error: "rgba(255,230,230,0.6)", success: "rgba(230,255,243,0.6)" };

  const handleKey = (e, i) => {
    if (e.key === "Backspace") {
      const next = value.slice(0, i === 0 ? 0 : i - 1) + value.slice(i);
      onChange(next);
      if (i > 0) refs[i - 1].current?.focus();
    } else if (/^[0-9]$/.test(e.key)) {
      const next = (value.slice(0, i) + e.key + value.slice(i + 1)).slice(0, digits);
      onChange(next);
      if (i < digits - 1) refs[i + 1].current?.focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {arr.map((ch, i) => (
        <input
          key={i} ref={refs[i]} type="text" inputMode="numeric"
          maxLength={1} value={ch || ""} readOnly
          onKeyDown={e => handleKey(e, i)}
          onFocus={() => setFocused(i)}
          onBlur={() => setFocused(-1)}
          disabled={disabled}
          style={{
            width: 48, height: 56, textAlign: "center", fontSize: 20,
            border: \`\${focused === i ? "2" : "1"}px solid \${BORDER[state]}\`,
            borderRadius: 4, background: BG[state] || "transparent",
            fontFamily: "'Noto Sans', sans-serif",
            color: "#141519", outline: "none",
            opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "text",
          }}
        />
      ))}
    </div>
  );
}`;

const flutterSnippet = `// rc_pin_input.dart — ReadyCash PIN Input 6 Digits (Flutter)
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'readycash_tokens.dart';

enum RcPinState { idle, error, success, disabled }

class RcPinInput extends StatefulWidget {
  const RcPinInput({
    super.key, this.digits = 6,
    this.onCompleted, this.state = RcPinState.idle,
  });
  final int digits;
  final ValueChanged<String>? onCompleted;
  final RcPinState state;
  @override State<RcPinInput> createState() => _RcPinInputState();
}

class _RcPinInputState extends State<RcPinInput> {
  late final List<TextEditingController> _ctrls;
  late final List<FocusNode> _nodes;

  @override
  void initState() {
    super.initState();
    _ctrls = List.generate(widget.digits, (_) => TextEditingController());
    _nodes = List.generate(widget.digits, (_) => FocusNode());
  }

  @override
  void dispose() {
    for (final c in _ctrls) c.dispose();
    for (final n in _nodes) n.dispose();
    super.dispose();
  }

  static const _border = {
    RcPinState.idle:     Color(0xFF9EA2B3),
    RcPinState.error:    Color(0xFFE62E2E),
    RcPinState.success:  Color(0xFF069952),
    RcPinState.disabled: Color(0xFF9EA2B3),
  };

  @override
  Widget build(BuildContext context) {
    final disabled = widget.state == RcPinState.disabled;
    final borderColor = _border[widget.state]!;
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(widget.digits, (i) => Padding(
        padding: EdgeInsets.only(right: i < widget.digits - 1 ? 8 : 0),
        child: SizedBox(
          width: 48, height: 56,
          child: TextField(
            controller: _ctrls[i],
            focusNode: _nodes[i],
            enabled: !disabled,
            maxLength: 1,
            textAlign: TextAlign.center,
            keyboardType: TextInputType.number,
            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
            obscureText: true,
            style: const TextStyle(fontFamily: 'Noto Sans', fontSize: 20),
            decoration: InputDecoration(
              counterText: "",
              filled: widget.state == RcPinState.error || widget.state == RcPinState.success,
              fillColor: widget.state == RcPinState.error
                ? const Color(0x26FF0000)
                : const Color(0x26069952),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(4),
                borderSide: BorderSide(color: borderColor)),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(4),
                borderSide: BorderSide(color: borderColor, width: 2)),
            ),
            onChanged: (v) {
              if (v.isNotEmpty && i < widget.digits - 1) {
                _nodes[i + 1].requestFocus();
              }
              final full = _ctrls.map((c) => c.text).join();
              if (full.length == widget.digits) widget.onCompleted?.call(full);
            },
          ),
        ),
      )),
    );
  }
}`;

const PROPS_ROWS = [
  ["digits",       "number",                              "6",          "Number of PIN digits (use 4 for the 4-digit variant)."],
  ["value",        "string",                              '""',         "Current PIN string — one character per digit box."],
  ["onChange",     "fn(value: string)",                  "—",          "Called on every keystroke with the updated PIN string."],
  ["onCompleted",  "fn(pin: string) (Flutter)",          "—",          "Called when all boxes are filled (Flutter only)."],
  ["state",        '"idle" | "error" | "success" | "disabled"', '"idle"', "Controls border colour and background tint."],
];

const ROW = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 2px", borderBottom: "1px solid var(--pk-line-soft)" };

export default function InputsPin6({ fw, setFw }) {
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [state, setState] = useState("empty");

  const code  = fw === "flutter" ? flutterSnippet : reactSnippet;
  const label = fw === "flutter" ? "rc_pin_input.dart" : "RcPinInput.jsx";

  return (
    <>
      <Lead>
        A 6-digit PIN input rendered as a row of individual single-character boxes.
        Each box shows an empty cursor, a masked bullet when filled, and adapts its border
        and background to the current state. Supports Outline style only — the compact,
        fixed-width format doesn't use the Filled theme.
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
        <LivePin6 state={state} />
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

      <SectionHeader label="Usage guidance" />
      <div className="ph-guidance">
        <div>
          <p className="ph-guidehead"><span className="ph-dot ok" />Do</p>
          <ul className="ph-guidelist">
            <li>Auto-advance focus to the next box on each digit entry.</li>
            <li>Mask the entered value immediately with a bullet character.</li>
            <li>Show a single error message below the row — not per-box labels.</li>
          </ul>
        </div>
        <div>
          <p className="ph-guidehead"><span className="ph-dot err" />Don't</p>
          <ul className="ph-guidelist">
            <li>Don't allow non-numeric input — restrict to digits only.</li>
            <li>Don't reveal the PIN characters on re-focus after entry.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
