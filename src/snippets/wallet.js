// ════════════════════════════════════════════════════════════════════
// Parkway Wallet component snippets — React, Vue 3, Flutter.
// Imported from Figma "ParkwayWallet" (Design system, node 31764:10115).
// All styling references --pk-* tokens / PkColors, never raw hex.
// ════════════════════════════════════════════════════════════════════

/* ── Text Input ─────────────────────────────────────────────────────── */
export const reactTextInput = `// PkTextInput.jsx — Parkway Wallet
export default function PkTextInput({
  label, placeholder, helper, error, disabled, trailingIcon, ...rest
}) {
  return (
    <label className="pk-field">
      {label && <span className="pk-field__label">{label}</span>}
      <span className={\`pk-input\${error ? " is-error" : ""}\`}>
        <input placeholder={placeholder} disabled={disabled} aria-invalid={!!error} {...rest} />
        {trailingIcon}
      </span>
      {(error || helper) && <span className={\`pk-field__help\${error ? " is-error" : ""}\`}>{error || helper}</span>}
    </label>
  );
}

/* parkway-input.css
.pk-field { display: grid; gap: 6px; }
.pk-field__label { font: 600 12px Manrope; color: var(--pk-label); }
.pk-input { display: flex; align-items: center; gap: 8px; height: 45px;
  padding: 0 16px; border: 1px solid var(--pk-border); border-radius: 8px;
  background: var(--pk-field-bg); transition: border-color .15s ease; }
.pk-input input { flex: 1; border: 0; outline: 0; background: none;
  font: 400 14px Manrope; color: var(--pk-text); }
.pk-input input::placeholder { color: var(--pk-placeholder); }
.pk-input:focus-within { border-color: var(--pk-tangerine-01); box-shadow: 0 0 0 3px var(--pk-focus-ring); }
.pk-input.is-error { border-color: var(--pk-error); }
.pk-field__help { font: 400 12px Manrope; color: var(--pk-text-muted); }
.pk-field__help.is-error { color: var(--pk-error); }
*/`;

export const vueTextInput = `<!-- PkTextInput.vue — Parkway Wallet -->
<script setup>
defineProps({ label: String, placeholder: String, helper: String,
  error: String, disabled: Boolean });
const model = defineModel();
</script>

<template>
  <label class="pk-field">
    <span v-if="label" class="pk-field__label">{{ label }}</span>
    <span class="pk-input" :class="{ 'is-error': error }">
      <input v-model="model" :placeholder="placeholder" :disabled="disabled" :aria-invalid="!!error" />
      <slot name="icon" />
    </span>
    <span v-if="error || helper" class="pk-field__help" :class="{ 'is-error': error }">{{ error || helper }}</span>
  </label>
</template>

<style scoped>
.pk-field { display: grid; gap: 6px; }
.pk-field__label { font: 600 12px Manrope; color: var(--pk-label); }
.pk-input { display: flex; align-items: center; gap: 8px; height: 45px;
  padding: 0 16px; border: 1px solid var(--pk-border); border-radius: 8px;
  background: var(--pk-field-bg); transition: border-color .15s ease; }
.pk-input input { flex: 1; border: 0; outline: 0; background: none;
  font: 400 14px Manrope; color: var(--pk-text); }
.pk-input:focus-within { border-color: var(--pk-tangerine-01); box-shadow: 0 0 0 3px var(--pk-focus-ring); }
.pk-input.is-error { border-color: var(--pk-error); }
.pk-field__help { font: 400 12px Manrope; color: var(--pk-text-muted); }
.pk-field__help.is-error { color: var(--pk-error); }
</style>`;

export const flutterTextInput = `// pk_text_input.dart — Parkway Wallet
import 'package:flutter/material.dart';
import 'parkway_tokens.dart';

class PkTextInput extends StatelessWidget {
  const PkTextInput({super.key, this.label, this.hint, this.helper,
    this.error, this.enabled = true, this.suffixIcon});

  final String? label, hint, helper, error;
  final bool enabled;
  final Widget? suffixIcon;

  @override
  Widget build(BuildContext context) {
    final border = (Color c) => OutlineInputBorder(
      borderRadius: BorderRadius.circular(8), borderSide: BorderSide(color: c));
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      if (label != null) Padding(
        padding: const EdgeInsets.only(bottom: 6),
        child: Text(label!, style: const TextStyle(
          fontFamily: 'Manrope', fontWeight: FontWeight.w600,
          fontSize: 12, color: PkColors.grey09))),
      TextField(
        enabled: enabled,
        decoration: InputDecoration(
          hintText: hint, suffixIcon: suffixIcon, errorText: error,
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          enabledBorder: border(PkColors.grey04),
          focusedBorder: border(PkColors.tangerine01),
          errorBorder: border(PkColors.error),
          helperText: helper,
        ),
      ),
    ]);
  }
}`;

export function usageTextInput(fw, extra, state) {
  const err = state === "error";
  const dis = state === "disabled";
  if (fw === "flutter")
    return `PkTextInput(
  label: 'Amount',
  hint: 'Placeholder text',${extra === "helper" ? "\n  helper: 'Your remaining daily transfer limit is N200,000.00'," : ""}${err ? "\n  error: 'Enter a valid amount'," : ""}${dis ? "\n  enabled: false," : ""}${extra === "icon" ? "\n  suffixIcon: const Icon(Icons.expand_more)," : ""}
)`;
  const tag = "PkTextInput";
  const open = `<${tag}
  label="Amount"
  placeholder="Placeholder text"${extra === "helper" ? `\n  helper="Your remaining daily transfer limit is N200,000.00"` : ""}${err ? `\n  error="Enter a valid amount"` : ""}${dis ? "\n  disabled" : ""}`;
  if (extra === "icon") {
    // Vue passes the icon via a slot, so the element can't self-close.
    if (fw === "vue") return `${open}\n>\n  <template #icon><CaretDown /></template>\n</${tag}>`;
    return `${open}\n  trailingIcon={<CaretDown />}\n/>`;
  }
  return `${open}\n/>`;
}

/* ── Toast Message ──────────────────────────────────────────────────── */
export const reactToast = `// PkToast.jsx — Parkway Wallet
export default function PkToast({ variant = "success", children }) {
  return (
    <div className={\`pk-toast pk-toast--\${variant}\`} role="status">
      <span className="pk-toast__icon" aria-hidden="true" />
      <span className="pk-toast__msg">{children}</span>
    </div>
  );
}

/* parkway-toast.css
.pk-toast { display: flex; align-items: center; gap: 12px;
  padding: 20px; border-radius: 10px; background: var(--pk-toast-bg);
  font: 500 14px Manrope; color: var(--pk-white-01); }
.pk-toast__icon { width: 24px; height: 24px; flex: none; border-radius: 50%; }
.pk-toast--success .pk-toast__icon { background: var(--pk-success); }
.pk-toast--warning .pk-toast__icon { background: var(--pk-error); }
*/`;

export const vueToast = `<!-- PkToast.vue — Parkway Wallet -->
<script setup>
defineProps({ variant: { type: String, default: "success" } }); // success | warning
</script>

<template>
  <div class="pk-toast" :class="\`pk-toast--\${variant}\`" role="status">
    <span class="pk-toast__icon" aria-hidden="true" />
    <span class="pk-toast__msg"><slot /></span>
  </div>
</template>

<style scoped>
.pk-toast { display: flex; align-items: center; gap: 12px; padding: 20px;
  border-radius: 10px; background: var(--pk-toast-bg);
  font: 500 14px Manrope; color: var(--pk-white-01); }
.pk-toast__icon { width: 24px; height: 24px; flex: none; border-radius: 50%; }
.pk-toast--success .pk-toast__icon { background: var(--pk-success); }
.pk-toast--warning .pk-toast__icon { background: var(--pk-error); }
</style>`;

export const flutterToast = `// pk_toast.dart — Parkway Wallet
import 'package:flutter/material.dart';
import 'parkway_tokens.dart';

enum PkToastVariant { success, warning }

class PkToast extends StatelessWidget {
  const PkToast({super.key, required this.message, this.variant = PkToastVariant.success});
  final String message;
  final PkToastVariant variant;

  @override
  Widget build(BuildContext context) {
    final ok = variant == PkToastVariant.success;
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: PkColors.grey11, borderRadius: BorderRadius.circular(10)),
      child: Row(children: [
        Icon(ok ? Icons.sentiment_very_satisfied : Icons.error,
          color: ok ? PkColors.success : PkColors.error, size: 24),
        const SizedBox(width: 12),
        Expanded(child: Text(message, style: const TextStyle(
          fontFamily: 'Manrope', fontWeight: FontWeight.w500,
          fontSize: 14, color: PkColors.white01))),
      ]),
    );
  }
}`;

