"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MobiusStrip() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.width = 600;
    let H = canvas.height = 600;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = canvas.width = rect.width * window.devicePixelRatio;
      H = canvas.height = rect.height * window.devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse movement tracker
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      mouseRef.current.targetX = (x / (rect.width / 2)) * 0.5;
      mouseRef.current.targetY = (y / (rect.height / 2)) * 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      
      // Interpolate mouse movement for smooth delay
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      angleX = frame * 0.005 + mouse.y;
      angleY = frame * 0.008 + mouse.x;
      angleZ = frame * 0.003;
      frame++;

      const numU = 180;
      const numV = 16;
      const radius = Math.min(W, H) * 0.28;
      const stripWidth = radius * 0.65;

      // Project 3D points
      const points: { x: number; y: number; z: number; color: string }[][] = [];

      for (let j = 0; j < numV; j++) {
        const v = (j / (numV - 1) - 0.5) * stripWidth;
        const row: { x: number; y: number; z: number; color: string }[] = [];

        for (let i = 0; i <= numU; i++) {
          const u = (i / numU) * Math.PI * 2;

          // Mobius strip parametric equations
          const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
          const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
          const z = v * Math.sin(u / 2);

          // 3D Rotations
          // Rotate X
          let y1 = y * Math.cos(angleX) - z * Math.sin(angleX);
          let z1 = y * Math.sin(angleX) + z * Math.cos(angleX);
          // Rotate Y
          let x2 = x * Math.cos(angleY) + z1 * Math.sin(angleY);
          let z2 = -x * Math.sin(angleY) + z1 * Math.cos(angleY);
          // Rotate Z
          let x3 = x2 * Math.cos(angleZ) - y1 * Math.sin(angleZ);
          let y3 = x2 * Math.sin(angleZ) + y1 * Math.cos(angleZ);

          // Perspective projection
          const fov = radius * 4;
          const scale = fov / (fov + z2);
          const px = x3 * scale + W / 2;
          const py = y3 * scale + H / 2;

          // Color interpolation (Teal #76ABAE to Orange #FF5722)
          const ratio = i / numU;
          const r = Math.round(118 + ratio * (255 - 118));
          const g = Math.round(171 + ratio * (87 - 171));
          const b = Math.round(174 + ratio * (34 - 174));
          const opacity = (z2 + stripWidth) / (stripWidth * 2) * 0.6 + 0.3; // depth-based opacity

          row.push({
            x: px,
            y: py,
            z: z2,
            color: `rgba(${r}, ${g}, ${b}, ${opacity})`
          });
        }
        points.push(row);
      }

      // Draw lines along the strip (ribbons)
      for (let j = 0; j < numV - 1; j++) {
        for (let i = 0; i < numU; i++) {
          const p1 = points[j][i];
          const p2 = points[j + 1][i];
          const p3 = points[j + 1][i + 1];
          const p4 = points[j][i + 1];

          // Draw filled segment for depth sorting and color consistency
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();
          ctx.fillStyle = p1.color;
          ctx.fill();
        }
      }

      // Draw wireframe overlay lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < numU; i += 2) {
        ctx.beginPath();
        ctx.moveTo(points[0][i].x, points[0][i].y);
        ctx.lineTo(points[numV - 1][i].x, points[numV - 1][i].y);
        ctx.strokeStyle = "rgba(48, 56, 65, 0.15)";
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
