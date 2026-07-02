import { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/csr/MagnifyingGlass";
import { X }               from "@phosphor-icons/react/dist/csr/X";
import { FRAMEWORKS } from "../tokens.js";
import { RC_INPUT } from "../readycash-tokens.js";
import { useTheme } from "../theme.jsx";
import { Lead, SectionHeader, Tabs, CodeBlock, PreviewStage, ModeRow } from "../components/primitives.jsx";

const STATE_TABS = [
  ["default", "Default"],
  ["focused", "Focused"],
  ["typing",  "Typing"],
  ["filled",  "Filled"],
];

const BORDER_COLOR = {
  default: RC_INPUT.border.default,
  focused: RC_INPUT.border.focused,
  typing:  RC_INPUT.border.focused,
  filled:  RC_INPUT.border.focused,
};

const SAMPLE_RESULTS = ["Transfer to beneficiary", "Transaction history", "Top up airtime"];

function LiveSearch({ state }) {
  const showValue  = ["typing", "filled"].includes(state);
  const showClear  = ["typing", "filled"].includes(state);
  const showResults = state === "typing";
  const border = BORDER_COLOR[state];
  const bg = state === "default" ? RC_INPUT.background.filledDefault : RC_INPUT.background.filledFocused;

  return (
    <div style={{ width: 360, maxWidth: "100%", position: "relative" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 14px",
        borderRadius: RC_INPUT.borderRadius,
        border: `1px solid ${border}`,
        background: bg,
        transition: "border-color .15s, background .15s",
      }}>
        <MagnifyingGlass size={18} color={RC_INPUT.text.placeholder} style={{ flexShrink: 0 }} />
        <input
          type="search"
          placeholder="Search..."
          readOnly
          value={showValue ? "Transfer" : ""}
          style={{
            flex: 1, border: 0, background: "transparent", outline: "none",
            fontFamily: RC_INPUT.font.family,
            fontSize: RC_INPUT.font.inputSize,
            color: RC_INPUT.text.input,
          }}
        />
        {showClear && (
          <button type="button" style={{
            width: 22, height: 22, borderRadius: "50%",
            background: RC_INPUT.text.placeholder, border: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#fff", fontSize: 11, flexShrink: 0,
          }} aria-label="Clear search">
            <X size={11} color="#fff" />
          </button>
        )}
      </div>

      {showResults && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: "var(--pk-surface)", border: `1px solid ${RC_INPUT.border.focused}`,
          borderRadius: RC_INPUT.borderRadius,
          boxShadow: "0 8px 16px rgba(0,0,0,.1)", zIndex: 10, overflow: "hidden",
        }}>
          {SAMPLE_RESULTS.map((r, i) => (
            <div key={r} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "11px 14px",
              borderBottom: i < SAMPLE_RESULTS.length - 1 ? `1px solid ${RC_INPUT.border.default}22` : "none",
              fontFamily: RC_INPUT.font.family, fontSize: 15,
              color: RC_INPUT.text.input, cursor: "pointer",
            }}>
              <MagnifyingGlass size={14} color={RC_INPUT.text.placeholder} />
              {r}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const reactSnippet = `// RcSearchInput.jsx — ReadyCash Search Bar (React)
// Figma: Input Fields 350:12586 · requires readycash-tokens.css
// Icons: import { MagnifyingGlass, X } from "@phosphor-icons/react"

export default function RcSearchInput({
  placeholder = "Search…",
  value = "",
  onChange,
  onClear,
  suggestions = [],
  showSuggestions = false,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const hasClear = value.length > 0;

  const border = focused ? "#3e414c" : "#9ea2b3";
  const bg = focused ? "#f5f8ff" : "#f6f7f9";

  return (
    <div style={{ position: "relative" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 14px", borderRadius: 4,
        border: \`1px solid \${border}\`, background: bg,
        transition: "border-color .15s, background .15s",
      }}>
        <MagnifyingGlass size={18} color="#838799" />
        <input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, border: 0, background: "transparent", outline: "none",
            font: "400 16px/24px 'Noto Sans', sans-serif",
            color: "#141519",
          }}
          {...rest}
        />
        {hasClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            style={{
              width: 22, height: 22, borderRadius: "50%",
              background: "#838799", border: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#fff", fontSize: 11,
            }}
          >
            <X size={11} color="#fff" />
          </button>
        )}
      </div>

      {showSuggestions && focused && suggestions.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: "#fff", border: "1px solid #3e414c",
          borderRadius: 4, boxShadow: "0 8px 16px rgba(0,0,0,.1)", zIndex: 10,
        }}>
          {suggestions.map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "11px 14px", cursor: "pointer",
              fontFamily: "'Noto Sans', sans-serif", fontSize: 15,
              borderBottom: i < suggestions.length - 1 ? "1px solid #9ea2b322" : "none",
            }}>
              <MagnifyingGlass size={14} color="#838799" />
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`;

const flutterSnippet = `// rc_search_input.dart — ReadyCash Search Bar (Flutter)
import 'package:flutter/material.dart';
import 'readycash_tokens.dart';

class RcSearchInput extends StatefulWidget {
  const RcSearchInput({
    super.key,
    this.placeholder = 'Search…',
    this.suggestions = const [],
    this.onSearch,
    this.onClear,
  });
  final String placeholder;
  final List<String> suggestions;
  final ValueChanged<String>? onSearch;
  final VoidCallback? onClear;
  @override State<RcSearchInput> createState() => _RcSearchInputState();
}

class _RcSearchInputState extends State<RcSearchInput> {
  final _ctrl = TextEditingController();
  bool _focused = false;

  @override
  Widget build(BuildContext context) {
    final hasClear = _ctrl.text.isNotEmpty;
    final borderColor = _focused ? const Color(0xFF3E414C) : const Color(0xFF9EA2B3);
    final bg = _focused ? const Color(0xFFF5F8FF) : const Color(0xFFF6F7F9);

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          decoration: BoxDecoration(
            color: bg,
            borderRadius: BorderRadius.circular(4),
            border: Border.all(color: borderColor)),
          child: Row(children: [
            const Padding(
              padding: EdgeInsets.only(left: 14),
              child: Icon(Icons.search, color: Color(0xFF838799), size: 22)),
            Expanded(
              child: Focus(
                onFocusChange: (f) => setState(() => _focused = f),
                child: TextField(
                  controller: _ctrl,
                  onChanged: widget.onSearch,
                  style: const TextStyle(fontFamily: 'Noto Sans', fontSize: 16),
                  decoration: InputDecoration(
                    hintText: widget.placeholder,
                    hintStyle: const TextStyle(color: Color(0xFF838799)),
                    contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 11),
                    border: InputBorder.none,
                  ),
                ),
              ),
            ),
            if (hasClear)
              IconButton(
                icon: const CircleAvatar(
                  radius: 11, backgroundColor: Color(0xFF838799),
                  child: Icon(Icons.close, size: 13, color: Colors.white)),
                onPressed: () { _ctrl.clear(); widget.onClear?.call(); setState(() {}); },
              ),
          ]),
        ),
        if (_focused && widget.suggestions.isNotEmpty)
          Container(
            margin: const EdgeInsets.only(top: 4),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(4),
              border: Border.all(color: const Color(0xFF3E414C)),
              boxShadow: const [BoxShadow(color: Color(0x1A000000), blurRadius: 16, offset: Offset(0, 8))]),
            child: Column(children: widget.suggestions.asMap().entries.map((e) => ListTile(
              leading: const Icon(Icons.search, size: 18, color: Color(0xFF838799)),
              title: Text(e.value, style: const TextStyle(fontFamily: 'Noto Sans', fontSize: 15)),
              dense: true,
              onTap: () { _ctrl.text = e.value; widget.onSearch?.call(e.value); },
            )).toList()),
          ),
      ],
    );
  }
}`;

const PROPS_ROWS = [
  ["placeholder",    "string",       '"Search…"', "Ghost text shown when the field is empty."],
  ["value",          "string",       '""',        "Controlled search string."],
  ["onChange",       "fn(e)",        "—",         "Input change handler — update value on each keystroke."],
  ["onClear",        "fn()",         "—",         "Called when the user clicks the × clear button."],
  ["suggestions",    "string[]",     "[]",        "Autocomplete results shown in a panel below the field."],
  ["showSuggestions","boolean",      "false",     "Whether to render the suggestions panel when focused."],
];

const ROW = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 2px", borderBottom: "1px solid var(--pk-line-soft)" };

export default function InputsSearch({ fw, setFw }) {
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [state, setState] = useState("default");

  const code  = fw === "flutter" ? flutterSnippet : reactSnippet;
  const label = fw === "flutter" ? "rc_search_input.dart" : fw === "vue" ? "RcSearchInput.vue" : "RcSearchInput.jsx";

  return (
    <>
      <Lead>
        A compact search field with a leading magnifying-glass icon and an inline clear button
        that appears once the user starts typing. An optional suggestions panel renders below
        the field while focused. Uses the Filled theme only — the search bar always sits on a
        surface background. Specs from Figma node 350:12586.
      </Lead>

      <SectionHeader label="Playground" />
      <div style={{ border: "1px solid var(--pk-line)", borderRadius: 12, padding: "2px 18px", marginTop: 6 }}>
        <ModeRow mode={mode} setMode={setMode} />
        <div style={{ ...ROW, borderBottom: 0 }}>
          <span className="ph-rowlabel">State</span>
          <Tabs small value={state} onChange={setState} label="State" items={STATE_TABS} />
        </div>
      </div>

      <PreviewStage mode={mode} tall stageStyle={{ display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible", minHeight: state === "typing" ? 220 : undefined }}>
        <LiveSearch state={state} />
      </PreviewStage>

      <SectionHeader label="State tokens" />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
        {[
          { label: "Default border",  value: RC_INPUT.border.default },
          { label: "Focused border",  value: RC_INPUT.border.focused },
          { label: "Default bg",      value: RC_INPUT.background.filledDefault },
          { label: "Focused bg",      value: RC_INPUT.background.filledFocused },
        ].map(({ label: l, value }) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 8, border: "1px solid var(--pk-line)", background: "var(--pk-surface-raised)" }}>
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: value, flexShrink: 0, border: "1px solid var(--pk-line)" }} />
            <span className="ph-rowlabel">{l}</span>
            <code style={{ fontSize: 12, color: "var(--pk-text-faint)" }}>{value}</code>
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
            <li>Trigger search on every keystroke (debounced) — not only on submit.</li>
            <li>Show the clear button as soon as input is non-empty.</li>
            <li>Limit suggestion results to 5–7 items to keep the panel scannable.</li>
          </ul>
        </div>
        <div>
          <p className="ph-guidehead"><span className="ph-dot err" />Don't</p>
          <ul className="ph-guidelist">
            <li>Don't add a visible label — the magnifying glass icon is self-explanatory.</li>
            <li>Don't show the suggestions panel before the user types at least 2 characters.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
