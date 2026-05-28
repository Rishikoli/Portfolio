"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const secRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle"|"sending"|"done">("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.fromTo(".contact-up", 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".contact-wrap", start: "top 80%" } }
      );

    }, secRef);
    return () => ctx.revert();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("done"), 1200);
  };

  const copy = () => {
    navigator.clipboard.writeText("1983rishikesh@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={secRef} id="contact" style={{ padding: "160px 0 80px", maxWidth: 1000, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
      
      <div className="contact-wrap clean-card contact-up" style={{ padding: "80px 60px", opacity: 0 }}>
        
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 className="font-serif contact-up" style={{ fontSize: "clamp(40px, 6vw, 72px)", color: "#303841", lineHeight: 1.1, marginBottom: 24, opacity: 0 }}>
            Let's build<br/>
            <span style={{ color: "#FF5722", fontStyle: "italic" }}>something great.</span>
          </h2>
          <p className="contact-up" style={{ fontSize: 16, color: "rgba(48,56,65,0.6)", maxWidth: 500, margin: "0 auto", opacity: 0 }}>
            I am currently open to ML Engineer Internship opportunities. Drop a message or email me directly.
          </p>
        </div>

        {status === "done" ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
            <h3 style={{ fontSize: 24, fontWeight: 600, color: "#303841", marginBottom: 8 }}>Message Sent</h3>
            <p style={{ color: "rgba(48,56,65,0.5)" }}>I'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="contact-up" style={{ opacity: 0, display: "flex", flexDirection: "column", gap: 32, maxWidth: 600, margin: "0 auto" }}>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <input type="text" required placeholder="Name" className="minimal-input" />
              <input type="email" required placeholder="Email" className="minimal-input" />
            </div>
            
            <input type="text" required placeholder="Message" className="minimal-input" />
            
            <button type="submit" disabled={status === "sending"} className="btn-primary" style={{ alignSelf: "center", marginTop: 16 }}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}

      </div>

      <div style={{ marginTop: 80, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        
        <div style={{ display: "flex", gap: 32 }}>
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/rishikesh-koli-828248257/" },
            { label: "GitHub", href: "https://github.com/Rishikoli" }
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 500, color: "rgba(48,56,65,0.6)", textDecoration: "none", transition: "color 0.3s" }}
               onMouseEnter={e => e.currentTarget.style.color = "#303841"}
               onMouseLeave={e => e.currentTarget.style.color = "rgba(48,56,65,0.6)"}>
              {l.label}
            </a>
          ))}
          <button onClick={copy} style={{ background: "none", border: "none", fontSize: 14, fontWeight: 500, color: "rgba(48,56,65,0.6)", cursor: "pointer", transition: "color 0.3s" }}
             onMouseEnter={e => e.currentTarget.style.color = "#FF5722"}
             onMouseLeave={e => e.currentTarget.style.color = "rgba(48,56,65,0.6)"}>
            {copied ? "Copied!" : "Email"}
          </button>
        </div>

        <div style={{ fontSize: 13, color: "rgba(48,56,65,0.4)" }}>
          © 2025 Rishikesh Koli
        </div>
      </div>

    </section>
  );
}
