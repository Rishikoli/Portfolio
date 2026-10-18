"use client";
import { useEffect, useRef } from "react";

// Hand-drawn portrait in a coloured-pencil / chalk-pastel style. The texture comes from
// SVG filters: fractal noise punches grain into the fills and nudges every edge so the
// shapes look hand-cut rather than vector-perfect.
const INK = "#2F2A28";
const HOOD = "#2F6FD6";
const HOOD_DARK = "#1F55B0";
const SKIN = "#F7DCC8";
const BLUSH = "#F08A84";

export default function PastelCharacter({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const headRef = useRef<SVGGElement>(null);

  // The head turns gently toward the cursor
  useEffect(() => {
    const head = headRef.current;
    if (!head || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, af = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 10;
      ty = (e.clientY / window.innerHeight - 0.5) * 6;
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      head.style.transform = `translate(${cx}px, ${cy}px) rotate(${cx * 0.4}deg)`;
      af = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove);
    tick();
    return () => { cancelAnimationFrame(af); window.removeEventListener("pointermove", onMove); };
  }, []);

  return (
    <svg viewBox="0 0 400 460" className={`pastel-character ${className ?? ""}`} style={style} role="img" aria-label="Hand-drawn illustration of Rishikesh in a blue hood">
      <defs>
        {/* Pastel texture: a soft wash plus streaky pencil strokes, with wobbly edges */}
        <filter id="pc-chalk" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.9" numOctaves="2" seed="7" result="streaks" />
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feColorMatrix in="streaks" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.6 2.1" result="grain" />
          <feComposite in="rough" in2="grain" operator="in" result="strokes" />
          <feComponentTransfer in="rough" result="wash"><feFuncA type="linear" slope="0.55" /></feComponentTransfer>
          <feMerge><feMergeNode in="wash" /><feMergeNode in="strokes" /></feMerge>
        </filter>
        <filter id="pc-chalk-soft" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 1.1" numOctaves="2" seed="11" result="streaks" />
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feColorMatrix in="streaks" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2 1.9" result="grain" />
          <feComposite in="rough" in2="grain" operator="in" result="strokes" />
          <feComponentTransfer in="rough" result="wash"><feFuncA type="linear" slope="0.88" /></feComponentTransfer>
          <feMerge><feMergeNode in="wash" /><feMergeNode in="strokes" /></feMerge>
        </filter>
        {/* Pencil line: a slight wobble on strokes */}
        <filter id="pc-pencil" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Soft airbrushed blush */}
        <filter id="pc-blush" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* Backdrop: a torn-paper pastel blob */}
      <path className="pc-backdrop" filter="url(#pc-chalk)" fill="#CFE3E2"
        d="M62 212c-6-78 52-150 134-158 86-9 152 44 160 126 9 86-30 170-118 192-92 23-170-64-176-160z" />

      {/* Doodles floating around: little graph nodes and a spark, drawn in pencil */}
      <g className="pc-doodle pc-doodle-a" filter="url(#pc-pencil)" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round">
        <circle cx="58" cy="118" r="7" fill="#FBEFD8" />
        <circle cx="92" cy="92" r="5" fill="#FBEFD8" />
        <circle cx="96" cy="136" r="5.5" fill="#FBEFD8" />
        <path d="M64 114l23-18M64 121l26 12M92 97l3 33" />
      </g>
      <g className="pc-doodle pc-doodle-b" filter="url(#pc-pencil)" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M338 96v22M327 107h22M331 99l14 16M345 99l-14 16" stroke="#E2683C" />
      </g>
      <g className="pc-doodle pc-doodle-c" filter="url(#pc-pencil)" stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M322 300c10-14 22-14 30 0s20 14 30 0" />
      </g>

      <g className="pc-body">
        {/* Shoulders / hoodie */}
        <path filter="url(#pc-chalk)" fill={HOOD}
          d="M92 452c4-62 30-104 72-118 24 10 48 13 72 1 46 12 72 56 76 117z" />
        {/* Hoodie strings and pocket hatching in a darker pencil */}
        <g filter="url(#pc-pencil)" stroke={HOOD_DARK} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8">
          <path d="M184 344c-2 24 0 40-4 58M218 344c2 22 1 38 5 56" stroke="#F4F1EA" />
          <path d="M120 420l14-12M128 432l16-14M300 418l-12-10M292 432l-14-12" />
        </g>

        <g ref={headRef} className="pc-head">
          {/* Hood: big, uneven, hand-cut shape */}
          <path filter="url(#pc-chalk)" fill={HOOD}
            d="M118 236c-10-74 30-142 88-146 62-4 104 56 98 132-4 58-24 108-56 128-30 18-66 16-92-4-24-20-34-60-38-110z" />
          {/* Inner hood shadow */}
          <path filter="url(#pc-chalk)" fill={HOOD_DARK} opacity="0.85"
            d="M140 238c-4-54 22-102 66-104 46-2 76 42 72 98-3 46-18 84-44 98-24 12-50 8-68-8-16-16-24-46-26-84z" />

          {/* Face */}
          <path filter="url(#pc-chalk-soft)" fill={SKIN}
            d="M150 244c-2-44 22-80 58-80 38 0 62 34 60 80-2 44-24 82-60 84-36 2-56-38-58-84z" />

          {/* Fringe of hair peeking out from the hood */}
          <path filter="url(#pc-chalk)" fill="#3B302B"
            d="M150 226c6-40 32-64 60-64 30 0 54 22 60 60-12-14-26-22-40-24 2 8 0 14-4 18-8-12-22-18-38-18 2 8-2 14-8 18-10-6-20-4-30 10z" />
          <g filter="url(#pc-pencil)" stroke="#5A4A42" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7">
            <path d="M170 190c6-8 14-12 22-12M214 182c10 2 20 8 26 18M186 200c4-6 10-10 16-10" />
          </g>

          {/* Blush, softly blended */}
          <g className="pc-blush" filter="url(#pc-blush)" fill={BLUSH}>
            <ellipse cx="172" cy="268" rx="17" ry="11" />
            <ellipse cx="246" cy="268" rx="17" ry="11" />
          </g>

          {/* Thin, delicate features */}
          <g filter="url(#pc-pencil)" stroke={INK} strokeWidth="1.7" fill="none" strokeLinecap="round">
            <g className="pc-eyes">
              <ellipse cx="183" cy="246" rx="3.2" ry="4.2" fill={INK} stroke="none" />
              <ellipse cx="235" cy="246" rx="3.2" ry="4.2" fill={INK} stroke="none" />
            </g>
            <path d="M172 232c6-4 14-4 19-1M227 231c5-3 13-3 19 1" strokeWidth="1.4" />
            <path d="M210 254c-2 8-1 13 3 14" strokeWidth="1.3" />
            <path className="pc-mouth" d="M199 286c6 5 15 5 21 0" />
          </g>
        </g>
      </g>
    </svg>
  );
}
