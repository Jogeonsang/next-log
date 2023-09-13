import "~styles/globals.css";

import type { AppProps } from "next/app";
import ThemeProvider from "~styles/themeProvider";
import Header from "~components/header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Header />

      <div className="flex w-full justify-center">
        <main className="container relative">
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  );
}
