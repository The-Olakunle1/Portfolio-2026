import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Agentation } from "agentation";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sentient = localFont({
  src: [
    {
      path: "../fonts/Sentient-Variable.woff2",
      style: "normal",
    },
    {
      path: "../fonts/Sentient-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-sentient",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Olakunle Alabi | Portfolio",
  description: "Portfolio of Olakunle Alabi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sentient.variable} antialiased`}>
        <PageTransition>{children}</PageTransition>
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
