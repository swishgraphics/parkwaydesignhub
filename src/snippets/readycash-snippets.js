// ReadyCash token export snippets — referenced by the Colors page for the RC product.
// Uses --rc-* prefix; includes shared Parkway palette + RC accent palettes.

export const rcCssTokens = `:root {
  /* ReadyCash — Primary: Atomic Tangerine */
  --rc-tangerine-01: #F9956B;  --rc-tangerine-02: #FAAA89;
  --rc-tangerine-03: #FBBFA6;  --rc-tangerine-04: #FDD5C4;
  --rc-tangerine-05: #FEEAE1;  --rc-tangerine-06: #C77756;
  --rc-tangerine-07: #955940;  --rc-tangerine-08: #643C2B;
  --rc-tangerine-09: #321E15;

  /* ReadyCash — Secondary: Rich Grey */
  --rc-grey-01: #121212;  --rc-grey-02: #999999;
  --rc-grey-03: #C6C6C6;  --rc-grey-04: #DDDDDD;
  --rc-grey-05: #EFEFEF;  --rc-grey-06: #FBFBFB;
  --rc-grey-07: #BBBBBB;  --rc-grey-08: #868686;
  --rc-grey-09: #444444;  --rc-grey-10: #1F1F1F;
  --rc-grey-11: #171616;  --rc-grey-12: #000000;
  --rc-white-01: #FFFFFF;

  /* ReadyCash — Alternative: Buff */
  --rc-buff-01: #F2DC8E;  --rc-buff-02: #F5E3A5;
  --rc-buff-03: #F7EABB;  --rc-buff-04: #FAF1D2;
  --rc-buff-05: #FCF8E8;  --rc-buff-06: #C2B072;
  --rc-buff-07: #918455;  --rc-buff-08: #615839;
  --rc-buff-09: #302C1C;

  /* Messaging */
  --rc-success: #36CC4F;
  --rc-error:   #FF0000;

  /* Accent — Magenta */
  --rc-accent-magenta-0:   #F5F8FF;  --rc-accent-magenta-10:  #FFD5FE;
  --rc-accent-magenta-20:  #FFC1EA;  --rc-accent-magenta-30:  #FFADD6;
  --rc-accent-magenta-40:  #FF99C2;  --rc-accent-magenta-50:  #FF85AE;
  --rc-accent-magenta-60:  #FF719A;  --rc-accent-magenta-70:  #FF5D86;
  --rc-accent-magenta-80:  #FF4972;  --rc-accent-magenta-90:  #FF355E;
  --rc-accent-magenta-100: #ED214A;

  /* Accent — Green */
  --rc-accent-green-0:   #F8F5FF;  --rc-accent-green-10:  #B4FFB4;
  --rc-accent-green-20:  #A0FFA0;  --rc-accent-green-30:  #8CFF8C;
  --rc-accent-green-40:  #78FF78;  --rc-accent-green-50:  #64FF64;
  --rc-accent-green-60:  #50F050;  --rc-accent-green-70:  #3CDC3C;
  --rc-accent-green-80:  #28C828;  --rc-accent-green-90:  #14B414;
  --rc-accent-green-100: #00A000;

  /* Accent — Orange */
  --rc-accent-orange-0:   #FEEBD4;  --rc-accent-orange-10:  #FDDDB8;
  --rc-accent-orange-20:  #FBCC94;  --rc-accent-orange-30:  #FABB70;
  --rc-accent-orange-40:  #F9AA4D;  --rc-accent-orange-50:  #F89929;
  --rc-accent-orange-60:  #CF8022;  --rc-accent-orange-70:  #A5661B;
  --rc-accent-orange-80:  #7C4C14;  --rc-accent-orange-90:  #53330E;
  --rc-accent-orange-100: #321F08;

  /* Spacing — 8px base unit */
  --rc-space-1: 8px;   --rc-space-2: 16px;  --rc-space-3: 24px;
  --rc-space-4: 32px;  --rc-space-5: 40px;  --rc-space-6: 48px;
  --rc-space-7: 56px;  --rc-space-8: 64px;
}`;

