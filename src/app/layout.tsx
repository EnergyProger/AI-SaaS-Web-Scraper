import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/providers/app-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIWebScrapeFlow",
  description: `AIWebScrapeFlow is an intuitive platform that orchestrates AI-powered web crawling,
  dynamic content extraction, and machine‑learning–driven data parsing to transform unstructured websites
  into clean, structured datasets with minimal configuration`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
