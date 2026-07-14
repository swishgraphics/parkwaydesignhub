import { useState } from "react";
import { CURATED } from "../iconography/index.js";
import { TX_CATEGORY_ICONS } from "../iconography/transaction-categories.js";
import { FRAMEWORKS } from "../tokens.js";
import { copyText } from "../lib/copy.js";
import { Lead, SectionHeader, Tabs, CodeBlock } from "../components/primitives.jsx";

function Cell({ name, Icon, weight }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className={`ph-iconcell${ok ? " ok" : ""}`}
      onClick={() => copyText(`import { ${name} } from "@phosphor-icons/react";`, setOk)}
      title={`Copy import for ${name}`}
    >
      <Icon size={26} weight={weight} />
      <span className="ph-iconname">{ok ? "Copied" : name}</span>
    </button>
  );
}

// Custom in-house icons: no package to import from, so the cell copies the
// raw SVG markup itself. Glyphs are monochrome currentColor — they inherit
// the cell's text colour in light and dark mode.
function CustomCell({ label, svg }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className={`ph-iconcell${ok ? " ok" : ""}`}
      onClick={() => copyText(svg, setOk)}
      title={`Copy SVG for ${label}`}
    >
      <span className="ph-customglyph" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />
      <span className="ph-iconname">{ok ? "Copied" : label}</span>
    </button>
  );
}

const INSTALL = {
  react: `# React / web\nnpm i @phosphor-icons/react`,
  vue: `# Vue 3\nnpm i @phosphor-icons/vue`,
  flutter: `# Flutter\nflutter pub add phosphor_flutter`,
};

const PK_USAGE = {
  react: `import { Cube } from "@phosphor-icons/react";

export default function Badge() {
  return <Cube size={24} weight="bold" color="#F9956B" />;
}`,
  vue: `<script setup>
import { PhCube } from "@phosphor-icons/vue";
</script>

<template>
  <PhCube :size="24" weight="bold" color="#F9956B" />
</template>`,
  flutter: `import 'package:phosphor_flutter/phosphor_flutter.dart';

PhosphorIcon(
  PhosphorIcons.cube(PhosphorIconsStyle.bold),
  size: 24,
  color: PkColors.tangerine01,
)`,
};

const RC_USAGE = {
  react: `import { Cube } from "@phosphor-icons/react";

export default function Badge() {
  return <Cube size={24} weight="bold" color="#FF4972" />;
}`,
  vue: `<script setup>
import { PhCube } from "@phosphor-icons/vue";
</script>

<template>
  <PhCube :size="24" weight="bold" color="#FF4972" />
</template>`,
  flutter: `import 'package:phosphor_flutter/phosphor_flutter.dart';

PhosphorIcon(
  PhosphorIcons.cube(PhosphorIconsStyle.bold),
  size: 24,
  color: RcColors.primary80,
)`,
};

export default function Icons({ fw, setFw, product }) {
  const [weight, setWeight] = useState("regular");
  const isRC = product?.id === "readycash";
  const USAGE = isRC ? RC_USAGE : PK_USAGE;
  const brand = isRC ? "ReadyCash" : "Parkway";
  return (
    <>
      <Lead>
        {brand} uses <strong>Phosphor</strong> as its icon set — a flexible family with multiple
        weights. Browse a curated selection, copy any import, or install Phosphor for your framework.
      </Lead>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4, flexWrap: "wrap" }}>
        <Tabs
          small
          value={weight}
          onChange={setWeight}
          label="Icon weight"
          items={[["regular", "Regular"], ["bold", "Bold"], ["fill", "Fill"], ["duotone", "Duotone"]]}
        />
        <span style={{ font: "500 11px var(--pk-mono)", color: "var(--pk-text-faint)" }}>
          {CURATED.length} icons · click to copy import
        </span>
      </div>

      <SectionHeader label="Phosphor — curated set" desc="A finance-first preview — not the full library. Phosphor ships 1,500+ icons across six weights; install the package to use any of them." />
      <div className="ph-icongrid">
        {CURATED.map(([name, Icon]) => (
          <Cell key={name} name={name} Icon={Icon} weight={weight} />
        ))}
      </div>
      <p className="ph-note">
        Need an icon that isn't here? Browse the full set at{" "}
        <a href="https://phosphoricons.com" target="_blank" rel="noreferrer" style={{ color: "var(--pk-accent-ink)" }}>phosphoricons.com</a>{" "}
        and install the package below — the hub only previews a representative subset.
      </p>

      <SectionHeader label="Install & use — Phosphor only" desc="Phosphor ships first-party packages for web (React), Vue, and Flutter. This applies to the Phosphor set above — the custom icons below need no package." />
      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />
      <CodeBlock code={INSTALL[fw]} label={fw === "flutter" ? "terminal" : "terminal"} />
      <CodeBlock
        code={USAGE[fw]}
        label={fw === "vue" ? "IconExample.vue" : fw === "flutter" ? "icon_example.dart" : "IconExample.jsx"}
      />

      <SectionHeader
        label="Transaction Categories — Custom"
        desc="Parkway's own icons, designed in-house in Figma — not part of Phosphor, so there's nothing to install. Click an icon to copy its raw SVG and paste it straight into your project."
      />
      <div className="ph-icongrid">
        {TX_CATEGORY_ICONS.map(({ name, label, svg }) => (
          <CustomCell key={name} label={label} svg={svg} />
        ))}
      </div>
      <p className="ph-note">
        Monochrome by design — every path is served as <code>currentColor</code>, so the glyph
        inherits the surrounding text colour in both light and dark mode. Tint one by setting{" "}
        <code>color</code> on its parent.
      </p>
    </>
  );
}