export const rcTailwindTokens = `// tailwind.config.js — ReadyCash design tokens
module.exports = {
  theme: {
    extend: {
      colors: {
        tangerine: {
          DEFAULT: "#F9956B", 100: "#FEEAE1", 200: "#FDD5C4",
          300: "#FBBFA6", 400: "#FAAA89", 500: "#F9956B",
          600: "#C77756", 700: "#955940", 800: "#643C2B", 900: "#321E15",
        },
        buff: {
          DEFAULT: "#F2DC8E", 100: "#FCF8E8", 200: "#FAF1D2",
          300: "#F7EABB", 400: "#F5E3A5", 500: "#F2DC8E",
          600: "#C2B072", 700: "#918455", 800: "#615839", 900: "#302C1C",
        },
        ink: {
          DEFAULT: "#121212", 50: "#FBFBFB", 100: "#EFEFEF",
          200: "#DDDDDD", 300: "#C6C6C6", 400: "#BBBBBB",
          500: "#999999", 600: "#868686", 700: "#444444",
          800: "#1F1F1F", 900: "#121212",
        },
        accentMagenta: {
          0: "#F5F8FF", 10: "#FFD5FE", 20: "#FFC1EA", 30: "#FFADD6",
          40: "#FF99C2", 50: "#FF85AE", 60: "#FF719A", 70: "#FF5D86",
          80: "#FF4972", 90: "#FF355E", 100: "#ED214A",
        },
        accentGreen: {
          0: "#F8F5FF", 10: "#B4FFB4", 20: "#A0FFA0", 30: "#8CFF8C",
          40: "#78FF78", 50: "#64FF64", 60: "#50F050", 70: "#3CDC3C",
          80: "#28C828", 90: "#14B414", 100: "#00A000",
        },
        accentOrange: {
          0: "#FEEBD4", 10: "#FDDDB8", 20: "#FBCC94", 30: "#FABB70",
          40: "#F9AA4D", 50: "#F89929", 60: "#CF8022", 70: "#A5661B",
          80: "#7C4C14", 90: "#53330E", 100: "#321F08",
        },
        success: "#36CC4F",
        error: "#FF0000",
      },
      spacing: { 1: "8px", 2: "16px", 3: "24px", 4: "32px",
                 5: "40px", 6: "48px", 7: "56px", 8: "64px" },
      fontFamily: {
        sans: ['"Noto Sans"', "sans-serif"],
      },
    },
  },
};`;

