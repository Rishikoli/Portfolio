"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAV = [
  { label: "Work", href: "work" },
  { label: "Skills", href: "skills" },
  { label: "About", href: "about" },
  { label: "Contact", href: "contact" },
];

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("work");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    // Initial entrance
    gsap.fromTo(ref.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "power4.out" }
    );

    // Scroll spy
    const onScroll = () => {
      for (const n of NAV) {
        const el = document.getElementById(n.href);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 200 && r.bottom >= 200) { 
            setActive(n.href); 
            break; 
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Update pill highlight position
  useEffect(() => {
    const idx = NAV.findIndex(n => n.href === active);
    const tab = tabRefs.current[idx];
    const highlight = highlightRef.current;
    
    if (tab && highlight) {
      gsap.to(highlight, {
        x: tab.offsetLeft,
        width: tab.offsetWidth,
        duration: 0.4,
        ease: "power3.out"
      });
    }
  }, [active]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav ref={ref} style={{
      position: "fixed", top: 32, left: 0, right: 0, zIndex: 50,
      display: "flex", justifyContent: "center"
    }}>
      <div className="pill-nav-container">
        <div ref={highlightRef} className="pill-highlight" />
        
        {NAV.map((n, i) => (
          <button
            key={n.href}
            ref={el => { tabRefs.current[i] = el; }}
            onClick={() => go(n.href)}
            className={`pill-tab ${active === n.href ? 'active' : ''}`}
          >
            {n.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
