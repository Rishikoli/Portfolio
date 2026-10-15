"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  {
    period: "Jan – May 2026",
    title: "Technical Intern",
    org: "Maharashtra Remote Sensing Application Centre (MRSAC)",
    note: "Worked under an Associate Scientist",
    desc: "Spearheaded cloud computing and scalable system architectures under the direct guidance of an Associate Scientist. Developed advanced technical workflows, analyzed spatial/multidimensional datasets, and applied Agile methodologies to accelerate project lifecycles.",
    color: "#76ABAE",
  },
  {
    period: "2025",
    title: "Intel Unnati Industrial Training",
    org: "Intel",
    desc: "Industrial training programme run by Intel.",
    color: "#FF5722",
  },
  {
    period: "Graduating May 2026",
    title: "B.Tech, Computer Science and Business Systems",
    org: "St. Vincent Pallotti College of Engineering, Nagpur",
    desc: "Coursework in Artificial Intelligence, Machine Learning, Deep Learning, Cloud Computing and System Design.",
    color: "#303841",
  },
];

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
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".stats-grid", start: "top 85%" } }
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
      
      <div className="about-grid" style={{ marginBottom: 120 }}>
        
        {/* Left Column: Big Text */}
        <div className="about-main">
          <div className="about-text font-serif" style={{ fontSize: "clamp(32px, 4.5vw, 56px)", color: "#303841", lineHeight: 1.3 }}>
            <div style={{ overflow: "hidden" }}><div className="about-line">I am a Computer Science Graduate</div></div>
            <div style={{ overflow: "hidden" }}><div className="about-line">who bridges the gap between</div></div>
            <div style={{ overflow: "hidden" }}><div className="about-line" style={{ color: "#76ABAE", fontStyle: "italic" }}>machine learning models</div></div>
            <div style={{ overflow: "hidden" }}><div className="about-line">and <span style={{ color: "#FF5722", fontStyle: "italic" }}>production systems.</span></div></div>
          </div>
          
          <p className="about-line" style={{ fontSize: 18, color: "rgba(48,56,65,0.6)", lineHeight: 1.7, marginTop: 40, maxWidth: 600 }}>
            I don&apos;t just prompt LLMs. I architect the complex engineering scaffolding required to make AI reliable, fast, and scalable under real-world concurrency constraints. I am currently open to ML Engineer roles.
          </p>
        </div>

        {/* Right Column: Experience & Education timeline */}
        <div className="about-side" style={{ paddingTop: 16 }}>
          <h3 className="about-line" style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(48,56,65,0.5)", marginBottom: 24 }}>
            Experience &amp; Education
          </h3>
          <ol className="stats-grid" style={{ listStyle: "none", borderLeft: "2px solid rgba(48,56,65,0.08)", paddingLeft: 24 }}>
            {TIMELINE.map((t) => (
              <li key={t.title} className="stat-item" style={{ position: "relative", marginBottom: 36 }}>
                <span aria-hidden style={{ position: "absolute", left: -31, top: 6, width: 12, height: 12, borderRadius: "50%", background: t.color, border: "3px solid var(--bg)" }} />
                <div style={{ fontSize: 12, color: "rgba(48,56,65,0.5)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>{t.period}</div>
                <h4 style={{ fontSize: 18, fontWeight: 600, color: "#303841", marginBottom: 4 }}>{t.title}</h4>
                <div style={{ fontSize: 13, color: t.color === "#303841" ? "#76ABAE" : t.color, marginBottom: t.note ? 4 : 10, fontWeight: 500 }}>{t.org}</div>
                {t.note && <div style={{ fontSize: 13, color: "rgba(48,56,65,0.5)", marginBottom: 10 }}>{t.note}</div>}
                <p style={{ fontSize: 14, color: "rgba(48,56,65,0.6)", lineHeight: 1.6 }}>{t.desc}</p>
              </li>
            ))}
          </ol>
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
