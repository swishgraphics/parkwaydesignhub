import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/csr/CheckCircle";
import { XCircle }     from "@phosphor-icons/react/dist/csr/XCircle";
import { FRAMEWORKS } from "../tokens.js";
import { useTheme } from "../theme.jsx";
import { Lead, SectionHeader, Tabs, CodeBlock, PreviewStage, ModeRow } from "../components/primitives.jsx";

const TOAST_CONFIG = {
  success: {
    Icon: CheckCircle,
    iconColor: "#069952",
    textColor: "#292B33",
    message: "Receipt downloaded successfully",
    label: "Success",
    desc: "Confirms a completed action. Auto-dismiss after 3–5 s.",
    role: "status",
  },
  error: {
    Icon: XCircle,
    iconColor: "#CC0000",
    textColor: "#292B33",
    message: "Receipt not downloaded",
    label: "Error",
    desc: "Signals a failed action. Persist until the user dismisses.",
    role: "alert",
  },
  warning: {
    Icon: XCircle,
    iconColor: "#CC0000",
    textColor: "#CC0000",
    message: "Incorrect PIN. Your account has been restricted for 120 seconds.",
    label: "Warning",
    desc: "Severe error — full red text for emphasis. Persist; never auto-dismiss.",
    role: "alert",
  },
};

const TOAST_STYLE = {
  display: "flex", alignItems: "center", gap: 6,
  padding: "20px 16px",
  borderRadius: 12,
  background: "#FEFDFA",
  boxShadow: "var(--rc-shadow-lg)",
  width: 335, maxWidth: "100%",
};

function RcToastPreview({ variant }) {
  const { Icon, iconColor, textColor, message, role } = TOAST_CONFIG[variant];
  return (
    <div style={TOAST_STYLE} role={role}>
      <Icon size={24} color={iconColor} weight="duotone" style={{ flexShrink: 0 }} />
      <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: 14, lineHeight: "20px", color: textColor }}>
        {message}
      </span>
    </div>
  );
}

const RC_REACT = `// RcToast.jsx — ReadyCash Toast (React)
import { CheckCircle, XCircle } from "@phosphor-icons/react";

const CONFIG = {
  success: { Icon: CheckCircle, iconColor: "#069952", textColor: "#292B33" },
  error:   { Icon: XCircle,    iconColor: "#CC0000", textColor: "#292B33" },
  warning: { Icon: XCircle,    iconColor: "#CC0000", textColor: "#CC0000" },
};

export default function RcToast({ variant = "success", message, ...rest }) {
  const { Icon, iconColor, textColor } = CONFIG[variant];
  return (
    <div
      role={variant === "success" ? "status" : "alert"}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "20px 16px", borderRadius: 12,
        background: "#FEFDFA",
        boxShadow: "var(--rc-shadow-lg)",
      }}
      {...rest}
    >
      <Icon size={24} color={iconColor} weight="duotone" style={{ flexShrink: 0 }} />
      <span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 600, fontSize: 14,
                     lineHeight: "20px", color: textColor }}>
        {message}
      </span>
    </div>
  );
}`;

const RC_VUE = `<!-- RcToast.vue — ReadyCash Toast (Vue 3) -->
<script setup>
import { computed } from "vue";
import { CheckCircle, XCircle } from "@phosphor-icons/vue";

const props = defineProps({
  variant: { type: String, default: "success" }, // success | error | warning
  message: String,
});

const config = computed(() => ({
  success: { icon: CheckCircle, iconColor: "#069952", textColor: "#292B33" },
  error:   { icon: XCircle,    iconColor: "#CC0000", textColor: "#292B33" },
  warning: { icon: XCircle,    iconColor: "#CC0000", textColor: "#CC0000" },
}[props.variant]));

const role = computed(() => props.variant === "success" ? "status" : "alert");
</script>

<template>
  <div :role="role" class="rc-toast">
    <component :is="config.icon" :size="24" :color="config.iconColor" weight="duotone" />
    <span :style="{ color: config.textColor }">{{ message }}</span>
  </div>
</template>

<style scoped>
.rc-toast {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 20px 16px;
  border-radius: 12px;
  background: #fefdfa;
  box-shadow: 0 20px 25px -5px rgba(18,18,18,.10), 0 8px 10px -6px rgba(18,18,18,.10); /* --rc-shadow-lg */
  font: 600 14px/20px Manrope, sans-serif;
}
</style>`;

