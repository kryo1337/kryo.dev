import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-minecraft",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-tui",
});

export const metadata: Metadata = {
  title: "kryo.dev",
  description: "kryo portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${vt323.variable}`}>
      <body className="antialiased font-tui">
        {children}
      </body>
    </html>
  );
}
