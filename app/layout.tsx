import type { Metadata } from "next";
import { Caveat, Inter, Playfair_Display, Press_Start_2P } from "next/font/google";
import "./globals.css";

// Self-hosted by next/font; exposed as CSS variables used in globals.css
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], variable: "--font-playfair" });
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-caveat" });
const pixel = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-pixel" });

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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${caveat.variable} ${pixel.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        {/* Shared hand-drawn filters: pencil outlines reference #sk-pencil */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden focusable="false">
          <filter id="sk-pencil" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="4" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        {children}
      </body>
    </html>
  );
}
