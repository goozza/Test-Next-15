"use server";
import { cookies } from "next/headers";

export async function createCamps(formData: FormData) {
  const title = formData.get("Title");
  const location = formData.get("Location");

  console.log(title);
  console.log(location);
}

export async function loginAction(formData: FormData) {
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  if (!username || !password) {
    return { success: false, message: "Email and password are required." };
  }

  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "emilys", // ชื่อผู้ใช้จำลอง
        password: "emilyspass", // รหัสผ่านจำลอง
        expiresInMins: 60,
      }),
      credentials: "include",
    });

    const data = await response.json();
    console.log("response", response);
    console.log("data", data);

    if (response.status === 200) {
      // ใช้ await เพื่อเข้าถึง cookies() และตั้งค่า token
      const cookieStore = await cookies();

      // กำหนดค่า HttpOnly และ SameSite สำหรับคุกกี้
      cookieStore.set("token", data.accessToken, {
        httpOnly: true, // ไม่สามารถเข้าถึงได้จาก JavaScript
        secure: true, // ตั้งค่าเป็น true หากใน production
        sameSite: "strict", //
        maxAge: 60 * 60, // กำหนดเวลาให้หมดอายุใน 1 ชั่วโมง (60 * 60 วินาที)
      });

      return { success: true, message: "Login successful!" };
    } else {
      return { success: false, message: data.message || "Login failed." };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "An error occurred while logging in." };
  }
}
