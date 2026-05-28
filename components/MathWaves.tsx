"use client";
import { useEffect, useRef } from "react";

export default function MathWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ y: 0.5, targetY: 0.5, x: 0.5, targetX: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.width = 800;
    let H = canvas.height = 800;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = canvas.width = rect.width * window.devicePixelRatio;
      H = canvas.height = rect.height * window.devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = (e.clientX - rect.left) / rect.width;
      mouseRef.current.targetY = (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("mousemove", onMouseMove);

    let phase = 0;

    // Define wave parameters
    const waves = [
      { freq: 0.005, amp: 60, speed: 0.02, color: "rgba(118, 171, 174, 0.4)", width: 1.5 },
      { freq: 0.008, amp: 40, speed: -0.03, color: "rgba(255, 87, 34, 0.3)", width: 1.2 },
      { freq: 0.003, amp: 80, speed: 0.01, color: "rgba(48, 56, 65, 0.15)", width: 2 },
      { freq: 0.012, amp: 20, speed: 0.04, color: "rgba(118, 171, 174, 0.25)", width: 1 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Lerp mouse coordinates
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      phase += 0.01;

      // Draw waves
      waves.forEach((wave, i) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.width;

        // Mouse modulation on amplitude and frequency
        const ampMod = wave.amp * (0.3 + mouse.y * 1.4);
        const freqMod = wave.freq * (0.7 + mouse.x * 0.6);

        for (let x = 0; x < W; x += 3) {
          // Sinusoidal mathematical equation for stacked interference waves
          const y = Math.sin(x * freqMod + phase * wave.speed * 100 + i * 2) * ampMod * Math.sin(x * 0.001);
          
          if (x === 0) {
            ctx.moveTo(x, y + H / 2);
          } else {
            ctx.lineTo(x, y + H / 2);
          }
        }
        ctx.stroke();
      });

      // Draw subtle mathematical grid overlay behind waves
      ctx.strokeStyle = "rgba(48, 56, 65, 0.03)";
      ctx.lineWidth = 0.5;
      const step = 40;
      for (let x = 0; x < W; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
