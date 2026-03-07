import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Rui Santos Construção | Especialistas em Remodelações de Elite",
  description: "Transformamos espaços com qualidade, transparência e confiança em Lisboa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="dark scroll-smooth">
      <body
        className={`${playfair.variable} ${montserrat.variable} font-body bg-neutral-950 text-neutral-50 antialiased selection:bg-amber-600/30 selection:text-amber-500`}
      >
        <div className="grain"></div>
        {children}
      </body>
    </html>
  );
}
