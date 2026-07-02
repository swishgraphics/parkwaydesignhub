import { useState } from "react";
import { FRAMEWORKS } from "../tokens.js";
import { useTheme } from "../theme.jsx";
import { Lead, SectionHeader, Tabs, CodeBlock, PreviewStage, ModeRow } from "../components/primitives.jsx";
import {
  reactTransactionStatus,
  vueTransactionStatus,
  flutterTransactionStatus,
  usageTransactionStatus,
} from "../snippets/wallet.js";

const TX_TYPES = [
  { key: "transfer",   label: "Transfer" },
  { key: "receive",    label: "Receive" },
  { key: "stamp-duty", label: "Stamp Duty" },
];

const TX_STATUSES = [
  { key: "successful", label: "Successful" },
  { key: "pending",    label: "Pending" },
  { key: "failed",     label: "Failed" },
];

function FilterBtn({ label, active, inactiveBg, inactiveText, fluid, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...(fluid ? { flex: "1 0 0", minWidth: 0 } : { width: 101 }),
        height: 38,
        padding: "0 16px",
        borderRadius: 8,
        border: active ? "2px solid #F9956B" : "2px solid transparent",
        background: active ? "transparent" : inactiveBg,
        font: "600 12px/1 Manrope, sans-serif",
        color: active ? "#F9956B" : inactiveText,
        cursor: "pointer",
        transition: "border-color .15s ease, color .15s ease, background .15s ease",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

function FilterGroup({ groupLabel, options, value, onChange, fluid, bgVar, textVar }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 15, width: "100%" }}>
      <span style={{ font: "400 12px/1.4 Manrope, sans-serif", color: "#999" }}>
        {groupLabel}
      </span>
      <div style={{ display: "flex", gap: 16, width: fluid ? "100%" : "auto" }}>
        {options.map(({ key, label }) => (
          <FilterBtn
            key={key}
            label={label}
            active={value === key}
            fluid={fluid}
            inactiveBg={`var(${bgVar})`}
            inactiveText={`var(${textVar})`}
            onClick={() => onChange(key)}
          />
        ))}
      </div>
    </div>
  );
}

const STATES = [
  ["Active",    "Tangerine-01 border and text, transparent background — the selected filter."],
  ["Inactive (Type)",   "var(--pk-filter-type-bg) background — adapts per theme."],
  ["Inactive (Status)", "var(--pk-filter-stat-bg) background — adapts per theme."],
];

const PROPS_ROWS = [
  ["value",                "string",   "required", "Active filter key for the respective group."],
  ["onChange / onChanged", "function", "—",        "Called with the new key on button click."],
  ["fluid",                "boolean",  "false",    "Buttons fill the row width equally (used by Transaction Type)."],
];

export default function TransactionStatus({ fw, setFw }) {
  const app = useTheme();
  const [mode, setMode] = useState(app.theme);
  const [typeVal,   setTypeVal]   = useState("stamp-duty");
  const [statusVal, setStatusVal] = useState("successful");

  const impl  = { react: reactTransactionStatus, vue: vueTransactionStatus, flutter: flutterTransactionStatus };
  const label = {
    react:   "PkTransactionFilters.jsx + parkway-transaction-filters.css",
    vue:     "PkTransactionFilters.vue",
    flutter: "pk_transaction_filters.dart",
  };

  return (
    <>
      <Lead>
        Two filter rows for the transaction history screen — Transaction Type (fluid: Transfer /
        Receive / Stamp Duty) and Transaction Status (fixed-width: Successful / Pending / Failed).
        Inactive surfaces follow the light/dark theme.
      </Lead>

      <SectionHeader label="Playground" desc="Toggle the filters, or switch the preview between light and dark." />
      <div style={{ border: "1px solid var(--pk-line)", borderRadius: 12, padding: "2px 18px", marginTop: 6 }}>
        <ModeRow mode={mode} setMode={setMode} divider={false} />
      </div>

      <PreviewStage mode={mode} tall stageStyle={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <FilterGroup
          groupLabel="Transaction Type"
          options={TX_TYPES}
          value={typeVal}
          onChange={setTypeVal}
          fluid
          bgVar="--pk-filter-type-bg"
          textVar="--pk-filter-type-text"
        />
        <FilterGroup
          groupLabel="Transaction Status"
          options={TX_STATUSES}
          value={statusVal}
          onChange={setStatusVal}
          fluid={false}
          bgVar="--pk-filter-stat-bg"
          textVar="--pk-filter-stat-text"
        />
      </PreviewStage>

      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock
        code={usageTransactionStatus(fw, typeVal, statusVal)}
        label="Usage — reflects active selections above"
      />
      <CodeBlock code={impl[fw]} label={label[fw]} />

      <SectionHeader label="States" />
      <div className="ph-statelist">
        {STATES.map(([name, desc]) => (
          <div key={name} className="ph-stateline">
            <span className="ph-statedot" style={{
              background: name === "Active" ? "#F9956B" : "transparent",
              border: "2px solid #F9956B",
            }} />
            <span className="ph-statelabel">{name}</span>
            <span className="ph-statedesc">{desc}</span>
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
            <li>Use both filter rows together — they are designed as a pair on the history screen.</li>
            <li>Let the CSS vars handle dark mode automatically; don't pass a manual <code>dark</code> prop.</li>
            <li>Persist both active filters in URL state for navigation stability.</li>
          </ul>
        </div>
        <div>
          <p className="ph-guidehead"><span className="ph-dot err" aria-hidden="true" />Don't</p>
          <ul className="ph-guidelist">
            <li>Don't change the label text — values map directly to backend filter params.</li>
            <li>Don't mix fluid and fixed-width buttons in the same row.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
