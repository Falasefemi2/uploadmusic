import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  ClerkProvider
} from '@clerk/nextjs'
import AppHeader from "@/components/app-header";
import { Toaster } from "@/components/ui/sonner"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { dark } from '@clerk/themes'




const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Music Uploader",
  description: "Upload your music and share it with the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <NuqsAdapter>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <NextSSRPlugin
              routerConfig={extractRouterConfig(ourFileRouter)}
            />
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <AppHeader />
                {children}
                <Toaster />
              </SidebarInset>
            </SidebarProvider>
          </body>
        </html>
      </NuqsAdapter>
    </ClerkProvider>
  );
}
