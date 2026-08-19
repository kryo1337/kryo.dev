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

const TITLE = "kryo - software developer";
const DESCRIPTION = "kryo - software developer";

export const metadata: Metadata = {
  metadataBase: new URL("https://kryo.dev"),
  title: {
    default: TITLE,
    template: "%s | kryo.dev",
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "kryo.dev",
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@kryoxd",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "kryo", url: "https://kryo.dev" }],
  creator: "kryo",
};

const PERSON = {
  "@type": "Person",
  "@id": "https://kryo.dev/#person",
  name: "kryo",
  url: "https://kryo.dev",
  image: "https://kryo.dev/icon.png",
  jobTitle: "Software Developer",
  sameAs: ["https://x.com/kryoxd", "https://github.com/kryo1337"],
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    PERSON,
    {
      "@type": "WebSite",
      "@id": "https://kryo.dev/#website",
      name: "kryo.dev",
      url: "https://kryo.dev",
      description: DESCRIPTION,
      author: { "@id": "https://kryo.dev/#person" },
      creator: { "@id": "https://kryo.dev/#person" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${vt323.variable}`}>
      <body className="antialiased font-tui">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
      </body>
    </html>
  );
}
