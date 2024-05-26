import "~styles/globals.css";

import Header from "~components/header";
import ThemeProvider from "~styles/themeProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marcus log",
  description: "A blog about web development and other stuff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />

          <div className="flex w-full justify-center">
            <main className="container relative lg:px-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
