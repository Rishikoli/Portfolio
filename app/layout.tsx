import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rishikesh Koli — ML Engineer & AI Systems Builder",
  description: "Final-year CS student, ML engineer, and hackathon winner building intelligent AI-powered systems with LLMs, FastAPI, and scalable architectures.",
  keywords: ["ML Engineer", "AI Systems", "LLM", "FastAPI", "Python", "Rishikesh Koli"],
  authors: [{ name: "Rishikesh Koli" }],
  openGraph: {
    title: "Rishikesh Koli — ML Engineer",
    description: "Building intelligent systems. NASA Space Apps winner. AI-first engineer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
