import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ตรวจสอบ Cookie ว่ามี auth_token หรือไม่
  const isLoggedIn = request.cookies.get("auth_token")?.value;

  // หากยังไม่ได้ล็อกอิน และกำลังเข้าหน้า /dashboard ให้รีไดเรกต์ไปหน้า /login
  if (!isLoggedIn && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // อนุญาตให้เข้าได้
  return NextResponse.next();
}