export function usageToast(fw, variant) {
  if (fw === "flutter")
    return `PkToast(\n  variant: PkToastVariant.${variant},\n  message: 'Transfer completed',\n)`;
  if (fw === "vue")
    return `<PkToast variant="${variant}">Transfer completed</PkToast>`;
  return `<PkToast variant="${variant}">Transfer completed</PkToast>`;
}

/* ── Link button ────────────────────────────────────────────────────── */
export const reactLink = `// PkLink.jsx — Parkway Wallet
export default function PkLink({ icon, iconRight, children, ...rest }) {
  return (
    <a className="pk-link" {...rest}>
      {icon && !iconRight && <span className="pk-link__icon">{icon}</span>}
      <span>{children}</span>
      {icon && iconRight && <span className="pk-link__icon">{icon}</span>}
    </a>
  );
}

/* parkway-link.css
.pk-link { display: inline-flex; align-items: center; gap: 6px;
  font: 600 14px Manrope; color: var(--pk-tangerine-01);
  text-decoration: none; cursor: pointer; }
.pk-link:hover { color: var(--pk-tangerine-06); text-decoration: underline; }
.pk-link__icon { display: inline-flex; width: 14px; height: 14px; }
*/`;

export const vueLink = `<!-- PkLink.vue — Parkway Wallet -->
<script setup>
defineProps({ iconRight: Boolean });
</script>

<template>
  <a class="pk-link">
    <span v-if="$slots.icon && !iconRight" class="pk-link__icon"><slot name="icon" /></span>
    <span><slot /></span>
    <span v-if="$slots.icon && iconRight" class="pk-link__icon"><slot name="icon" /></span>
  </a>
</template>

<style scoped>
.pk-link { display: inline-flex; align-items: center; gap: 6px;
  font: 600 14px Manrope; color: var(--pk-tangerine-01); text-decoration: none; cursor: pointer; }
.pk-link:hover { color: var(--pk-tangerine-06); text-decoration: underline; }
.pk-link__icon { display: inline-flex; width: 14px; height: 14px; }
</style>`;

export const flutterLink = `// pk_link.dart — Parkway Wallet
import 'package:flutter/material.dart';
import 'parkway_tokens.dart';

class PkLink extends StatelessWidget {
  const PkLink({super.key, required this.label, this.onTap, this.icon, this.iconRight = false});
  final String label;
  final VoidCallback? onTap;
  final IconData? icon;
  final bool iconRight;

  @override
  Widget build(BuildContext context) {
    final text = Text(label, style: const TextStyle(
      fontFamily: 'Manrope', fontWeight: FontWeight.w600,
      fontSize: 14, color: PkColors.tangerine01));
    return InkWell(onTap: onTap, child: Row(mainAxisSize: MainAxisSize.min, children: [
      if (icon != null && !iconRight) ...[Icon(icon, size: 14, color: PkColors.tangerine01), const SizedBox(width: 6)],
      text,
      if (icon != null && iconRight) ...[const SizedBox(width: 6), Icon(icon, size: 14, color: PkColors.tangerine01)],
    ]));
  }
}`;

export function usageLink(fw, icon) {
  if (fw === "flutter")
    return `PkLink(\n  label: 'View details',\n  onTap: () {},${icon === "left" ? "\n  icon: Icons.link," : icon === "right" ? "\n  icon: Icons.arrow_forward, iconRight: true," : ""}\n)`;
  if (fw === "vue")
    return icon === "none"
      ? `<PkLink>View details</PkLink>`
      : `<PkLink${icon === "right" ? " iconRight" : ""}>\n  <template #icon><LinkIcon /></template>\n  View details\n</PkLink>`;
  return icon === "none"
    ? `<PkLink>View details</PkLink>`
    : `<PkLink icon={<LinkIcon />}${icon === "right" ? " iconRight" : ""}>View details</PkLink>`;
}

/* ── Badges ─────────────────────────────────────────────────────────── */
export const reactBadge = `// PkBadge.jsx — Parkway Wallet
export default function PkBadge({ status = "success", children }) {
  return <span className={\`pk-badge pk-badge--\${status}\`}>{children}</span>;
}

/* parkway-badge.css
.pk-badge { display: inline-flex; align-items: center; height: 22px;
  padding: 0 10px; border-radius: 11px; font: 600 11px Manrope; }
.pk-badge--success   { background: var(--pk-badge-success-bg); color: var(--pk-badge-success-fg); }
.pk-badge--failed    { background: var(--pk-badge-failed-bg);  color: var(--pk-badge-failed-fg); }
.pk-badge--pending   { background: var(--pk-badge-pending-bg); color: var(--pk-badge-pending-fg); }
.pk-badge--alternate { background: var(--pk-badge-alt-bg);     color: var(--pk-badge-alt-fg); }
*/`;

export const vueBadge = `<!-- PkBadge.vue — Parkway Wallet -->
<script setup>
defineProps({ status: { type: String, default: "success" } }); // success | failed | pending | alternate
</script>

<template>
  <span class="pk-badge" :class="\`pk-badge--\${status}\`"><slot /></span>
</template>

<style scoped>
.pk-badge { display: inline-flex; align-items: center; height: 22px;
  padding: 0 10px; border-radius: 11px; font: 600 11px Manrope; }
.pk-badge--success   { background: var(--pk-badge-success-bg); color: var(--pk-badge-success-fg); }
.pk-badge--failed    { background: var(--pk-badge-failed-bg);  color: var(--pk-badge-failed-fg); }
.pk-badge--pending   { background: var(--pk-badge-pending-bg); color: var(--pk-badge-pending-fg); }
.pk-badge--alternate { background: var(--pk-badge-alt-bg);     color: var(--pk-badge-alt-fg); }
</style>`;

export const flutterBadge = `// pk_badge.dart — Parkway Wallet
import 'package:flutter/material.dart';
import 'parkway_tokens.dart';

enum PkStatus { success, failed, pending, alternate }

class PkBadge extends StatelessWidget {
  const PkBadge({super.key, required this.label, this.status = PkStatus.success});
  final String label;
  final PkStatus status;

  static const _bg = {
    PkStatus.success: Color(0xFFE7F7EA), PkStatus.failed: Color(0xFFFDECEC),
    PkStatus.pending: PkColors.buff04, PkStatus.alternate: PkColors.grey05,
  };
  static const _fg = {
    PkStatus.success: Color(0xFF1F8A3B), PkStatus.failed: PkColors.error,
    PkStatus.pending: PkColors.buff07, PkStatus.alternate: PkColors.grey09,
  };

  @override
  Widget build(BuildContext context) => Container(
    height: 22, padding: const EdgeInsets.symmetric(horizontal: 10),
    alignment: Alignment.center,
    decoration: BoxDecoration(color: _bg[status], borderRadius: BorderRadius.circular(11)),
    child: Text(label, style: TextStyle(fontFamily: 'Manrope',
      fontWeight: FontWeight.w600, fontSize: 11, color: _fg[status])),
  );
}`;

export function usageBadge(fw, status) {
  const label = { success: "Successful", failed: "Failed", pending: "Pending", alternate: "Not linked" }[status];
  if (fw === "flutter") return `PkBadge(status: PkStatus.${status}, label: '${label}')`;
  return `<PkBadge status="${status}">${label}</PkBadge>`;
}

/* ── Toggle ─────────────────────────────────────────────────────────── */
export const reactToggle = `// PkToggle.jsx — Parkway Wallet
export default function PkToggle({ checked, onChange, disabled, platform = "desktop" }) {
  return (
    <button type="button" role="switch" aria-checked={checked} disabled={disabled}
      className={\`pk-toggle\${checked ? " is-on" : ""}\${platform === "mobile" ? " pk-toggle--mobile" : ""}\`}
      onClick={() => onChange?.(!checked)}>
      <span className="pk-toggle__knob" />
    </button>
  );
}

/* parkway-toggle.css — desktop = pill, mobile = 8px radius
.pk-toggle { width: 40px; height: 20px; border: 0; border-radius: 999px;
  padding: 2px; background: var(--pk-track-off); cursor: pointer;
  transition: background .2s ease; }
.pk-toggle--mobile { border-radius: 8px; }
.pk-toggle.is-on { background: var(--pk-tangerine-01); }
.pk-toggle:disabled { background: var(--pk-tangerine-04); cursor: not-allowed; }
.pk-toggle__knob { display: block; width: 16px; height: 16px; border-radius: 50%;
  background: var(--pk-knob); transition: transform .2s ease; }
.pk-toggle--mobile .pk-toggle__knob { border-radius: 5px; }
.pk-toggle.is-on .pk-toggle__knob { transform: translateX(20px); }
*/`;

