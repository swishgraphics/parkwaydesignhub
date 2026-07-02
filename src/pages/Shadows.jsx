import { useState } from "react";
import { FRAMEWORKS } from "../tokens.js";
import { copyText } from "../lib/copy.js";
import { Lead, SectionHeader, Tabs, CodeBlock } from "../components/primitives.jsx";

const SHADOWS = [
  ["shadow-md", "Medium", "0 4px 6px -1px rgba(18,18,18,.08), 0 2px 4px -2px rgba(18,18,18,.08)"],
  ["shadow-lg", "Large", "0 10px 15px -3px rgba(18,18,18,.08), 0 4px 6px -4px rgba(18,18,18,.08)"],
  ["shadow-xl", "Extra large", "0 20px 25px -5px rgba(18,18,18,.10), 0 8px 10px -6px rgba(18,18,18,.10)"],
];

function ShadowCard({ token, name, value, prefix }) {
  const [ok, setOk] = useState(false);
  return (
    <button type="button" className="ph-shadowcard" onClick={() => copyText(`${prefix}${token}: ${value};`, setOk)} title="Copy token">
      <span className="ph-shadowtile" style={{ boxShadow: value }} aria-hidden="true" />
      <span className="ph-shadowname">{prefix}{token}</span>
      <span className="ph-shadowmeta">{name}</span>
      <span className={`ph-shadowval${ok ? " ok" : ""}`} aria-live="polite">{ok ? "Copied" : value}</span>
    </button>
  );
}

const PK_CSS = `:root {\n${SHADOWS.map(([t, , v]) => `  --pk-${t}: ${v};`).join("\n")}\n}`;
const RC_CSS = `:root {\n${SHADOWS.map(([t, , v]) => `  --rc-${t}: ${v};`).join("\n")}\n}`;

const PK_DART = `// parkway_shadows.dart — elevation scale
import 'package:flutter/material.dart';

abstract class PkShadows {
  static const md = <BoxShadow>[
    BoxShadow(color: Color(0x14121212), blurRadius: 6, spreadRadius: -1, offset: Offset(0, 4)),
    BoxShadow(color: Color(0x14121212), blurRadius: 4, spreadRadius: -2, offset: Offset(0, 2)),
  ];
  static const lg = <BoxShadow>[
    BoxShadow(color: Color(0x14121212), blurRadius: 15, spreadRadius: -3, offset: Offset(0, 10)),
    BoxShadow(color: Color(0x14121212), blurRadius: 6, spreadRadius: -4, offset: Offset(0, 4)),
  ];
  static const xl = <BoxShadow>[
    BoxShadow(color: Color(0x1A121212), blurRadius: 25, spreadRadius: -5, offset: Offset(0, 20)),
    BoxShadow(color: Color(0x1A121212), blurRadius: 10, spreadRadius: -6, offset: Offset(0, 8)),
  ];
}`;

const RC_DART = `// readycash_shadows.dart — elevation scale
import 'package:flutter/material.dart';

abstract class RcShadows {
  static const md = <BoxShadow>[
    BoxShadow(color: Color(0x14121212), blurRadius: 6, spreadRadius: -1, offset: Offset(0, 4)),
    BoxShadow(color: Color(0x14121212), blurRadius: 4, spreadRadius: -2, offset: Offset(0, 2)),
  ];
  static const lg = <BoxShadow>[
    BoxShadow(color: Color(0x14121212), blurRadius: 15, spreadRadius: -3, offset: Offset(0, 10)),
    BoxShadow(color: Color(0x14121212), blurRadius: 6, spreadRadius: -4, offset: Offset(0, 4)),
  ];
  static const xl = <BoxShadow>[
    BoxShadow(color: Color(0x1A121212), blurRadius: 25, spreadRadius: -5, offset: Offset(0, 20)),
    BoxShadow(color: Color(0x1A121212), blurRadius: 10, spreadRadius: -6, offset: Offset(0, 8)),
  ];
}`;

export default function Shadows({ fw, setFw, product }) {
  const isRC = product?.id === "readycash";
  const prefix = isRC ? "--rc-" : "--pk-";
  const cssCode  = isRC ? RC_CSS  : PK_CSS;
  const dartCode = isRC ? RC_DART : PK_DART;
  const cssLabel  = isRC ? "readycash-shadows.css" : "parkway-shadows.css (Vue & React)";
  const dartLabel = isRC ? "readycash_shadows.dart" : "parkway_shadows.dart";

  return (
    <>
      <Lead>
        Elevation tokens for lifted surfaces — modals, popovers, menus. The hub itself stays flat.
        Click a tile to copy.
      </Lead>

      <div className="ph-stage" style={{ marginTop: 18 }}>
        <p className="ph-stagecap">Elevation scale</p>
        <div className="ph-shadowgrid">
          {SHADOWS.map(([t, n, v]) => (
            <ShadowCard key={t} token={t} name={n} value={v} prefix={prefix} />
          ))}
        </div>
      </div>

      <SectionHeader label="Export shadows" />
      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock
        code={fw === "flutter" ? dartCode : cssCode}
        label={fw === "flutter" ? dartLabel : cssLabel}
      />
    </>
  );
}
