"use client";
import { useEffect, useRef } from "react";

// A tiny self-playing 90s side-scroller drawn on a low-res canvas and scaled up with crisp
// pixels. Rishikesh walks through a parallax world; when a "?" block reaches him he jumps,
// bumps it and a skill pops out. Clicking (or Space/Enter while focused) makes him jump too.
// Under reduced motion a single still frame is drawn.
const W = 160;
const H = 120;
const GROUND = 96;
const HERO_X = 34;
const BLOCK_Y = 34;

const PAL: Record<string, string> = {
  K: "#1B1416", H: "#2A221D", h: "#C49A45", S: "#F7D2B4", s: "#E9A27A", B: "#F07F68",
  W: "#FFFFFF", T: "#8A6548", t: "#6E4E37", J: "#DDD8CD", j: "#B9B2A5", P: "#8F9396",
  O: "#B4652F", N: "#3C4A63", n: "#2C3850", F: "#2A2A2A",
};

// 24×36 front-facing sprite from the portrait: dark fringe, round glasses, blush,
// light overshirt over a brown tee, backpack straps
const HEAD = [
  "........KKKKKKKK........",
  "......KKhhhhhHHHKK......",
  ".....KhhHHHHHHHHHHK.....",
  "....KHHHHHHHHHHHHHHK....",
  "...KHHHHHHHHHHHHHHHHK...",
  "...KHHHHHHHHHHHHHHHHK...",
  "...KHHHHHHHHHHHHHHHHK...",
  "...KHHSHHHSHHHHSHHHHK...",
  "...KHSSSHSSSSHSSSSSHK...",
  "...KSSKKKSSSSSSKKKSSK...",
  "..KKSKKKKKKKKKKKKKKSKK..",
  ".KSSSKWSSSKKKKWSSSKSSSK.",
  ".KSSSKSSKSKSSKSKSSKSSSK.",
  "..KSSKKKKKKSSKKKKKKSSK..",
  "...KSBBSSSSsSSSSSBBSK...",
  "...KSSSSSSSSSSSSSSSSK...",
  "....KSSSSSSKKSSSSSSK....",
  ".....KSSSSSSSSSSSSK.....",
  "......KKSSSSSSSSKK......",
  "........KsSSSSSK........",
];
const SMILE = "....KSSSSKSSSSKSSSSK....";
const BODY = [
  "...KKJJJJKTTTTKJJJJKK...",
  "..KJJJJJJJKttKJJJJJJJK..",
  ".KJJPPJJJJKTTKJJJJPPJJK.",
  ".KJJPPJJJKTTTTKJJJPPJJK.",
  ".KJjPPJJKTTTTTTKJJPPjJK.",
  ".KJjOOJJKTTTTTTKJJOOjJK.",
  ".KJjPPJJKTTTTTTKJJPPjJK.",
  ".KSjPPJJKTTTTTTKJJPPjSK.",
  ".KSKKJJJKTTTTTTKJJJKKSK.",
  "..K..KKKKKKKKKKKKKK..K..",
  ".....KNNNNNNNNNNNNK.....",
  ".....KNNNNnKKnNNNNK.....",
];
const LEGS_A = [
  ".....KNNNNK..KNNNNK.....",
  ".....KNNNNK..KNNNNK.....",
  "....KFFFFFK..KFFFFFK....",
  "....KKKKKKK..KKKKKKK....",
];
const LEGS_B = [
  ".....KNNNNK..KNNNNK.....",
  "....KFFFFFK..KNNNNK.....",
  "....KKKKKKK..KFFFFFK....",
  ".............KKKKKKK....",
];
const LEGS_C = [
  ".....KNNNNK..KNNNNK.....",
  ".....KNNNNK..KFFFFFK....",
  "....KFFFFFK..KKKKKKK....",
  "....KKKKKKK.............",
];

const SKILLS = ["PYTHON", "PYTORCH", "LLMs", "RAG", "FASTAPI", "OPENVINO", "KAFKA", "NEXT.JS", "REDIS", "VECTOR DB"];
const BLOCK_GAP = 96;

