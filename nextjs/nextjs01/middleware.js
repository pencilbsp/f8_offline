import { NextResponse } from "next/server";

export function middleware(request) {
  const userAgent = request.headers.get("user-agent");
  const response = NextResponse.next();

  return response;

  const next = NextResponse.redirect("/");
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
