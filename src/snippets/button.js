// Button component snippets — referenced by the Buttons page.
// Desktop keeps the 27px pill; mobile uses an 8px corner radius.

export const reactButton = `// PkButton.jsx — Parkway button (React)
// Figma: Buttons 95:97 · requires parkway-tokens.css
import "./parkway-tokens.css";

const WIDTHS = { small: 98, icon: 200, medium: 275, large: 325, xlarge: "100%" };

export default function PkButton({
  variant = "primary",      // "primary" | "alternative"
  size = "medium",          // "small" | "icon" | "medium" | "large" | "xlarge"
  platform = "desktop",     // "desktop" (27px pill) | "mobile" (8px radius)
  disabled = false,
  withArrow,                // defaults to true for size="icon"
  children,
  ...rest
}) {
  const arrow = withArrow ?? size === "icon";
  return (
    <button
      className={\`pk-btn pk-btn--\${variant}\${platform === "mobile" ? " pk-btn--mobile" : ""}\`}
      style={{ width: WIDTHS[size] }}
      disabled={disabled}
      {...rest}
    >
      <span>{children}</span>
      {arrow && <span aria-hidden="true" className="pk-btn__arrow">⟶</span>}
    </button>
  );
}

/* parkway-button.css
.pk-btn {
  height: 54px; border-radius: 27px; border: 0; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  gap: 6px; font: 600 14px/1 Manrope, sans-serif;
  color: var(--pk-grey-01); transition: background .15s ease;
}
.pk-btn--mobile { border-radius: 8px; }   — mobile platform
.pk-btn--primary            { background: var(--pk-tangerine-01); }
.pk-btn--primary:hover      { background: var(--pk-tangerine-03); }
.pk-btn--primary:disabled   { background: var(--pk-tangerine-04);
                              color: var(--pk-grey-07); cursor: not-allowed; }
.pk-btn--alternative          { background: var(--pk-grey-05); }
.pk-btn--alternative:hover    { background: var(--pk-grey-04); }
.pk-btn--alternative:disabled { background: var(--pk-grey-06);
                                color: var(--pk-grey-07); cursor: not-allowed; }
.pk-btn:focus-visible { outline: 2px solid var(--pk-grey-01); outline-offset: 2px; }
*/`;

export const vueButton = `<!-- PkButton.vue — Parkway button (Vue 3) -->
<!-- Figma: Buttons 95:97 · requires parkway-tokens.css -->
<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: { type: String, default: "primary" },   // primary | alternative
  size: { type: String, default: "medium" },        // small | icon | medium | large | xlarge
  platform: { type: String, default: "desktop" },   // desktop (27px) | mobile (8px)
  disabled: { type: Boolean, default: false },
  withArrow: { type: Boolean, default: undefined },
});

const WIDTHS = { small: "98px", icon: "200px", medium: "275px",
                 large: "325px", xlarge: "100%" };
const width = computed(() => WIDTHS[props.size]);
const arrow = computed(() => props.withArrow ?? props.size === "icon");
</script>

<template>
  <button
    class="pk-btn"
    :class="[\`pk-btn--\${variant}\`, { 'pk-btn--mobile': platform === 'mobile' }]"
    :style="{ width }"
    :disabled="disabled"
  >
    <span><slot /></span>
    <span v-if="arrow" aria-hidden="true" class="pk-btn__arrow">⟶</span>
  </button>
</template>

<style scoped>
.pk-btn {
  height: 54px; border-radius: 27px; border: 0; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  gap: 6px; font: 600 14px/1 Manrope, sans-serif;
  color: var(--pk-grey-01); transition: background .15s ease;
}
.pk-btn--mobile { border-radius: 8px; }   /* mobile platform */
.pk-btn--primary            { background: var(--pk-tangerine-01); }
.pk-btn--primary:hover      { background: var(--pk-tangerine-03); }
.pk-btn--primary:disabled   { background: var(--pk-tangerine-04);
                              color: var(--pk-grey-07); cursor: not-allowed; }
.pk-btn--alternative          { background: var(--pk-grey-05); }
.pk-btn--alternative:hover    { background: var(--pk-grey-04); }
.pk-btn--alternative:disabled { background: var(--pk-grey-06);
                                color: var(--pk-grey-07); cursor: not-allowed; }
.pk-btn:focus-visible { outline: 2px solid var(--pk-grey-01); outline-offset: 2px; }
</style>`;

export const flutterButton = `// pk_button.dart — Parkway button (Flutter)
// Figma: Buttons 95:97 · requires parkway_tokens.dart
import 'package:flutter/material.dart';
import 'parkway_tokens.dart';

enum PkVariant { primary, alternative }
enum PkSize { small, icon, medium, large, xlarge }
enum PkPlatform { desktop, mobile }   // desktop = 27px pill, mobile = 8px radius

class PkButton extends StatelessWidget {
  const PkButton({
    super.key,
    required this.label,
    this.onPressed,
    this.variant = PkVariant.primary,
    this.size = PkSize.medium,
    this.platform = PkPlatform.desktop,
    bool? withArrow,
  }) : withArrow = withArrow ?? (size == PkSize.icon);

  final String label;
  final VoidCallback? onPressed;   // null = disabled
  final PkVariant variant;
  final PkSize size;
  final PkPlatform platform;
  final bool withArrow;

  static const _widths = {
    PkSize.small: 98.0, PkSize.icon: 200.0, PkSize.medium: 275.0,
    PkSize.large: 325.0, PkSize.xlarge: double.infinity,
  };

  @override
  Widget build(BuildContext context) {
    final primary = variant == PkVariant.primary;
    final radius = platform == PkPlatform.mobile ? 8.0 : 27.0;
    return SizedBox(
      width: _widths[size],
      height: 54,
      child: TextButton(
        onPressed: onPressed,
        style: ButtonStyle(
          shape: WidgetStatePropertyAll(RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(radius))),
          backgroundColor: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.disabled)) {
              return primary ? PkColors.tangerine04 : PkColors.grey06;
            }
            if (states.contains(WidgetState.hovered) ||
                states.contains(WidgetState.pressed)) {
              return primary ? PkColors.tangerine03 : PkColors.grey04;
            }
            return primary ? PkColors.tangerine01 : PkColors.grey05;
          }),
          foregroundColor: WidgetStateProperty.resolveWith((states) =>
            states.contains(WidgetState.disabled)
              ? PkColors.grey07 : PkColors.grey01),
          textStyle: const WidgetStatePropertyAll(TextStyle(
            fontFamily: 'Manrope', fontSize: 14,
            fontWeight: FontWeight.w600)),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(label),
            if (withArrow) ...[
              const SizedBox(width: 6),
              const Icon(Icons.arrow_right_alt, size: 18),
            ],
          ],
        ),
      ),
    );
  }
}`;

export const usageSnippet = (fw, variant, size, state, platform = "desktop") => {
  const dis = state === "disabled";
  const label = size === "small" ? "Sign in" : "Get a demo";
  const mob = platform === "mobile";
  if (fw === "react" || fw === "vue")
    return `<PkButton variant="${variant}" size="${size}"${mob ? ' platform="mobile"' : ""}${dis ? " disabled" : ""}>\n  ${label}\n</PkButton>`;
  return `PkButton(\n  label: '${label}',\n  variant: PkVariant.${variant},\n  size: PkSize.${size},${mob ? "\n  platform: PkPlatform.mobile," : ""}\n  onPressed: ${dis ? "null, // disabled" : "() => handleTap(),"}\n)`;
};