export const vueToggle = `<!-- PkToggle.vue — Parkway Wallet -->
<script setup>
defineProps({ disabled: Boolean, platform: { type: String, default: "desktop" } });
const model = defineModel({ type: Boolean });
</script>

<template>
  <button type="button" role="switch" :aria-checked="model" :disabled="disabled"
    class="pk-toggle" :class="{ 'is-on': model, 'pk-toggle--mobile': platform === 'mobile' }" @click="model = !model">
    <span class="pk-toggle__knob" />
  </button>
</template>

<style scoped>
.pk-toggle { width: 40px; height: 20px; border: 0; border-radius: 999px; padding: 2px;
  background: var(--pk-track-off); cursor: pointer; transition: background .2s ease; }
.pk-toggle--mobile { border-radius: 8px; }
.pk-toggle.is-on { background: var(--pk-tangerine-01); }
.pk-toggle:disabled { background: var(--pk-tangerine-04); cursor: not-allowed; }
.pk-toggle__knob { display: block; width: 16px; height: 16px; border-radius: 50%;
  background: var(--pk-knob); transition: transform .2s ease; }
.pk-toggle--mobile .pk-toggle__knob { border-radius: 5px; }
.pk-toggle.is-on .pk-toggle__knob { transform: translateX(20px); }
</style>`;

export const flutterToggle = `// pk_toggle.dart — Parkway Wallet
import 'package:flutter/material.dart';
import 'parkway_tokens.dart';

class PkToggle extends StatelessWidget {
  const PkToggle({super.key, required this.value, this.onChanged});
  final bool value;
  final ValueChanged<bool>? onChanged;

  @override
  Widget build(BuildContext context) => Switch(
    value: value, onChanged: onChanged,
    activeTrackColor: PkColors.tangerine01,
    inactiveTrackColor: PkColors.grey04,
    thumbColor: const WidgetStatePropertyAll(PkColors.white01),
  );
}`;

export function usageToggle(fw, state, platform = "desktop") {
  const mob = platform === "mobile";
  if (fw === "flutter")
    return `PkToggle(\n  value: ${state === "on" ? "true" : "false"},\n  onChanged: ${state === "disabled" ? "null, // disabled" : "(v) => setState(() => on = v),"}\n)`;
  if (fw === "vue")
    return `<PkToggle v-model="on"${mob ? ' platform="mobile"' : ""}${state === "disabled" ? " disabled" : ""} />`;
  return `<PkToggle checked={${state === "on" ? "true" : "false"}} onChange={setOn}${mob ? ' platform="mobile"' : ""}${state === "disabled" ? " disabled" : ""} />`;
}

/* ── Checkbox ───────────────────────────────────────────────────────── */
export const reactCheckbox = `// PkCheckbox.jsx — Parkway Wallet
export default function PkCheckbox({ checked, onChange, disabled, label }) {
  return (
    <label className={\`pk-check\${disabled ? " is-disabled" : ""}\`}>
      <input type="checkbox" checked={checked} disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)} />
      <span className="pk-check__box" aria-hidden="true" />
      {label && <span className="pk-check__label">{label}</span>}
    </label>
  );
}

/* parkway-checkbox.css
.pk-check { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
.pk-check input { position: absolute; opacity: 0; }
.pk-check__box { width: 20px; height: 20px; border-radius: 6px;
  border: 1.5px solid var(--pk-border); background: var(--pk-field-bg);
  transition: all .15s ease; }
.pk-check input:checked + .pk-check__box { background: var(--pk-tangerine-01);
  border-color: var(--pk-tangerine-01);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M3.5 8.5l3 3 6-6' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-size: contain; }
.pk-check input:focus-visible + .pk-check__box { outline: 2px solid var(--pk-tangerine-01); outline-offset: 2px; }
*/`;

export const vueCheckbox = `<!-- PkCheckbox.vue — Parkway Wallet -->
<script setup>
defineProps({ disabled: Boolean, label: String });
const model = defineModel({ type: Boolean });
</script>

<template>
  <label class="pk-check" :class="{ 'is-disabled': disabled }">
    <input type="checkbox" v-model="model" :disabled="disabled" />
    <span class="pk-check__box" aria-hidden="true" />
    <span v-if="label" class="pk-check__label">{{ label }}</span>
  </label>
</template>

<style scoped>
.pk-check { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
.pk-check input { position: absolute; opacity: 0; }
.pk-check__box { width: 20px; height: 20px; border-radius: 6px;
  border: 1.5px solid var(--pk-border); background: var(--pk-field-bg); transition: all .15s ease; }
.pk-check input:checked + .pk-check__box { background: var(--pk-tangerine-01);
  border-color: var(--pk-tangerine-01);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M3.5 8.5l3 3 6-6' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-size: contain; }
</style>`;

export const flutterCheckbox = `// pk_checkbox.dart — Parkway Wallet
import 'package:flutter/material.dart';
import 'parkway_tokens.dart';

class PkCheckbox extends StatelessWidget {
  const PkCheckbox({super.key, required this.value, this.onChanged});
  final bool value;
  final ValueChanged<bool?>? onChanged;

  @override
  Widget build(BuildContext context) => Checkbox(
    value: value, onChanged: onChanged,
    activeColor: PkColors.tangerine01,
    side: const BorderSide(color: PkColors.grey04, width: 1.5),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
  );
}`;

export function usageCheckbox(fw, checked) {
  if (fw === "flutter")
    return `PkCheckbox(\n  value: ${checked ? "true" : "false"},\n  onChanged: (v) => setState(() => agreed = v ?? false),\n)`;
  if (fw === "vue") return `<PkCheckbox v-model="agreed" label="I agree" />`;
  return `<PkCheckbox checked={${checked ? "true" : "false"}} onChange={setAgreed} label="I agree" />`;
}

/* ── Marquee ─────────────────────────────────────────────────────────── */
export const reactMarquee = `// PkMarquee.jsx — Parkway Wallet
import './parkway-marquee.css';

const STAR = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 0L13.7541 7.76531L20.4853 3.51472L16.2347 10.2459L24 12L16.2347 13.7541L20.4853 20.4853L13.7541 16.2347L12 24L10.2459 16.2347L3.51472 20.4853L7.76531 13.7541L0 12L7.76531 10.2459L3.51472 3.51472L10.2459 7.76531L12 0Z"
      fill="var(--pk-grey-01)" />
  </svg>
);

export default function PkMarquee({ items = [], speed = 40, paused = false }) {
  const track = [...items, ...items];
  return (
    <div className="pk-marquee" aria-label="announcement ticker">
      <div
        className="pk-marquee__track"
        style={{ animationDuration: \`\${speed}s\`, animationPlayState: paused ? 'paused' : 'running' }}
      >
        {track.map((text, i) => (
          <span key={i} className="pk-marquee__item">
            <span className="pk-marquee__text">{text}</span>
            {STAR}
          </span>
        ))}
      </div>
    </div>
  );
}

/* parkway-marquee.css
.pk-marquee {
  height: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: var(--pk-tangerine-01);
}
.pk-marquee__track {
  display: inline-flex;
  animation: pk-marquee-scroll linear infinite;
}
@keyframes pk-marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.pk-marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding-right: 26px;
  flex-shrink: 0;
}
.pk-marquee__text {
  font: 500 16px/1 Manrope, sans-serif;
  color: var(--pk-grey-01);
  white-space: nowrap;
}
*/`;

export const vueMarquee = `<!-- PkMarquee.vue — Parkway Wallet -->
<script setup>
import { computed } from 'vue';
const props = defineProps({
  items: { type: Array, default: () => [] },
  speed: { type: Number, default: 40 },
  paused: { type: Boolean, default: false },
});
const track = computed(() => [...props.items, ...props.items]);
</script>

<template>
  <div class="pk-marquee" aria-label="announcement ticker">
    <div
      class="pk-marquee__track"
      :style="{ animationDuration: speed + 's', animationPlayState: paused ? 'paused' : 'running' }"
    >
      <span v-for="(text, i) in track" :key="i" class="pk-marquee__item">
        <span class="pk-marquee__text">{{ text }}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 0L13.7541 7.76531L20.4853 3.51472L16.2347 10.2459L24 12L16.2347 13.7541L20.4853 20.4853L13.7541 16.2347L12 24L10.2459 16.2347L3.51472 20.4853L7.76531 13.7541L0 12L7.76531 10.2459L3.51472 3.51472L10.2459 7.76531L12 0Z"
            fill="var(--pk-grey-01)" />
        </svg>
      </span>
    </div>
  </div>
</template>

<style scoped>
.pk-marquee {
  height: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: var(--pk-tangerine-01);
}
.pk-marquee__track {
  display: inline-flex;
  animation: pk-marquee-scroll linear infinite;
}
@keyframes pk-marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.pk-marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding-right: 26px;
  flex-shrink: 0;
}
.pk-marquee__text {
  font: 500 16px/1 Manrope, sans-serif;
  color: var(--pk-grey-01);
  white-space: nowrap;
}
</style>`;

