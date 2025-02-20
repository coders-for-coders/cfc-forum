import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ReduxStoreProvider from "@/store/storeProvider";
import { NavBar } from "@/components/navbar/NavBar";
import AuthWrapper from "@/components/auth/authWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coders For Coders",
  description: "comming soon....",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
      >
        <ReduxStoreProvider>
          <AuthWrapper>
            <NavBar />
            {children}
          </AuthWrapper>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
