"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  ACHIEVEMENTS,
  CERTIFICATIONS,
  EMAIL,
  GITHUB_PROFILE,
  LINKEDIN,
  PROJECTS,
  RESUME_URL,
  TIMELINE,
  type Project,
} from "@/lib/content";

// Pages are laid out at a fixed design size and the whole book is scaled to fit,
// so typography stays proportional from phones to wide screens.
const PAGE_W = 440;
const PAGE_H = 600;
const SPREAD_MIN = 760; // below this container width the book shows one page at a time

type Page = { key: string; kind: "cover" | "paper"; header?: string; body: ReactNode };

function Flow({ project: p }: { project: Project }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, margin: "8px 0 20px" }}>
      {p.flow.map((step, i) => (
        <div key={step} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="book-step-index" style={{ background: p.color === "#303841" ? "#76ABAE" : p.color }}>{i + 1}</span>
          <span style={{ fontSize: 15, fontWeight: 600 }}>{step}</span>
        </div>
      ))}
    </div>
  );
}

function buildPages(goTo: (page: number) => void): Page[] {
  const projectPages: Page[] = PROJECTS.flatMap((p, i) => [
    {
      key: `${p.id}-story`,
      kind: "paper" as const,
      header: `Chapter ${i + 3} · ${p.year}`,
      body: (
        <>
          <div className="book-kicker" style={{ color: p.color === "#303841" ? "#76ABAE" : p.color }}>{p.subtitle}</div>
          <h3 className="book-title">{p.title}</h3>
          <p className="book-text">{p.desc}</p>
        </>
      ),
    },
    {
      key: `${p.id}-arch`,
      kind: "paper" as const,
      header: p.title,
      body: (
        <>
          <h4 className="book-label">How it flows</h4>
          <Flow project={p} />
          <h4 className="book-label">Built with</h4>
          <p className="book-text" style={{ marginBottom: 20 }}>{p.tech.join(" · ")}</p>
          <h4 className="book-label">Outcomes</h4>
          <ul className="book-list">
            {p.metrics.map(m => <li key={m}>{m}</li>)}
          </ul>
          <a href={p.repo || GITHUB_PROFILE} target="_blank" rel="noopener noreferrer" className="book-link">
            {p.repo ? "Read the source →" : "More on GitHub →"}
          </a>
        </>
      ),
    },
  ]);

  const contents = [
    { label: "Preface", page: 2 },
    { label: "The Journey", page: 3 },
    ...PROJECTS.map((p, i) => ({ label: p.title, page: 4 + i * 2 })),
    { label: "Track Record", page: 10 },
    { label: "Epilogue", page: 12 },
  ];

  return [
    {
      key: "cover",
      kind: "cover",
      body: (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div className="book-kicker" style={{ color: "#76ABAE" }}>A field notebook</div>
          <div style={{ marginTop: "auto" }}>
            <h2 className="font-serif" style={{ fontSize: 58, lineHeight: 1, color: "#F5F5F5" }}>
              Rishikesh<br /><span style={{ color: "#FF5722", fontStyle: "italic" }}>Koli</span>
            </h2>
            <p style={{ marginTop: 20, fontSize: 16, color: "rgba(245,245,245,0.7)", lineHeight: 1.5 }}>
              Notes on building machine learning systems that survive production.
            </p>
          </div>
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(245,245,245,0.5)" }}>
            <span>ML Engineer</span>
            <span>Tap or drag to open →</span>
          </div>
        </div>
      ),
    },
    {
      key: "contents",
      kind: "paper",
      header: "Contents",
      body: (
        <>
          <h3 className="book-title">Contents</h3>
          <ol className="book-contents">
            {contents.map((c, i) => (
              <li key={c.label}>
                <button type="button" onClick={() => goTo(c.page)}>
                  <span>{["I", "II", "III", "IV", "V", "VI", "VII"][i]}. {c.label}</span>
                  <span className="book-dots" />
                  <span>{c.page + 1}</span>
                </button>
              </li>
            ))}
          </ol>
        </>
      ),
    },
    {
      key: "preface",
      kind: "paper",
      header: "Chapter 1 · Preface",
      body: (
        <>
          <h3 className="book-title">Preface</h3>
          <p className="book-text book-dropcap">
            I am a Computer Science graduate who bridges the gap between machine learning models and production systems.
          </p>
          <p className="book-text">
            I don&apos;t just prompt LLMs. I build the engineering scaffolding that makes AI reliable, fast and scalable under
            real-world concurrency: event streams, inference services, quantized models and the APIs around them.
          </p>
          <p className="book-text">This notebook collects the systems I have built and what each one taught me.</p>
        </>
      ),
    },
    {
      key: "journey",
      kind: "paper",
      header: "Chapter 2 · The Journey",
      body: (
        <>
          <h3 className="book-title">The Journey</h3>
          {TIMELINE.map(t => (
            <div key={t.title} style={{ marginBottom: 18 }}>
              <div className="book-label" style={{ marginBottom: 2 }}>{t.period}</div>
              <div style={{ fontSize: 17, fontWeight: 600 }}>{t.title}</div>
              <div style={{ fontSize: 14, color: "#76ABAE", fontWeight: 500 }}>{t.org}</div>
            </div>
          ))}
        </>
      ),
    },
    ...projectPages,
    {
      key: "awards",
      kind: "paper",
      header: "Chapter 6 · Track Record",
      body: (
        <>
          <h3 className="book-title">Track Record</h3>
          {ACHIEVEMENTS.map(a => (
            <div key={a.title} style={{ marginBottom: 16 }}>
              <span className="book-kicker" style={{ color: a.color === "#303841" ? "#76ABAE" : a.color }}>{a.label}</span>
              <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.3 }}>{a.title}</div>
              <div style={{ fontSize: 14, color: "rgba(48,56,65,0.65)" }}>{a.desc}</div>
            </div>
          ))}
        </>
      ),
    },
    {
      key: "certs",
      kind: "paper",
      header: "Track Record",
      body: (
        <>
          <h4 className="book-label">Certifications</h4>
          <ul className="book-list" style={{ marginBottom: 28 }}>
            {CERTIFICATIONS.map(c => <li key={c}>{c}</li>)}
          </ul>
          <blockquote className="book-quote">
            &ldquo;Ship the model, then make it fast, then make it trustworthy.&rdquo;
          </blockquote>
        </>
      ),
    },
    {
      key: "epilogue",
      kind: "paper",
      header: "Chapter 7 · Epilogue",
      body: (
        <>
          <h3 className="book-title">Let&apos;s build <span style={{ color: "#FF5722", fontStyle: "italic" }}>something great.</span></h3>
          <p className="book-text">I am open to ML Engineer roles and internships. The next chapter could be one we write together.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
            <a className="book-link" href={RESUME_URL} target="_blank" rel="noopener noreferrer">Download my resume →</a>
            <a className="book-link" href={`mailto:${EMAIL}`}>{EMAIL} →</a>
            <a className="book-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn →</a>
          </div>
        </>
      ),
    },
    {
      key: "back",
      kind: "cover",
      body: (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center" }}>
          <span className="font-serif" style={{ fontSize: 48, color: "#F5F5F5" }}>RK<span style={{ color: "#FF5722" }}>.</span></span>
          <p style={{ marginTop: 16, fontSize: 14, color: "rgba(245,245,245,0.6)" }}>Thanks for reading.</p>
          <button type="button" className="book-link" style={{ marginTop: 28, color: "#76ABAE" }} onClick={() => goTo(0)}>
            ← Back to the cover
          </button>
        </div>
      ),
    },
  ];
}

