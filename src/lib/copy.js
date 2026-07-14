// Clipboard helper with a textarea fallback for non-secure contexts.
// cb(true) on success, then cb(false) after a short confirmation window.
export function copyText(text, cb) {
  const done = () => {
    cb(true);
    setTimeout(() => cb(false), 1400);
  };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(fallback);
  } else {
    fallback();
  }
  function fallback() {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {
      /* no-op */
    }
    document.body.removeChild(ta);
    if (ok) done(); // only confirm "Copied" when the copy actually happened
  }
}
