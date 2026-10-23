export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "36px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 16,
      maxWidth: 1200,
      margin: "0 auto",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: "var(--text)" }}>
          RK<span style={{ color: "var(--orange)" }}>.</span>
        </span>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>© {year} Rishikesh Koli</span>
      </div>
      <div style={{ display: "flex", gap: 28 }}>
        {[
          { l: "GitHub", h: "https://github.com/Rishikoli" },
          { l: "LinkedIn", h: "https://www.linkedin.com/in/rishikesh-koli-828248257/" },
          { l: "Email", h: "mailto:1983rishikesh@gmail.com" },
          { l: "Resume", h: "/Rishikesh_Koli_ML_Intern_Resume.pdf" },
        ].map(link => (
          <a key={link.l} href={link.h} target={link.h.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="footer-link">
            {link.l}
          </a>
        ))}
      </div>
    </footer>
  );
}
