import { useState } from "react";
import { FRAMEWORKS } from "../tokens.js";
import { useTheme } from "../theme.jsx";
import { Lead, SectionHeader, Tabs, CodeBlock, PreviewStage, ModeRow } from "../components/primitives.jsx";
import { reactToast, vueToast, flutterToast, usageToast } from "../snippets/wallet.js";

const ROW = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "14px 2px" };

function ToastIcon({ variant }) {
  if (variant === "warning") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3 22 21H2L12 3Z" fill="#FF0000" />
        <path d="M12 9.5v5M12 17.4v.2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#36CC4F" />
      <path d="M7.5 12.2l3 3 6-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LiveToast({ variant }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12, width: 360, maxWidth: "100%",
      padding: 20, borderRadius: 10, background: "#171616",
    }}>
      <ToastIcon variant={variant} />
      <span style={{ font: "500 14px Manrope", color: "#FFFFFF" }}>
        {variant === "warning" ? "Transfer failed. Please try again." : "Transfer completed successfully"}
      </span>
    </div>
  );
}

const PROPS_ROWS = [
  ["variant", '"success" | "warning"', '"success"', "Success = green sentiment icon; warning = red alert icon."],
  ["children / message", "string", "—", "One concise line. Lead with the outcome."],
  ["role", "string", '"status"', "Announced politely to assistive tech; use role=\"alert\" for warnings."],
];

export default function ToastMessage({ fw, setFw }) {
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [variant, setVariant] = useState("success");
  const impl = { react: reactToast, vue: vueToast, flutter: flutterToast };
  const label = { react: "PkToast.jsx + parkway-toast.css", vue: "PkToast.vue", flutter: "pk_toast.dart" };
  return (
    <>
      <Lead>Dark toast for transient feedback. Two semantic variants — success and warning — set in white Manrope on Grey-11, 10px radius.</Lead>

      <SectionHeader label="Playground" desc="Switch the variant; the preview and snippet update together." />
      <div style={{ border: "1px solid var(--pk-line)", borderRadius: 12, padding: "2px 18px", marginTop: 6 }}>
        <ModeRow mode={mode} setMode={setMode} />
        <div style={ROW}>
          <span className="ph-rowlabel">Variant</span>
          <Tabs small value={variant} onChange={setVariant} label="Variant" items={[["success", "Success"], ["warning", "Warning"]]} />
        </div>
      </div>

      <PreviewStage mode={mode} tall>
        <LiveToast variant={variant} />
      </PreviewStage>

      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock code={usageToast(fw, variant)} label="Usage — reflects the control above" />
      <CodeBlock code={impl[fw]} label={label[fw]} />

      <SectionHeader label="Variants" />
      <div className="ph-statelist">
        <div className={`ph-stateline${variant === "success" ? " act" : ""}`}>
          <button type="button" className="ph-statedot" onClick={() => setVariant("success")} aria-label="Preview success" />
          <span className="ph-statelabel">Success</span>
          <span className="ph-statedesc">Confirms a completed action. Green sentiment icon.</span>
        </div>
        <div className={`ph-stateline${variant === "warning" ? " act" : ""}`}>
          <button type="button" className="ph-statedot" onClick={() => setVariant("warning")} aria-label="Preview warning" />
          <span className="ph-statelabel">Warning</span>
          <span className="ph-statedesc">Flags a failure or a risk. Red alert icon; use role="alert".</span>
        </div>
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
            <li>Keep it to one concise line; lead with the outcome.</li>
            <li>Auto-dismiss success; let warnings persist until acknowledged.</li>
            <li>Use role="alert" for warnings so they're announced.</li>
          </ul>
        </div>
        <div>
          <p className="ph-guidehead"><span className="ph-dot err" aria-hidden="true" />Don't</p>
          <ul className="ph-guidelist">
            <li>Don't stack multiple toasts at once.</li>
            <li>Don't put an action the user must take inside a toast.</li>
            <li>Don't use a toast for field-level validation errors.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
