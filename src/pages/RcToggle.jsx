import { useState } from "react";
import { FRAMEWORKS } from "../tokens.js";
import { useTheme } from "../theme.jsx";
import { Lead, SectionHeader, Tabs, CodeBlock, PreviewStage, ModeRow } from "../components/primitives.jsx";

// ─── Token reference ───────────────────────────────────────────────────────
// ON  track : #FAAA89 (primary-50 tangerine) — direct from Figma node 29767:419932
// OFF track : #DDDDDD light / #3A3A38 dark
// Disabled  : #FDD5C4 (tangerine-04 — non-interactive)
// Knob      : 27×27 white pill, shadow matches Figma exactly
// Size      : 52×31, padding 2px, knob travel = 52 - 2×2 - 27 = 21px

const ROW = {
  display: "flex", alignItems: "center", justifyContent: "space-between",
  gap: 14, padding: "14px 2px",
};

function LiveToggle({ state, dark, onFlip }) {
  const on = state === "on";
  const disabled = state === "disabled";
  const offTrack = dark ? "#3A3A38" : "#DDDDDD";
  const track = disabled ? "#FDD5C4" : on ? "#FAAA89" : offTrack;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={onFlip}
      style={{
        width: 52, height: 31, border: 0, borderRadius: 999, padding: 2,
        background: track, cursor: disabled ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center",
        transition: "background .2s ease",
        outline: "none",
      }}
    >
      <span style={{
        width: 27, height: 27, borderRadius: "50%", background: "#FFFFFF",
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.04), 0px 3px 8px 0px rgba(0,0,0,0.15), 0px 3px 1px 0px rgba(0,0,0,0.06)",
        transform: on ? "translateX(21px)" : "translateX(0)",
        transition: "transform .2s ease",
        flexShrink: 0,
      }} />
    </button>
  );
}

// ─── Code snippets ────────────────────────────────────────────────────────
const rcToggleReact = `// RcToggle.jsx
import { useState } from "react";

export default function RcToggle({ checked = false, onChange, disabled = false }) {
  const trackColor = disabled ? "#FDD5C4" : checked ? "#FAAA89" : "#DDDDDD";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      style={{
        width: 52, height: 31, border: 0, borderRadius: 999, padding: 2,
        background: trackColor, cursor: disabled ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", transition: "background .2s ease",
      }}
    >
      <span style={{
        width: 27, height: 27, borderRadius: "50%", background: "#fff",
        boxShadow: "0 3px 8px rgba(0,0,0,.15), 0 3px 1px rgba(0,0,0,.06)",
        transform: checked ? "translateX(21px)" : "translateX(0)",
        transition: "transform .2s ease", flexShrink: 0,
      }} />
    </button>
  );
}`;

const rcToggleVue = `<!-- RcToggle.vue -->
<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :disabled="disabled"
    @click="toggle"
    class="rc-toggle"
    :class="{ 'rc-toggle--on': modelValue, 'rc-toggle--disabled': disabled }"
  >
    <span class="rc-toggle__knob" />
  </button>
</template>

<script setup>
const props = defineProps({ modelValue: Boolean, disabled: Boolean });
const emit = defineEmits(["update:modelValue"]);
const toggle = () => !props.disabled && emit("update:modelValue", !props.modelValue);
</script>

<style scoped>
.rc-toggle {
  width: 52px; height: 31px; border: none; border-radius: 999px;
  padding: 2px; background: #dddddd; cursor: pointer;
  display: flex; align-items: center; transition: background .2s ease;
}
.rc-toggle--on       { background: #faaa89; }
.rc-toggle--disabled { background: #fdd5c4; cursor: not-allowed; }
.rc-toggle__knob {
  width: 27px; height: 27px; border-radius: 50%; background: #fff;
  box-shadow: 0 3px 8px rgba(0,0,0,.15), 0 3px 1px rgba(0,0,0,.06);
  transition: transform .2s ease; flex-shrink: 0;
}
.rc-toggle--on .rc-toggle__knob { transform: translateX(21px); }
</style>`;

const rcToggleFlutter = `// rc_toggle.dart
import 'package:flutter/material.dart';

class RcToggle extends StatefulWidget {
  final bool value;
  final ValueChanged<bool>? onChanged;
  const RcToggle({super.key, required this.value, this.onChanged});

  @override
  State<RcToggle> createState() => _RcToggleState();
}

class _RcToggleState extends State<RcToggle>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  late final Animation<double> _pos;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this, duration: const Duration(milliseconds: 200));
    _pos = Tween<double>(begin: 0, end: 21).animate(
      CurvedAnimation(parent: _ctrl, curve: Curves.easeInOut));
    if (widget.value) _ctrl.value = 1;
  }

  @override
  void didUpdateWidget(covariant RcToggle old) {
    super.didUpdateWidget(old);
    widget.value ? _ctrl.forward() : _ctrl.reverse();
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final disabled = widget.onChanged == null;
    final on = widget.value;
    return GestureDetector(
      onTap: disabled ? null : () => widget.onChanged!(!on),
      child: AnimatedBuilder(
        animation: _pos,
        builder: (_, __) {
          final trackColor = disabled
              ? const Color(0xFFFDD5C4)
              : on
                  ? const Color(0xFFFAAA89)
                  : const Color(0xFFDDDDDD);
          return Container(
            width: 52, height: 31,
            padding: const EdgeInsets.all(2),
            decoration: BoxDecoration(
              color: trackColor,
              borderRadius: BorderRadius.circular(999),
            ),
            child: Stack(
              children: [
                Positioned(
                  left: _pos.value,
                  top: 0, bottom: 0,
                  child: Container(
                    width: 27, height: 27,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(.15),
                          blurRadius: 8,
                          offset: const Offset(0, 3),
                        ),
                        BoxShadow(
                          color: Colors.black.withOpacity(.06),
                          blurRadius: 1,
                          offset: const Offset(0, 3),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}`;