export const flutterMarquee = `// pk_marquee.dart — Parkway Wallet
import 'package:flutter/material.dart';
import 'parkway_tokens.dart';

class PkMarquee extends StatefulWidget {
  const PkMarquee({
    super.key,
    required this.items,
    this.speed = 40,
  });

  final List<String> items;
  /// Scroll cycle duration in seconds. Higher = slower.
  final int speed;

  @override
  State<PkMarquee> createState() => _PkMarqueeState();
}

class _PkMarqueeState extends State<PkMarquee>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync: this,
      duration: Duration(seconds: widget.speed),
      lowerBound: 0,
      upperBound: 0.5,
    )..repeat();
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final track = [...widget.items, ...widget.items];
    return Container(
      height: 40,
      decoration: const BoxDecoration(color: PkColors.tangerine01),
      clipBehavior: Clip.hardEdge,
      // OverflowBox lifts the width constraint so the duplicated track lays
      // out at its intrinsic width; translating by 0 → -0.5 of that width is
      // one seamless loop (the CSS translateX(-50%) equivalent).
      child: OverflowBox(
        maxWidth: double.infinity,
        alignment: Alignment.centerLeft,
        child: AnimatedBuilder(
          animation: _ctrl,
          builder: (context, child) => FractionalTranslation(
            translation: Offset(-_ctrl.value, 0),
            child: child,
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: track
                .map((text) => _PkMarqueeItem(text: text))
                .toList(),
          ),
        ),
      ),
    );
  }
}

class _PkMarqueeItem extends StatelessWidget {
  const _PkMarqueeItem({required this.text});
  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 26),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            text,
            style: const TextStyle(
              fontFamily: 'Manrope',
              fontWeight: FontWeight.w500,
              fontSize: 16,
              height: 1,
              color: PkColors.grey01,
            ),
          ),
          const SizedBox(width: 12),
          const _StarIcon(),
        ],
      ),
    );
  }
}

class _StarIcon extends StatelessWidget {
  const _StarIcon();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 24,
      height: 24,
      child: CustomPaint(painter: _StarPainter()),
    );
  }
}

class _StarPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final path = Path()
      ..moveTo(12, 0)
      ..lineTo(13.7541, 7.76531)
      ..lineTo(20.4853, 3.51472)
      ..lineTo(16.2347, 10.2459)
      ..lineTo(24, 12)
      ..lineTo(16.2347, 13.7541)
      ..lineTo(20.4853, 20.4853)
      ..lineTo(13.7541, 16.2347)
      ..lineTo(12, 24)
      ..lineTo(10.2459, 16.2347)
      ..lineTo(3.51472, 20.4853)
      ..lineTo(7.76531, 13.7541)
      ..lineTo(0, 12)
      ..lineTo(7.76531, 10.2459)
      ..lineTo(3.51472, 3.51472)
      ..lineTo(10.2459, 7.76531)
      ..close();
    canvas.drawPath(path, Paint()..color = PkColors.grey01);
  }

  @override
  bool shouldRepaint(covariant CustomPainter _) => false;
}`;

export function usageMarquee(fw, speed) {
  const items = `[\n  'Link all your accounts in one place.',\n  'Bank Account feature is LIVE!',\n  'New NDD Feature Out Soon',\n]`;
  if (fw === "flutter")
    return `PkMarquee(\n  items: const [\n    'Link all your accounts in one place.',\n    'Bank Account feature is LIVE!',\n    'New NDD Feature Out Soon',\n  ],\n  speed: ${speed},\n)`;
  if (fw === "vue")
    return `<PkMarquee\n  :items="${items}"\n  :speed="${speed}"\n/>`;
  return `<PkMarquee\n  items={${items}}\n  speed={${speed}}\n/>`;
}

/* ── Transaction Status ──────────────────────────────────────────────── */
export const reactTransactionStatus = `// PkTransactionFilters.jsx — Parkway Wallet
// Covers both Transaction Type (fluid) and Transaction Status (fixed-width) filter rows.
// Dark mode: wrap a parent with class="dark" or data-theme="dark".
import './parkway-transaction-filters.css';

const TX_TYPES = [
  { key: 'transfer',   label: 'Transfer' },
  { key: 'receive',    label: 'Receive' },
  { key: 'stamp-duty', label: 'Stamp Duty' },
];

const TX_STATUSES = [
  { key: 'successful', label: 'Successful' },
  { key: 'pending',    label: 'Pending' },
  { key: 'failed',     label: 'Failed' },
];

function PkFilterGroup({ label, options, value, onChange, fluid = false }) {
  return (
    <div className="pk-filter-group">
      <span className="pk-filter-group__label">{label}</span>
      <div className={\`pk-filter-group__row\${fluid ? ' is-fluid' : ''}\`}>
        {options.map((opt) => (
          <button
            key={opt.key}
            type="button"
            className={\`pk-filter-btn\${value === opt.key ? ' is-active' : ''}\${fluid ? ' is-fluid' : ''}\`}
            onClick={() => onChange?.(opt.key)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PkTransactionType({ value = 'transfer', onChange }) {
  return <PkFilterGroup label="Transaction Type" options={TX_TYPES} value={value} onChange={onChange} fluid />;
}

export function PkTransactionStatus({ value = 'successful', onChange }) {
  return <PkFilterGroup label="Transaction Status" options={TX_STATUSES} value={value} onChange={onChange} />;
}

/* parkway-transaction-filters.css

── Tokens (swap for dark mode) ──
:root {
  --pk-filter-type-bg:    #F0F0F0;
  --pk-filter-type-text:  #121212;
  --pk-filter-stat-bg:    #FBFBFB;
  --pk-filter-stat-text:  #C6C6C6;
}
[data-theme="dark"], .dark {
  --pk-filter-type-bg:    #242424;
  --pk-filter-type-text:  #FFFFFF;
  --pk-filter-stat-bg:    #1F1F1F;
  --pk-filter-stat-text:  #FFFFFF;
}

.pk-filter-group { display: flex; flex-direction: column; gap: 15px; width: 100%; }
.pk-filter-group__label { font: 400 12px/1 Manrope, sans-serif; color: #999; }
.pk-filter-group__row { display: flex; gap: 16px; }
.pk-filter-group__row.is-fluid { width: 100%; }

.pk-filter-btn {
  height: 38px; width: 101px; padding: 0 24px;
  border-radius: 8px; border: 2px solid transparent;
  background: var(--pk-filter-stat-bg);
  font: 600 12px/1 Manrope, sans-serif;
  color: var(--pk-filter-stat-text);
  cursor: pointer;
  transition: border-color .15s ease, color .15s ease, background .15s ease;
}
.pk-filter-btn.is-fluid {
  flex: 1 0 0; width: auto;
  background: var(--pk-filter-type-bg);
  color: var(--pk-filter-type-text);
}
.pk-filter-btn.is-active {
  border-color: var(--pk-tangerine-01);
  background: transparent;
  color: var(--pk-tangerine-01);
}
*/`;

