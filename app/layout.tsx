import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Montserrat, Lora } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// IBM Plex Sans Arabic carries almost everything (nav, buttons, product
// info) — chosen for engineered cross-script harmony with Montserrat.
// See TUIGLO_Website_Design_Direction.md §1.
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-arabic",
  display: "swap",
});

// Montserrat + Lora stay Latin-only: the locked wordmark and any future
// French/English content. Never used for Arabic body copy.
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TUIGLO",
  description: "حقائب ظهر، علب غداء، وحقائب كروس — تسوق تشكيلة توغلو",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ibmPlexSansArabic.variable} ${montserrat.variable} ${lora.variable}`}
    >
      <body className="font-arabic antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