function usageSnippet(fw, state, isOn) {
  const checked = isOn ? "true" : "false";
  if (fw === "react") {
    return `import { useState } from "react";
import RcToggle from "./RcToggle";

export default function Example() {
  const [on, setOn] = useState(${checked});
  return (
    <RcToggle
      checked={on}
      onChange={setOn}${state === "disabled" ? "\n      disabled" : ""}
    />
  );
}`;
  }
  if (fw === "vue") {
    return `<template>
  <RcToggle v-model="on"${state === "disabled" ? " disabled" : ""} />
</template>

<script setup>
import { ref } from "vue";
import RcToggle from "./RcToggle.vue";
const on = ref(${checked});
</script>`;
  }
  return `RcToggle(
  value: ${checked},${state === "disabled" ? "\n  onChanged: null, // disabled" : "\n  onChanged: (v) => setState(() => on = v),"}
)`;
}

const STATES = [
  ["off",      "Off",      "Grey track, knob left — toggle is inactive."],
  ["on",       "On",       "Tangerine-50 (#FAAA89) track, knob right — toggle is active."],
  ["disabled", "Disabled", "Tangerine-04 (#FDD5C4) track, non-interactive."],
];

const PROPS_ROWS = [
  ["checked / value",    "boolean",  "false", "Controlled on/off state. Vue uses v-model; Flutter uses value."],
  ["onChange / onChanged", "function", "—",  "Fires with the next boolean. Flutter: pass null to disable."],
  ["disabled",           "boolean",  "false", "#FDD5C4 track, pointer-events off, aria-disabled set."],
];

const IMPL = { react: rcToggleReact, vue: rcToggleVue, flutter: rcToggleFlutter };
const IMPL_LABEL = {
  react: "RcToggle.jsx",
  vue: "RcToggle.vue",
  flutter: "rc_toggle.dart",
};

export default function RcToggle({ fw, setFw }) {
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [state, setState] = useState("on");
  const flip = () => setState((s) => (s === "on" ? "off" : "on"));

  return (
    <>
      <Lead>
        52×31 pill switch. Grey track when off, Tangerine-50 when on, 27px
        white knob with a subtle drop shadow. The preview is interactive — click
        the toggle or force a state below.
      </Lead>

      <SectionHeader label="Playground" desc="Click the toggle or force a state below." />
      <div style={{ border: "1px solid var(--pk-line)", borderRadius: 12, padding: "2px 18px", marginTop: 6 }}>
        <ModeRow mode={mode} setMode={setMode} />
        <div style={ROW}>
          <span className="ph-rowlabel">State</span>
          <Tabs small value={state} onChange={setState} label="State"
            items={STATES.map(([k, n]) => [k, n])} />
        </div>
      </div>

      <PreviewStage mode={mode} tall>
        <LiveToggle state={state} dark={mode === "dark"} onFlip={flip} />
      </PreviewStage>

      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock code={usageSnippet(fw, state, state === "on")} label="Usage — reflects the control above" />
      <CodeBlock code={IMPL[fw]} label={IMPL_LABEL[fw]} />

      <SectionHeader label="States" />
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 32 }}>
        {STATES.map(([k]) => (
          <div key={k} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <LiveToggle state={k} onFlip={() => {}} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ font: "600 13px var(--pk-sans)", color: "var(--pk-text)" }}>
                {STATES.find(([id]) => id === k)[1]}
              </span>
              <span style={{ font: "400 13px var(--pk-sans)", color: "var(--pk-text-muted)" }}>
                {STATES.find(([id]) => id === k)[2]}
              </span>
            </div>
          </div>
        ))}
      </div>

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

      <SectionHeader label="Usage guidelines" />
      <div className="ph-guidance">
        <div>
          <p className="ph-guidehead"><span className="ph-dot ok" aria-hidden="true" />Do</p>
          <ul className="ph-guidelist">
            <li>Use for an instant on/off setting with no save step.</li>
            <li>Label what the toggle controls directly beside it.</li>
            <li>Apply the change immediately on tap.</li>
          </ul>
        </div>
        <div>
          <p className="ph-guidehead"><span className="ph-dot err" aria-hidden="true" />Don't</p>
          <ul className="ph-guidelist">
            <li>Don't use where the change needs a confirm/submit — use a checkbox instead.</li>
            <li>Don't use for more than two mutually exclusive states.</li>
            <li>Don't rely on track colour alone — pair with a visible label.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
