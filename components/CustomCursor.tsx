"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    gsap.set([dot, ring], { opacity: 0 });

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.to(dot, { x: mx, y: my, duration: 0.08, ease: "none", opacity: 1 });
    };

    let af: number;
    const lerp = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      gsap.set(ring, { x: rx, y: ry, opacity: 1 });
      af = requestAnimationFrame(lerp);
    };
    lerp();

    const grow = () => gsap.to(ring, { width: 52, height: 52, duration: 0.3, ease: "power2.out" });
    const shrink = () => gsap.to(ring, { width: 32, height: 32, duration: 0.3, ease: "power2.out" });

    // Delegated so links and buttons rendered after mount (e.g. form success state) also grow the ring
    const isHoverTarget = (t: EventTarget | null) => t instanceof Element && !!t.closest("a,button,[data-hover]");
    const onOver = (e: MouseEvent) => { if (isHoverTarget(e.target)) grow(); };
    const onOut = (e: MouseEvent) => { if (isHoverTarget(e.target) && !isHoverTarget(e.relatedTarget)) shrink(); };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(af);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cur-dot hidden md:block" />
      <div ref={ringRef} className="cur-ring hidden md:block" />
    </>
  );
}
