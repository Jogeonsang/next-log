import "~styles/globals.css";

import { Metadata } from "next";
import Header from "~components/header";
import ThemeProvider from "~styles/themeProvider";
import i18nConfig from "../next-i18next.config";
import TranslationProvider from "~core/TranslationProvider";
import initTranslations from "../i18n";

export const metadata: Metadata = {
  title: "Marcus log",
  description: "A blog about web development and other stuff",
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const locale = "kr"; // 기본 로케일 설정

  const { resources } = await initTranslations(locale);
  return (
    <html suppressHydrationWarning lang={locale}>
      <body>
        <TranslationProvider locale={locale} resources={resources}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <div className="flex w-full justify-center">
              <main className="container relative lg:px-8">{children}</main>
            </div>
          </ThemeProvider>
        </TranslationProvider>
      </body>
    </html>
  );
};

export default RootLayout;
