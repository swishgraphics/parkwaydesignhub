// ════════════════════════════════════════════════════════════════════
// ReadyCash design-system tokens.
// Colors: shared with Parkway (see tokens.js / COLOR_GROUPS).
//         Accent palettes: Figma node 350:2249 (Extended Palettes)
// Buttons: node 350:702 · Inputs: node 350:9154
// ════════════════════════════════════════════════════════════════════

// Accent palettes extracted from Figma "Ethr / Extended Palettes" (node 350:2249)
export const RC_ACCENT_COLORS = {
  magenta: [
    ["accent-magenta-0",   "#F5F8FF", "Tint 0"],
    ["accent-magenta-10",  "#FFD5FE", "Tint 1"],
    ["accent-magenta-20",  "#FFC1EA", "Tint 2"],
    ["accent-magenta-30",  "#FFADD6", "Tint 3"],
    ["accent-magenta-40",  "#FF99C2", "Tint 4 · btn disabled"],
    ["accent-magenta-50",  "#FF85AE", "Tint 5"],
    ["accent-magenta-60",  "#FF719A", "Tint 6"],
    ["accent-magenta-70",  "#FF5D86", "Hover · btn hover"],
    ["accent-magenta-80",  "#FF4972", "Brand primary"],
    ["accent-magenta-90",  "#FF355E", "Shade 1"],
    ["accent-magenta-100", "#ED214A", "Ink · deep shade"],
  ],
  green: [
    ["accent-green-0",   "#F8F5FF", "Tint 0"],
    ["accent-green-10",  "#B4FFB4", "Tint 1"],
    ["accent-green-20",  "#A0FFA0", "Tint 2"],
    ["accent-green-30",  "#8CFF8C", "Tint 3"],
    ["accent-green-40",  "#78FF78", "Tint 4"],
    ["accent-green-50",  "#64FF64", "Tint 5"],
    ["accent-green-60",  "#50F050", "Tint 6"],
    ["accent-green-70",  "#3CDC3C", "Shade 1"],
    ["accent-green-80",  "#28C828", "Shade 2"],
    ["accent-green-90",  "#14B414", "Shade 3"],
    ["accent-green-100", "#00A000", "Deep shade"],
  ],
  orange: [
    ["accent-orange-0",   "#FEEBD4", "Tint 0"],
    ["accent-orange-10",  "#FDDDB8", "Tint 1"],
    ["accent-orange-20",  "#FBCC94", "Tint 2"],
    ["accent-orange-30",  "#FABB70", "Tint 3"],
    ["accent-orange-40",  "#F9AA4D", "Tint 4"],
    ["accent-orange-50",  "#F89929", "Brand accent"],
    ["accent-orange-60",  "#CF8022", "Shade 1"],
    ["accent-orange-70",  "#A5661B", "Shade 2"],
    ["accent-orange-80",  "#7C4C14", "Shade 3"],
    ["accent-orange-90",  "#53330E", "Shade 4"],
    ["accent-orange-100", "#321F08", "Deep shade"],
  ],
};

export const RC_ACCENT_GROUPS = [
  ["accent-magenta", "Accent — Magenta", RC_ACCENT_COLORS.magenta],
  ["accent-green",   "Accent — Green",   RC_ACCENT_COLORS.green],
  ["accent-orange",  "Accent — Orange",  RC_ACCENT_COLORS.orange],
];

// Button spec — Figma node 350:702
// Sizes:  Small 32px · Medium 40px · Large 48px · X-Large 56px
// Themes: Rectangular (4px radius) · Rounded (radius = height/2)
export const RC_BTN = {
  height: 56,
  radius: 4,
  radiusRounded: 28,
  font: "500 16px 'Noto Sans', sans-serif",
  widths: { small: 168, medium: 187, large: 195, xlarge: "100%" },
  primary:   { default: "#F9956B", hover: "#FBBFA6", disabled: "#FDD5C4", textColor: "#121212" },
  secondary: { default: "#EFEFEF", hover: "#DDDDDD", disabled: "#FBFBFB", textColor: "#121212" },
  text: "#121212",
  textDisabled: "#BBBBBB",
};

// Text input spec — Figma node 350:9154
export const RC_INPUT = {
  borderRadius: "4px",
  paddingX: "16px",
  paddingY: "12px",
  gap: "8px",
  iconSize: "24px",
  wrapperGap: "4px",
  border: {
    default:  "#9ea2b3",
    focused:  "#3e414c",
    error:    "#e62e2e",
    success:  "#069952",
    disabled: "#9ea2b3",
  },
  background: {
    outline: "transparent",
    filledDefault: "#f6f7f9",
    filledFocused: "#f5f8ff",
    filledError:   "rgba(255,230,230,0.6)",
    filledSuccess: "rgba(230,255,243,0.6)",
  },
  text: {
    input:       "#141519",
    placeholder: "#838799",
    disabled:    "#838799",
    label:       "#141519",
    labelError:  "#e62e2e",
    helpText:    "#6b6f80",
    errorMsg:    "#e62e2e",
    charCount:   "#6b6f80",
    disabledLabel: "#9ea2b3",
  },
  font: {
    family:          "'Noto Sans', sans-serif",
    inputSize:       "16px",
    inputWeight:     400,
    inputLineHeight: "24px",
    labelWeight:     600,
    helpSize:        "12px",
    helpLineHeight:  "16px",
  },
};
