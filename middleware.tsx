// middleware.ts (or in app/middleware.ts if using the app directory)
import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // To access cookies
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Get the authentication cookie
  const cookieStore = cookies();
  const authsession = (await cookieStore).get("authjs.session-token");

  // 1. If user is logged in and tries to access /login or /register, redirect to homepage
  if (
    authsession?.value &&
    ["/login", "/register", "/frgtpass", "/addNewPass"].includes(
      req.nextUrl.pathname
    )
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirect to homepage
  }

  // 2. If user is NOT logged in and tries to access protected routes like /dashboard, redirect to /login
  if (
    !authsession?.value &&
    ["/dashboard", "/chngPsswrd"].includes(req.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login
  }

  // 3. Allow requests to continue if they don't match the above conditions
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard",
    "/frgtpass",
    "/addNewPass",
    "/chngPsswrd",
  ], // Apply to specific routes
};
