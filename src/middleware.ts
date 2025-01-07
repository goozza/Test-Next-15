import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // อ่าน token จาก cookies

  // ถ้ามี token และกำลังเข้าหน้า login, redirect ไปยังหน้า '/'
  if (token && req.nextUrl.pathname === "/") {
    const homeUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(homeUrl);
  }

  // ถ้าไม่มี token และเป็นหน้า protected route ให้ redirect ไปที่หน้า login
  if (
    !token &&
    ["/dashboard", "/about", "/contact"].some((route) =>
      req.nextUrl.pathname.startsWith(route)
    )
  ) {
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // อนุญาตให้ผ่าน
  return NextResponse.next();
}
