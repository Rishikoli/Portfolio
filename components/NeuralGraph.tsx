"use client";
import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function NeuralGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

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
      mouseRef.current.targetX = (e.clientX - rect.left) * window.devicePixelRatio;
      mouseRef.current.targetY = (e.clientY - rect.top) * window.devicePixelRatio;
    };

    const onMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // Initialize nodes
    const nodeCount = 90;
    const nodes: Node[] = [];
    const colors = [
      "rgba(48, 56, 65, 0.15)", // Main slate
      "rgba(118, 171, 174, 0.4)", // Teal highlight
      "rgba(255, 87, 34, 0.35)",  // Orange highlight
    ];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.85 ? colors[Math.floor(Math.random() * (colors.length - 1)) + 1] : colors[0],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Lerp mouse
      const mouse = mouseRef.current;
      if (mouse.targetX !== -1000) {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // Update and draw nodes
      nodes.forEach(node => {
        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce
        if (node.x < 0 || node.x > W) node.vx *= -1;
        if (node.y < 0 || node.y > H) node.vy *= -1;

        // Clamp inside bounds
        if (node.x < 0) node.x = 0;
        if (node.x > W) node.x = W;
        if (node.y < 0) node.y = 0;
        if (node.y > H) node.y = H;

        // Mouse attraction/repulsion
        if (mouse.x !== -1000) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;
          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            node.x -= dx * force * 0.02;
            node.y -= dy * force * 0.02;
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });

      // Draw connections (Neural layers)
      const linkDist = 120;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];

          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            
            // If connection has highlight nodes, color the line subtly
            if (n1.color.includes("118") || n2.color.includes("118")) {
              ctx.strokeStyle = `rgba(118, 171, 174, ${alpha * 1.5})`;
            } else if (n1.color.includes("255") || n2.color.includes("255")) {
              ctx.strokeStyle = `rgba(255, 87, 34, ${alpha * 1.5})`;
            } else {
              ctx.strokeStyle = `rgba(48, 56, 65, ${alpha})`;
            }
            
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw active connections to cursor if nearby
      if (mouse.x !== -1000) {
        nodes.forEach(node => {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const linkCursorDist = 180;
          if (dist < linkCursorDist) {
            const alpha = (1 - dist / linkCursorDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(118, 171, 174, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
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
