"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "nexus",
    title: "NEXUS Ray",
    subtitle: "AI Agent Orchestration Framework",
    desc: "An event-driven AI orchestration framework for distributed intelligent workflows. Built scalable Python microservices for AI inference and workflow automation. Optimized AI inference latency using OpenVINO INT8 quantization, reducing model execution time for production deployments. Integrated OpenAI APIs with custom prompt engineering for intelligent automation.",
    tech: ["Python", "Apache Kafka", "OpenVINO", "OpenAI APIs", "ChromaDB"],
    metrics: ["60% Latency Reduction", "Event-Driven Inference"],
    color: "#76ABAE",
    link: "https://github.com/Rishikoli/Portfolio"
  },
  {
    id: "interview",
    title: "InterviewMaster",
    subtitle: "AI Interview Coaching Platform",
    desc: "An AI-powered coaching platform with real-time feedback loops and dynamic LLM-driven question generation. Implemented prompt engineering pipelines to simulate diverse interview scenarios. Built low-latency backend APIs using FastAPI supporting concurrent AI sessions, validating model outputs for accuracy.",
    tech: ["FastAPI", "React", "OpenAI GPT-4", "WebSockets", "Redis"],
    metrics: ["Low-Latency Sessions", "Dynamic LLM Prompting"],
    color: "#FF5722",
    link: "https://github.com/Rishikoli/Portfolio"
  },
  {
    id: "dementia",
    title: "AI Dementia Assistant",
    subtitle: "Cognitive Support LLM App",
    desc: "A human-centered AI assistant for dementia patients leveraging conversational LLM workflows for cognitive support and caregiver interaction. Engineered scalable REST APIs enabling real-time AI responses. Applied responsible AI design principles to ensure safe, personalized, and context-aware interactions.",
    tech: ["FastAPI", "Next.js", "OpenAI Speech", "MongoDB Vector"],
    metrics: ["Context-Aware Memory", "Responsible AI Guardrails"],
    color: "#303841",
    link: "https://github.com/Rishikoli/Portfolio"
  }
];

export default function WorkSection() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.fromTo(".work-header", 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".work-header", start: "top 80%" } }
      );

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          { 
            y: 0, opacity: 1, 
            duration: 0.8, 
            ease: "power3.out", 
            scrollTrigger: { 
              trigger: card, 
              start: "top 85%" 
            } 
          }
        );
      });
      
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} id="work" style={{ padding: "160px 0", maxWidth: 1200, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
      
      <div className="work-header" style={{ marginBottom: 80, opacity: 0, textAlign: "center" }}>
        <h2 className="font-serif" style={{ fontSize: "clamp(40px, 6vw, 80px)", color: "#303841", lineHeight: 1.1 }}>
          Selected<br/>
          <span style={{ color: "#76ABAE", fontStyle: "italic" }}>AI Projects</span>
        </h2>
        <p style={{ fontSize: 18, color: "rgba(48,56,65,0.6)", marginTop: 24, maxWidth: 600, margin: "24px auto 0" }}>
          Production-grade systems showcasing LLM integration, real-time inference, and scalable microservice architectures.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 32 }}>
        {PROJECTS.map((p) => (
          <div key={p.id} className="project-card clean-card" style={{ padding: 40, opacity: 0, display: "flex", flexDirection: "column", height: "100%" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div style={{ padding: "6px 16px", borderRadius: 999, background: `${p.color}15`, color: p.color, fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {p.subtitle}
              </div>
            </div>

            <h3 className="font-serif" style={{ fontSize: 32, fontWeight: 600, color: "#303841", marginBottom: 16 }}>
              {p.title}
            </h3>
            
            <p style={{ fontSize: 15, color: "rgba(48,56,65,0.7)", lineHeight: 1.7, marginBottom: 32, flex: 1 }}>
              {p.desc}
            </p>

            <div style={{ marginBottom: 32 }}>
              <h4 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(48,56,65,0.4)", marginBottom: 12 }}>Architecture</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.tech.map(t => (
                  <span key={t} style={{ padding: "4px 12px", borderRadius: 6, border: "1px solid rgba(48,56,65,0.1)", fontSize: 12, color: "#303841", fontWeight: 500 }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 40 }}>
              <h4 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(48,56,65,0.4)", marginBottom: 12 }}>Key Metrics</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {p.metrics.map(m => (
                  <span key={m} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: p.color, fontWeight: 600 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: "12px 0", fontSize: 14, width: "100%", justifyContent: "center", marginTop: "auto" }}>
              View Source Code
            </a>
          </div>
        ))}
      </div>

    </section>
  );
}
