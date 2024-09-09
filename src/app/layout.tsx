import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ProductProvider } from "@/utils/context/ProductContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prod Dashboard",
  description: "Track & view product data",
};

const inter = Inter({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="background">
          <div className="gradient"></div>
        </div>
        <ProductProvider>
          <main>{children}</main>
        </ProductProvider>
      </body>
    </html>
  );
}