export const vueTransactionStatus = `<!-- PkTransactionFilters.vue — Parkway Wallet -->
<script setup>
const props = defineProps({
  typeValue:   { type: String, default: 'transfer' },
  statusValue: { type: String, default: 'successful' },
});
const emit = defineEmits(['update:typeValue', 'update:statusValue']);

const TX_TYPES = [
  { key: 'transfer',   label: 'Transfer' },
  { key: 'receive',    label: 'Receive' },
  { key: 'stamp-duty', label: 'Stamp Duty' },
];
const TX_STATUSES = [
  { key: 'successful', label: 'Successful' },
  { key: 'pending',    label: 'Pending' },
  { key: 'failed',     label: 'Failed' },
];
</script>

<template>
  <div class="pk-filters">
    <!-- Transaction Type -->
    <div class="pk-filter-group">
      <span class="pk-filter-group__label">Transaction Type</span>
      <div class="pk-filter-group__row is-fluid">
        <button
          v-for="opt in TX_TYPES" :key="opt.key"
          type="button"
          class="pk-filter-btn is-fluid"
          :class="{ 'is-active': typeValue === opt.key }"
          @click="emit('update:typeValue', opt.key)"
        >{{ opt.label }}</button>
      </div>
    </div>
    <!-- Transaction Status -->
    <div class="pk-filter-group">
      <span class="pk-filter-group__label">Transaction Status</span>
      <div class="pk-filter-group__row">
        <button
          v-for="opt in TX_STATUSES" :key="opt.key"
          type="button"
          class="pk-filter-btn"
          :class="{ 'is-active': statusValue === opt.key }"
          @click="emit('update:statusValue', opt.key)"
        >{{ opt.label }}</button>
      </div>
    </div>
  </div>
</template>

<!-- Tokens are global on purpose — :root inside <style scoped> would never match. -->
<style>
:root {
  --pk-filter-type-bg: #F0F0F0; --pk-filter-type-text: #121212;
  --pk-filter-stat-bg: #FBFBFB; --pk-filter-stat-text: #C6C6C6;
}
:root[data-theme="dark"] {
  --pk-filter-type-bg: #242424; --pk-filter-type-text: #FFFFFF;
  --pk-filter-stat-bg: #1F1F1F; --pk-filter-stat-text: #FFFFFF;
}
</style>

<style scoped>
.pk-filters { display: flex; flex-direction: column; gap: 24px; width: 100%; }
.pk-filter-group { display: flex; flex-direction: column; gap: 15px; }
.pk-filter-group__label { font: 400 12px/1 Manrope, sans-serif; color: #999; }
.pk-filter-group__row { display: flex; gap: 16px; }
.pk-filter-group__row.is-fluid { width: 100%; }
.pk-filter-btn {
  height: 38px; width: 101px; padding: 0 24px; border-radius: 8px;
  border: 2px solid transparent;
  background: var(--pk-filter-stat-bg); color: var(--pk-filter-stat-text);
  font: 600 12px/1 Manrope, sans-serif; cursor: pointer;
  transition: border-color .15s, color .15s, background .15s;
}
.pk-filter-btn.is-fluid { flex: 1 0 0; width: auto; background: var(--pk-filter-type-bg); color: var(--pk-filter-type-text); }
.pk-filter-btn.is-active { border-color: var(--pk-tangerine-01); background: transparent; color: var(--pk-tangerine-01); }
</style>`;

export const flutterTransactionStatus = `// pk_transaction_filters.dart — Parkway Wallet
import 'package:flutter/material.dart';
import 'parkway_tokens.dart';

// ── Tokens ──────────────────────────────────────────────────────────────
class _FilterTokens {
  final Color inactiveBg;
  final Color inactiveText;
  const _FilterTokens({ required this.inactiveBg, required this.inactiveText });
}

const _light = (
  type:   _FilterTokens(inactiveBg: Color(0xFFF0F0F0), inactiveText: Color(0xFF121212)),
  status: _FilterTokens(inactiveBg: Color(0xFFFBFBFB), inactiveText: Color(0xFFC6C6C6)),
);
const _dark = (
  type:   _FilterTokens(inactiveBg: Color(0xFF242424), inactiveText: Color(0xFFFFFFFF)),
  status: _FilterTokens(inactiveBg: Color(0xFF1F1F1F), inactiveText: Color(0xFFFFFFFF)),
);

// ── PkFilterGroup ────────────────────────────────────────────────────────
class PkFilterGroup extends StatelessWidget {
  const PkFilterGroup({
    super.key,
    required this.label,
    required this.options,
    required this.value,
    required this.onChanged,
    this.fluid = false,
    this.dark = false,
  });

  final String label;
  final List<(String, String)> options;
  final String value;
  final ValueChanged<String> onChanged;
  final bool fluid;
  final bool dark;

  @override
  Widget build(BuildContext context) {
    final tok = dark ? (fluid ? _dark.type : _dark.status) : (fluid ? _light.type : _light.status);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontFamily: 'Manrope', fontSize: 12, color: Color(0xFF999999))),
        const SizedBox(height: 15),
        Row(children: options.map(((String, String) opt) {
          final active = opt.\$1 == value;
          return Expanded(
            flex: fluid ? 1 : 0,
            child: Padding(
              padding: EdgeInsets.only(right: opt == options.last ? 0 : 16),
              child: GestureDetector(
                onTap: () => onChanged(opt.\$1),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 150),
                  height: 38,
                  width: fluid ? double.infinity : 101,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: active ? Colors.transparent : tok.inactiveBg,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(
                      color: active ? PkColors.tangerine01 : Colors.transparent,
                      width: 2,
                    ),
                  ),
                  child: Text(opt.\$2,
                    style: TextStyle(
                      fontFamily: 'Manrope', fontWeight: FontWeight.w600, fontSize: 12,
                      color: active ? PkColors.tangerine01 : tok.inactiveText,
                    ),
                  ),
                ),
              ),
            ),
          );
        }).toList()),
      ],
    );
  }
}`;

export function usageTransactionStatus(fw, typeVal, statusVal) {
  if (fw === "flutter")
    return `// Dark mode is driven by the ThemeMode passed to MaterialApp.\n// Transaction Type\nPkFilterGroup(\n  label: 'Transaction Type',\n  options: const [('transfer','Transfer'),('receive','Receive'),('stamp-duty','Stamp Duty')],\n  value: '${typeVal}',\n  onChanged: (v) => setState(() => txnType = v),\n  fluid: true,\n),\n\n// Transaction Status\nPkFilterGroup(\n  label: 'Transaction Status',\n  options: const [('successful','Successful'),('pending','Pending'),('failed','Failed')],\n  value: '${statusVal}',\n  onChanged: (v) => setState(() => txnStatus = v),\n)`;
  if (fw === "vue")
    return `<!-- Dark mode: set data-theme="dark" on :root or a wrapping element -->\n<PkTransactionFilters\n  v-model:typeValue="txnType"\n  v-model:statusValue="txnStatus"\n/>`;
  return `{/* Dark mode: set data-theme="dark" on :root — CSS vars handle the rest */}\n<PkTransactionType   value="${typeVal}"   onChange={setTxnType} />\n<PkTransactionStatus value="${statusVal}" onChange={setTxnStatus} />`;
}

/* ── Tabs Toggle (Pay Now / Scheduled) ───────────────────────────────── */
export const reactTabsToggle = `// PkTabsToggle.jsx — Parkway Wallet
// Dark mode: set data-theme="dark" on :root — CSS vars handle the rest.
import './parkway-tabs-toggle.css';

export default function PkTabsToggle({ tabs = [], value, onChange }) {
  const idx = tabs.findIndex(([k]) => k === value);
  return (
    <div className="pk-tabs-toggle">
      <div className="pk-tabs-toggle__pill" style={{ transform: \`translateX(\${idx * 175}px)\` }} />
      {tabs.map(([key, label]) => (
        <button
          key={key}
          type="button"
          className="pk-tabs-toggle__btn"
          onClick={() => onChange?.(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

/* parkway-tabs-toggle.css

:root {
  --pk-tabs-toggle-bg:          #F9F9F9;
  --pk-tabs-toggle-pill-bg:     #FFFFFF;
  --pk-tabs-toggle-pill-border: #FDD5C4;
  --pk-tabs-toggle-text:        #000000;
}
[data-theme="dark"] {
  --pk-tabs-toggle-bg:          #242424;
  --pk-tabs-toggle-pill-bg:     #242424;
  --pk-tabs-toggle-pill-border: #F9956B;
  --pk-tabs-toggle-text:        #FFFFFF;
}

.pk-tabs-toggle {
  position: relative; display: flex;
  width: 343px; height: 48px;
  background: var(--pk-tabs-toggle-bg);
  border-radius: 40px; padding: 4px; gap: 15px;
}
.pk-tabs-toggle__pill {
  position: absolute; top: 4px; left: 4px;
  width: 160px; height: 40px; border-radius: 20px;
  background: var(--pk-tabs-toggle-pill-bg);
  border: 1px solid var(--pk-tabs-toggle-pill-border);
  transition: transform .2s ease; pointer-events: none;
}
.pk-tabs-toggle__btn {
  flex: 0 0 160px; height: 40px; border-radius: 20px;
  border: 0; background: transparent; position: relative; z-index: 1;
  font: 600 14px/1 Manrope, sans-serif;
  color: var(--pk-tabs-toggle-text);
  cursor: pointer;
}
*/`;

