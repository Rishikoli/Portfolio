"use client";
export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "36px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 16,
      maxWidth: 1100,
      margin: "0 auto",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, color: "rgba(232,232,240,0.7)" }}>
          RK<span style={{ color: "#A78BFA" }}>.</span>
        </span>
        <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: "rgba(255,255,255,0.2)" }}>© 2025 Rishikesh Koli</span>
      </div>
      <div style={{ display: "flex", gap: 28 }}>
        {[
          { l: "GitHub", h: "https://github.com/Rishikoli" },
          { l: "LinkedIn", h: "https://www.linkedin.com/in/rishikesh-koli-828248257/" },
          { l: "Email", h: "mailto:1983rishikesh@gmail.com" },
        ].map(link => (
          <a key={link.l} href={link.h} target={link.h.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
            style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#A78BFA")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >
            {link.l}
          </a>
        ))}
      </div>
      <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "rgba(255,255,255,0.15)" }}>
        Next.js + GSAP + ScrollTrigger
      </span>
    </footer>
  );
}
