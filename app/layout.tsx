import type { Metadata } from "next";
import "./globals.css";

import Background from "@/app/components/background/Background";
import Navbar from "@/app/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "GitHub Analytics",
  description:
    "Explore GitHub profiles, repositories, activity, languages, and developer statistics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <div className="relative min-h-screen">
          <Background />

          <div className="relative z-10">
            <Navbar />

            {children}
          </div>
        </div>
      </body>
    </html>
  );
}