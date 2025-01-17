"use server";
import { cookies } from "next/headers";

export async function profileAction() {
  const cookieStore = await cookies();
  const token = await cookieStore.get("token");

  if (!token) {
    return { success: false, message: "Token are required." };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_IAM_API}/user/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },

        credentials: "include",
      }
    );
    if (response.status === 200) {
      const responseSuccess = await response.json();
      // กำหนดค่า HttpOnly และ SameSite สำหรับคุกกี้
      cookieStore.set("user", responseSuccess.result, {
        httpOnly: true, // ไม่สามารถเข้าถึงได้จาก JavaScript
        secure: true, // ตั้งค่าเป็น true หากใน production
        sameSite: "strict", //
        maxAge: 60, // กำหนดเวลาให้หมดอายุใน 1 ชั่วโมง (60 * 60 วินาที)
      });

      return { success: true, message: "Login successful!" };
    } else {
      return { success: false, message: "Login failed." };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "An error occurred while logging in." };
  }
}
