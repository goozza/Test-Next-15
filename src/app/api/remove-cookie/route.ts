// app/api/check/route.ts

import { verifyToken } from "@/app/utils/sign-key/action";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const myCookie = (await cookieStore.get("sign")?.value) ?? ""; // ดึงค่า sign cookie
  const myCookieToken = (await cookieStore.get("token")?.value) ?? ""; // ดึงค่า token cookie
  const sign = await verifyToken(myCookie);

  // If sign.data does not match myCookieToken, delete the cookies
  if (sign?.data !== myCookieToken) {
    await cookieStore.delete("sign");
    await cookieStore.delete("token");
    await cookieStore.delete("user");
    return new Response(
      JSON.stringify({ redirectTo: "/" }), // Send a redirect instruction in the response
      { status: 200 }
    );
  }

  return new Response(JSON.stringify({ message: "Cookies are valid" }), {
    status: 200,
  });
}
