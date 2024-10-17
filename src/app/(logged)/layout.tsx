"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Sidemenu from "@/components/Sidemenu";
import AuthCheck from "@/components/AuthCheck";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthCheck>
          <section
            className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
          >
            <Sidemenu />
            {children}
          </section>
        </AuthCheck>
      </body>
    </html>
  );
}
