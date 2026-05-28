"use client";
import { useState, useEffect } from "react";
import gsap from "gsap";

type Precision = "FP32" | "FP16" | "INT8";

export default function QuantizationSimulator() {
  const [precision, setPrecision] = useState<Precision>("FP32");
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const data = {
    FP32: {
      latency: 620,
      size: "28.4 GB",
      accuracy: "99.8%",
      vram: "32 GB",
      vramPct: 90,
      speed: "1.0x (Baseline)",
      color: "#303841",
      steps: [
        "[INIT] Loading baseline model weights in FP32 format...",
        "[MEM] VRAM allocated: 28.4 GB of 32 GB",
        "[RUN] Baseline forward pass latency: 620ms",
        "[OK] Baseline evaluation completed: Accuracy = 99.8%"
      ]
    },
    FP16: {
      latency: 310,
      size: "14.2 GB",
      accuracy: "99.7%",
      vram: "16 GB",
      vramPct: 45,
      speed: "2.0x Faster",
      color: "#76ABAE",
      steps: [
        "[COMPRESS] Casting FP32 weights to FP16 half-precision...",
        "[MEM] Deallocated 14.2 GB of VRAM",
        "[RUN] Forward pass latency: 310ms",
        "[OK] FP16 evaluation completed: Accuracy = 99.7% (no loss)"
      ]
    },
    INT8: {
      latency: 145,
      size: "3.5 GB",
      accuracy: "99.1%",
      vram: "4 GB",
      vramPct: 12,
      speed: "4.3x Faster",
      color: "#FF5722",
      steps: [
        "[QUANT] Calibrating activations using KL Divergence...",
        "[QUANT] Mapping range [-1.0, 1.0] to INT8 range [-128, 127]...",
        "[MEM] Intel OpenVINO quantization engine configured...",
        "[MEM] Deallocated 24.9 GB of VRAM. Current VRAM: 3.5 GB",
        "[RUN] Quantized forward pass latency: 145ms",
        "[OK] INT8 evaluation completed: Accuracy = 99.1% (Loss: ~0.7%)"
      ]
    }
  };

  useEffect(() => {
    // Run simulation log output
    setRunning(true);
    setLogs([]);
    const steps = data[precision].steps;
    
    let delay = 0;
    steps.forEach((step, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        if (i === steps.length - 1) setRunning(false);
      }, delay);
      delay += 400;
    });

    // Animate stats cards on precision change
    gsap.fromTo(".sim-metric", 
      { scale: 0.95, opacity: 0.8 }, 
      { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }, [precision]);

  return (
    <div className="clean-card" style={{ padding: "48px 40px", marginTop: 80, border: "1px solid rgba(48,56,65,0.06)" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24, marginBottom: 40 }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#FF5722", textTransform: "uppercase", letterSpacing: "0.1em" }}>Interactive Tool</span>
          <h3 className="font-serif" style={{ fontSize: 32, fontWeight: 600, color: "#303841", marginTop: 6 }}>Model Quantization Sandbox</h3>
          <p style={{ fontSize: 15, color: "rgba(48,56,65,0.5)", marginTop: 8 }}>
            Simulate how quantization optimizes neural networks for edge deployment. Toggle precision to run the optimizer.
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", background: "rgba(48,56,65,0.04)", borderRadius: 999, padding: 4 }}>
          {(["FP32", "FP16", "INT8"] as Precision[]).map(p => (
            <button
              key={p}
              onClick={() => !running && setPrecision(p)}
              style={{
                padding: "8px 24px",
                borderRadius: 999,
                border: "none",
                fontSize: 14,
                fontWeight: 600,
                cursor: running ? "not-allowed" : "pointer",
                background: precision === p ? data[p].color : "transparent",
                color: precision === p ? "#fff" : "rgba(48,56,65,0.6)",
                transition: "all 0.3s"
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Metrics Dashboard */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 40 }}>
        
        <div className="sim-metric" style={{ background: "#F5F5F5", borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 12, color: "rgba(48,56,65,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Inference Latency</div>
          <div className="font-serif" style={{ fontSize: 36, fontWeight: 600, color: data[precision].color }}>
            {data[precision].latency}ms
          </div>
          <div style={{ fontSize: 13, color: "rgba(48,56,65,0.5)", marginTop: 8 }}>{data[precision].speed}</div>
        </div>

        <div className="sim-metric" style={{ background: "#F5F5F5", borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 12, color: "rgba(48,56,65,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Model Size</div>
          <div className="font-serif" style={{ fontSize: 36, fontWeight: 600, color: "#303841" }}>
            {data[precision].size}
          </div>
          <div style={{ fontSize: 13, color: "rgba(48,56,65,0.5)", marginTop: 8 }}>VRAM allocated</div>
        </div>

        <div className="sim-metric" style={{ background: "#F5F5F5", borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 12, color: "rgba(48,56,65,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Accuracy Target</div>
          <div className="font-serif" style={{ fontSize: 36, fontWeight: 600, color: "#303841" }}>
            {data[precision].accuracy}
          </div>
          <div style={{ fontSize: 13, color: "rgba(48,56,65,0.5)", marginTop: 8 }}>Evaluation test set</div>
        </div>

      </div>

      {/* Console output */}
      <div style={{ background: "#303841", borderRadius: 16, padding: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, minHeight: 180, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12, marginBottom: 8 }}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>optimizer_terminal.log</span>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: running ? "#FF5722" : "#76ABAE" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#EAEAEA" }} />
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          {logs.map((log, i) => (
            <div key={i} style={{ 
              color: log.startsWith("[OK]") ? "#76ABAE" : log.startsWith("[RUN]") ? "#FF5722" : "rgba(255,255,255,0.7)",
              lineHeight: 1.5
            }}>
              {log}
            </div>
          ))}
          {running && (
            <div style={{ color: "rgba(255,255,255,0.3)" }}>
              Processing... <span style={{ display: "inline-block", width: 6, height: 12, background: "#76ABAE", verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
