"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuantizationSimulator from "./QuantizationSimulator";
gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: "Machine Learning / Data", perc: 92, sub: "scikit-learn, Pandas, NumPy, Deep Learning" },
  { name: "Backend Architecture", perc: 95, sub: "FastAPI, Microservices, REST, Kafka" },
  { name: "LLM Orchestration", perc: 90, sub: "OpenAI, RAG Pipelines, Prompt Engineering" },
  { name: "Frontend Development", perc: 88, sub: "React, Next.js, TypeScript, Tailwind" },
];

export default function SkillsSection() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.fromTo(".skills-title", 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".skills-title", start: "top 80%" } }
      );

      gsap.utils.toArray<HTMLElement>(".skill-item").forEach((item, i) => {
        gsap.fromTo(item, 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, delay: i * 0.1, ease: "power3.out", scrollTrigger: { trigger: ".skills-list", start: "top 75%" } }
        );
        
        const bar = item.querySelector('.skill-fill');
        const num = item.querySelector('.skill-num');
        
        if (bar && num) {
          const target = parseFloat((bar as HTMLElement).dataset.pct!);
          
          ScrollTrigger.create({
            trigger: ".skills-list",
            start: "top 75%",
            onEnter: () => {
              gsap.to(bar, { width: `${target}%`, duration: 1.5, ease: "power4.out", delay: i * 0.1 + 0.3 });
              
              const obj = { val: 0 };
              gsap.to(obj, {
                val: target,
                duration: 1.5,
                delay: i * 0.1 + 0.3,
                ease: "power4.out",
                onUpdate: () => { num.innerHTML = `${Math.round(obj.val)}%`; }
              });
            }
          });
        }
      });
      
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} id="skills" style={{ padding: "160px 0", maxWidth: 1000, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
      
      <div className="skills-title" style={{ marginBottom: 80, opacity: 0 }}>
        <h2 className="font-serif" style={{ fontSize: "clamp(40px, 6vw, 80px)", color: "#303841", textAlign: "center", lineHeight: 1.1 }}>
          Technical<br/>
          <span style={{ color: "#FF5722", fontStyle: "italic" }}>Expertise</span>
        </h2>
      </div>

      <div className="skills-list" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        {SKILLS.map(s => (
          <div key={s.name} className="skill-item" style={{ opacity: 0 }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 24, fontWeight: 600, color: "#303841", marginBottom: 4 }}>{s.name}</h3>
                <div style={{ fontSize: 14, color: "rgba(48,56,65,0.5)" }}>{s.sub}</div>
              </div>
              <div className="skill-num font-serif" style={{ fontSize: 48, fontWeight: 600, color: "#76ABAE", lineHeight: 0.8 }}>0%</div>
            </div>

            <div style={{ height: 2, background: "rgba(48,56,65,0.08)", position: "relative", overflow: "hidden" }}>
              <div className="skill-fill" data-pct={s.perc} style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "0%", background: "#303841" }} />
            </div>

          </div>
        ))}
      </div>

      <QuantizationSimulator />

    </section>
  );
}
