"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const ITEMS = [
  "Machine Learning",
  "LLM Integration",
  "Distributed Systems",
  "AI Agents",
  "React & Next.js",
  "Scalable Architecture",
];

export default function MarqueeBanner() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const w = track.scrollWidth / 2;
    gsap.to(track, { x: -w, duration: 40, ease: "none", repeat: -1 });
  }, []);

  const all = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div style={{ overflow: "hidden", padding: "32px 0", borderTop: "1px solid rgba(48,56,65,0.06)", borderBottom: "1px solid rgba(48,56,65,0.06)", background: "rgba(48,56,65,0.01)", marginTop: 80 }}>
      <div ref={trackRef} style={{ display: "flex", gap: 64, whiteSpace: "nowrap", width: "max-content" }}>
        {all.map((item, i) => (
          <span key={i} className="font-serif" style={{ display: "inline-flex", alignItems: "center", gap: 64, fontSize: "clamp(24px, 3vw, 40px)", color: "#303841", fontStyle: i % 2 !== 0 ? "italic" : "normal" }}>
            {item}
            <span style={{ color: "#FF5722", fontSize: 16 }}>✺</span>
          </span>
        ))}
      </div>
    </div>
  );
}
