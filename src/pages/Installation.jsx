import { FRAMEWORKS } from "../tokens.js";
import { Lead, SectionHeader, Tabs, CodeBlock } from "../components/primitives.jsx";
import { cssTokens, typoCssDesktop, flutterTokens, typoFlutter } from "../snippets/index.js";

const ICONS_INSTALL = {
  react: `# Icons — some components use Phosphor
npm i @phosphor-icons/react`,
  vue: `# Icons — some components use Phosphor
npm i @phosphor-icons/vue`,
  flutter: `# Icons — some components use Phosphor
flutter pub add phosphor_flutter`,
};

const webFonts = `<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" />

/* PP Right Gothic is licensed — bundle the woff2 files, then: */
@font-face {
  font-family: "PP Right Gothic";
  src: url("/fonts/PPRightGothic-WideMedium.woff2") format("woff2");
  font-weight: 500; font-display: swap;
}`;

const flutterFonts = `# pubspec.yaml
flutter:
  fonts:
    - family: PPRightGothic   # licensed — bundle the .ttf files
      fonts:
        - asset: fonts/PPRightGothic-WideMedium.ttf
          weight: 500
    - family: Manrope
      fonts:
        - asset: fonts/Manrope-Regular.ttf
        - asset: fonts/Manrope-SemiBold.ttf
          weight: 600`;

function Step({ n, title, children }) {
  return (
    <div style={{ display: "flex", gap: 16, marginTop: 22 }}>
      <span className="ph-stepnum">{String(n).padStart(2, "0")}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ font: "600 14px var(--pk-sans)", color: "var(--pk-text)", margin: "1px 0 4px" }}>{title}</p>
        {children}
      </div>
    </div>
  );
}

function StepText({ children }) {
  return <p style={{ font: "400 13.5px/1.7 var(--pk-sans)", color: "var(--pk-text-muted)", margin: 0 }}>{children}</p>;
}

export default function Installation({ fw, setFw }) {
  const flutter = fw === "flutter";
  return (
    <>
      <Lead>
        Parkway is copy-first today: adopt it by copying the foundation files below, then drop in
        components from this hub — the snippets are the reference implementations.
      </Lead>

      <Tabs value={fw} onChange={setFw} items={FRAMEWORKS} label="Framework" />

      {flutter ? (
        <>
          <Step n={1} title="Add the tokens">
            <StepText>Drop <code>parkway_tokens.dart</code> into your project — colours and spacing as <code>PkColors</code> / <code>PkSpacing</code>.</StepText>
            <CodeBlock code={flutterTokens} label="parkway_tokens.dart" />
          </Step>
          <Step n={2} title="Bundle the fonts">
            <StepText>Declare PP Right Gothic (licensed) and Manrope in <code>pubspec.yaml</code>.</StepText>
            <CodeBlock code={flutterFonts} label="pubspec.yaml" />
          </Step>
          <Step n={3} title="Apply the text theme">
            <StepText>Use <code>pkTextTheme</code> in your <code>ThemeData</code> so every widget inherits the type ramp.</StepText>
            <CodeBlock code={typoFlutter} label="parkway_text_theme.dart" />
          </Step>
          <Step n={4} title="Add icons (as needed)">
            <StepText>Components that show icons use <strong>Phosphor</strong> — the one real package dependency. Parkway's custom transaction-category icons need nothing: copy their SVG from the Icons page.</StepText>
            <CodeBlock code={ICONS_INSTALL.flutter} label="terminal" />
          </Step>
          <Step n={5} title="Copy widgets">
            <StepText>Grab any widget from the Components section — each references these tokens, never raw hex.</StepText>
          </Step>
        </>
      ) : (
        <>
          <Step n={1} title="Add the tokens">
            <StepText>Copy <code>parkway-tokens.css</code> into your project and import it once at the root.</StepText>
            <CodeBlock code={cssTokens} label="parkway-tokens.css" />
          </Step>
          <Step n={2} title="Load the fonts">
            <StepText>Bundle PP Right Gothic (licensed) and load Manrope + JetBrains Mono.</StepText>
            <CodeBlock code={webFonts} label="fonts setup" />
          </Step>
          <Step n={3} title="Apply the type styles">
            <StepText>Add <code>parkway-type.css</code> for the H1–P12 ramp.</StepText>
            <CodeBlock code={typoCssDesktop} label="parkway-type.css" />
          </Step>
          <Step n={4} title="Add icons (as needed)">
            <StepText>Components that show icons use <strong>Phosphor</strong> — the one real package dependency. Parkway's custom transaction-category icons need nothing: copy their SVG from the Icons page.</StepText>
            <CodeBlock code={ICONS_INSTALL[fw]} label="terminal" />
          </Step>
          <Step n={5} title="Copy components">
            <StepText>Grab any component from the Components section — each references these tokens, never raw hex.</StepText>
          </Step>
        </>
      )}

      <SectionHeader label="Packages & SDK — status" desc="What you can and can't install today." />
      <p className="ph-note" style={{ marginTop: 10 }}>
        There is <strong>no installable Parkway package or SDK yet</strong> — nothing to{" "}
        <code>npm install</code> beyond the icon set above. Component packages
        (<code>@parkway/react</code>, <code>@parkway/vue</code>, <code>parkway_flutter</code>) are on
        the roadmap; until they ship, the copy-first steps above are the supported path and this
        hub's snippets are the source of truth. When the packages land, this page will carry the
        real install commands.
      </p>
    </>
  );
}