export const rcFlutterTokens = `// readycash_tokens.dart — ReadyCash design tokens
import 'package:flutter/material.dart';

abstract class RcColors {
  // Primary — Atomic Tangerine
  static const tangerine01 = Color(0xFFF9956B);
  static const tangerine02 = Color(0xFFFAAA89);
  static const tangerine03 = Color(0xFFFBBFA6);
  static const tangerine04 = Color(0xFFFDD5C4);
  static const tangerine05 = Color(0xFFFEEAE1);
  static const tangerine06 = Color(0xFFC77756);
  static const tangerine07 = Color(0xFF955940);
  static const tangerine08 = Color(0xFF643C2B);
  static const tangerine09 = Color(0xFF321E15);

  // Secondary — Rich Grey
  static const grey01 = Color(0xFF121212);
  static const grey02 = Color(0xFF999999);
  static const grey03 = Color(0xFFC6C6C6);
  static const grey04 = Color(0xFFDDDDDD);
  static const grey05 = Color(0xFFEFEFEF);
  static const grey06 = Color(0xFFFBFBFB);
  static const grey07 = Color(0xFFBBBBBB);
  static const grey08 = Color(0xFF868686);
  static const grey09 = Color(0xFF444444);
  static const grey10 = Color(0xFF1F1F1F);
  static const grey11 = Color(0xFF171616);
  static const grey12 = Color(0xFF000000);
  static const white01 = Color(0xFFFFFFFF);

  // Alternative — Buff
  static const buff01 = Color(0xFFF2DC8E);
  static const buff02 = Color(0xFFF5E3A5);
  static const buff03 = Color(0xFFF7EABB);
  static const buff04 = Color(0xFFFAF1D2);
  static const buff05 = Color(0xFFFCF8E8);
  static const buff06 = Color(0xFFC2B072);
  static const buff07 = Color(0xFF918455);
  static const buff08 = Color(0xFF615839);
  static const buff09 = Color(0xFF302C1C);

  // Messaging
  static const success = Color(0xFF36CC4F);
  static const error   = Color(0xFFFF0000);

  // Accent — Magenta
  static const accentMagenta0   = Color(0xFFF5F8FF);
  static const accentMagenta10  = Color(0xFFFFD5FE);
  static const accentMagenta20  = Color(0xFFFFC1EA);
  static const accentMagenta30  = Color(0xFFFFADD6);
  static const accentMagenta40  = Color(0xFFFF99C2);
  static const accentMagenta50  = Color(0xFFFF85AE);
  static const accentMagenta60  = Color(0xFFFF719A);
  static const accentMagenta70  = Color(0xFFFF5D86);
  static const accentMagenta80  = Color(0xFFFF4972);
  static const accentMagenta90  = Color(0xFFFF355E);
  static const accentMagenta100 = Color(0xFFED214A);

  // Accent — Green
  static const accentGreen0   = Color(0xFFF8F5FF);
  static const accentGreen10  = Color(0xFFB4FFB4);
  static const accentGreen20  = Color(0xFFA0FFA0);
  static const accentGreen30  = Color(0xFF8CFF8C);
  static const accentGreen40  = Color(0xFF78FF78);
  static const accentGreen50  = Color(0xFF64FF64);
  static const accentGreen60  = Color(0xFF50F050);
  static const accentGreen70  = Color(0xFF3CDC3C);
  static const accentGreen80  = Color(0xFF28C828);
  static const accentGreen90  = Color(0xFF14B414);
  static const accentGreen100 = Color(0xFF00A000);

  // Accent — Orange
  static const accentOrange0   = Color(0xFFFEEBD4);
  static const accentOrange10  = Color(0xFFFDDDB8);
  static const accentOrange20  = Color(0xFFFBCC94);
  static const accentOrange30  = Color(0xFFFABB70);
  static const accentOrange40  = Color(0xFFF9AA4D);
  static const accentOrange50  = Color(0xFFF89929);
  static const accentOrange60  = Color(0xFFCF8022);
  static const accentOrange70  = Color(0xFFA5661B);
  static const accentOrange80  = Color(0xFF7C4C14);
  static const accentOrange90  = Color(0xFF53330E);
  static const accentOrange100 = Color(0xFF321F08);
}

abstract class RcSpacing {
  static const double s1 = 8, s2 = 16, s3 = 24, s4 = 32,
                      s5 = 40, s6 = 48, s7 = 56, s8 = 64;
}`;

// ─── Button snippets ────────────────────────────────────────────────────────

export const rcReactButton = `// RcButton.jsx — ReadyCash button (React)
// Figma: Buttons 350:702 · requires readycash-tokens.css
import "./readycash-tokens.css";

const WIDTHS = { small: 168, medium: 187, large: 195, xlarge: "100%" };

export default function RcButton({
  variant = "primary",   // "primary" | "secondary"
  size = "medium",       // "small" | "medium" | "large" | "xlarge"
  rounded = false,       // true → 28px pill; false → 4px rectangular
  disabled = false,
  children,
  ...rest
}) {
  return (
    <button
      className={\`rc-btn rc-btn--\${variant}\${rounded ? " rc-btn--rounded" : ""}\`}
      style={{ width: WIDTHS[size] }}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

/* readycash-button.css
.rc-btn {
  height: 56px; border-radius: 4px; border: 0; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  gap: 6px; font: 500 16px/1 'Noto Sans', sans-serif;
  color: var(--rc-grey-01); transition: background .15s ease;
}
.rc-btn--rounded { border-radius: 28px; }
.rc-btn--primary            { background: var(--rc-tangerine-01); }
.rc-btn--primary:hover      { background: var(--rc-tangerine-03); }
.rc-btn--primary:disabled   { background: var(--rc-tangerine-04);
                              color: var(--rc-grey-07); cursor: not-allowed; }
.rc-btn--secondary            { background: var(--rc-grey-05); }
.rc-btn--secondary:hover      { background: var(--rc-grey-04); }
.rc-btn--secondary:disabled   { background: var(--rc-grey-06);
                                color: var(--rc-grey-07); cursor: not-allowed; }
.rc-btn:focus-visible { outline: 2px solid var(--rc-grey-01); outline-offset: 2px; }
*/`;

