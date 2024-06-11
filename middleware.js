import { NextResponse } from "next/server";

export function middleware(request) {
  const { nextUrl } = request;
  const urlLocale = nextUrl.locale || "kr";
  const supportedLocales = ["en", "kr"];
  const defaultLocale = "kr";

  // Check if the requested locale is supported, else redirect to default
  if (!supportedLocales.includes(urlLocale)) {
    nextUrl.locale = defaultLocale;
    return NextResponse.redirect(nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
