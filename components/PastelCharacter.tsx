"use client";
import { useState } from "react";

// A young engineer at his desk, drawn in a coloured-pencil / chalk-pastel style: slouchy
// hand-cut blue beanie, thin-line features, softly blended cheeks. SVG filters supply the
// grain and wobbly edges; CSS keyframes in globals.css animate it. He types with his eyes on
// the laptop, then every few seconds looks up, smiles and waves (clicking replays the wave).
// Steam rises from the mug, the plant sways and ideas float up from the laptop.
const INK = "#2F2A28";
const HAT = "#2F6FD6";
const HAT_DARK = "#1F55B0";
const SKIN = "#E9B998";
const SKIN_SHADE = "#D9A07E";
const HAIR = "#2E2622";
const BLUSH = "#E8857A";
const SWEATER = "#86B5B0";
const SWEATER_DARK = "#6A9C97";

export default function PastelCharacter({ className, style }: { className?: string; style?: React.CSSProperties }) {
  // Bumping the key remounts the animated groups, which restarts the look-up-and-wave cycle
  const [waveKey, setWaveKey] = useState(0);

  return (
    <svg
      viewBox="0 0 440 470"
      className={`pastel-character ${className ?? ""}`}
      style={style}
      role="img"
      aria-label="Animated hand-drawn illustration of a young engineer in a blue beanie typing on a laptop and waving"
      onClick={() => setWaveKey(k => k + 1)}
    >
      <defs>
        {/* Pastel texture: a soft wash plus streaky pencil strokes, with wobbly edges */}
        <filter id="pc-chalk" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.9" numOctaves="2" seed="7" result="streaks" />
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feColorMatrix in="streaks" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 2.1" result="grain" />
          <feComposite in="rough" in2="grain" operator="in" result="strokes" />
          <feComponentTransfer in="rough" result="wash"><feFuncA type="linear" slope="0.72" /></feComponentTransfer>
          <feMerge><feMergeNode in="wash" /><feMergeNode in="strokes" /></feMerge>
        </filter>
        <filter id="pc-chalk-soft" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06 1.1" numOctaves="2" seed="11" result="streaks" />
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feColorMatrix in="streaks" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2 1.9" result="grain" />
          <feComposite in="rough" in2="grain" operator="in" result="strokes" />
          <feComponentTransfer in="rough" result="wash"><feFuncA type="linear" slope="0.9" /></feComponentTransfer>
          <feMerge><feMergeNode in="wash" /><feMergeNode in="strokes" /></feMerge>
        </filter>
        {/* Pencil line: a slight wobble on strokes */}
        <filter id="pc-pencil" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Soft airbrushed blush */}
        <filter id="pc-blush" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Backdrop: a torn-paper pastel blob */}
      <path className="pc-backdrop" filter="url(#pc-chalk)" fill="#D6E6E4"
        d="M52 236c-6-96 66-176 166-180 100-4 172 60 174 154 2 98-54 180-160 194-106 14-174-72-180-168z" />

      {/* Ideas drifting up from the laptop */}
      <g filter="url(#pc-pencil)" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <g className="pc-idea pc-idea-a" stroke="#3E7CB1" strokeWidth="2">
          <path d="M100 210l-10 9 10 9M122 210l10 9-10 9M115 206l-8 26" />
        </g>
        <g className="pc-idea pc-idea-b" stroke={INK} strokeWidth="1.6">
          <circle cx="352" cy="196" r="5" fill="#FFF3DC" />
          <circle cx="372" cy="182" r="4.5" fill="#FFF3DC" />
          <circle cx="374" cy="208" r="4.5" fill="#FBE3C8" stroke="#E2683C" />
          <path d="M356 193l12-8M356 199l14 7M372 187v16" />
        </g>
        <path className="pc-idea pc-idea-c" d="M86 286c0-10 8-16 16-16s16 6 16 16c0 6-4 9-6 13h-20c-2-4-6-7-6-13zM96 304h12" stroke={INK} strokeWidth="1.6" fill="#FFF0B8" />
      </g>

      {/* Plant on the desk */}
      <g className="pc-plant" filter="url(#pc-chalk)">
        <path fill="#7FA36B" d="M88 342c-18-14-22-36-14-50 14 8 20 28 14 50zM98 340c-4-24 6-44 22-50 4 18-6 38-22 50zM92 344c-22-4-36-18-38-32 16-2 32 10 38 32z" />
      </g>
      <path filter="url(#pc-chalk)" fill="#D97B4F" d="M72 340h46l-6 46H78z" />

      {/* Body, behind the laptop */}
      <g className="pc-body">
        {/* Shoulders and sweater */}
        <path filter="url(#pc-chalk)" fill={SWEATER}
          d="M92 404c-2-62 16-100 56-114 22-8 38-12 52-14 8-6 34-6 42 0 14 2 30 6 52 14 40 14 58 52 56 114z" />
        <path filter="url(#pc-chalk)" fill={SWEATER_DARK} d="M194 266c12 12 42 12 54 0l-4-8c-12 8-34 8-46 0z" />
        {/* Neck */}
        <path filter="url(#pc-chalk-soft)" fill={SKIN_SHADE} d="M205 220h32l2 46c-12 6-24 6-36 0z" />

        {/* Head: looks down at the laptop, then up at you while waving */}
        <g key={`head-${waveKey}`} className="pc-head">
          {/* Ears */}
          <path filter="url(#pc-chalk-soft)" fill={SKIN} d="M172 168c-10-4-14 6-12 16s8 16 14 12zM270 168c10-4 14 6 12 16s-8 16-14 12z" />
          {/* Face with a defined jaw */}
          <path filter="url(#pc-chalk-soft)" fill={SKIN}
            d="M174 150c0-30 20-48 47-48s47 18 47 48c0 26-4 48-14 62-8 12-20 20-33 20s-25-8-33-20c-10-14-14-36-14-62z" />

          {/* Hair: sideburns and a tousled fringe under the beanie */}
          <path filter="url(#pc-chalk)" fill={HAIR} d="M172 150c0 12 2 22 4 30l6-2c-2-10-2-20 0-30zM270 150c0 12-2 22-4 30l-6-2c2-10 2-20 0-30z" />
          <path filter="url(#pc-chalk)" fill={HAIR} d="M174 142c10-4 20-2 28 4 4-6 12-8 20-6 6 2 10 6 12 10 6-6 18-8 32-4l2-10H172z" />

          {/* Blush, softly blended */}
          <g className="pc-blush" filter="url(#pc-blush)" fill={BLUSH}>
            <ellipse cx="190" cy="196" rx="12" ry="7" />
            <ellipse cx="252" cy="196" rx="12" ry="7" />
          </g>

          {/* Thin, delicate features */}
          <g filter="url(#pc-pencil)" stroke={INK} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M190 160c6-3 13-3 18 0M234 160c5-3 12-3 18 0" strokeWidth="1.5" />
            {/* Eyes looking down at the screen */}
            <g className="pc-eyes-down">
              <path d="M193 175c4-2 9-2 13 0M236 175c4-2 9-2 13 0" strokeWidth="1.5" />
              <ellipse cx="199" cy="179.5" rx="2.8" ry="2.2" fill={INK} stroke="none" />
              <ellipse cx="242" cy="179.5" rx="2.8" ry="2.2" fill={INK} stroke="none" />
            </g>
            {/* Eyes looking at you */}
            <g className="pc-eyes-up">
              <g className="pc-blink">
                <ellipse cx="199" cy="175" rx="3" ry="3.8" fill={INK} stroke="none" />
                <ellipse cx="242" cy="175" rx="3" ry="3.8" fill={INK} stroke="none" />
              </g>
            </g>
            {/* Round glasses */}
            <g strokeWidth="1.4" opacity="0.85">
              <circle cx="199" cy="176" r="13" />
              <circle cx="242" cy="176" r="13" />
              <path d="M212 175c4-3 13-3 17 0M186 174l-12-3M255 174l12-3" />
            </g>
            <path d="M222 182c-1 8-3 12-6 14 3 2 7 2 9 0" strokeWidth="1.4" />
            <path className="pc-mouth-calm" d="M213 211c5 3 12 3 17 0" strokeWidth="1.6" />
            <path className="pc-mouth-smile" d="M209 208c6 8 20 8 26 0" strokeWidth="1.7" />
          </g>

          {/* Slouchy, hand-cut knit beanie */}
          <g>
            <path filter="url(#pc-chalk)" fill={HAT} d="M168 140c-2-44 26-74 62-74 30 0 50 18 58 40 6 16 2 30-6 36-36-6-78-8-114-2z" />
            <path filter="url(#pc-chalk)" fill={HAT_DARK} d="M164 136c38-8 84-8 120 0l-2 22c-38-8-78-8-116-2z" />
            <g filter="url(#pc-pencil)" stroke="#173F86" strokeWidth="1.4" strokeLinecap="round" opacity="0.7">
              <path d="M176 138v18M190 136v18M204 135v18M218 135v18M232 135v18M246 136v18M260 137v18M274 139v16" />
              <path d="M214 82c10 6 18 18 22 32M196 92c6 8 10 20 10 32" opacity="0.6" />
            </g>
          </g>
        </g>

        {/* Waving arm, shown during the look-up */}
        <g key={`wave-${waveKey}`} className="pc-arm-wave">
          <g className="pc-arm-wave-swing">
            <path filter="url(#pc-chalk)" d="M322 316C348 298 358 270 360 244" stroke={SWEATER} strokeWidth="26" strokeLinecap="round" fill="none" />
            <path filter="url(#pc-chalk-soft)" fill={SKIN} d="M350 236c-2-10 2-24 8-26 4 0 4 8 3 12 2-8 6-14 10-12 3 2 1 10-1 14 3-6 8-8 10-5 2 3-2 8-4 12 3-3 7-3 8 0 1 4-6 12-10 16-6 6-20 4-24-11z" />
          </g>
        </g>

        {/* Arms resting on the desk, hands typing */}
        <path filter="url(#pc-chalk)" d="M122 318C100 346 104 378 176 384" stroke={SWEATER} strokeWidth="26" strokeLinecap="round" fill="none" />
        <g key={`type-${waveKey}`} className="pc-arm-type">
          <path filter="url(#pc-chalk)" d="M320 318C342 346 338 378 266 384" stroke={SWEATER} strokeWidth="26" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* Desk */}
      <path filter="url(#pc-chalk)" fill="#E7C9A2" d="M30 384c120-6 260-6 380 0l4 72c-130 6-260 6-388 0z" />
      <g filter="url(#pc-pencil)" stroke="#B98F62" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" fill="none">
        <path d="M48 410c60-3 120-3 170-2M240 420c50-1 100 0 150 2M60 436c80-3 160-3 240-1" />
      </g>

      {/* Laptop seen from behind, with stickers */}
      <g filter="url(#pc-chalk)">
        <path fill="#DCE2EA" d="M176 304c34-3 72-3 106 0l6 78c-40 3-78 3-118 0z" />
        <path fill="#C5CDD8" d="M156 382c44-3 90-3 134 0l6 12c-48 3-98 3-146 0z" />
      </g>
      <g className="pc-laptop-glow" filter="url(#pc-blush)"><path fill="#9EC2F2" d="M180 306c32-3 66-3 98 0l-2-8c-30-3-64-3-94 0z" /></g>
      <g filter="url(#pc-chalk-soft)">
        <circle cx="212" cy="338" r="13" fill="#F08A64" />
        <path fill="#76ABAE" d="M240 352c4-10 18-12 24-4 5 7 0 16-10 16-8 0-16-5-14-12z" />
      </g>
      <g filter="url(#pc-pencil)" stroke="#FFF9EE" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M208 333l-4 5 4 5M216 333l4 5-4 5" />
      </g>

      {/* Typing hands on the keyboard */}
      <g className="pc-hand-l" filter="url(#pc-chalk-soft)" fill={SKIN}><ellipse cx="176" cy="386" rx="14" ry="9" /></g>
      <g key={`hand-${waveKey}`} className="pc-hand-r" filter="url(#pc-chalk-soft)" fill={SKIN}><ellipse cx="266" cy="386" rx="14" ry="9" /></g>

      {/* Mug with rising steam */}
      <g filter="url(#pc-chalk)">
        <path fill="#F08A64" d="M332 344h38l-3 42h-32z" />
        <path fill="none" stroke="#F08A64" strokeWidth="6" d="M370 354c12 0 12 18 0 18" />
      </g>
      <g className="pc-steam" filter="url(#pc-pencil)" stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.55">
        <path pathLength={1} d="M342 336c-6-8 6-14 0-22s6-14 0-20" />
        <path pathLength={1} d="M358 336c-6-8 6-14 0-22s6-14 0-20" />
      </g>

      {/* Speech bubble that pops up with the wave */}
      <g key={`bubble-${waveKey}`} className="pc-bubble">
        <path filter="url(#pc-chalk-soft)" fill="#FFF9EE" stroke={INK} strokeWidth="1.5"
          d="M336 120c0-16 14-26 34-26h20c20 0 32 10 32 26s-12 26-32 26h-14l-2 16-12-16c-16-2-26-12-26-26z" />
        <text x="378" y="128" textAnchor="middle" className="hand" fontSize="26" fill={INK}>hey!</text>
      </g>
    </svg>
  );
}