export const vueTabsToggle = `<!-- PkTabsToggle.vue — Parkway Wallet -->
<!-- Dark mode: set data-theme="dark" on :root — CSS vars handle the rest. -->
<script setup>
import { computed } from 'vue';
const props = defineProps({
  tabs:       { type: Array,  default: () => [] },
  modelValue: { type: String, default: '' },
});
const emit = defineEmits(['update:modelValue']);
const idx = computed(() => props.tabs.findIndex(([k]) => k === props.modelValue));
</script>

<template>
  <div class="pk-tabs-toggle">
    <div class="pk-tabs-toggle__pill" :style="{ transform: \`translateX(\${idx * 175}px)\` }" />
    <button
      v-for="([key, label]) in tabs"
      :key="key"
      type="button"
      class="pk-tabs-toggle__btn"
      @click="emit('update:modelValue', key)"
    >{{ label }}</button>
  </div>
</template>

<!-- Tokens are global on purpose — :root inside <style scoped> would never match. -->
<style>
:root {
  --pk-tabs-toggle-bg:          #F9F9F9;
  --pk-tabs-toggle-pill-bg:     #FFFFFF;
  --pk-tabs-toggle-pill-border: #FDD5C4;
  --pk-tabs-toggle-text:        #000000;
}
:root[data-theme="dark"] {
  --pk-tabs-toggle-bg:          #242424;
  --pk-tabs-toggle-pill-bg:     #242424;
  --pk-tabs-toggle-pill-border: #F9956B;
  --pk-tabs-toggle-text:        #FFFFFF;
}
</style>

<style scoped>
.pk-tabs-toggle {
  position: relative; display: flex;
  width: 343px; height: 48px;
  background: var(--pk-tabs-toggle-bg);
  border-radius: 40px; padding: 4px; gap: 15px;
}
.pk-tabs-toggle__pill {
  position: absolute; top: 4px; left: 4px;
  width: 160px; height: 40px; border-radius: 20px;
  background: var(--pk-tabs-toggle-pill-bg);
  border: 1px solid var(--pk-tabs-toggle-pill-border);
  transition: transform .2s ease; pointer-events: none;
}
.pk-tabs-toggle__btn {
  flex: 0 0 160px; height: 40px; border-radius: 20px;
  border: 0; background: transparent; position: relative; z-index: 1;
  font: 600 14px/1 Manrope, sans-serif;
  color: var(--pk-tabs-toggle-text);
  cursor: pointer;
}
</style>`;

export const flutterTabsToggle = `// pk_tabs_toggle.dart — Parkway Wallet
import 'package:flutter/material.dart';
import 'parkway_tokens.dart';

class PkTabsToggle extends StatelessWidget {
  const PkTabsToggle({
    super.key,
    required this.tabs,
    required this.value,
    required this.onChanged,
  });

  final List<(String, String)> tabs;
  final String value;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    final dark = Theme.of(context).brightness == Brightness.dark;
    final containerBg   = dark ? const Color(0xFF242424) : const Color(0xFFF9F9F9);
    final pillBg        = dark ? const Color(0xFF242424) : Colors.white;
    final pillBorder    = dark ? PkColors.tangerine01    : PkColors.tangerine04;
    final textColor     = dark ? Colors.white            : Colors.black;

    final idx = tabs.indexWhere((t) => t.\$1 == value);
    return Container(
      width: 343, height: 48,
      decoration: BoxDecoration(color: containerBg, borderRadius: BorderRadius.circular(40)),
      padding: const EdgeInsets.all(4),
      child: Stack(children: [
        AnimatedPositioned(
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeInOut,
          left: idx * 175.0, top: 0, bottom: 0, width: 160,
          child: Container(
            decoration: BoxDecoration(
              color: pillBg,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: pillBorder),
            ),
          ),
        ),
        // spaceBetween yields the 15px gap the pill's idx * 175 offset expects
        Row(mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: tabs.map(((String, String) t) => GestureDetector(
          onTap: () => onChanged(t.\$1),
          child: SizedBox(
            width: 160,
            child: Center(child: Text(t.\$2,
              style: TextStyle(
                fontFamily: 'Manrope', fontWeight: FontWeight.w600,
                fontSize: 14, color: textColor,
              ),
            )),
          ),
        )).toList()),
      ]),
    );
  }
}`;

export function usageTabsToggle(fw, value) {
  const tabs = `[['pay-now', 'Pay Now'], ['scheduled', 'Scheduled']]`;
  if (fw === "flutter")
    return `PkTabsToggle(\n  tabs: const [('pay-now', 'Pay Now'), ('scheduled', 'Scheduled')],\n  value: '${value}',\n  onChanged: (v) => setState(() => tab = v),\n)`;
  if (fw === "vue")
    return `<PkTabsToggle\n  :tabs="[['pay-now', 'Pay Now'], ['scheduled', 'Scheduled']]"\n  v-model="tab"\n/>`;
  return `<PkTabsToggle\n  tabs={${tabs}}\n  value="${value}"\n  onChange={setTab}\n/>`;
}

/* ── Date Picker ─────────────────────────────────────────────────────── */
export const reactDatePicker = `// PkDatePicker.jsx — Parkway Wallet
import { useState } from 'react';
import './parkway-date-picker.css';

const MONTHS = ['January','February','March','April','May','June',
  'July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function getCalendarGrid(year, month) {
  const startDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array(startDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);
  return cells;
}

export default function PkDatePicker({ defaultValue = null, onSelect, onClose }) {
  const today = new Date();
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selected, setSelected] = useState(defaultValue);

  const prev = () => setView(v =>
    v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 });
  const next = () => setView(v =>
    v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 });

  const isToday   = (d) => d && view.year === today.getFullYear()
    && view.month === today.getMonth() && d === today.getDate();
  const isSelected = (d) => selected && view.year === selected.getFullYear()
    && view.month === selected.getMonth() && d === selected.getDate();

  return (
    <div className="pk-datepicker">
      <div className="pk-datepicker__header">
        <span className="pk-datepicker__title">
          {MONTHS[view.month]} {view.year}
        </span>
        <div className="pk-datepicker__nav">
          <button type="button" className="pk-datepicker__chevron" onClick={prev} aria-label="Previous month">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button type="button" className="pk-datepicker__chevron" onClick={next} aria-label="Next month">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="pk-datepicker__grid">
        {DAYS.map((d, i) => (
          <div key={d} className={\`pk-datepicker__weekday\${i === 0 || i === 6 ? ' is-weekend' : ''}\`}>{d}</div>
        ))}
        {getCalendarGrid(view.year, view.month).map((d, i) => (
          <div
            key={i}
            className={\`pk-datepicker__day\${!d ? ' is-empty' : ''}\${isToday(d) ? ' is-today' : ''}\${isSelected(d) ? ' is-selected' : ''}\`}
            onClick={() => d && setSelected(new Date(view.year, view.month, d))}
          >{d}</div>
        ))}
      </div>

      <div className="pk-datepicker__ctas">
        <button type="button" className="pk-datepicker__close" onClick={onClose}>Close</button>
        <button type="button" className="pk-datepicker__select" onClick={() => onSelect?.(selected)}>Select</button>
      </div>
    </div>
  );
}

/* parkway-date-picker.css

:root {
  --pk-dp-bg:      #FFFFFF;  --pk-dp-shadow: 0 2px 12px rgba(0,0,0,0.08);
  --pk-dp-title:   #121212;  --pk-dp-chevron: #121212;
  --pk-dp-weekday: #121212;  --pk-dp-day:    #858585;
  --pk-dp-hover:   #FFF0E8;  --pk-dp-close:  #9CA3AF;
}
[data-theme="dark"] {
  --pk-dp-bg:      #232323;  --pk-dp-shadow: 0 2px 20px rgba(0,0,0,0.40);
  --pk-dp-title:   #F2F2F0;  --pk-dp-chevron: #F2F2F0;
  --pk-dp-weekday: #F2F2F0;  --pk-dp-day:    #A0A0A0;
  --pk-dp-hover:   #2A2018;  --pk-dp-close:  #7A7A75;
}

.pk-datepicker {
  background: var(--pk-dp-bg); box-shadow: var(--pk-dp-shadow);
  border-radius: 8px; padding: 25px; width: 326px;
  display: flex; flex-direction: column; gap: 20px;
  font-family: Inter, system-ui, sans-serif;
}
.pk-datepicker__header { display: flex; justify-content: space-between; align-items: center; }
.pk-datepicker__title { font: 500 17px/25px Inter, sans-serif; color: var(--pk-dp-title); }
.pk-datepicker__nav { display: flex; gap: 10px; }
.pk-datepicker__chevron {
  background: none; border: 0; padding: 2px; cursor: pointer;
  display: flex; align-items: center; border-radius: 4px;
}
.pk-datepicker__chevron svg path { stroke: var(--pk-dp-chevron); }
.pk-datepicker__chevron:hover { background: var(--pk-dp-hover); }
.pk-datepicker__grid { display: grid; grid-template-columns: repeat(7, 1fr); }
.pk-datepicker__weekday {
  text-align: center; padding: 10px 2.5px;
  font: 400 15px/20px Inter, sans-serif; color: var(--pk-dp-weekday);
}
.pk-datepicker__weekday.is-weekend { color: #F36A6A; }
.pk-datepicker__day {
  height: 40px; display: flex; align-items: center; justify-content: center;
  font: 400 15px/20px Inter, sans-serif; color: var(--pk-dp-day);
  cursor: pointer; border-radius: 8px; margin: 2px 0;
}
.pk-datepicker__day.is-empty { pointer-events: none; }
.pk-datepicker__day:not(.is-empty):hover { background: var(--pk-dp-hover); }
.pk-datepicker__day.is-today { font-weight: 600; color: #FAAA89; }
.pk-datepicker__day.is-selected { background: #FAAA89; color: #fff; font-weight: 400; }
.pk-datepicker__ctas { display: flex; justify-content: flex-end; gap: 20px; }
.pk-datepicker__close {
  background: none; border: 0; padding: 10px 20px; border-radius: 4px;
  font: 400 15px/20px Inter, sans-serif; color: var(--pk-dp-close); cursor: pointer;
}
.pk-datepicker__select {
  background: #FAAA89; border: 0; padding: 10px 20px; border-radius: 4px;
  font: 400 15px/20px Inter, sans-serif; color: #fff; cursor: pointer;
}
*/`;

