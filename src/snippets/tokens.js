// Token export snippets — referenced by the Colors page.

export const cssTokens = `:root {
  /* Parkway — Primary: Atomic Tangerine */
  --pk-tangerine-01: #F9956B;  --pk-tangerine-02: #FAAA89;
  --pk-tangerine-03: #FBBFA6;  --pk-tangerine-04: #FDD5C4;
  --pk-tangerine-05: #FEEAE1;  --pk-tangerine-06: #C77756;
  --pk-tangerine-07: #955940;  --pk-tangerine-08: #643C2B;
  --pk-tangerine-09: #321E15;

  /* Parkway — Secondary: Rich Grey */
  --pk-grey-01: #121212;  --pk-grey-02: #999999;
  --pk-grey-03: #C6C6C6;  --pk-grey-04: #DDDDDD;
  --pk-grey-05: #EFEFEF;  --pk-grey-06: #FBFBFB;
  --pk-grey-07: #BBBBBB;  --pk-grey-08: #868686;
  --pk-grey-09: #444444;  --pk-grey-10: #1F1F1F;
  --pk-grey-11: #171616;  --pk-grey-12: #000000;
  --pk-white-01: #FFFFFF;

  /* Parkway — Alternative: Buff */
  --pk-buff-01: #F2DC8E;  --pk-buff-02: #F5E3A5;
  --pk-buff-03: #F7EABB;  --pk-buff-04: #FAF1D2;
  --pk-buff-05: #FCF8E8;  --pk-buff-06: #C2B072;
  --pk-buff-07: #918455;  --pk-buff-08: #615839;
  --pk-buff-09: #302C1C;

  /* Messaging */
  --pk-success: #36CC4F;
  --pk-error:   #FF0000;

  /* Spacing — 8px base unit */
  --pk-space-1: 8px;   --pk-space-2: 16px;  --pk-space-3: 24px;
  --pk-space-4: 32px;  --pk-space-5: 40px;  --pk-space-6: 48px;
  --pk-space-7: 56px;  --pk-space-8: 64px;

  /* Semantic surfaces — components reference these; they flip in dark mode */
  --pk-surface: var(--pk-white-01);
  --pk-field-bg: var(--pk-white-01);
  --pk-field-bg-disabled: var(--pk-grey-06);
  --pk-border: var(--pk-grey-04);
  --pk-label: var(--pk-grey-09);
  --pk-text: var(--pk-grey-01);
  --pk-text-muted: var(--pk-grey-08);
  --pk-placeholder: var(--pk-grey-02);
  --pk-track-off: var(--pk-grey-04);
  --pk-knob: var(--pk-white-01);
  --pk-toast-bg: var(--pk-grey-11);
  --pk-focus-ring: rgba(249, 149, 107, .20);

  /* Status badge pairs */
  --pk-badge-success-bg: #E7F7EA;          --pk-badge-success-fg: #1F8A3B;
  --pk-badge-failed-bg:  #FDECEC;          --pk-badge-failed-fg:  var(--pk-error);
  --pk-badge-pending-bg: var(--pk-buff-04); --pk-badge-pending-fg: var(--pk-buff-07);
  --pk-badge-alt-bg:     var(--pk-grey-05); --pk-badge-alt-fg:     var(--pk-grey-09);
}

/* Dark mode — set data-theme="dark" on <html>. Only the semantic layer flips;
   the brand palette above stays constant. */
:root[data-theme="dark"] {
  --pk-surface: #161616;
  --pk-field-bg: transparent;
  --pk-field-bg-disabled: transparent;
  --pk-border: #3A3A38;
  --pk-label: #F2F2F0;
  --pk-text: #F2F2F0;
  --pk-text-muted: #999999;
  --pk-placeholder: #7A7A75;
  --pk-track-off: #3A3A38;
  --pk-knob: #FFFFFF;
  --pk-toast-bg: #0E0E0E;
  --pk-focus-ring: rgba(249, 149, 107, .28);

  --pk-badge-success-bg: #16331C;  --pk-badge-success-fg: #6BBF74;
  --pk-badge-failed-bg:  #3A1D1E;  --pk-badge-failed-fg:  #FF6166;
  --pk-badge-pending-bg: #2A2414;  --pk-badge-pending-fg: #D8B86A;
  --pk-badge-alt-bg:     #262626;  --pk-badge-alt-fg:     #A5A5A0;
}`;

export const tailwindTokens = `// tailwind.config.js — Parkway design tokens
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
        success: "#36CC4F",
        error: "#FF0000",
      },
      spacing: { 1: "8px", 2: "16px", 3: "24px", 4: "32px",
                 5: "40px", 6: "48px", 7: "56px", 8: "64px" },
      fontFamily: {
        display: ['"PP Right Gothic"', "sans-serif"],
        sans: ["Manrope", "sans-serif"],
      },
    },
  },
};`;

export const flutterTokens = `// parkway_tokens.dart — Parkway design tokens
import 'package:flutter/material.dart';

abstract class PkColors {
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
  static const buff06 = Color(0xFFC2B072);

  // Messaging
  static const success = Color(0xFF36CC4F);
  static const error = Color(0xFFFF0000);
}

// Semantic surfaces — resolve by Theme.of(context).brightness (the dark layer).
abstract class PkSurfaceLight {
  static const field = PkColors.white01;        // background
  static const border = PkColors.grey04;
  static const label = PkColors.grey09;
  static const text = PkColors.grey01;
  static const placeholder = PkColors.grey02;
  static const trackOff = PkColors.grey04;
  static const toast = PkColors.grey11;
}

abstract class PkSurfaceDark {
  static const field = Color(0x00000000);       // transparent
  static const border = Color(0xFF3A3A38);
  static const label = Color(0xFFF2F2F0);
  static const text = Color(0xFFF2F2F0);
  static const placeholder = Color(0xFF7A7A75);
  static const trackOff = Color(0xFF3A3A38);
  static const toast = Color(0xFF0E0E0E);
}

abstract class PkSpacing {
  static const double s1 = 8, s2 = 16, s3 = 24, s4 = 32,
                      s5 = 40, s6 = 48, s7 = 56, s8 = 64;
}`;
