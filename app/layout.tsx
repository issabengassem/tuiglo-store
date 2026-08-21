import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Montserrat, Lora } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
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

const SITE_NAME = "TUIGLO";
const SITE_DESCRIPTION = "حقائب ظهر، علب غداء، وحقائب كروس — تسوق تشكيلة تويغلو";

// tuiglo.store is the confirmed, owned domain (WEBSITE_IMPLEMENTATION_PLAN.md
// §25) — setting it here only affects how metadata URLs resolve in code; it
// is not a deployment action.
export const metadata: Metadata = {
  metadataBase: new URL("https://tuiglo.store"),
  title: { default: SITE_NAME, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ar_MA",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: "/brand/tuiglo_logo_primary.png", width: 2845, height: 1803, alt: SITE_NAME }],
  },
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-50 focus:rounded-sm focus:bg-brand-brown focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-offwhite"
        >
          تخطي إلى المحتوى
        </a>
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
