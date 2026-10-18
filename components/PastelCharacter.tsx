"use client";
import { useEffect, useRef, useState } from "react";

// Hand-inked portrait in a Japanese illustration style: short dark hair with a fringe, thin
// round glasses, flat blush, a brown tee under an open light overshirt and backpack straps,
// cropped at the chest inside a peach card. Ink outlines over flat colour and flat shadows,
// roughened by SVG filters. CSS keyframes in globals.css animate it: breathing, the fringe
// swaying, blinking, a glint across the glasses, and every few seconds a head tilt with a
// smile and a "hey!" bubble (clicking replays it). The head also turns toward the cursor.
const INK = "#231B17";
const SKIN = "#F7D2B4";
const SKIN_SHADE = "#EC9460";
const HAIR = "#211B18";
const HAIR_LIGHT = "#6E4B33";
const BLUSH = "#F07F68";
const JACKET = "#DDD8CD";
const JACKET_SHADE = "#B9B2A5";
const TEE = "#8A6548";
const TEE_SHADE = "#6E4E37";
const STRAP = "#8F9396";
const STRAP_SHADE = "#6F7376";
const BUCKLE = "#B4652F";
const PEACH = "#F9D9BF";

export default function PastelCharacter({ className, style }: { className?: string; style?: React.CSSProperties }) {
  // Bumping the key remounts the animated groups, which restarts the greeting cycle
  const [greetKey, setGreetKey] = useState(0);
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
      look.style.transform = `translate(${cx}px, ${cy}px) rotate(${cx * 0.3}deg)`;
      af = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove);
    tick();
    return () => { cancelAnimationFrame(af); window.removeEventListener("pointermove", onMove); };
  }, []);

  const ink = { stroke: INK, strokeWidth: 2.8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const line = { stroke: INK, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  return (
    <svg
      viewBox="0 0 420 430"
      className={`pastel-character ${className ?? ""}`}
      style={style}
      role="img"
      aria-label="Animated hand-drawn portrait of Rishikesh with dark hair and round glasses, smiling and saying hey"
      onClick={() => setGreetKey(k => k + 1)}
    >
      <defs>
        {/* Ink + paper: wobbly edges, then a faint grain speckle only where the shape is */}
        <filter id="pc-ink" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" result="wob" />
          <feDisplacementMap in="SourceGraphic" in2="wob" scale="2.6" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.16  0 0 0 0 0.13  0 0 0 0 0.11  0 0 0 0.45 -0.12" result="speck" />
          <feComposite in="speck" in2="rough" operator="in" result="grain" />
          <feMerge><feMergeNode in="rough" /><feMergeNode in="grain" /></feMerge>
        </filter>
        {/* Pencil wobble for thin lines and hatching */}
        <filter id="pc-pencil" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="pc-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        <clipPath id="pc-card">
          <path d="M18 30c60-8 130-12 196-10 64 2 126 4 186 12 6 120 8 250 4 384-128 6-256 6-384 2-6-130-8-258-2-388z" />
        </clipPath>
        <clipPath id="pc-lenses">
          <rect x="162" y="124" width="44" height="36" rx="17" />
          <rect x="216" y="124" width="44" height="36" rx="17" />
        </clipPath>
      </defs>

      <g clipPath="url(#pc-card)">
        <rect x="0" y="0" width="420" height="430" fill={PEACH} />

        <g className="pc-body">
          {/* Overshirt across the shoulders */}
          <path filter="url(#pc-ink)" fill={JACKET} {...ink}
            d="M-10 440V292c30-22 72-36 112-44 30-6 58-10 80-12h56c22 2 50 6 80 12 40 8 82 22 112 44v148z" />
          {/* Flat shadows and folds on the overshirt */}
          <g fill={JACKET_SHADE} opacity="0.55">
            <path d="M-10 300c22-14 46-24 72-30l14 170H-10z" />
            <path d="M430 300c-22-14-46-24-72-30l-14 170h86z" />
          </g>
          <g filter="url(#pc-pencil)" {...line} strokeWidth="2">
            <path d="M40 284c14 40 20 90 16 146M380 284c-14 40-20 90-16 146" />
            <path d="M28 372c8-10 18-16 28-18M392 372c-8-10-18-16-28-18" stroke={JACKET_SHADE} strokeWidth="2.4" />
          </g>

          {/* Brown tee through the open front, its back collar behind the neck */}
          <path fill={TEE_SHADE} d="M186 236h50l6 26h-62z" />
          <path filter="url(#pc-ink)" fill={TEE} {...ink}
            d="M168 242c14 18 72 18 86 0l18 14 8 184H142l8-184z" />
          <path fill={TEE_SHADE} opacity="0.8" d="M160 258c26 16 76 16 102 0l2 22c-30 14-76 14-106 0z" />
          <path filter="url(#pc-pencil)" {...line} strokeWidth="2.2" d="M174 248c16 18 58 18 74 0" />
          <g filter="url(#pc-pencil)" stroke={TEE_SHADE} strokeWidth="1.6" strokeLinecap="round">
            <path d="M226 372l14-10M232 386l14-10" />
          </g>

          {/* Front edges and collar of the overshirt */}
          <path filter="url(#pc-ink)" fill={JACKET} {...ink} d="M150 296c6 44 8 90 4 144h-34c-2-56 8-104 30-144z" />
          <path filter="url(#pc-ink)" fill={JACKET} {...ink} d="M272 296c-6 44-8 90-4 144h34c2-56-8-104-30-144z" />
          <path filter="url(#pc-ink)" fill={JACKET} {...ink} d="M182 234l-48 20 14 50 30-40c-6-10-4-20 4-30z" />
          <path filter="url(#pc-ink)" fill={JACKET} {...ink} d="M240 234l48 20-14 50-30-40c6-10 4-20-4-30z" />
          <path fill={JACKET_SHADE} opacity="0.7" d="M139 258l11 42 6-8-9-34zM283 258l-11 42-6-8 9-34z" />

          {/* Backpack straps with orange loops */}
          <path filter="url(#pc-ink)" fill={STRAP} {...ink} d="M92 252c10-4 22-6 34-6l4 194h-32c-4-62-6-126-6-188z" />
          <path filter="url(#pc-ink)" fill={STRAP} {...ink} d="M330 252c-10-4-22-6-34-6l-4 194h32c4-62 6-126 6-188z" />
          <path fill={STRAP_SHADE} opacity="0.6" d="M96 256c0 60 2 122 6 184h9c-4-62-6-124-6-186zM326 256c0 60-2 122-6 184h-9c4-62 6-124 6-186z" />
          <g filter="url(#pc-pencil)" {...line} strokeWidth="1.6" stroke="#5E6164">
            <path d="M100 290l24-2M100 304l24-2M322 290l-24-2M322 304l-24-2" />
          </g>
          <path filter="url(#pc-ink)" fill={BUCKLE} {...ink} strokeWidth="2.2"
            d="M94 340c12-2 26-2 38 0l1 22c-12 2-26 2-38 0zM328 340c-12-2-26-2-38 0l-1 22c12 2 26 2 38 0z" />
          <path filter="url(#pc-pencil)" stroke="#F1C9A2" strokeWidth="1.8" strokeLinecap="round" d="M106 351h16M300 351h16" />

          {/* Neck with the jaw's warm shadow falling across it */}
          <path filter="url(#pc-ink)" fill={SKIN} {...ink} d="M190 190c0 22-2 38-8 50 18 14 40 14 58 0-6-12-8-28-8-50z" />
          <path fill={SKIN_SHADE} opacity="0.9" d="M191 196c12 12 28 16 41 4v16c-12 14-28 24-48 30 4-14 7-30 7-50z" />
          <g filter="url(#pc-pencil)" stroke="#C9683A" strokeWidth="1.3" strokeLinecap="round" opacity="0.7">
            <path d="M200 228l14-10M204 236l14-10" />
          </g>

          {/* Head turns toward the cursor; the greeting tilts it */}
          <g ref={lookRef}>
            <g key={`head-${greetKey}`} className="pc-head">
              {/* Ears */}
              <path filter="url(#pc-ink)" fill={SKIN} {...ink} d="M156 128c-14-6-22 6-18 20 3 12 10 18 20 16z" />
              <path filter="url(#pc-ink)" fill={SKIN} {...ink} d="M266 128c14-6 22 6 18 20-3 12-10 18-20 16z" />
              <path filter="url(#pc-pencil)" {...line} strokeWidth="1.6" d="M150 138c-4 2-4 8 0 12M272 138c4 2 4 8 0 12" />
              {/* Face: long oval with a soft jaw and chin */}
              <path filter="url(#pc-ink)" fill={SKIN} {...ink}
                d="M154 112c0-34 24-52 57-52s57 18 57 52c0 40-4 62-16 80-12 14-26 20-41 20s-29-6-41-20c-12-18-16-40-16-80z" />

              {/* Flat blush */}
              <g className="pc-blush" filter="url(#pc-soft)" fill={BLUSH}>
                <ellipse cx="174" cy="168" rx="17" ry="10" />
                <ellipse cx="248" cy="168" rx="17" ry="10" />
              </g>

              {/* Brows, eyes, nose, mouth */}
              <g filter="url(#pc-pencil)" {...line}>
                <path d="M172 118c8-4 18-5 26-2M224 116c8-3 18-2 26 2" strokeWidth="2.6" />
                <g className="pc-blink">
                  <ellipse cx="186" cy="143" rx="2.8" ry="3.6" fill={INK} stroke="none" />
                  <ellipse cx="236" cy="143" rx="2.8" ry="3.6" fill={INK} stroke="none" />
                </g>
                <path d="M211 150c-2 7-4 12-1 14 2 1 5 0 6-1" strokeWidth="1.8" />
                <path className="pc-mouth-calm" d="M205 183c4 1 9 1 12-1" strokeWidth="2.4" />
                <path className="pc-mouth-smile" d="M200 180c6 8 16 8 22 0" strokeWidth="2.4" />
              </g>

              {/* Thin round glasses with a glint that sweeps across */}
              <g filter="url(#pc-pencil)" fill="none" stroke={INK} strokeWidth="2.4" strokeLinejoin="round">
                <rect x="162" y="124" width="44" height="36" rx="17" />
                <rect x="216" y="124" width="44" height="36" rx="17" />
                <path d="M206 138c3-3 7-3 10 0M162 136l-8-3M260 136l8-3" />
              </g>
              <g clipPath="url(#pc-lenses)">
                <path className="pc-glint" d="M152 166l24-48h9l-24 48zM208 166l24-48h5l-24 48z" fill="#FFFFFF" opacity="0.55" />
              </g>

              {/* Short dark hair: full crown, trimmed sides, a fringe falling over the forehead */}
              <g filter="url(#pc-ink)">
                <path fill={HAIR} {...ink}
                  d="M152 140c-12-30-10-62 8-84 6-8 14-12 22-14l-4-10c8 0 14 4 18 8 6-6 16-8 26-8l2-8c6 2 10 6 12 10 22 2 40 14 48 34 8 18 8 42 -2 70l-6 10c-2-14-2-26 0-34l-8-6c0-10-2-20-6-28-4 8-8 14-14 18l-2-14c-6 8-14 12-22 14l2-12c-8 8-18 12-30 14l4-12c-10 6-20 8-30 8l6-10c-12 4-20 12-26 22l-4 10-6-12z" />
                              </g>
              {/* Warm highlights catching the light on the crown */}
              <g filter="url(#pc-pencil)" stroke={HAIR_LIGHT} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9">
                <path d="M168 64c14-10 30-14 46-14M228 50c16 2 30 10 38 22M176 80c8-8 18-12 28-14" />
              </g>
              <g className="pc-fringe" filter="url(#pc-ink)">
                <path fill={HAIR} {...ink}
                  d="M214 70c-10 14-18 30-22 50 8-6 14-14 18-24 0 10 2 18 6 24 2-12 4-22 10-32 2 10 8 18 14 22-2-14-4-28-10-40z" />
              </g>
              <g filter="url(#pc-pencil)" stroke="#4A3E37" strokeWidth="1.4" strokeLinecap="round" fill="none">
                <path d="M196 92c-4 8-6 16-6 22M232 84c4 6 8 12 10 20" />
              </g>
            </g>
          </g>
        </g>

        {/* Speech bubble that pops up with the greeting */}
        <g key={`bubble-${greetKey}`} className="pc-bubble">
          <path filter="url(#pc-ink)" fill="#FFF9EE" stroke={INK} strokeWidth="2.4" strokeLinejoin="round"
            d="M36 92c0-18 14-28 36-28h20c22 0 34 10 34 28s-12 28-34 28H96l12 18-26-18c-28 0-46-10-46-28z" />
          <text x="81" y="101" textAnchor="middle" className="hand" fontSize="28" fill={INK}>hey!</text>
        </g>
      </g>

      {/* Hand-cut edge of the card */}
      <path filter="url(#pc-ink)" fill="none" stroke={INK} strokeWidth="2.4" strokeLinejoin="round"
        d="M18 30c60-8 130-12 196-10 64 2 126 4 186 12 6 120 8 250 4 384-128 6-256 6-384 2-6-130-8-258-2-388z" />
    </svg>
  );
}
