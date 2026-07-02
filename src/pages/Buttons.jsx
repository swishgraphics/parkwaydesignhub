import { useState } from "react";
import { BTN, FRAMEWORKS } from "../tokens.js";
import { useTheme } from "../theme.jsx";
import { Lead, SectionHeader, Tabs, Select, CodeBlock, PreviewStage, ModeRow } from "../components/primitives.jsx";
import { reactButton, vueButton, flutterButton, usageSnippet } from "../snippets/index.js";
import { reactLink, vueLink, flutterLink, usageLink } from "../snippets/wallet.js";
import { rcReactButton, rcVueButton, rcFlutterButton, rcUsageSnippet } from "../snippets/readycash-snippets.js";

const RC_VARIANT_TABS = [["primary", "Primary"], ["secondary", "Secondary"]];
const PK_VARIANT_TABS = [["primary", "Primary"], ["alternative", "Alternative"]];

const ROW = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 2px", borderBottom: "1px solid var(--pk-line-soft)" };

// ── Filled button preview ──────────────────────────────────────────────
function LiveButton({ variant, size, state, platform, btn, fontFamily }) {
  const pal = btn[variant];
  const disabled = state === "disabled";
  const label = size === "small" ? "Sign in" : "Get a demo";
  const w = btn.widths[size];
  const textColor = disabled ? btn.textDisabled : (pal?.textColor || btn.text);
  // Parkway: desktop=pill(radius), mobile=rect(radiusMobile)
  // RC: desktop=rounded(radiusRounded), mobile=rect(radius)
  const radius = btn.radiusMobile
    ? (platform === "mobile" ? btn.radiusMobile : btn.radius)
    : (platform === "desktop" ? (btn.radiusRounded ?? btn.radius) : btn.radius);
  return (
    <button
      type="button"
      disabled={disabled}
      className={state === "default" ? `ph-live-${variant}` : ""}
      style={{
        height: btn.height, borderRadius: radius, border: 0,
        width: w === "100%" ? "100%" : w, maxWidth: "100%",
        background: pal[state], color: textColor,
        font: btn.font, fontFamily,
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
        cursor: disabled ? "not-allowed" : "pointer", transition: "background .15s ease",
      }}
    >
      {label}
      {size === "icon" && <span aria-hidden="true" style={{ fontSize: 16 }}>⟶</span>}
    </button>
  );
}

// ── Link button preview ────────────────────────────────────────────────
function LinkGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5.6 8.4 8.4 5.6M6.2 3.4l.8-.8a2.4 2.4 0 0 1 3.4 3.4l-.8.8M7.8 10.6l-.8.8a2.4 2.4 0 0 1-3.4-3.4l.8-.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
const LINK_COLORS = { default: "#F9956B", hover: "#C77756", pressed: "#955940", disabled: "#FDD5C4" };
function LiveLink({ icon, state }) {
  const underline = state === "hover" || state === "pressed";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, color: LINK_COLORS[state],
      font: "600 14px Manrope", textDecoration: underline ? "underline" : "none",
      cursor: state === "disabled" ? "not-allowed" : "pointer",
    }}>
      {icon === "left" && <LinkGlyph />}
      Link button placeholder
      {icon === "right" && <LinkGlyph />}
    </span>
  );
}

const PK_PROPS_ROWS = [
  ["variant", '"primary" | "alternative"', '"primary"', "Tangerine for the page's main action; grey Alternative elsewhere."],
  ["size", '"small" | "icon" | "medium" | "large" | "xlarge"', '"medium"', "Fixed widths 98 / 200 / 275 / 325px; xlarge fills its container. All 54px tall."],
  ["platform", '"desktop" | "mobile"', '"desktop"', "Desktop is the 27px pill; mobile is an 8px radius."],
  ["disabled", "boolean", "false", "Tangerine-04 / Grey-06 fill with Grey-07 text."],
];

const RC_PROPS_ROWS = [
  ["variant", '"primary" | "secondary"', '"primary"', "Tangerine for the main action; grey Secondary for supporting actions."],
  ["size", '"small" | "medium" | "large" | "xlarge"', '"medium"', "Fixed widths 168 / 187 / 195px; xlarge fills its container. All are 56px tall."],
  ["rounded", "boolean", "false", "false → 4px rectangular (default); true → 28px pill shape."],
  ["disabled", "boolean", "false", "Tangerine-04 / Grey-06 fill with Grey-07 text. Flutter: pass onPressed: null."],
  ["children / label", "string", "—", '"Sign in" pattern for small; sentence-case verbs ("Get a demo") for the rest.'],
];

