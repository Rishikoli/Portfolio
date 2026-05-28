"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuantizationSimulator from "./QuantizationSimulator";
gsap.registerPlugin(ScrollTrigger);

const SKILLS_CATEGORIES = [
  {
    title: "ML / AI",
    skills: ["Machine Learning", "Deep Learning Fundamentals", "scikit-learn", "Pandas", "NumPy", "OpenAI APIs", "LLM Integration", "Prompt Engineering", "API-based LLM Applications"],
    color: "#FF5722",
  },
  {
    title: "Frameworks & Tools",
    skills: ["FastAPI", "Node.js", "React", "Docker", "Apache Kafka", "OpenVINO", "AWS", "Git", "Linux", "CI/CD"],
    color: "#76ABAE",
  },
  {
    title: "Core Concepts",
    skills: ["Data Structures & Algorithms", "Distributed Systems", "OOP", "Agile/Scrum", "SDLC", "REST APIs", "Microservices"],
    color: "#303841",
  },
  {
    title: "Languages & Database",
    skills: ["Python", "JavaScript", "SQL", "Database Management"],
    color: "#76ABAE",
  },
  {
    title: "Coursework",
    skills: ["Artificial Intelligence", "Machine Learning Fundamentals", "Deep Learning Concepts", "Cloud Computing", "System Design"],
    color: "#303841",
  }
];

export default function SkillsSection() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.fromTo(".skills-title", 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".skills-title", start: "top 80%" } }
      );

      gsap.fromTo(".skill-card", 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".skills-grid", start: "top 75%" } }
      );
      
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} id="skills" style={{ padding: "160px 0", maxWidth: 1200, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
      
      <div className="skills-title" style={{ marginBottom: 80, opacity: 0, textAlign: "center" }}>
        <h2 className="font-serif" style={{ fontSize: "clamp(40px, 6vw, 80px)", color: "#303841", lineHeight: 1.1 }}>
          Technical<br/>
          <span style={{ color: "#FF5722", fontStyle: "italic" }}>Expertise</span>
        </h2>
        <p style={{ fontSize: 18, color: "rgba(48,56,65,0.6)", marginTop: 24, maxWidth: 600, margin: "24px auto 0" }}>
          A comprehensive breakdown of my engineering capabilities and mathematical foundation.
        </p>
      </div>

      <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 80 }}>
        {SKILLS_CATEGORIES.map((cat, i) => (
          <div key={i} className="skill-card clean-card" style={{ padding: "40px 32px", display: "flex", flexDirection: "column", opacity: 0 }}>
            <h3 className="font-serif" style={{ fontSize: 24, fontWeight: 600, color: "#303841", marginBottom: 20, borderLeft: `4px solid ${cat.color}`, paddingLeft: 12 }}>
              {cat.title}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "auto" }}>
              {cat.skills.map(s => (
                <span key={s} style={{ padding: "6px 14px", borderRadius: 999, background: "#F5F5F5", fontSize: 13, color: "#303841", fontWeight: 500, border: "1px solid rgba(48,56,65,0.04)" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <QuantizationSimulator />

    </section>
  );
}
