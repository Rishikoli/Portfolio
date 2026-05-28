"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MobiusStrip from "./MobiusStrip";
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(".hero-tag", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      )
      .fromTo(".hero-title-line", 
        { y: 100, opacity: 0, rotateX: -20 }, 
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" },
        "-=0.4"
      )
      .fromTo(".hero-desc", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(".hero-cta", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Parallax shape
      gsap.to(".parallax-shape", {
        y: 200,
        rotation: 15,
        ease: "none",
        scrollTrigger: {
          trigger: secRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      
      // Title parallax
      gsap.to(".hero-title", {
        y: 100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: secRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={secRef} style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      
      <div className="grid-lines" />

      {/* Abstract geometric parallax shape */}
      <div className="parallax-shape" style={{ position: "absolute", top: "15%", right: "10%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(118,171,174,0.15) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />
      <div className="parallax-shape" style={{ position: "absolute", bottom: "10%", left: "5%", width: "30vw", height: "30vw", background: "radial-gradient(circle, rgba(255,87,34,0.1) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none", animationDelay: "1s" }} />

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 1000, width: "100%" }}>
        
        <div className="hero-tag" style={{ display: "inline-block", padding: "8px 20px", borderRadius: 999, background: "rgba(118,171,174,0.1)", color: "#76ABAE", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 40, border: "1px solid rgba(118,171,174,0.2)" }}>
          Machine Learning Engineer
        </div>

        <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
          <div className="parallax-shape" style={{ 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            width: "clamp(300px, 55vw, 650px)", 
            height: "clamp(300px, 55vw, 650px)", 
            zIndex: -1, 
            pointerEvents: "none" 
          }}>
            <MobiusStrip />
          </div>
          <h1 className="hero-title font-serif" style={{ fontSize: "clamp(60px, 11vw, 140px)", color: "#303841", perspective: 1000, position: "relative", zIndex: 1 }}>
            <div style={{ overflow: "hidden" }}><div className="hero-title-line">Rishikesh</div></div>
            <div style={{ overflow: "hidden" }}><div className="hero-title-line" style={{ color: "#FF5722", fontStyle: "italic" }}>Koli</div></div>
          </h1>
        </div>

        <p className="hero-desc" style={{ fontSize: "clamp(18px, 2.5vw, 24px)", color: "rgba(48,56,65,0.6)", maxWidth: 700, margin: "40px auto", lineHeight: 1.6, fontWeight: 300 }}>
          I architect intelligent systems, orchestrate LLM pipelines, and ship production-ready AI. Computer Science Graduate with a passion for robust, scalable engineering.
        </p>

        <div className="hero-cta" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => scrollTo("work")}>
            View Selected Work
          </button>
          <a href="mailto:1983rishikesh@gmail.com" className="btn-secondary">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