export const rcVueButton = `<!-- RcButton.vue — ReadyCash button (Vue 3) -->
<!-- Figma: Buttons 350:702 · requires readycash-tokens.css -->
<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: { type: String, default: "primary" },   // primary | secondary
  size:    { type: String, default: "medium" },    // small | medium | large | xlarge
  rounded: { type: Boolean, default: false },      // true → 28px pill
  disabled: { type: Boolean, default: false },
});

const WIDTHS = { small: "168px", medium: "187px", large: "195px", xlarge: "100%" };
const width = computed(() => WIDTHS[props.size]);
</script>

<template>
  <button
    class="rc-btn"
    :class="[\`rc-btn--\${variant}\`, { 'rc-btn--rounded': rounded }]"
    :style="{ width }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.rc-btn {
  height: 56px; border-radius: 4px; border: 0; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  gap: 6px; font: 500 16px/1 'Noto Sans', sans-serif;
  color: var(--rc-grey-01); transition: background .15s ease;
}
.rc-btn--rounded { border-radius: 28px; }
.rc-btn--primary            { background: var(--rc-tangerine-01); }
.rc-btn--primary:hover      { background: var(--rc-tangerine-03); }
.rc-btn--primary:disabled   { background: var(--rc-tangerine-04);
                              color: var(--rc-grey-07); cursor: not-allowed; }
.rc-btn--secondary            { background: var(--rc-grey-05); }
.rc-btn--secondary:hover      { background: var(--rc-grey-04); }
.rc-btn--secondary:disabled   { background: var(--rc-grey-06);
                                color: var(--rc-grey-07); cursor: not-allowed; }
.rc-btn:focus-visible { outline: 2px solid var(--rc-grey-01); outline-offset: 2px; }
</style>`;

export const rcFlutterButton = `// rc_button.dart — ReadyCash button (Flutter)
// Figma: Buttons 350:702 · requires readycash_tokens.dart
import 'package:flutter/material.dart';
import 'readycash_tokens.dart';

enum RcVariant { primary, secondary }
enum RcSize    { small, medium, large, xlarge }

class RcButton extends StatelessWidget {
  const RcButton({
    super.key,
    required this.label,
    this.onPressed,
    this.variant = RcVariant.primary,
    this.size = RcSize.medium,
    this.rounded = false,
  });

  final String label;
  final VoidCallback? onPressed;   // null = disabled
  final RcVariant variant;
  final RcSize size;
  final bool rounded;

  static const _widths = {
    RcSize.small: 168.0, RcSize.medium: 187.0,
    RcSize.large: 195.0, RcSize.xlarge: double.infinity,
  };

  @override
  Widget build(BuildContext context) {
    final primary = variant == RcVariant.primary;
    return SizedBox(
      width: _widths[size],
      height: 56,
      child: TextButton(
        onPressed: onPressed,
        style: ButtonStyle(
          shape: WidgetStatePropertyAll(RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(rounded ? 28 : 4))),
          backgroundColor: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.disabled)) {
              return primary ? RcColors.tangerine04 : RcColors.grey06;
            }
            if (states.contains(WidgetState.hovered) ||
                states.contains(WidgetState.pressed)) {
              return primary ? RcColors.tangerine03 : RcColors.grey04;
            }
            return primary ? RcColors.tangerine01 : RcColors.grey05;
          }),
          foregroundColor: WidgetStateProperty.resolveWith((states) =>
            states.contains(WidgetState.disabled)
              ? RcColors.grey07 : RcColors.grey01),
          textStyle: const WidgetStatePropertyAll(TextStyle(
            fontFamily: 'Noto Sans', fontSize: 16,
            fontWeight: FontWeight.w500)),
        ),
        child: Text(label),
      ),
    );
  }
}`;

// ─── Input snippets ─────────────────────────────────────────────────────────

