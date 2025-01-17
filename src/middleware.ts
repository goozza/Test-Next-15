import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./app/utils/sign-key/action";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  try {
    const userToken = request.cookies.get("sign")?.value;
    const currentPath = request.nextUrl.pathname;

    //เช็ึคว่ามี userToken ไหม
    if (!userToken) {
      //ถ้าไม่มี userToken จะกลับไปหน้า '/'
      if (
        currentPath === "/dashboard" ||
        currentPath === "/about" ||
        currentPath === "/contact"
      ) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } else {
      //เช็ครูปแบบ userToken ว่าถูกหลักไหม
      const decode = await verifyToken(userToken);
      if (decode === undefined) {
        const cookieStore = await cookies();
        cookieStore.delete("token");
        cookieStore.delete("user");
        cookieStore.delete("sign");
        return NextResponse.redirect(new URL("/", request.url));
      }

      //เช็ค ถ้ามี userToken แต่พยายามจะกลับไปหน้า '/' จะย้อนกลับมาหน้า dashboard
      if (currentPath === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    // Allow the request to proceed in all other cases
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/dashboard", "/about", "/contact"], // Match both paths
};
