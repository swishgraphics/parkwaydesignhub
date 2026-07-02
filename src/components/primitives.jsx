import { useState } from "react";
import { copyText } from "../lib/copy.js";
import { CaretDown } from "../iconography/index.js";

// Lead paragraph at the top of a page body.
export function Lead({ children }) {
  return <p className="ph-lead">{children}</p>;
}

// Labeled section: hairline divider + uppercase label + muted one-liner.
export function SectionHeader({ label, desc }) {
  return (
    <div className="ph-section">
      <h2 className="ph-seclabel">{label}</h2>
      {desc && <p className="ph-secdesc">{desc}</p>}
    </div>
  );
}

// Centered preview stage, or a left-aligned captioned stage.
export function Stage({ children, tall, caption }) {
  if (caption) {
    return (
      <div className={`ph-stage${tall ? " tall" : ""}`}>
        <p className="ph-stagecap">{caption}</p>
        {children}
      </div>
    );
  }
  return <div className={`ph-stage center${tall ? " tall" : ""}`}>{children}</div>;
}

// Playground control row that switches the preview between Light and Dark.
// It lives inside the page's playground block so every preview control sits
// in one place. Uses the same segmented Tabs as the other rows.
const PG_ROW = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 2px" };
export function ModeRow({ mode, setMode, divider = true }) {
  return (
    <div style={divider ? { ...PG_ROW, borderBottom: "1px solid var(--pk-line-soft)" } : PG_ROW}>
      <span className="ph-rowlabel">Mode</span>
      <Tabs small value={mode} onChange={setMode} label="Preview mode" items={[["light", "Light"], ["dark", "Dark"]]} />
    </div>
  );
}

// Preview stage themed by a local `mode` (light/dark), independent of the app
// theme. The Light/Dark control lives in the playground via <ModeRow>; here the
// stage re-scopes the design tokens via data-theme, so the preview can be dark
// inside a light app (and vice versa).
export function PreviewStage({ mode, tall, center, stageStyle, children }) {
  return (
    <div
      className={`ph-stage${center ? " center" : ""}${tall ? " tall" : ""}`}
      data-theme={mode}
      style={stageStyle}
    >
      {children}
    </div>
  );
}

export function CopyBtn({ text, dark }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={() => copyText(text, setOk)}
      className={`ph-copy${dark ? " dark" : ""}${ok ? " ok" : ""}`}
      aria-live="polite"
    >
      {ok ? "Copied" : "Copy"}
    </button>
  );
}

export function CodeBlock({ code, label }) {
  return (
    <figure className="ph-code" translate="no">
      <figcaption className="ph-codehead">
        <span className="ph-codelabel">{label}</span>
        <CopyBtn text={code} dark />
      </figcaption>
      <pre className="ph-codepre">{code}</pre>
    </figure>
  );
}

// Brand logos for the framework switcher (inline SVG; keyed by tab value).
// Only react/vue/flutter match — other tab sets (variant/state/etc.) render text only.
const ReactLogo = (
  <svg className="ph-tabsvg" viewBox="-11.5 -10.23 23 20.46" aria-hidden="true">
    <circle r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);
const VueLogo = (
  <svg className="ph-tabsvg" viewBox="0 0 196.32 170.02" aria-hidden="true">
    <path d="M120.83 0L98.16 39.26 75.49 0H0l98.16 170.02L196.32 0z" fill="#41B883" />
    <path d="M120.83 0L98.16 39.26 75.49 0H39.26l58.9 102.01L157.06 0z" fill="#34495E" />
  </svg>
);
const FlutterLogo = (
  <svg className="ph-tabsvg" viewBox="0 0 256 317" aria-hidden="true">
    <path fill="#47C5FB" d="M157.67 0L0 157.67l48.78 48.78L255.21 0z" />
    <path fill="#47C5FB" d="M156.57 145.4L72.16 229.8l48.97 49.34 48.6-48.61 85.48-85.13z" />
    <path fill="#00569E" d="M121.13 279.13l37.06 37.06h97.02l-85.48-85.48z" />
    <path fill="#00B5F8" d="M72.04 229.92l48.6-48.61 48.97 48.97-48.6 48.6z" />
  </svg>
);
const FW_LOGOS = { react: ReactLogo, vue: VueLogo, flutter: FlutterLogo };

// Segmented tabs with roving focus + arrow-key navigation.
export function Tabs({ value, onChange, items, label, small }) {
  const onKey = (e, i) => {
    let n = null;
    if (e.key === "ArrowRight") n = (i + 1) % items.length;
    if (e.key === "ArrowLeft") n = (i - 1 + items.length) % items.length;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = items.length - 1;
    if (n == null) return;
    e.preventDefault();
    onChange(items[n][0]);
    e.currentTarget.parentElement.children[n]?.focus();
  };
  return (
    <div className={`ph-tabs${small ? " sm" : ""}`} role="tablist" aria-label={label}>
      {items.map(([k, name], i) => (
        <button
          key={k}
          type="button"
          role="tab"
          aria-selected={value === k}
          tabIndex={value === k ? 0 : -1}
          className={`ph-tab${value === k ? " act" : ""}`}
          onClick={() => onChange(k)}
          onKeyDown={(e) => onKey(e, i)}
        >
          {FW_LOGOS[k]}{name}
        </button>
      ))}
    </div>
  );
}

export function Select({ value, onChange, options, label }) {
  return (
    <span className="ph-selectwrap">
      <select
        className="ph-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o.charAt(0).toUpperCase() + o.slice(1)}
          </option>
        ))}
      </select>
      <span className="ph-selectchev">
        <CaretDown size={14} weight="bold" />
      </span>
    </span>
  );
}
