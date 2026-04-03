import type { Metadata } from "next";
import { Bebas_Neue, Caveat, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { ToasterProvider } from "@/components/ToasterProvider";
import "@/styles/globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-accent",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LocalJob",
  description:
    "Find nearby daily wage workers by skill and area. No middlemen, no app fees, just direct local contact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${plusJakartaSans.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen bg-offwhite font-body text-ink antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
        <ToasterProvider />
      </body>
    </html>
  );
}