const RC_FLUTTER = `// rc_toast.dart — ReadyCash Toast (Flutter)
import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

enum RcToastVariant { success, error, warning }

class RcToast extends StatelessWidget {
  const RcToast({
    super.key,
    required this.variant,
    required this.message,
  });

  final RcToastVariant variant;
  final String message;

  static const _iconColor = {
    RcToastVariant.success: Color(0xFF069952),
    RcToastVariant.error:   Color(0xFFCC0000),
    RcToastVariant.warning: Color(0xFFCC0000),
  };
  static const _textColor = {
    RcToastVariant.success: Color(0xFF292B33),
    RcToastVariant.error:   Color(0xFF292B33),
    RcToastVariant.warning: Color(0xFFCC0000),
  };
  static const _icon = {
    RcToastVariant.success: PhosphorIconsDuotone.checkCircle,
    RcToastVariant.error:   PhosphorIconsDuotone.xCircle,
    RcToastVariant.warning: PhosphorIconsDuotone.xCircle,
  };

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
      decoration: BoxDecoration(
        color: const Color(0xFFFEFDFA),
        borderRadius: BorderRadius.circular(12),
        boxShadow: const [
          BoxShadow(color: Color(0x33000000), blurRadius: 10, offset: Offset(0, 16)),
        ],
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(_icon[variant], size: 24, color: _iconColor[variant]),
          const SizedBox(width: 6),
          Flexible(
            child: Text(
              message,
              style: TextStyle(
                fontFamily: 'Manrope',
                fontWeight: FontWeight.w600,
                fontSize: 14,
                height: 20 / 14,
                color: _textColor[variant],
              ),
            ),
          ),
        ],
      ),
    );
  }
}`;

const usageRC = (fw, variant) => {
  const msgs = {
    success: "Receipt downloaded successfully",
    error: "Receipt not downloaded",
    warning: "Incorrect PIN. Your account has been restricted for 120 seconds.",
  };
  const msg = msgs[variant];
  if (fw === "flutter") {
    return `RcToast(\n  variant: RcToastVariant.${variant},\n  message: '${msg}',\n)`;
  }
  const tag = fw === "vue" ? "RcToast" : "RcToast";
  return `<${tag}\n  variant="${variant}"\n  message="${msg}"\n/>`;
};

const PROPS_ROWS = [
  ["variant", '"success" | "error" | "warning"', '"success"', "Drives icon, icon colour, and text colour. Warning turns all text red."],
  ["message", "string", "—", "One concise outcome statement. Lead with the result, not the cause."],
  ["role", '"status" | "alert"', "auto", "Set automatically: status for success, alert for error/warning. Override if needed."],
];

const ROW = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 2px", borderBottom: "1px solid var(--pk-line-soft)" };

export default function RcToasts({ fw, setFw }) {
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [variant, setVariant] = useState("success");

  return (
    <>
      <Lead>
        Light-surface toasts for transient feedback — three semantic variants on a warm white card
        with a soft drop shadow. Success uses a green check; Error and Warning both use a red X,
        but Warning also colours the message text red to signal severity. Specs from Figma nodes
        29629:419386, 29629:419393, 29629:419400.
      </Lead>

      <SectionHeader label="Playground" desc="Switch the variant; the preview and snippet update together." />
      <div style={{ border: "1px solid var(--pk-line)", borderRadius: 12, padding: "2px 18px", marginTop: 6 }}>
        <ModeRow mode={mode} setMode={setMode} />
        <div style={{ ...ROW, borderBottom: 0 }}>
          <span className="ph-rowlabel">Variant</span>
          <Tabs small value={variant} onChange={setVariant} label="Variant"
            items={[["success", "Success"], ["error", "Error"], ["warning", "Warning"]]} />
        </div>
      </div>

      <PreviewStage mode={mode} tall>
        <RcToastPreview variant={variant} />
      </PreviewStage>

      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock code={usageRC(fw, variant)} label="Usage — reflects the control above" />
      <CodeBlock code={fw === "react" ? RC_REACT : fw === "vue" ? RC_VUE : RC_FLUTTER}
        label={fw === "react" ? "RcToast.jsx" : fw === "vue" ? "RcToast.vue" : "rc_toast.dart"} />

      <SectionHeader label="Variants" />
      <div className="ph-statelist">
        {Object.entries(TOAST_CONFIG).map(([key, { label, desc }]) => (
          <div key={key} className={`ph-stateline${variant === key ? " act" : ""}`}>
            <button type="button" className="ph-statedot" onClick={() => setVariant(key)} aria-label={`Preview ${label}`} />
            <span className="ph-statelabel">{label}</span>
            <span className="ph-statedesc">{desc}</span>
          </div>
        ))}
      </div>

      <SectionHeader label="All three variants" />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
        {Object.entries(TOAST_CONFIG).map(([key, { label }]) => (
          <div key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--pk-text-faint)" }}>{label}</span>
            <RcToastPreview variant={key} />
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
            <li>Auto-dismiss Success toasts after 3–5 seconds.</li>
            <li>Keep messages to one sentence; lead with the outcome.</li>
            <li>Use Warning (red text) only for high-severity system errors like lockouts.</li>
            <li>Let Error and Warning persist until the user dismisses or the condition resolves.</li>
          </ul>
        </div>
        <div>
          <p className="ph-guidehead"><span className="ph-dot err" aria-hidden="true" />Don't</p>
          <ul className="ph-guidelist">
            <li>Don't stack multiple toasts — queue them and show one at a time.</li>
            <li>Don't use a toast for field-level validation — use inline error text instead.</li>
            <li>Don't auto-dismiss Warning or Error toasts.</li>
            <li>Don't put interactive actions (buttons, links) inside a toast.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
