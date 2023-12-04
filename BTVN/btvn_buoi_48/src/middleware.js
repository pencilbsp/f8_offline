import { NextResponse } from "next/server"

let locales = ["vi", "en"]

export function middleware(request) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/vi/${pathname}`, request.url))
  }
}

export const config = {
  matcher: ["/((?!_next).*)"],
}