export const rcReactInput = `// RcInput.jsx — ReadyCash text input (React)
// Figma: Input Fields 350:9154 · requires readycash-tokens.css
import "./readycash-tokens.css";

export default function RcInput({
  label,
  placeholder = "",
  theme = "outline",   // "outline" | "filled"
  state = "default",   // "default" | "focused" | "error" | "success" | "disabled"
  helpText,
  errorMsg,
  leadingIcon,
  mandatory = false,
  value,
  onChange,
  ...rest
}) {
  const disabled = state === "disabled";
  const hasError = state === "error";

  const borderColor = {
    default: "#9ea2b3", focused: "#3e414c", error: "#e62e2e",
    success: "#069952", disabled: "#9ea2b3",
  }[state];

  const bg = theme === "filled" ? ({
    default: "#f6f7f9", focused: "#f5f8ff",
    error: "rgba(255,230,230,0.6)", success: "rgba(230,255,243,0.6)",
    disabled: "#f6f7f9",
  }[state]) : "transparent";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {label && (
        <label style={{
          font: "600 14px/1.6 'Noto Sans', sans-serif",
          color: hasError ? "#e62e2e" : "#141519",
        }}>
          {label}{mandatory && <span aria-hidden="true"> *</span>}
        </label>
      )}
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "12px 16px", borderRadius: "4px",
        border: \`1px solid \${borderColor}\`, background: bg,
        opacity: disabled ? 0.5 : 1,
        transition: "border-color .15s, background .15s",
      }}>
        {leadingIcon && <span aria-hidden="true" style={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }}>{leadingIcon}</span>}
        <input
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          style={{
            flex: 1, border: 0, background: "transparent", outline: "none",
            font: "400 16px/24px 'Noto Sans', sans-serif",
            color: disabled ? "#838799" : "#141519",
          }}
          {...rest}
        />
      </div>
      {hasError && errorMsg && (
        <span style={{ font: "400 12px/16px 'Noto Sans', sans-serif", color: "#e62e2e" }}>{errorMsg}</span>
      )}
      {!hasError && helpText && (
        <span style={{ font: "400 12px/16px 'Noto Sans', sans-serif", color: "#6b6f80" }}>{helpText}</span>
      )}
    </div>
  );
}`;

export const rcVueInput = `<!-- RcInput.vue — ReadyCash text input (Vue 3) -->
<!-- Figma: Input Fields 350:9154 · requires readycash-tokens.css -->
<script setup>
import { computed } from "vue";

const props = defineProps({
  label:       { type: String,  default: "" },
  placeholder: { type: String,  default: "" },
  theme:       { type: String,  default: "outline" },   // outline | filled
  state:       { type: String,  default: "default" },   // default | focused | error | success | disabled
  helpText:    { type: String,  default: "" },
  errorMsg:    { type: String,  default: "" },
  mandatory:   { type: Boolean, default: false },
  modelValue:  { type: String,  default: "" },
});
const emit = defineEmits(["update:modelValue"]);

const BORDER = { default: "#9ea2b3", focused: "#3e414c",
                 error: "#e62e2e", success: "#069952", disabled: "#9ea2b3" };
const BG_FILLED = { default: "#f6f7f9", focused: "#f5f8ff",
                    error: "rgba(255,230,230,0.6)", success: "rgba(230,255,243,0.6)", disabled: "#f6f7f9" };

const fieldStyle = computed(() => ({
  display: "flex", alignItems: "center", gap: "8px",
  padding: "12px 16px", borderRadius: "4px",
  border: \`1px solid \${BORDER[props.state]}\`,
  background: props.theme === "filled" ? BG_FILLED[props.state] : "transparent",
  opacity: props.state === "disabled" ? 0.5 : 1,
  transition: "border-color .15s, background .15s",
}));
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:4px">
    <label v-if="label" :style="{ font: '600 14px/1.6 \\'Noto Sans\\', sans-serif',
                                   color: state === 'error' ? '#e62e2e' : '#141519' }">
      {{ label }}<span v-if="mandatory" aria-hidden="true"> *</span>
    </label>
    <div :style="fieldStyle">
      <slot name="icon" />
      <input
        type="text"
        :placeholder="placeholder"
        :disabled="state === 'disabled'"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        :style="{ flex: 1, border: 0, background: 'transparent', outline: 'none',
                  font: '400 16px/24px \\'Noto Sans\\', sans-serif',
                  color: state === 'disabled' ? '#838799' : '#141519' }"
      />
    </div>
    <span v-if="state === 'error' && errorMsg"
          style="font: 400 12px/16px 'Noto Sans', sans-serif; color: #e62e2e">{{ errorMsg }}</span>
    <span v-else-if="helpText"
          style="font: 400 12px/16px 'Noto Sans', sans-serif; color: #6b6f80">{{ helpText }}</span>
  </div>
</template>`;

