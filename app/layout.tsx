import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import GlobalUtilityDock from "./components/common/GlobalUtilityDock";
import { ReferenceProvider } from "./components/common/ReferenceProvider";
import "./globals.css";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  title: "William - Engineering Design Portfolio",
  description:
    "A student engineering designer documenting design practice, CTMFs, and growth across Praxis I, CIV102, and Praxis II at the University of Toronto.",
  keywords:
    "William, Engineering Design Portfolio, ESC102, Praxis, CIV102, University of Toronto, CTMFs, Design Practice, Engineering Student",
  authors: [{ name: "William" }],
  creator: "William",
  publisher: "William",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "William - Engineering Design Portfolio",
    description: "Student engineering designer at the University of Toronto.",
    url: "https://william-portfolio.example.com",
    siteName: "William's Engineering Design Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "William - Engineering Design Portfolio",
    description: "Student engineering designer at the University of Toronto.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-y-none">
      <body className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}>
        <ReferenceProvider>
          {children}
          <GlobalUtilityDock />
        </ReferenceProvider>
      </body>
    </html>
  );
}
