"use client";
import { useEffect, useRef, useState } from "react";

// Hand-inked portrait: messy black hair, round glasses, flat blush, a brown tee under an open
// light overshirt and backpack straps. Bold wobbly ink outlines over flat colour with a light
// paper grain (SVG filters). CSS keyframes in globals.css animate it: breathing, hair sway,
// blinking, a glint across the glasses, and every few seconds a wave with a "hey!" bubble
// (clicking replays it). The head also turns gently toward the cursor.
const INK = "#2A211C";
const SKIN = "#F6CDAA";
const SKIN_SHADE = "#EE9A63";
const HAIR = "#1F1B19";
const BLUSH = "#F2836B";
const JACKET = "#DCD7CC";
const JACKET_SHADE = "#C2BCB0";
const TEE = "#8C6A4F";
const STRAP = "#8E9296";
const BUCKLE = "#A65F36";

export default function PastelCharacter({ className, style }: { className?: string; style?: React.CSSProperties }) {
  // Bumping the key remounts the animated groups, which restarts the wave cycle
  const [waveKey, setWaveKey] = useState(0);
  const lookRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const look = lookRef.current;
    if (!look || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, af = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 8;
      ty = (e.clientY / window.innerHeight - 0.5) * 5;
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      look.style.transform = `translate(${cx}px, ${cy}px) rotate(${cx * 0.35}deg)`;
      af = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove);
    tick();
    return () => { cancelAnimationFrame(af); window.removeEventListener("pointermove", onMove); };
  }, []);

  const ink = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

  return (
    <svg
      viewBox="0 0 420 460"
      className={`pastel-character ${className ?? ""}`}
      style={style}
      role="img"
      aria-label="Animated hand-drawn portrait of Rishikesh with messy black hair and round glasses, waving"
      onClick={() => setWaveKey(k => k + 1)}
    >
      <defs>
        {/* Ink + paper: wobbly edges, then a faint grain speckle only where the shape is */}
        <filter id="pc-ink" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="wob" />
          <feDisplacementMap in="SourceGraphic" in2="wob" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.16  0 0 0 0 0.13  0 0 0 0 0.11  0 0 0 0.5 -0.12" result="speck" />
          <feComposite in="speck" in2="rough" operator="in" result="grain" />
          <feMerge><feMergeNode in="rough" /><feMergeNode in="grain" /></feMerge>
        </filter>
        {/* Pencil hatching wobble for thin lines */}
        <filter id="pc-pencil" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="pc-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <clipPath id="pc-lenses">
          <rect x="160" y="142" width="48" height="36" rx="16" />
          <rect x="216" y="142" width="48" height="36" rx="16" />
        </clipPath>
      </defs>

      {/* Peach backdrop */}
      <path className="pc-backdrop" filter="url(#pc-ink)" fill="#F8D7BC"
        d="M40 226c-6-100 70-178 172-182 102-4 174 64 172 162-2 100-60 186-168 196-108 10-170-76-176-176z" />

      {/* Doodles drifting up */}
      <g filter="url(#pc-pencil)" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <g className="pc-idea pc-idea-a" stroke="#3E7CB1" strokeWidth="2.2">
          <path d="M72 196l-10 9 10 9M96 196l10 9-10 9M89 192l-8 26" />
        </g>
        <g className="pc-idea pc-idea-b" stroke={INK} strokeWidth="1.8">
          <circle cx="352" cy="132" r="5" fill="#FFF3DC" />
          <circle cx="372" cy="118" r="4.5" fill="#FFF3DC" />
          <circle cx="374" cy="146" r="4.5" fill="#FBE3C8" stroke="#E2683C" />
          <path d="M356 129l12-8M356 135l14 8M372 123v18" />
        </g>
        <path className="pc-idea pc-idea-c" d="M58 280l4 9 10 1-8 6 3 10-9-5-9 5 3-10-8-6 10-1z" stroke="#E2683C" strokeWidth="1.8" fill="#FBE3C8" />
      </g>

      <g className="pc-body">
        {/* Overshirt */}
        <path filter="url(#pc-ink)" fill={JACKET} {...ink}
          d="M30 462c4-70 20-114 64-136 30-14 66-26 92-38l24 14 24-14c28 12 62 24 92 38 44 22 60 66 64 136z" />
        {/* Tee showing through the open front */}
        <path filter="url(#pc-ink)" fill={TEE} {...ink}
          d="M170 282c12 10 28 14 40 14s28-4 40-14l18 10-6 172H158l-6-172z" />
        <path filter="url(#pc-pencil)" fill="none" stroke="#6E5038" strokeWidth="2" strokeLinecap="round" d="M178 300c10 6 22 8 32 8s22-2 32-8" />
        {/* Collar and front edges of the overshirt */}
        <path filter="url(#pc-ink)" fill={JACKET} {...ink} d="M184 280l-34 22 16 52 18-30c-4-14-4-30 0-44z" />
        <path filter="url(#pc-ink)" fill={JACKET} {...ink} d="M236 280l34 22-16 52-18-30c4-14 4-30 0-44z" />
        <path filter="url(#pc-ink)" fill={JACKET} {...ink} d="M150 302c4 50 8 100 8 162H122c-2-60 6-110 28-162zM270 302c-4 50-8 100-8 162h36c2-60-6-110-28-162z" />
        {/* Jacket folds */}
        <g filter="url(#pc-pencil)" stroke={JACKET_SHADE} strokeWidth="2.4" strokeLinecap="round" fill="none">
          <path d="M70 400c10-20 24-34 40-42M350 400c-10-20-24-34-40-42M98 440c4-14 10-24 18-30M322 440c-4-14-10-24-18-30" />
        </g>
        {/* Backpack straps with buckles */}
        <path filter="url(#pc-ink)" fill={STRAP} {...ink} d="M96 330c10-8 22-12 34-14l8 148h-34c-6-44-8-90-8-134z" />
        <path filter="url(#pc-ink)" fill={STRAP} {...ink} d="M324 330c-10-8-22-12-34-14l-8 148h34c6-44 8-90 8-134z" />
        <path filter="url(#pc-ink)" fill={BUCKLE} {...ink} strokeWidth="2.4" d="M106 380h28v22h-28zM286 380h28v22h-28z" />
        <path filter="url(#pc-pencil)" stroke="#E7C7A6" strokeWidth="2" d="M114 391h12M294 391h12" />

        {/* Neck with warm hatched shading */}
        <path filter="url(#pc-ink)" fill={SKIN} {...ink} d="M184 236c0 18-2 32-6 44 20 16 46 16 64 0-4-12-6-26-6-44z" />
        <path filter="url(#pc-soft)" fill={SKIN_SHADE} opacity="0.75" d="M214 244c8 0 14-4 16-10 0 18 2 32 6 42-8 8-18 10-26 10 6-12 6-28 4-42z" />
        <g filter="url(#pc-pencil)" stroke="#D9773E" strokeWidth="1.4" strokeLinecap="round" opacity="0.7">
          <path d="M218 252l10-8M218 262l12-10M220 272l12-10" />
        </g>

        {/* Head turns toward the cursor; the wave tilts it */}
        <g ref={lookRef}>
         <g transform="translate(0 16) translate(211 160) scale(1.1) translate(-211 -160)">
          <g key={`head-${waveKey}`} className="pc-head">
            {/* Ears */}
            <path filter="url(#pc-ink)" fill={SKIN} {...ink} d="M156 150c-12-6-20 4-16 18 4 12 12 18 20 14zM266 150c12-6 20 4 16 18-4 12-12 18-20 14z" />
            {/* Face */}
            <path filter="url(#pc-ink)" fill={SKIN} {...ink}
              d="M156 140c0-36 22-58 56-58s54 22 54 58c0 34-6 60-18 76-10 14-22 22-36 22s-26-8-36-22c-12-16-20-42-20-76z" />

            {/* Flat blush */}
            <g className="pc-blush" filter="url(#pc-soft)" fill={BLUSH}>
              <ellipse cx="174" cy="186" rx="16" ry="10" />
              <ellipse cx="250" cy="186" rx="16" ry="10" />
            </g>

            {/* Eyes, nose, mouth */}
            <g filter="url(#pc-pencil)" stroke={INK} fill="none" strokeLinecap="round">
              <g className="pc-blink">
                <ellipse cx="185" cy="162" rx="3.2" ry="4" fill={INK} stroke="none" />
                <ellipse cx="239" cy="162" rx="3.2" ry="4" fill={INK} stroke="none" />
              </g>
              <path d="M213 176c-2 6-3 10-1 12" strokeWidth="1.8" />
              <path className="pc-mouth-calm" d="M206 206c4 2 9 2 13 0" strokeWidth="2.4" />
              <path className="pc-mouth-smile" d="M201 202c6 9 18 9 24 0" strokeWidth="2.4" />
            </g>

            {/* Round glasses with a glint that sweeps across */}
            <g filter="url(#pc-ink)" fill="none" stroke={INK} strokeWidth="3.4" strokeLinejoin="round">
              <rect x="160" y="142" width="48" height="36" rx="16" />
              <rect x="216" y="142" width="48" height="36" rx="16" />
              <path d="M208 156c3-3 6-3 8 0M160 154l-6-2M264 154l6-2" />
            </g>
            <g clipPath="url(#pc-lenses)">
              <path className="pc-glint" d="M150 186l26-48h10l-26 48zM206 186l26-48h6l-26 48z" fill="#FFFFFF" opacity="0.6" />
            </g>

            {/* Messy hair with a fringe that sways */}
            <g filter="url(#pc-ink)">
              <path fill={HAIR} {...ink}
                d="M148 150c-6-22-6-44 6-62l-8-4c10-2 16 0 20 4 4-14 14-24 26-30l-4-10c10 2 16 6 20 12 8-8 20-12 32-12l-2-8c8 2 14 6 18 12 14 0 26 8 34 20l8-4c0 8-2 14-6 18 10 14 12 32 8 48-2 10-6 18-10 24l-6-28c-4 10-10 16-16 20 0-10-2-18-6-24-8 8-20 12-32 12 4-6 4-12 2-18-10 10-26 14-40 14 4-6 6-10 6-16-8 10-18 14-26 12z" />
            </g>
            <path filter="url(#pc-ink)" fill={HAIR} {...ink} d="M152 138c-6 8-8 20-4 30l10-8zM270 136c6 8 8 20 4 30l-10-8z" />
            <g className="pc-fringe" filter="url(#pc-ink)">
              <path fill={HAIR} {...ink} d="M168 112c-8 14-12 30-10 44 8-10 14-22 18-36zM192 108c-4 14-4 26 0 36 6-12 10-24 10-36zM236 108c2 12 6 22 12 30 2-12 0-24-6-34z" />
            </g>
            <g filter="url(#pc-pencil)" stroke="#5A4C42" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.8">
              <path d="M186 78c14-6 30-8 44-4M172 92c10-8 22-12 34-12M232 84c12 4 22 12 28 22" />
            </g>
          </g>
         </g>
        </g>

        {/* Waving hand rising into frame */}
        <g key={`wave-${waveKey}`} className="pc-wave">
          <g className="pc-wave-swing">
            <path filter="url(#pc-ink)" fill={JACKET} {...ink} d="M318 470l20-120c4-12 26-14 34-4l-2 124z" />
            <path filter="url(#pc-ink)" fill={SKIN} {...ink}
              d="M338 342c-6-14-8-34-2-48 4-8 12-6 12 2l2 22c0-14 2-30 8-36 6-4 12 0 10 8l-2 26c2-12 6-24 12-26 6-2 10 4 8 10l-4 26c4-8 8-14 14-12 6 2 6 8 2 16-6 14-10 22-16 30-12 10-36 8-44-18z" />
          </g>
        </g>
      </g>

      {/* Speech bubble that pops up with the wave */}
      <g key={`bubble-${waveKey}`} className="pc-bubble">
        <path filter="url(#pc-ink)" fill="#FFF9EE" stroke={INK} strokeWidth="2.4" strokeLinejoin="round"
          d="M30 92c0-18 16-28 38-28h24c22 0 36 10 36 28s-14 28-36 28H78l-18 16 4-16c-20-2-34-12-34-28z" />
        <text x="78" y="102" textAnchor="middle" className="hand" fontSize="28" fill={INK}>hey!</text>
      </g>
    </svg>
  );
}
