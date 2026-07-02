import { useState } from "react";
import { moduleOf } from "../nav.js";
import { linkTo } from "../products.js";
import { FIGMA_FILE } from "../tokens.js";
import { MagnifyingGlass, X, ArrowUpRight } from "../iconography/index.js";

function Badge({ status }) {
  if (status === "building") return <span className="ph-badge building">NEW</span>;
  if (status === "soon") return <span className="ph-badge soon">SOON</span>;
  return null;
}

function ItemRow({ it, active, productId }) {
  if (it.external) {
    return (
      <a className="ph-item" href={it.href} target="_blank" rel="noreferrer">
        <span className="ph-itemlabel">{it.label}</span>
        <span className="ph-itemcount"><ArrowUpRight size={13} /></span>
      </a>
    );
  }
  const right = it.count != null ? it.count : it.meta || null;
  return (
    <a
      className={`ph-item${active ? " act" : ""}${it.status === "soon" ? " soon" : ""}`}
      href={linkTo(productId, it.id)}
      aria-current={active ? "page" : undefined}
    >
      <span className="ph-itemlabel">{it.label}<Badge status={it.status} /></span>
      {right != null && <span className="ph-itemcount">{right}</span>}
    </a>
  );
}

function GroupRow({ it, activePage, productId }) {
  const hasActiveSub = it.subItems?.some((s) => s.id === activePage);
  const [open, setOpen] = useState(hasActiveSub);
  return (
    <div>
      <button
        type="button"
        className={`ph-item ph-item-group${hasActiveSub ? " has-active" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open || hasActiveSub}
      >
        <span className="ph-itemlabel">{it.label}<Badge status={it.status} /></span>
        <span className="ph-chevron" aria-hidden="true">{open || hasActiveSub ? "▾" : "▸"}</span>
      </button>
      {(open || hasActiveSub) && (
        <div className="ph-subitems">
          {it.subItems.map((sub) => (
            <a
              key={sub.id}
              className={`ph-item ph-subitem${activePage === sub.id ? " act" : ""}${sub.status === "soon" ? " soon" : ""}`}
              href={linkTo(productId, sub.id)}
              aria-current={activePage === sub.id ? "page" : undefined}
            >
              <span className="ph-itemlabel">{sub.label}<Badge status={sub.status} /></span>
              {sub.meta != null && <span className="ph-itemcount">{sub.meta}</span>}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function Search({ q, setQ }) {
  return (
    <div className="ph-dirsearch">
      <span className="ph-searchicon"><MagnifyingGlass size={15} /></span>
      <input
        type="search"
        name="dirsearch"
        autoComplete="off"
        spellCheck={false}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search the system…"
        aria-label="Search the system"
      />
      {q && (
        <button type="button" className="ph-dirclear" onClick={() => setQ("")} aria-label="Clear search">
          <X size={13} />
        </button>
      )}
    </div>
  );
}

function Foot() {
  return (
    <footer className="ph-dirfoot">
      <a href={FIGMA_FILE} target="_blank" rel="noreferrer">
        Figma source <ArrowUpRight size={11} />
      </a>
      <p>Synced from Figma Dev Mode · v0.2</p>
    </footer>
  );
}

// Zone 2 — searchable, contextual directory tree for the active product.
export default function Directory({ product, activePage }) {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const pid = product.id;

  if (needle) {
    const hits = Object.values(product.items).filter(
      (it) =>
        it.label.toLowerCase().includes(needle) ||
        it.id.includes(needle) ||
        it.module.toLowerCase().includes(needle)
    );
    return (
      <aside className="ph-dir" aria-label="Directory">
        <div className="ph-dirscroll">
          <Search q={q} setQ={setQ} />
          {hits.length ? (
            <>
              <p className="ph-group">Results · {hits.length}</p>
              {hits.map((it) => (
                <ItemRow key={it.id} it={it} active={activePage === it.id} productId={pid} />
              ))}
            </>
          ) : (
            <div className="ph-empty">
              <h3>No matches for &ldquo;{q}&rdquo;</h3>
              <p>Try a page name — colors, typography, buttons, logo, icons.</p>
              <button type="button" className="ph-clear" onClick={() => setQ("")}>
                Clear search
              </button>
            </div>
          )}
        </div>
        <Foot />
      </aside>
    );
  }

  // Contextual: show only the active area's items (driven by the rail).
  const activeModule =
    product.modules.find((m) => m.id === moduleOf(product.modules, activePage)) || product.modules[0];
  return (
    <aside className="ph-dir" aria-label="Directory">
      <div className="ph-dirscroll">
        <Search q={q} setQ={setQ} />
        <p className="ph-group">{activeModule.label}</p>
        {activeModule.items.map((it) =>
          it.subItems ? (
            <GroupRow key={it.id} it={it} activePage={activePage} productId={pid} />
          ) : (
            <div key={it.id}>
              <ItemRow it={it} active={activePage === it.id} productId={pid} />
              {it.children && activePage === it.id && (
                <div className="ph-children">
                  {it.children.map((c, i) => (
                    <button
                      key={i}
                      type="button"
                      className="ph-item ph-item--child"
                      onClick={() => {
                        const el = c.anchor && document.getElementById(`pk-color-${c.anchor}`);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      <span className="ph-itemlabel">{c.label}</span>
                      {c.count != null && <span className="ph-itemcount">{c.count}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>
      <Foot />
    </aside>
  );
}
