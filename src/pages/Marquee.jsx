import { useState } from "react";
import { FRAMEWORKS } from "../tokens.js";
import { useTheme } from "../theme.jsx";
import { Lead, SectionHeader, Tabs, CodeBlock, PreviewStage, ModeRow } from "../components/primitives.jsx";
import { reactMarquee, vueMarquee, flutterMarquee, usageMarquee } from "../snippets/wallet.js";

const ITEMS = [
  "Link all your accounts in one place.",
  "Bank Account feature is LIVE!",
  "New NDD Feature Out Soon",
];

const SPEEDS = [
  ["slow", "Slow", 60],
  ["normal", "Normal", 40],
  ["fast", "Fast", 20],
];

const STAR = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 0L13.7541 7.76531L20.4853 3.51472L16.2347 10.2459L24 12L16.2347 13.7541L20.4853 20.4853L13.7541 16.2347L12 24L10.2459 16.2347L3.51472 20.4853L7.76531 13.7541L0 12L7.76531 10.2459L3.51472 3.51472L10.2459 7.76531L12 0Z"
      fill="#121212"
    />
  </svg>
);

function LiveMarquee({ items, speed }) {
  const [paused, setPaused] = useState(false);
  const track = [...items, ...items];
  return (
    <div
      style={{
        height: 40,
        width: "100%",
        background: "#F9956B",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{
        display: "inline-flex",
        animation: `pk-marquee-scroll ${speed}s linear infinite`,
        animationPlayState: paused ? "paused" : "running",
      }}>
        {track.map((text, i) => (
          <span key={i} style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            paddingRight: 26,
            flexShrink: 0,
          }}>
            <span style={{
              font: "500 16px/1 Manrope, sans-serif",
              color: "#121212",
              whiteSpace: "nowrap",
            }}>{text}</span>
            {STAR}
          </span>
        ))}
      </div>
    </div>
  );
}

const PROPS_ROWS = [
  ["items", "string[]", "required", "Messages to cycle through. Each item gets a decorative star."],
  ["speed", "number", "40", "Scroll cycle duration in seconds. Higher = slower."],
  ["paused", "boolean", "false", "Pauses scroll — useful for reduced-motion or on focus."],
];

export default function Marquee({ fw, setFw }) {
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [speedKey, setSpeedKey] = useState("normal");
  const speed = SPEEDS.find(([k]) => k === speedKey)?.[2] ?? 40;
  const impl = { react: reactMarquee, vue: vueMarquee, flutter: flutterMarquee };
  const label = { react: "PkMarquee.jsx + parkway-marquee.css", vue: "PkMarquee.vue", flutter: "pk_marquee.dart" };

  return (
    <>
      <Lead>
        Full-width Tangerine-01 announcement ticker, 40px tall. Messages scroll left continuously with a
        star between items; it pauses on hover.
      </Lead>

      <SectionHeader label="Playground" desc="Adjust scroll speed; the usage snippet updates." />
      <div style={{ border: "1px solid var(--pk-line)", borderRadius: 12, padding: "2px 18px", marginTop: 6 }}>
        <ModeRow mode={mode} setMode={setMode} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 2px" }}>
          <span className="ph-rowlabel">Speed</span>
          <Tabs small value={speedKey} onChange={setSpeedKey} label="Speed" items={SPEEDS.map(([k, n]) => [k, n])} />
        </div>
      </div>

      <PreviewStage mode={mode} tall stageStyle={{ padding: 0, overflow: "hidden" }}>
        <LiveMarquee items={ITEMS} speed={speed} />
      </PreviewStage>

      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock code={usageMarquee(fw, speed)} label="Usage — reflects the control above" />
      <CodeBlock code={impl[fw]} label={label[fw]} />

      <SectionHeader label="Messages" desc="Default set used in Figma. Pass any string array via items." />
      <div className="ph-statelist">
        {ITEMS.map((text, i) => (
          <div key={i} className="ph-stateline">
            <span className="ph-statedot" style={{ background: "var(--pk-tangerine-01)", border: 0 }} />
            <span className="ph-statelabel">{text}</span>
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
            <li>Keep messages short — one line of text at all viewport widths.</li>
            <li>Pause scroll on hover or keyboard focus for accessibility.</li>
            <li>Use only on Tangerine-01 background to stay on-brand.</li>
          </ul>
        </div>
        <div>
          <p className="ph-guidehead"><span className="ph-dot err" aria-hidden="true" />Don't</p>
          <ul className="ph-guidelist">
            <li>Don't put interactive controls (links, buttons) inside the ticker.</li>
            <li>Don't use more than 5–6 items — long lists hurt perceived speed.</li>
            <li>Don't rely on the marquee for critical information; always surface it elsewhere too.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
