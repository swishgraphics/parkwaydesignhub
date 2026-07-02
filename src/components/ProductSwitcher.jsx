import { useState, useRef, useEffect } from "react";
import { PRODUCTS, linkTo } from "../products.js";
import { CaretDown, Check } from "../iconography/index.js";

function Mark({ product, size = 22 }) {
  if (product.hasLogo && product.logo?.mark) {
    return <img className="ph-pmark" src={product.logo.mark} alt="" width={size} height={size} />;
  }
  return (
    <span className="ph-pletter" aria-hidden="true" style={{ width: size, height: size }}>
      {product.lettermark}
    </span>
  );
}

// Product selector at the top of the rail. Picking a product re-points the
// hash at that product's Introduction; routing + accent handle the rest.
export default function ProductSwitcher({ product }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (id) => {
    setOpen(false);
    if (id !== product.id) window.location.hash = linkTo(id, "introduction");
  };

  return (
    <div className="ph-switch" ref={ref}>
      <button
        type="button"
        className="ph-switchbtn"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Switch product"
      >
        <Mark product={product} />
        <span className="ph-switchname">{product.name}</span>
        <span className="ph-switchcaret" data-open={open ? "1" : undefined}><CaretDown size={13} weight="bold" /></span>
      </button>
      {open && (
        <div className="ph-switchmenu" role="listbox" aria-label="Products">
          {PRODUCTS.map((p) => {
            const active = p.id === product.id;
            return (
              <button
                key={p.id}
                type="button"
                role="option"
                aria-selected={active}
                className={`ph-switchopt${active ? " act" : ""}`}
                onClick={() => pick(p.id)}
              >
                <Mark product={p} size={20} />
                <span className="ph-switchoptname">{p.name}</span>
                {active ? (
                  <Check size={14} weight="bold" />
                ) : p.status === "soon" ? (
                  <span className="ph-badge soon">SOON</span>
                ) : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
