"use client";
import { useState } from "react";

// A small storybook character drawn in a coloured-pencil / chalk-pastel style: a kid in a
// hand-cut blue knit hat, sitting on a stack of books and sketching a neural net. SVG filters
// supply the grain and the wobbly hand-cut edges; CSS keyframes in globals.css animate it
// (sketching hand, self-drawing lines, bobbing head, bouncing pom-pom, blinking, a periodic wave).
// Clicking the character makes it wave and say hi.
const INK = "#2F2A28";
const HAT = "#2F6FD6";
const HAT_DARK = "#1F55B0";
const SKIN = "#F7DCC8";
const BLUSH = "#F08A84";
const SWEATER = "#F4A261";
const PANTS = "#3B4A6B";
const PAPER = "#FFF9EE";

export default function PastelCharacter({ className, style }: { className?: string; style?: React.CSSProperties }) {
  // Bumping the key restarts the wave animation on each click
  const [waveKey, setWaveKey] = useState(0);

  return (
    <svg
      viewBox="0 0 420 470"
      className={`pastel-character ${className ?? ""}`}
      style={style}
      role="img"
      aria-label="Animated hand-drawn character in a blue knit hat, sketching in a notebook and waving"
      onClick={() => setWaveKey(k => k + 1)}
    >
      <defs>
        {/* Pastel texture: a soft wash plus streaky pencil strokes, with wobbly edges */}
        <filter id="pc-chalk" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.9" numOctaves="2" seed="7" result="streaks" />
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feColorMatrix in="streaks" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 2.1" result="grain" />
          <feComposite in="rough" in2="grain" operator="in" result="strokes" />
          <feComponentTransfer in="rough" result="wash"><feFuncA type="linear" slope="0.7" /></feComponentTransfer>
          <feMerge><feMergeNode in="wash" /><feMergeNode in="strokes" /></feMerge>
        </filter>
        <filter id="pc-chalk-soft" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06 1.1" numOctaves="2" seed="11" result="streaks" />
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feColorMatrix in="streaks" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2 1.9" result="grain" />
          <feComposite in="rough" in2="grain" operator="in" result="strokes" />
          <feComponentTransfer in="rough" result="wash"><feFuncA type="linear" slope="0.9" /></feComponentTransfer>
          <feMerge><feMergeNode in="wash" /><feMergeNode in="strokes" /></feMerge>
        </filter>
        {/* Pencil line: a slight wobble on strokes */}
        <filter id="pc-pencil" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Soft airbrushed blush */}
        <filter id="pc-blush" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* Backdrop: a torn-paper pastel blob */}
      <path className="pc-backdrop" filter="url(#pc-chalk)" fill="#CFE3E2"
        d="M48 230c-8-90 60-170 156-176 98-6 170 54 176 146 6 96-46 186-150 204-104 18-174-80-182-174z" />

      {/* Ideas drifting up from the sketchbook */}
      <g filter="url(#pc-pencil)" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path className="pc-idea pc-idea-a" d="M330 230l4 9 10 1-8 6 3 10-9-5-9 5 3-10-8-6 10-1z" stroke="#E2683C" strokeWidth="1.8" fill="#FBE3C8" />
        <path className="pc-idea pc-idea-b" d="M300 214c-6-8-18-2-12 8l12 10 12-10c6-10-6-16-12-8z" stroke={INK} strokeWidth="1.6" fill="#F7C6C2" />
        <g className="pc-idea pc-idea-c" stroke={INK} strokeWidth="1.6">
          <circle cx="352" cy="270" r="5" fill="#FFF3DC" />
          <circle cx="368" cy="256" r="4" fill="#FFF3DC" />
          <path d="M356 267l9-8" />
        </g>
      </g>

      {/* Stack of books to sit on */}
      <g filter="url(#pc-chalk)">
        <path fill="#76ABAE" d="M96 408c40-6 186-8 236 0l2 30c-60 6-180 6-240 0z" />
        <path fill="#E86A3E" d="M112 380c40-6 160-6 206 0l2 30c-50 4-160 4-210 0z" />
        <path fill="#F3E3C3" d="M126 356c36-4 140-4 178 0l1 26c-44 3-136 3-180 0z" />
      </g>
      <g filter="url(#pc-pencil)" stroke={INK} strokeWidth="1.3" strokeLinecap="round" opacity="0.55" fill="none">
        <path d="M110 423h220M126 395h188M140 369h150" />
      </g>

      <g className="pc-body">
        {/* Crossed legs */}
        <path filter="url(#pc-chalk)" fill={PANTS} d="M140 352c10-26 52-30 76-18 26-12 66-8 76 18-20 12-56 10-76 0-22 12-58 12-76 0z" />
        <path filter="url(#pc-chalk-soft)" fill="#F3EDE4" d="M128 352c2-10 14-14 24-10l-2 14c-10 2-20 2-22-4zM304 352c-2-10-14-14-24-10l2 14c10 2 20 2 22-4z" />

        {/* Sweater */}
        <path filter="url(#pc-chalk)" fill={SWEATER} d="M156 236c10-24 34-32 54-32s46 8 56 32c10 32 12 72 8 106-40 10-90 10-130 0-4-34-2-74 12-106z" />
        <g filter="url(#pc-pencil)" stroke="#D9803E" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.8">
          <path d="M150 334c40 8 84 8 124 0M152 326c40 8 82 8 120 0" />
        </g>

        {/* Waving arm (viewer's left), pivoting at the shoulder; drawn raised, rests holding the book */}
        <g key={waveKey} className={`pc-arm-wave${waveKey ? " is-greeting" : ""}`}>
          <path filter="url(#pc-chalk)" d="M162 228L122 172" stroke={SWEATER} strokeWidth="24" strokeLinecap="round" fill="none" />
          <circle filter="url(#pc-chalk-soft)" cx="116" cy="163" r="12" fill={SKIN} />
        </g>
        <g key={`bubble-${waveKey}`} className={`pc-bubble${waveKey ? " is-greeting" : ""}`}>
          <path filter="url(#pc-chalk-soft)" fill={PAPER} stroke={INK} strokeWidth="1.5"
            d="M40 92c0-16 14-26 34-26h22c20 0 32 10 32 26s-12 26-32 26h-16l-14 14 2-14c-18-2-28-12-28-26z" />
          <text x="82" y="100" textAnchor="middle" className="hand" fontSize="26" fill={INK}>hi!</text>
        </g>

        {/* Open sketchbook held on the lap */}
        <g filter="url(#pc-chalk-soft)">
          <path fill={PAPER} d="M148 262c24-8 50-12 74-10v82c-24-2-50 2-74 8z" />
          <path fill="#FFFDF7" d="M222 252c26-2 52 2 78 10l-2 80c-26-6-52-10-76-8z" />
        </g>
        <g filter="url(#pc-pencil)" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round">
          <path d="M148 262c24-8 50-12 74-10 26-2 52 2 78 10M222 252v82" opacity="0.7" />
          <path d="M160 280h46M160 292h40M160 304h44M160 316h30" opacity="0.35" />
        </g>

        {/* A tiny neural net that draws itself, then fades and starts over */}
        <g className="pc-sketch" filter="url(#pc-pencil)" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round">
          <path pathLength={1} d="M240 280L266 272M240 280L266 296M240 310L266 296M240 310L266 320M266 272L288 296M266 296L288 296M266 320L288 296" />
          <circle pathLength={1} cx="240" cy="280" r="5" />
          <circle pathLength={1} cx="240" cy="310" r="5" />
          <circle pathLength={1} cx="266" cy="272" r="4.5" />
          <circle pathLength={1} cx="266" cy="296" r="4.5" stroke="#E2683C" />
          <circle pathLength={1} cx="266" cy="320" r="4.5" />
          <circle pathLength={1} cx="288" cy="296" r="5.5" stroke="#3E7CB1" />
        </g>

        {/* Drawing arm (viewer's right) with a pencil; the hand scribbles across the page */}
        <g className="pc-arm-draw">
          <path filter="url(#pc-chalk)" d="M260 230C292 254 290 280 270 296" stroke={SWEATER} strokeWidth="22" strokeLinecap="round" fill="none" />
          <g filter="url(#pc-pencil)">
            <path d="M268 296L254 318" stroke="#E9B44C" strokeWidth="6" strokeLinecap="round" />
            <path d="M254 318l-3 6" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
          </g>
          <circle filter="url(#pc-chalk-soft)" cx="270" cy="295" r="11" fill={SKIN} />
        </g>

        {/* Head */}
        <g className="pc-head">
          <path filter="url(#pc-chalk-soft)" fill={SKIN} d="M150 158c0-38 28-64 62-64s60 26 60 64-26 62-60 62-62-24-62-62z" />

          {/* Blush, softly blended */}
          <g className="pc-blush" filter="url(#pc-blush)" fill={BLUSH}>
            <ellipse cx="177" cy="178" rx="15" ry="10" />
            <ellipse cx="247" cy="178" rx="15" ry="10" />
          </g>

          {/* Thin, delicate features */}
          <g filter="url(#pc-pencil)" stroke={INK} strokeWidth="1.7" fill="none" strokeLinecap="round">
            <g className="pc-eyes">
              <ellipse cx="190" cy="162" rx="3.4" ry="4.4" fill={INK} stroke="none" />
              <ellipse cx="234" cy="162" rx="3.4" ry="4.4" fill={INK} stroke="none" />
            </g>
            <path d="M206 168c-1 6 1 9 4 9" strokeWidth="1.3" />
            <path className="pc-mouth" d="M201 188c6 5 15 5 21 0" />
          </g>

          {/* Hand-cut knit hat with a folded brim and a pom-pom */}
          <g className="pc-hat">
            <path filter="url(#pc-chalk)" fill={HAT} d="M144 132c4-46 34-74 70-72 36 2 62 32 64 74-40-8-92-10-134-2z" />
            <path filter="url(#pc-chalk)" fill={HAT_DARK} d="M138 128c46-10 100-10 146 2l-2 26c-46-10-96-10-142-2z" />
            <g filter="url(#pc-pencil)" stroke="#173F86" strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
              <path d="M152 132v18M166 130v18M180 129v18M194 128v18M208 128v18M222 128v18M236 129v18M250 130v18M264 131v18" />
            </g>
            <g className="pc-pompom">
              <path filter="url(#pc-chalk)" fill="#9EC2F2" d="M196 52c0-12 8-20 18-20s20 8 20 20-8 20-20 20-18-8-18-20z" />
              <path filter="url(#pc-pencil)" stroke="#1F55B0" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.6" d="M204 46l4 4M214 40v6M224 46l-4 4M206 58l4-2M222 58l-4-2" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