export const vueDatePicker = `<!-- PkDatePicker.vue — Parkway Wallet -->
<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['select', 'close']);

const MONTHS = ['January','February','March','April','May','June',
  'July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const today = new Date();
const view = ref({ year: today.getFullYear(), month: today.getMonth() });
const selected = ref(null);

function getGrid(year, month) {
  const start = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  const cells = Array(start).fill(null);
  for (let d = 1; d <= total; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);
  return cells;
}

const grid = computed(() => getGrid(view.value.year, view.value.month));

const prev = () => view.value = view.value.month === 0
  ? { year: view.value.year - 1, month: 11 }
  : { ...view.value, month: view.value.month - 1 };
const next = () => view.value = view.value.month === 11
  ? { year: view.value.year + 1, month: 0 }
  : { ...view.value, month: view.value.month + 1 };

const isToday = (d) => d && view.value.year === today.getFullYear()
  && view.value.month === today.getMonth() && d === today.getDate();
const isSelected = (d) => selected.value
  && view.value.year === selected.value.getFullYear()
  && view.value.month === selected.value.getMonth()
  && d === selected.value.getDate();
const pick = (d) => { if (d) selected.value = new Date(view.value.year, view.value.month, d); };
</script>

<template>
  <div class="pk-datepicker">
    <div class="pk-datepicker__header">
      <span class="pk-datepicker__title">{{ MONTHS[view.month] }} {{ view.year }}</span>
      <div class="pk-datepicker__nav">
        <button type="button" class="pk-datepicker__chevron" @click="prev" aria-label="Previous month">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button type="button" class="pk-datepicker__chevron" @click="next" aria-label="Next month">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="pk-datepicker__grid">
      <div v-for="(d, i) in DAYS" :key="d" class="pk-datepicker__weekday" :class="{ 'is-weekend': i === 0 || i === 6 }">{{ d }}</div>
      <div
        v-for="(d, i) in grid" :key="i"
        class="pk-datepicker__day"
        :class="{ 'is-empty': !d, 'is-today': isToday(d), 'is-selected': isSelected(d) }"
        @click="pick(d)"
      >{{ d }}</div>
    </div>
    <div class="pk-datepicker__ctas">
      <button type="button" class="pk-datepicker__close" @click="emit('close')">Close</button>
      <button type="button" class="pk-datepicker__select" @click="emit('select', selected)">Select</button>
    </div>
  </div>
</template>

<style scoped>
.pk-datepicker {
  background: #fff; border-radius: 8px; padding: 25px; width: 326px;
  display: flex; flex-direction: column; gap: 20px; font-family: Inter, system-ui, sans-serif;
}
.pk-datepicker__header { display: flex; justify-content: space-between; align-items: center; }
.pk-datepicker__title { font: 500 17px/25px Inter, sans-serif; color: #121212; }
.pk-datepicker__nav { display: flex; gap: 10px; }
.pk-datepicker__chevron { background: none; border: 0; padding: 2px; cursor: pointer; display: flex; border-radius: 4px; }
.pk-datepicker__chevron:hover { background: #F5F5F5; }
.pk-datepicker__grid { display: grid; grid-template-columns: repeat(7, 1fr); }
.pk-datepicker__weekday { text-align: center; padding: 10px 2.5px; font: 400 15px/20px Inter, sans-serif; color: #121212; }
.pk-datepicker__weekday.is-weekend { color: #F36A6A; }
.pk-datepicker__day { height: 40px; display: flex; align-items: center; justify-content: center; font: 400 15px/20px Inter, sans-serif; color: #858585; cursor: pointer; border-radius: 8px; margin: 2px 0; }
.pk-datepicker__day.is-empty { pointer-events: none; }
.pk-datepicker__day:not(.is-empty):hover { background: #FFF0E8; }
.pk-datepicker__day.is-today { font-weight: 600; color: #FAAA89; }
.pk-datepicker__day.is-selected { background: #FAAA89; color: #fff; }
.pk-datepicker__ctas { display: flex; justify-content: flex-end; gap: 20px; }
.pk-datepicker__close { background: none; border: 0; padding: 10px 20px; border-radius: 4px; font: 400 15px/20px Inter, sans-serif; color: #9CA3AF; cursor: pointer; }
.pk-datepicker__select { background: #FAAA89; border: 0; padding: 10px 20px; border-radius: 4px; font: 400 15px/20px Inter, sans-serif; color: #fff; cursor: pointer; }
</style>`;

export const flutterDatePicker = `// pk_date_picker.dart — Parkway Wallet
import 'package:flutter/material.dart';

const _months = ['January','February','March','April','May','June',
  'July','August','September','October','November','December'];
const _days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const _kAccent = Color(0xFFFAAA89);
const _kWeekend = Color(0xFFF36A6A);
const _kDay = Color(0xFF858585);
const _kHeader = Color(0xFF121212);
const _kMuted = Color(0xFF9CA3AF);

class PkDatePicker extends StatefulWidget {
  const PkDatePicker({ super.key, this.initialDate, this.onSelect, this.onClose });
  final DateTime? initialDate;
  final ValueChanged<DateTime?>? onSelect;
  final VoidCallback? onClose;

  @override
  State<PkDatePicker> createState() => _PkDatePickerState();
}

class _PkDatePickerState extends State<PkDatePicker> {
  late DateTime _view;
  DateTime? _selected;
  final _today = DateTime.now();

  @override
  void initState() {
    super.initState();
    _view = DateTime(widget.initialDate?.year ?? _today.year, widget.initialDate?.month ?? _today.month);
    _selected = widget.initialDate;
  }

  List<int?> _grid() {
    final first = DateTime(_view.year, _view.month, 1).weekday % 7;
    final last  = DateTime(_view.year, _view.month + 1, 0).day;
    final cells = List<int?>.filled(first, null);
    for (var d = 1; d <= last; d++) cells.add(d);
    while (cells.length % 7 != 0) cells.add(null);
    return cells;
  }

  bool _isToday(int? d) => d != null && _view.year == _today.year
    && _view.month == _today.month && d == _today.day;
  bool _isSel(int? d) => d != null && _selected != null
    && _view.year == _selected!.year && _view.month == _selected!.month && d == _selected!.day;

  void _prev() => setState(() => _view = DateTime(_view.year, _view.month - 1));
  void _next() => setState(() => _view = DateTime(_view.year, _view.month + 1));

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 326, padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(8)),
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
          Text('\${_months[_view.month - 1]} \${_view.year}',
            style: const TextStyle(fontFamily: 'Inter', fontWeight: FontWeight.w500, fontSize: 17, color: _kHeader)),
          Row(children: [
            _ChevronBtn(left: true,  onTap: _prev),
            const SizedBox(width: 10),
            _ChevronBtn(left: false, onTap: _next),
          ]),
        ]),
        const SizedBox(height: 15),
        GridView.count(crossAxisCount: 7, shrinkWrap: true, physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 4, children: [
          ..._days.asMap().entries.map((e) => Center(child: Text(e.value,
            style: TextStyle(fontFamily: 'Inter', fontSize: 15,
              color: e.key == 0 || e.key == 6 ? _kWeekend : _kHeader)))),
          ..._grid().map((d) => d == null ? const SizedBox() : GestureDetector(
            onTap: () => setState(() => _selected = DateTime(_view.year, _view.month, d)),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 100),
              decoration: BoxDecoration(
                color: _isSel(d) ? _kAccent : Colors.transparent,
                borderRadius: BorderRadius.circular(8),
              ),
              alignment: Alignment.center,
              child: Text('\$d', style: TextStyle(
                fontFamily: 'Inter', fontSize: 15,
                fontWeight: _isToday(d) ? FontWeight.w600 : FontWeight.w400,
                color: _isSel(d) ? Colors.white : _isToday(d) ? _kAccent : _kDay,
              )),
            ),
          )),
        ]),
        const SizedBox(height: 4),
        Row(mainAxisAlignment: MainAxisAlignment.end, children: [
          TextButton(onPressed: widget.onClose, child: const Text('Close',
            style: TextStyle(fontFamily: 'Inter', fontSize: 15, color: _kMuted))),
          const SizedBox(width: 8),
          ElevatedButton(
            onPressed: () => widget.onSelect?.call(_selected),
            style: ElevatedButton.styleFrom(backgroundColor: _kAccent, foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10), elevation: 0),
            child: const Text('Select', style: TextStyle(fontFamily: 'Inter', fontSize: 15)),
          ),
        ]),
      ]),
    );
  }
}

class _ChevronBtn extends StatelessWidget {
  const _ChevronBtn({ required this.left, required this.onTap });
  final bool left;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => GestureDetector(
    onTap: onTap,
    child: Icon(left ? Icons.chevron_left : Icons.chevron_right, color: _kHeader, size: 24),
  );
}`;

