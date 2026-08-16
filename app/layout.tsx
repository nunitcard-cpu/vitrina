import type { Metadata, Viewport } from "next";
import { Rubik, Assistant, Cairo, Tajawal } from "next/font/google";
import { LanguageProvider } from "@/app/lib/LanguageContext";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["500", "600", "700", "800"],
});

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700", "800"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Vitrina",
  description: "פלטפורמה לעסקים קטנים לפתוח חנות אונליין משלהם, עם הזמנות דרך וואטסאפ.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf6ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${rubik.variable} ${assistant.variable} ${cairo.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
