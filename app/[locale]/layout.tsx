import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const activeLocale: Locale = locale;

  return (
    <>
      <Nav locale={activeLocale} />
      <main className="flex-1">{children}</main>
      <Footer locale={activeLocale} />
    </>
  );
}