export const rcFlutterInput = `// rc_input.dart — ReadyCash text input (Flutter)
// Figma: Input Fields 350:9154 · requires readycash_tokens.dart
import 'package:flutter/material.dart';
import 'readycash_tokens.dart';

enum RcInputTheme { outline, filled }
enum RcInputState { idle, focused, error, success, disabled }

class RcInput extends StatelessWidget {
  const RcInput({
    super.key,
    this.label,
    this.placeholder,
    this.helpText,
    this.errorText,
    this.theme = RcInputTheme.outline,
    this.state = RcInputState.idle,
    this.mandatory = false,
    this.prefixIcon,
    this.controller,
  });

  final String? label, placeholder, helpText, errorText;
  final RcInputTheme theme;
  final RcInputState state;
  final bool mandatory;
  final Widget? prefixIcon;
  final TextEditingController? controller;

  static const _border = {
    RcInputState.idle:     Color(0xFF9EA2B3),
    RcInputState.focused:  Color(0xFF3E414C),
    RcInputState.error:    Color(0xFFE62E2E),
    RcInputState.success:  Color(0xFF069952),
    RcInputState.disabled: Color(0xFF9EA2B3),
  };

  static const _bgFilled = {
    RcInputState.idle:     Color(0xFFF6F7F9),
    RcInputState.focused:  Color(0xFFF5F8FF),
    RcInputState.error:    Color(0x26FF0000),
    RcInputState.success:  Color(0x26069952),
    RcInputState.disabled: Color(0xFFF6F7F9),
  };

  @override
  Widget build(BuildContext context) {
    final borderColor = _border[state]!;
    final bg = theme == RcInputTheme.filled ? _bgFilled[state]! : Colors.transparent;
    final disabled = state == RcInputState.disabled;
    final hasError = state == RcInputState.error;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (label != null)
          Padding(
            padding: const EdgeInsets.only(bottom: 4),
            child: Text(
              mandatory ? '\$label *' : label!,
              style: TextStyle(
                fontFamily: 'Noto Sans', fontSize: 14,
                fontWeight: FontWeight.w600,
                color: hasError ? const Color(0xFFE62E2E) : const Color(0xFF141519),
              ),
            ),
          ),
        Container(
          decoration: BoxDecoration(
            color: bg,
            borderRadius: BorderRadius.circular(4),
            border: Border.all(color: borderColor),
          ),
          child: Opacity(
            opacity: disabled ? 0.5 : 1.0,
            child: TextField(
              controller: controller,
              enabled: !disabled,
              style: const TextStyle(
                fontFamily: 'Noto Sans', fontSize: 16, height: 1.5,
                color: Color(0xFF141519)),
              decoration: InputDecoration(
                hintText: placeholder,
                hintStyle: const TextStyle(color: Color(0xFF838799)),
                prefixIcon: prefixIcon,
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                border: InputBorder.none,
              ),
            ),
          ),
        ),
        if (hasError && errorText != null)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text(errorText!,
              style: const TextStyle(fontFamily: 'Noto Sans', fontSize: 12,
                color: Color(0xFFE62E2E))),
          )
        else if (helpText != null)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text(helpText!,
              style: const TextStyle(fontFamily: 'Noto Sans', fontSize: 12,
                color: Color(0xFF6B6F80))),
          ),
      ],
    );
  }
}`;

export const rcUsageSnippet = (fw, variant, size, state, rounded = false) => {
  const dis = state === "disabled";
  const label = size === "small" ? "Sign in" : "Get a demo";
  const roundedProp = rounded ? " rounded" : "";
  if (fw === "flutter")
    return `RcButton(\n  label: '${label}',\n  variant: RcVariant.${variant},\n  size: RcSize.${size},${rounded ? "\n  rounded: true," : ""}\n  onPressed: ${dis ? "null, // disabled" : "() => handleTap(),"}\n)`;
  return `<RcButton variant="${variant}" size="${size}"${roundedProp}${dis ? " disabled" : ""}>\n  ${label}\n</RcButton>`;
};
