import { Lead, SectionHeader } from "../components/primitives.jsx";

const GROUPS = [
  ["When to use which", [
    "Toggle vs checkbox — toggle for an instant on/off setting; checkbox for opt-in or multi-select that's saved with a form.",
    "Link vs button — link for navigation and low-emphasis actions; button for the primary commit action.",
    "Toast vs inline error — toast for transient, system-level feedback; inline text for field-level validation.",
  ]],
  ["Accessibility", [
    "Every control has a visible label or aria-label; never rely on placeholder text as the label.",
    "Keep a visible focus ring — never remove the outline without replacing it.",
    "Mobile hit targets are at least 44×44px, even when the visual is smaller.",
    "Never signal state with colour alone — pair it with an icon, text, or shape.",
  ]],
  ["Content", [
    "Labels are concise and sentence case — \"Get a demo\", not \"Get A Demo\".",
    "Lead with the outcome; write in the active voice.",
    "Use numerals for counts and amounts.",
  ]],
  ["Consistency", [
    "One primary action per view; everything else is secondary or tertiary.",
    "Reference tokens (--pk-* / PkColors), never raw hex.",
    "Space on the 8-point grid; reach for the 4-point grid only for fine adjustments.",
  ]],
  ["Light & dark mode", [
    "Build against tokens and both modes work for free — the tokens re-map under data-theme=\"dark\".",
    "Check both modes before shipping: every component page has a Light/Dark preview toggle in its playground.",
    "Don't hardcode surface or text colours to make one mode look right — fix the token instead.",
  ]],
  ["Icons", [
    "UI icons come from Phosphor (install the package); pick one weight per screen and stay with it.",
    "Transaction-category icons are Parkway's own — copy the raw SVG from the Icons page; no package.",
    "Custom icons are served as currentColor: they inherit text colour, so tint via the parent's color.",
  ]],
];

export default function UsageGuidelines() {
  return (
    <>
      <Lead>Cross-cutting rules that keep Parkway coherent. Component pages carry their own Do / Don't.</Lead>

      {GROUPS.map(([label, items]) => (
        <section key={label}>
          <SectionHeader label={label} />
          <ul className="ph-guidelist">
            {items.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </section>
      ))}
    </>
  );
}