function Face({ page, index, side }: { page?: Page; index: number; side: "front" | "back" }) {
  if (!page) return <div className={`book-face book-${side} book-paper book-blank`} />;
  return (
    <div className={`book-face book-${side} ${page.kind === "cover" ? "book-cover" : "book-paper"}`}>
      {page.header && <div className="book-header">{page.header}</div>}
      <div className="book-body">{page.body}</div>
      {page.kind === "paper" && <div className="book-folio">{index + 1}</div>}
    </div>
  );
}

export default function DigitalBook() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [flipped, setFlipped] = useState(0);
  const drag = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const spread = width >= SPREAD_MIN;
  const perLeaf = spread ? 2 : 1;

  // goTo takes a page index; the book turns to whichever leaf shows that page
  const goTo = useCallback((page: number) => {
    setFlipped(perLeaf === 2 ? Math.ceil(page / 2) : page);
  }, [perLeaf]);

  const pages = buildPages(goTo);
  const leaves = spread
    ? Array.from({ length: Math.ceil(pages.length / 2) }, (_, i) => ({ front: 2 * i, back: 2 * i + 1 }))
    : pages.map((_, i) => ({ front: i, back: -1 }));
  const total = leaves.length;
  // A spread can turn every leaf (ending on the back cover); single pages stop on the last page
  const maxTurn = spread ? total : total - 1;
  const turned = Math.min(flipped, maxTurn);

  const next = useCallback(() => setFlipped(f => Math.min(f + 1, maxTurn)), [maxTurn]);
  const prev = useCallback(() => setFlipped(f => Math.max(Math.min(f, maxTurn) - 1, 0)), [maxTurn]);

  const scale = width ? Math.min(1, width / (PAGE_W * perLeaf)) : 1;
  // Center the closed book: cover sits on the right half, back cover on the left half
  const shift = !spread ? 0 : turned === 0 ? -PAGE_W / 2 : turned === total ? PAGE_W / 2 : 0;

  const onPointerDown = (e: React.PointerEvent) => { drag.current = { x: e.clientX, y: e.clientY }; };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = drag.current;
    drag.current = null;
    if (!start || (e.target as Element).closest("a,button")) return;
    const dx = e.clientX - start.x;
    if (Math.abs(dx) > 40) return dx < 0 ? next() : prev();
    if (Math.abs(dx) > 6 || Math.abs(e.clientY - start.y) > 6) return;
    // A tap turns forward on the right side of the book and back on the left
    const rect = e.currentTarget.getBoundingClientRect();
    const mid = spread ? rect.left + rect.width / 2 : rect.left + rect.width * 0.35;
    if (e.clientX >= mid) next(); else prev();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  };

  const visiblePages = spread
    ? [2 * turned - 1, 2 * turned].filter(p => p >= 0 && p < pages.length)
    : [Math.min(turned, pages.length - 1)];

  return (
    <section id="book" style={{ padding: "140px 0 40px", maxWidth: 1200, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <h2 className="font-serif" style={{ fontSize: "clamp(40px, 6vw, 80px)", color: "#303841", lineHeight: 1.1 }}>
          The <span style={{ color: "#FF5722", fontStyle: "italic" }}>Notebook</span>
        </h2>
        <p style={{ fontSize: 18, color: "rgba(48,56,65,0.6)", marginTop: 24, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          My work, one chapter at a time. Drag, tap, or use the arrow keys to turn the pages.
        </p>
      </div>

      <div ref={wrapRef} style={{ width: "100%" }}>
        {width > 0 && (
          <div style={{ height: PAGE_H * scale + 24, display: "flex", justifyContent: "center" }}>
            <div
              className="book-stage"
              role="region"
              aria-roledescription="book"
              aria-label={`Portfolio notebook, showing page ${visiblePages.map(p => p + 1).join(" and ")} of ${pages.length}`}
              tabIndex={0}
              onKeyDown={onKeyDown}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              style={{ width: PAGE_W * perLeaf, height: PAGE_H, transform: `scale(${scale})`, transformOrigin: "top center", flexShrink: 0 }}
            >
              <div className="book" style={{ transform: `translateX(${shift}px)` }}>
                <div
                  className="book-base"
                  style={spread
                    ? { left: turned === 0 ? PAGE_W : 0, width: turned === 0 || turned === total ? PAGE_W : PAGE_W * 2 }
                    : { left: 0, width: PAGE_W }}
                />
                {leaves.map((leaf, i) => {
                  const isTurned = i < turned;
                  return (
                    <div
                      key={i}
                      className={`book-leaf${isTurned ? " is-turned" : ""}${spread ? "" : " is-single"}`}
                      style={{
                        left: spread ? PAGE_W : 0,
                        width: PAGE_W,
                        zIndex: isTurned ? i + 1 : total - i,
                      }}
                      inert={spread ? !(isTurned ? i === turned - 1 : i === turned) : i !== turned}
                    >
                      <Face page={pages[leaf.front]} index={leaf.front} side="front" />
                      <Face page={leaf.back >= 0 ? pages[leaf.back] : undefined} index={leaf.back} side="back" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginTop: 24 }}>
        <button type="button" className="btn-secondary" style={{ padding: "10px 22px", fontSize: 14 }} onClick={prev} disabled={turned === 0}>
          ← Prev
        </button>
        <span aria-live="polite" style={{ fontSize: 14, color: "rgba(48,56,65,0.6)", minWidth: 90, textAlign: "center" }}>
          {turned === 0 ? "Cover" : turned === total && spread ? "Back cover" : `Page ${visiblePages.map(p => p + 1).join("–")}`}
        </span>
        <button type="button" className="btn-secondary" style={{ padding: "10px 22px", fontSize: 14 }} onClick={next} disabled={turned === maxTurn}>
          Next →
        </button>
      </div>
    </section>
  );
}
