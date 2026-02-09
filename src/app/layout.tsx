import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CurrencyProvider } from "@/components/currency-provider";
import SessionProvider from "@/components/session-provider";

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
  title: {
    default: "Benewende.dev | D\u00E9veloppeur Full Stack & Cr\u00E9ateur de SaaS",
    template: "%s | Benewende.dev",
  },
  description:
    "D\u00E9veloppeur Full Stack expert en React, Next.js et architectures SaaS. Cr\u00E9ation d'applications web performantes et solutions IA. Bas\u00E9 \u00E0 Ouagadougou, Burkina Faso.",
  keywords: [
    "d\u00E9veloppeur full stack",
    "SaaS",
    "Next.js",
    "React",
    "TypeScript",
    "Burkina Faso",
    "Ouagadougou",
    "freelance",
    "web developer",
    "IA",
  ],
  authors: [{ name: "Benewende" }],
  creator: "Benewende",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://benewende.dev",
    siteName: "Benewende.dev",
    title: "Benewende.dev | D\u00E9veloppeur Full Stack & Cr\u00E9ateur de SaaS",
    description:
      "Je transforme vos id\u00E9es en produits digitaux performants. Expert React/Next.js, Node.js et architectures cloud.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Benewende.dev | D\u00E9veloppeur Full Stack & Cr\u00E9ateur de SaaS",
    description:
      "Je transforme vos id\u00E9es en produits digitaux performants.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <CurrencyProvider>{children}</CurrencyProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