export function usageDatePicker(fw) {
  if (fw === "flutter")
    return `PkDatePicker(\n  initialDate: DateTime.now(),\n  onSelect: (date) => setState(() => picked = date),\n  onClose: () => Navigator.pop(context),\n)`;
  if (fw === "vue")
    return `<PkDatePicker @select="onDateSelect" @close="showPicker = false" />`;
  return `<PkDatePicker\n  onSelect={(date) => setPickedDate(date)}\n  onClose={() => setOpen(false)}\n/>`;
}

/* ── Radio Button ────────────────────────────────────────────────────── */
export const reactRadio = `// PkRadio.jsx — Parkway Wallet
import './parkway-radio.css';

export function PkRadio({ checked = false, disabled = false, onChange, id, children }) {
  return (
    <label className={\`pk-radio\${disabled ? ' is-disabled' : ''}\`} htmlFor={id}>
      <input
        id={id}
        type="radio"
        className="pk-radio__input"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="pk-radio__control" aria-hidden="true" />
      {children && <span className="pk-radio__label">{children}</span>}
    </label>
  );
}

export function PkRadioGroup({ name, options = [], value, onChange }) {
  return (
    <div className="pk-radio-group" role="radiogroup">
      {options.map(({ key, label, disabled }) => (
        <PkRadio
          key={key}
          id={\`\${name}-\${key}\`}
          checked={value === key}
          disabled={disabled}
          onChange={() => !disabled && onChange?.(key)}
        >
          {label}
        </PkRadio>
      ))}
    </div>
  );
}

/* parkway-radio.css
.pk-radio { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; }
.pk-radio.is-disabled { cursor: not-allowed; opacity: 1; }

.pk-radio__input { position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }

.pk-radio__control {
  flex-shrink: 0;
  width: 20px; height: 20px; border-radius: 50%;
  border: 1.5px solid #C6C6C6; background: #fff;
  box-sizing: border-box;
  transition: border-color .15s ease, box-shadow .15s ease;
  display: flex; align-items: center; justify-content: center;
}
.pk-radio__input:checked + .pk-radio__control {
  border-color: var(--pk-tangerine-01);
  box-shadow: inset 0 0 0 4px var(--pk-tangerine-01);
}
.pk-radio.is-disabled .pk-radio__control { border-color: #BBBBBB; }
.pk-radio.is-disabled .pk-radio__input:checked + .pk-radio__control {
  border-color: #BBBBBB; box-shadow: inset 0 0 0 4px #BBBBBB;
}
.pk-radio__label { font: 500 14px/1 Manrope, sans-serif; color: #121212; }
.pk-radio.is-disabled .pk-radio__label { color: #BBBBBB; }

.pk-radio-group { display: flex; flex-direction: column; gap: 16px; }
*/`;

export const vueRadio = `<!-- PkRadio.vue — Parkway Wallet -->
<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  name: { type: String, required: true },
});
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="pk-radio-group" role="radiogroup">
    <label
      v-for="opt in options"
      :key="opt.key"
      class="pk-radio"
      :class="{ 'is-disabled': opt.disabled }"
    >
      <input
        type="radio"
        class="pk-radio__input"
        :name="name"
        :value="opt.key"
        :checked="modelValue === opt.key"
        :disabled="opt.disabled"
        @change="emit('update:modelValue', opt.key)"
      />
      <span class="pk-radio__control" aria-hidden="true" />
      <span class="pk-radio__label">{{ opt.label }}</span>
    </label>
  </div>
</template>

<style scoped>
.pk-radio { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; }
.pk-radio.is-disabled { cursor: not-allowed; }
.pk-radio__input { position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }
.pk-radio__control {
  flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%;
  border: 1.5px solid #C6C6C6; background: #fff; box-sizing: border-box;
  transition: border-color .15s ease, box-shadow .15s ease;
}
.pk-radio__input:checked + .pk-radio__control {
  border-color: var(--pk-tangerine-01);
  box-shadow: inset 0 0 0 4px var(--pk-tangerine-01);
}
.pk-radio.is-disabled .pk-radio__control { border-color: #BBBBBB; }
.pk-radio.is-disabled .pk-radio__input:checked + .pk-radio__control {
  border-color: #BBBBBB; box-shadow: inset 0 0 0 4px #BBBBBB;
}
.pk-radio__label { font: 500 14px/1 Manrope, sans-serif; color: #121212; }
.pk-radio.is-disabled .pk-radio__label { color: #BBBBBB; }
.pk-radio-group { display: flex; flex-direction: column; gap: 16px; }
</style>`;

export const flutterRadio = `// pk_radio.dart — Parkway Wallet
import 'package:flutter/material.dart';
import 'parkway_tokens.dart';

class PkRadioOption<T> {
  const PkRadioOption({ required this.value, required this.label, this.disabled = false });
  final T value;
  final String label;
  final bool disabled;
}

class PkRadioGroup<T> extends StatelessWidget {
  const PkRadioGroup({
    super.key,
    required this.options,
    required this.value,
    required this.onChanged,
  });

  final List<PkRadioOption<T>> options;
  final T value;
  final ValueChanged<T> onChanged;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: options.map((opt) => Padding(
        padding: EdgeInsets.only(bottom: opt == options.last ? 0 : 16),
        child: _PkRadioTile<T>(
          option: opt,
          selected: value == opt.value,
          onTap: () { if (!opt.disabled) onChanged(opt.value); },
        ),
      )).toList(),
    );
  }
}

class _PkRadioTile<T> extends StatelessWidget {
  const _PkRadioTile({ required this.option, required this.selected, required this.onTap });
  final PkRadioOption<T> option;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final ringColor = option.disabled
        ? const Color(0xFFBBBBBB)
        : selected ? PkColors.tangerine01 : const Color(0xFFC6C6C6);
    return GestureDetector(
      onTap: onTap,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 20, height: 20,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: Colors.white,
              border: Border.all(color: ringColor, width: 1.5),
            ),
            child: selected ? Center(
              child: Container(
                width: 10, height: 10,
                decoration: BoxDecoration(shape: BoxShape.circle, color: ringColor),
              ),
            ) : null,
          ),
          const SizedBox(width: 10),
          Text(option.label,
            style: TextStyle(
              fontFamily: 'Manrope', fontWeight: FontWeight.w500, fontSize: 14,
              color: option.disabled ? const Color(0xFFBBBBBB) : const Color(0xFF121212),
            ),
          ),
        ],
      ),
    );
  }
}`;

export function usageRadio(fw, checked) {
  const c = checked ? "true" : "false";
  if (fw === "flutter")
    return `PkRadioGroup<String>(\n  options: const [\n    PkRadioOption(value: 'physical', label: 'Physical Card'),\n    PkRadioOption(value: 'virtual', label: 'Virtual Card'),\n  ],\n  value: ${checked ? "'physical'" : "cardType"},\n  onChanged: (v) => setState(() => cardType = v),\n)`;
  if (fw === "vue")
    return `<!-- cardType: ref(${checked ? "'physical'" : "''"}) -->\n<PkRadio\n  v-model="cardType"\n  name="card-type"\n  :options="[\n    { key: 'physical', label: 'Physical Card' },\n    { key: 'virtual', label: 'Virtual Card' },\n  ]"\n/>`;
  return `<PkRadio checked={${c}} onChange={setIsSelected}>\n  Physical Card\n</PkRadio>`;
}