function sprite(ctx: CanvasRenderingContext2D, rows: string[], x: number, y: number) {
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    for (let c = 0; c < row.length; c++) {
      const ch = row[c];
      if (ch === ".") continue;
      ctx.fillStyle = PAL[ch];
      ctx.fillRect(x + c, y + r, 1, 1);
    }
  }
}

// Deterministic bumpy skyline so the mountains and hills repeat seamlessly
const ridge = (x: number, period: number, amp: number, seed: number) =>
  Math.sin((x / period) * Math.PI * 2 + seed) * amp + Math.sin((x / period) * Math.PI * 6 + seed * 3) * amp * 0.35;

export default function PixelHero({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const jumpRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fontVar = getComputedStyle(document.documentElement).getPropertyValue("--font-pixel").trim() || "monospace";
    const font = (px: number) => `${px}px ${fontVar}`;

    let t = 0, dist = 0, y = 0, vy = 0, blink = 0, greet = 150, score = 0, af = 0, last = 0, acc = 0;
    const bumped = new Map<number, number>();   // block index → frames since bump
    const pops: { text: string; x: number; y: number; life: number }[] = [];

    const jump = () => { if (y === 0) vy = -3.1; };
    jumpRef.current = () => { jump(); greet = 120; };

    const step = () => {
      t++;
      dist += 0.75;
      if (vy !== 0 || y < 0) { vy += 0.16; y += vy; if (y >= 0) { y = 0; vy = 0; } }
      if (blink > 0) blink--; else if (Math.random() < 0.008) blink = 7;
      if (greet > 0) greet--;
      // Jump when the next block is about to pass overhead, and bump it at the top of the arc
      const heroC = HERO_X + 12;
      const next = Math.floor((dist + heroC) / BLOCK_GAP) + 1;
      const ahead = next * BLOCK_GAP - dist - heroC;
      if (ahead < 21 && ahead > 19 && y === 0) jump();
      const idx = Math.round((dist + heroC) / BLOCK_GAP);
      const bx = idx * BLOCK_GAP - dist;
      if (vy < 0 && !bumped.has(idx) && Math.abs(bx - heroC) < 9 && GROUND - 36 + y <= BLOCK_Y + 12) {
        bumped.set(idx, 0);
        y = BLOCK_Y + 12 - (GROUND - 36);
        vy = 0.4;
        score += 100;
        pops.push({ text: SKILLS[((idx % SKILLS.length) + SKILLS.length) % SKILLS.length], x: bx, y: BLOCK_Y - 10, life: 70 });
      }
      for (const [k, v] of bumped) { if (v > 400) bumped.delete(k); else bumped.set(k, v + 1); }
      for (const p of pops) { p.y -= 0.15; p.life--; p.x -= 0.75; }
      while (pops.length && pops[0].life <= 0) pops.shift();
    };

    const draw = () => {
      ctx.imageSmoothingEnabled = false;
      // Sky in dithered bands
      const bands = ["#9AD7F0", "#B5E2F3", "#CDEBF5", "#E6F0EC", "#FBE3C8"];
      for (let i = 0; i < bands.length; i++) { ctx.fillStyle = bands[i]; ctx.fillRect(0, i * 15, W, 15); }
      for (let i = 1; i < bands.length; i++) {
        ctx.fillStyle = bands[i];
        for (let x = 0; x < W; x += 2) ctx.fillRect(x + (i % 2), i * 15 - 1, 1, 1);
      }
      // Sun
      ctx.fillStyle = "#F2B84B"; ctx.fillRect(124, 22, 14, 14); ctx.fillRect(122, 24, 18, 10); ctx.fillRect(126, 20, 10, 18);
      ctx.fillStyle = "#FFE08A"; ctx.fillRect(125, 23, 12, 12); ctx.fillRect(123, 25, 16, 8); ctx.fillRect(127, 21, 8, 16);
      // Clouds
      ctx.fillStyle = "#FFFFFF";
      for (let i = 0; i < 4; i++) {
        const cx = ((i * 70 - dist * 0.15) % (W + 60) + W + 60) % (W + 60) - 30;
        const cy = 20 + (i % 2) * 12;
        ctx.fillRect(cx, cy + 4, 26, 6); ctx.fillRect(cx + 4, cy, 12, 4); ctx.fillRect(cx + 14, cy + 2, 8, 2);
      }
      // Far mountains
      ctx.fillStyle = "#A7B8D6";
      for (let x = 0; x < W; x++) {
        const h = 54 + ridge(x + dist * 0.12, 90, 10, 1.3);
        ctx.fillRect(x, Math.round(h), 1, GROUND - Math.round(h));
      }
      ctx.fillStyle = "#C3CFE3";
      for (let x = 0; x < W; x++) {
        const h = 54 + ridge(x + dist * 0.12, 90, 10, 1.3);
        if (ridge(x + dist * 0.12, 90, 10, 1.3) < -6) ctx.fillRect(x, Math.round(h), 1, 3);
      }
      // Mid hills
      for (let x = 0; x < W; x++) {
        const h = Math.round(76 + ridge(x + dist * 0.35, 120, 7, 0.4));
        ctx.fillStyle = "#6FAE6E"; ctx.fillRect(x, h, 1, GROUND - h);
        ctx.fillStyle = "#8CC98A"; ctx.fillRect(x, h, 1, 2);
      }
      // Trees
      for (let i = -1; i < 5; i++) {
        const tx = Math.round(i * 44 - ((dist * 0.6) % 44));
        ctx.fillStyle = "#5B3A26"; ctx.fillRect(tx + 5, GROUND - 10, 3, 10);
        ctx.fillStyle = "#3F8A4E"; ctx.fillRect(tx, GROUND - 22, 13, 12); ctx.fillRect(tx + 2, GROUND - 26, 9, 4);
        ctx.fillStyle = "#58A865"; ctx.fillRect(tx + 2, GROUND - 22, 4, 3); ctx.fillRect(tx + 4, GROUND - 25, 3, 2);
      }
      // Ground: grass lip over brick dirt
      const off = Math.round(dist) % 8;
      ctx.fillStyle = "#C68A55"; ctx.fillRect(0, GROUND, W, H - GROUND);
      ctx.fillStyle = "#A86F40";
      for (let row = 0; row < 3; row++) {
        const gy = GROUND + 4 + row * 7;
        ctx.fillRect(0, gy, W, 1);
        for (let x = -off + (row % 2) * 4; x < W; x += 8) ctx.fillRect(x, gy - 6, 1, 6);
      }
      ctx.fillStyle = "#5DAE5B"; ctx.fillRect(0, GROUND, W, 4);
      ctx.fillStyle = "#7FCB6E";
      for (let x = -off; x < W; x += 4) ctx.fillRect(x, GROUND, 2, 1);
      ctx.fillStyle = "#3F8A4E"; ctx.fillRect(0, GROUND + 4, W, 1);

      // "?" blocks
      const first = Math.floor(dist / BLOCK_GAP);
      for (let i = first; i < first + 4; i++) {
        const bx = Math.round(i * BLOCK_GAP - dist) - 6;
        const age = bumped.get(i);
        const by = BLOCK_Y - (age !== undefined && age < 8 ? Math.round(Math.sin((age / 8) * Math.PI) * 3) : 0);
        const used = age !== undefined;
        ctx.fillStyle = "#1B1416"; ctx.fillRect(bx, by, 12, 12);
        ctx.fillStyle = used ? "#B08A6A" : "#F2B84B"; ctx.fillRect(bx + 1, by + 1, 10, 10);
        ctx.fillStyle = used ? "#8C6A4F" : "#C9842B"; ctx.fillRect(bx + 1, by + 10, 10, 1); ctx.fillRect(bx + 10, by + 1, 1, 10);
        ctx.fillStyle = "#1B1416";
        if (!used) { ctx.fillRect(bx + 4, by + 3, 4, 1); ctx.fillRect(bx + 7, by + 4, 1, 2); ctx.fillRect(bx + 5, by + 6, 2, 1); ctx.fillRect(bx + 5, by + 8, 2, 1); }
        else { ctx.fillRect(bx + 2, by + 2, 1, 1); ctx.fillRect(bx + 9, by + 2, 1, 1); ctx.fillRect(bx + 2, by + 9, 1, 1); ctx.fillRect(bx + 9, by + 9, 1, 1); }
      }

      // Hero
      const hy = Math.round(GROUND - 36 + y);
      const walkFrame = Math.floor(t / 9) % 4;
      const legs = y < 0 ? LEGS_A : walkFrame === 1 ? LEGS_B : walkFrame === 3 ? LEGS_C : LEGS_A;
      const bob = y === 0 && walkFrame % 2 === 1 ? 1 : 0;
      ctx.fillStyle = "rgba(27,20,22,0.18)";
      const shadowW = y < 0 ? 12 : 16;
      ctx.fillRect(HERO_X + 12 - shadowW / 2, GROUND - 1, shadowW, 2);
      const head = HEAD.slice();
      if (blink > 0) { head[11] = head[11].replace(/W/g, "S"); head[12] = ".KSSSKSSSSKSSKSSSSKSSSK."; }
      if (greet > 0) head[16] = SMILE;
      sprite(ctx, head, HERO_X, hy + bob);
      sprite(ctx, BODY, HERO_X, hy + 20 + bob);
      sprite(ctx, legs, HERO_X, hy + 32);

      ctx.textBaseline = "top";
      // Speech bubble
      if (greet > 0) {
        const bx = HERO_X + 22, by = hy - 12;
        ctx.fillStyle = "#1B1416"; ctx.fillRect(bx, by, 34, 13); ctx.fillRect(bx - 2, by + 11, 4, 3);
        ctx.fillStyle = "#FFF9EE"; ctx.fillRect(bx + 1, by + 1, 32, 11);
        ctx.fillStyle = "#1B1416"; ctx.font = font(8); ctx.fillText("hey!", bx + 2, by + 3);
      }
      // Skill pop-ups
      ctx.font = font(8);
      for (const p of pops) {
        const w = ctx.measureText(p.text).width;
        const px = Math.round(p.x - w / 2), py = Math.round(p.y);
        ctx.globalAlpha = Math.min(1, p.life / 20);
        ctx.fillStyle = "#1B1416"; ctx.fillText(p.text, px + 1, py + 1);
        ctx.fillStyle = "#FFF3DC"; ctx.fillText(p.text, px, py);
        ctx.globalAlpha = 1;
      }
      // HUD
      ctx.font = font(8);
      ctx.fillStyle = "#1B1416";
      ctx.fillText("RISHIKESH", 7, 7);
      ctx.fillText(`XP ${String(score).padStart(5, "0")}`, W - 7 - ctx.measureText(`XP ${String(score).padStart(5, "0")}`).width, 7);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("RISHIKESH", 6, 6);
      ctx.fillText(`XP ${String(score).padStart(5, "0")}`, W - 8 - ctx.measureText(`XP ${String(score).padStart(5, "0")}`).width, 6);
      ctx.fillStyle = "#E2683C"; ctx.fillRect(6, 17, 3, 3); ctx.fillRect(11, 17, 3, 3); ctx.fillRect(16, 17, 3, 3);
      if (Math.floor(t / 30) % 2 === 0) {
        const msg = "CLICK TO JUMP";
        ctx.fillStyle = "#1B1416"; ctx.fillText(msg, Math.round((W - ctx.measureText(msg).width) / 2), H - 12);
      }
    };

    const loop = (now: number) => {
      if (!last) last = now;
      acc += Math.min(100, now - last);
      last = now;
      while (acc >= 1000 / 60) { step(); acc -= 1000 / 60; }
      draw();
      af = requestAnimationFrame(loop);
    };

    let cancelled = false;
    document.fonts.load(font(8)).catch(() => {}).finally(() => {
      if (cancelled) return;
      if (still) { dist = 20; greet = 1; draw(); return; }
      af = requestAnimationFrame(loop);
    });
    return () => { cancelled = true; cancelAnimationFrame(af); };
  }, []);

  return (
    <div className={`pixel-hero ${className ?? ""}`}>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        tabIndex={0}
        role="img"
        aria-label="Pixel-art game scene: Rishikesh walks through a side-scrolling world, jumping to bump blocks that reveal his skills"
        onPointerDown={() => jumpRef.current()}
        onKeyDown={e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); jumpRef.current(); } }}
      />
    </div>
  );
}
