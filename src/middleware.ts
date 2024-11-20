import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicPaths = [
    "/login",
    "/signup",
    "/favicon.ico",
    "/_next",
    "/logos",
    "/images",
    "/ChatGPT.png",
    "/illustration.png",
    "/group.png",
    "/testimonials.png",
  ];

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/";
  }

  if (pathname === "/" && token) {
    const spaceUrl = request.nextUrl.clone();
    spaceUrl.pathname = "/space";
    return NextResponse.redirect(spaceUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
