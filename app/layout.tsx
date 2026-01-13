import { Urbanist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/themeprovider";
import type { Metadata, Viewport } from "next";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Next.js App Template",
    template: "%s | Next.js App Template",
  },
  description:
    "A modern Next.js 16 app template with Supabase, Tailwind CSS v4, and shadcn/ui components.",
  keywords: ["Next.js", "React", "Supabase", "Tailwind CSS", "TypeScript"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Next.js App Template",
    title: "Next.js App Template",
    description:
      "A modern Next.js 16 app template with Supabase, Tailwind CSS v4, and shadcn/ui components.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js App Template",
    description:
      "A modern Next.js 16 app template with Supabase, Tailwind CSS v4, and shadcn/ui components.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${urbanist.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
