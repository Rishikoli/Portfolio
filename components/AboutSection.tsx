"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
  { title: "NASA Space Apps Challenge", label: "Winner", color: "#FF5722", desc: "Led AI-driven rapid prototyping for space challenges." },
  { title: "AIxplore Hackathon", label: "1st Prize", color: "#76ABAE", desc: "Intelligent ML automation — first place across all teams." },
  { title: "Vodafone Idea Foundation Innovation Marathon", label: "Runner-Up", color: "#303841", desc: "AI-integrated solutions with scalable system design." },
  { title: "TechSaksham Showcase", label: "Awarded", color: "#303841", desc: "Recognized by industry mentors for innovative AI." },
];

export default function AboutSection() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.fromTo(".about-line", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".about-text", start: "top 80%" } }
      );

      gsap.fromTo(".stat-item", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".stat-item", start: "top 85%" } }
      );

      gsap.fromTo(".achv-card", 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".achv-grid", start: "top 85%" } }
      );

    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} id="about" style={{ padding: "160px 0", maxWidth: 1200, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "40px 24px", marginBottom: 120 }}>
        
        {/* Left Column: Big Text */}
        <div style={{ gridColumn: "1 / 8" }}>
          <div className="about-text font-serif" style={{ fontSize: "clamp(32px, 4.5vw, 56px)", color: "#303841", lineHeight: 1.3 }}>
            <div style={{ overflow: "hidden" }}><div className="about-line">I am a Computer Science Graduate</div></div>
            <div style={{ overflow: "hidden" }}><div className="about-line">who bridges the gap between</div></div>
            <div style={{ overflow: "hidden" }}><div className="about-line" style={{ color: "#76ABAE", fontStyle: "italic" }}>machine learning models</div></div>
            <div style={{ overflow: "hidden" }}><div className="about-line">and <span style={{ color: "#FF5722", fontStyle: "italic" }}>production systems.</span></div></div>
          </div>
          
          <p className="about-line" style={{ fontSize: 18, color: "rgba(48,56,65,0.6)", lineHeight: 1.7, marginTop: 40, maxWidth: 600 }}>
            I don't just prompt LLMs. I architect the complex engineering scaffolding required to make AI reliable, fast, and scalable under real-world concurrency constraints. I am currently open to ML Engineer roles.
          </p>
        </div>

        {/* Right Column: Experience */}
        <div style={{ gridColumn: "9 / 13", paddingTop: 16 }}>
          <h3 className="about-line" style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(48,56,65,0.5)", marginBottom: 24 }}>
            Experience
          </h3>
          <div className="about-line stat-item" style={{ marginBottom: 40 }}>
            <h4 style={{ fontSize: 20, fontWeight: 600, color: "#303841", marginBottom: 4 }}>Technical Intern</h4>
            <div style={{ fontSize: 14, color: "#76ABAE", marginBottom: 12 }}>MRSAC · Jan–May 2026</div>
            <p style={{ fontSize: 15, color: "rgba(48,56,65,0.6)", lineHeight: 1.6 }}>
              Contributed to technical workflows, applied Agile methodologies, and deepened knowledge of cloud computing and scalable architecture.
            </p>
          </div>
        </div>
      </div>

      {/* Highlighted Achievements Section */}
      <div>
        <div className="about-line" style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(40px, 6vw, 64px)", color: "#303841" }}>
            Track <span style={{ color: "#FF5722", fontStyle: "italic" }}>Record</span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(48,56,65,0.6)", marginTop: 16 }}>Demonstrated excellence in AI innovation and rapid prototyping.</p>
        </div>

        <div className="achv-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} className="achv-card clean-card" style={{ padding: "32px", display: "flex", flexDirection: "column", borderTop: `4px solid ${a.color}` }}>
              <div style={{ display: "inline-block", padding: "6px 12px", background: `${a.color}15`, color: a.color, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", borderRadius: 999, alignSelf: "flex-start", marginBottom: 24 }}>
                {a.label}
              </div>
              <h3 className="font-serif" style={{ fontSize: 24, fontWeight: 600, color: "#303841", marginBottom: 12, lineHeight: 1.2 }}>
                {a.title}
              </h3>
              <p style={{ fontSize: 15, color: "rgba(48,56,65,0.6)", lineHeight: 1.6 }}>
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