const LINK_PROPS_ROWS = [
  ["icon", "node", "—", "Optional glyph; pair with iconRight to place it after the label."],
  ["iconRight", "boolean", "false", "Render the icon after the label instead of before."],
  ["disabled", "boolean", "false", "Tangerine-04, non-interactive."],
  ["children / label", "string", "—", "Concise verb phrase — \"View details\", \"Resend code\"."],
];

const LINK_STATES = [
  ["default", "Default", "Tangerine-01, no underline."],
  ["hover", "Hover", "Tangerine-06 with underline."],
  ["pressed", "Pressed", "Tangerine-07 with underline."],
  ["disabled", "Disabled", "Tangerine-04, non-interactive."],
];

export default function Buttons({ fw, setFw, product }) {
  const t = product?.tokens;
  const btn = t?.btn || BTN;
  const isRC = !!t;
  const variantTabs = isRC ? RC_VARIANT_TABS : PK_VARIANT_TABS;
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [btnStyle, setBtnStyle] = useState("filled");
  // filled controls
  const [variant, setVariant] = useState("primary");
  const [size, setSize] = useState("medium");
  const [state, setState] = useState("default");
  const [platform, setPlatform] = useState("desktop");
  // link controls
  const [linkIcon, setLinkIcon] = useState("none");
  const [linkState, setLinkState] = useState("default");

  const isLink = btnStyle === "link";
  const fontFamily = "Manrope, sans-serif";
  const sizeOptions = isRC ? ["small", "medium", "large", "xlarge"] : ["small", "icon", "medium", "large", "xlarge"];

  const filledImpl  = isRC
    ? { vue: rcVueButton,  react: rcReactButton,  flutter: rcFlutterButton }
    : { vue: vueButton,    react: reactButton,     flutter: flutterButton };
  const filledLabel = isRC
    ? { vue: "RcButton.vue", react: "RcButton.jsx + readycash-button.css", flutter: "rc_button.dart" }
    : { vue: "PkButton.vue", react: "PkButton.jsx + parkway-button.css",   flutter: "pk_button.dart" };
  const linkImpl = { vue: vueLink, react: reactLink, flutter: flutterLink };
  const linkLabel = { vue: "PkLink.vue", react: "PkLink.jsx + parkway-link.css", flutter: "pk_link.dart" };

  const lead = t?.buttonsLead || "Pill-shaped, 54px tall, set in Manrope SemiBold 14. Two variants (Primary tangerine, Alternative grey) across five sizes and three states. Hover the preview for the real state.";

  const pal = btn[variant] || btn.primary;

  return (
    <>
      <Lead>
        {isRC ? lead : (
          <>
            Buttons commit actions. Two styles: <strong>filled</strong> for primary/secondary actions,
            and <strong>link</strong> for inline, low-emphasis ones.
          </>
        )}
      </Lead>

      <SectionHeader label="Playground" desc="Pick a style, then tune it; the preview and snippet update together." />
      <div style={{ border: "1px solid var(--pk-line)", borderRadius: 12, padding: "2px 18px", marginTop: 6 }}>
        <ModeRow mode={mode} setMode={setMode} />
        <div style={ROW}>
          <span className="ph-rowlabel">Style</span>
          <Tabs small value={btnStyle} onChange={setBtnStyle} label="Style" items={[["filled", "Filled"], ["link", "Link"]]} />
        </div>

        {isLink ? (
          <>
            <div style={ROW}>
              <span className="ph-rowlabel">Icon</span>
              <Tabs small value={linkIcon} onChange={setLinkIcon} label="Icon" items={[["none", "None"], ["left", "Left"], ["right", "Right"]]} />
            </div>
            <div style={{ ...ROW, borderBottom: 0 }}>
              <span className="ph-rowlabel">State</span>
              <Tabs small value={linkState} onChange={setLinkState} label="State" items={LINK_STATES.map(([k, n]) => [k, n])} />
            </div>
          </>
        ) : (
          <>
            <div style={ROW}>
              <span className="ph-rowlabel">Variant</span>
              <Tabs small value={variant} onChange={setVariant} label="Variant" items={variantTabs} />
            </div>
            <div style={ROW}>
              <span className="ph-rowlabel">Size</span>
              <Select value={size} onChange={setSize} label="Size" options={sizeOptions} />
            </div>
            <div style={ROW}>
              <span className="ph-rowlabel">State</span>
              <Tabs small value={state} onChange={setState} label="State" items={[["default", "Default"], ["hover", "Hover"], ["disabled", "Disabled"]]} />
            </div>
            <div style={{ ...ROW, borderBottom: 0 }}>
              <span className="ph-rowlabel">Platform</span>
              <Tabs small value={platform} onChange={setPlatform} label="Platform" items={[["mobile", "Mobile"], ["desktop", "Desktop"]]} />
            </div>
          </>
        )}
      </div>

      <PreviewStage mode={mode} tall>
        {isLink
          ? <LiveLink icon={linkIcon} state={linkState} />
          : <LiveButton variant={variant} size={size} state={state} platform={platform} btn={btn} fontFamily={fontFamily} />}
      </PreviewStage>

      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      {isLink ? (
        <>
          <CodeBlock code={usageLink(fw, linkIcon)} label="Usage — reflects the controls above" />
          <CodeBlock code={linkImpl[fw]} label={linkLabel[fw]} />
        </>
      ) : (
        <>
          <CodeBlock code={isRC ? rcUsageSnippet(fw, variant, size, state, platform === "desktop") : usageSnippet(fw, variant, size, state, platform)} label="Usage — reflects the controls above" />
          <CodeBlock code={filledImpl[fw]} label={filledLabel[fw]} />
        </>
      )}

      <SectionHeader label="Props" />
      <div className="ph-tablewrap">
        <table className="ph-table">
          <thead><tr>{["Prop", "Type", "Default", "Notes"].map((h) => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {(isLink ? LINK_PROPS_ROWS : isRC ? RC_PROPS_ROWS : PK_PROPS_ROWS).map(([p, t, d, n]) => (
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

      {isLink ? (
        <>
          <SectionHeader label="States" />
          <div className="ph-statelist">
            {LINK_STATES.map(([k, n, d]) => (
              <div key={k} className={`ph-stateline${linkState === k ? " act" : ""}`}>
                <button type="button" className="ph-statedot" onClick={() => setLinkState(k)} aria-label={`Preview ${n}`} />
                <span className="ph-statelabel">{n}</span>
                <span className="ph-statedesc">{d}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <SectionHeader label={`State tokens — ${variant}`} />
          <div className="ph-stategrid">
            {["default", "hover", "disabled"].map((s) => (
              <div key={s} className="ph-statechip">
                <span className="ph-statefill" style={{ background: pal[s] }} aria-hidden="true" />
                <span className="ph-statename">{s}</span>
                <span className="ph-statehex">{pal[s]}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <SectionHeader label="Usage guidelines" />
      <div className="ph-guidance">
        <div>
          <p className="ph-guidehead"><span className="ph-dot ok" aria-hidden="true" />Do</p>
          <ul className="ph-guidelist">
            {isLink ? (
              <>
                <li>Use for inline, low-emphasis actions and navigation.</li>
                <li>Keep the label a concise verb phrase.</li>
                <li>Underline on hover so it reads as interactive.</li>
              </>
            ) : isRC ? (
              <>
                <li>Use one Primary button per view; pair it with Secondary for supporting actions.</li>
                <li>Keep labels to 1–3 words in sentence case.</li>
                <li>Use xlarge full-width on mobile checkout-style flows.</li>
              </>
            ) : (
              <>
                <li>One Primary button per view; pair it with Alternative for secondary actions.</li>
                <li>Keep labels to 1–3 words in sentence case.</li>
                <li>Use xlarge full-width on mobile checkout-style flows.</li>
              </>
            )}
          </ul>
        </div>
        <div>
          <p className="ph-guidehead"><span className="ph-dot err" aria-hidden="true" />Don't</p>
          <ul className="ph-guidelist">
            {isLink ? (
              <>
                <li>Don't use a link for the primary commit action — use a filled button.</li>
                <li>Don't stack several link buttons where one filled button is clearer.</li>
                <li>Don't rely on colour alone; keep the underline affordance on hover.</li>
              </>
            ) : isRC ? (
              <>
                <li>Don't mix Rectangular and Rounded themes within the same surface.</li>
                <li>Don't recolor states manually — the tokens already encode hover/disabled.</li>
                <li>Don't rely on color alone for disabled; keep the control non-interactive.</li>
              </>
            ) : (
              <>
                <li>Don't invent a third radius — desktop is the 27px pill, mobile is 8px.</li>
                <li>Don't recolor states manually — the tokens already encode hover/disabled.</li>
                <li>Don't rely on color alone for disabled; keep the control non-interactive.</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
