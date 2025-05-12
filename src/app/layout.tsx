import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/providers/app-provider";
import { ClerkProvider } from "@clerk/nextjs";
import AppQueryClientProvider from "@/components/providers/app-query-client-provider";
import { Toaster } from "@/components/ui/sonner";

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
    <ClerkProvider
      afterSignOutUrl="/sign-in"
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-primary hover:bg-primary/90 text-sm !shadow-none",
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <AppQueryClientProvider>
            <AppProvider>{children}</AppProvider>
          </AppQueryClientProvider>
        </body>
        <Toaster richColors />
      </html>
    </ClerkProvider>
  );
}
