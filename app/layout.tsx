import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { ParticlesBackground } from "@/components/ParticlesBackground";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "RuiObras | Construção & Remodelação de Elite",
  description: "Transformamos o seu espaço com precisão, excelência e design contemporâneo. Remodelações de alto padrão em Portugal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="dark scroll-smooth">
      <body
        className={`${playfair.variable} ${montserrat.variable} font-body bg-neutral-950 text-neutral-50 antialiased selection:bg-amber-600/30 selection:text-amber-500 overflow-x-hidden`}
      >
        <ParticlesBackground />
        <div className="grain pointer-events-none z-50 fixed inset-0 opacity-[0.03]"></div>
        {children}
      </body>
    </html>
  );
}
