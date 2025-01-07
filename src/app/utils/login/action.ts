"use server";
import { cookies } from "next/headers";
import { encryptDataAction } from "../encryp/action";
import { decryptDataAction } from "../decryp/action";
import { redirect } from "next/navigation"; // Import redirect

// export async function loginAction(formData: FormData) {
//   const username = formData.get("username")?.toString();
//   const password = formData.get("password")?.toString();

//   if (!username || !password) {
//     return { success: false, message: "Email and password are required." };
//   }

//   try {
//     const response = await fetch("https://dummyjson.com/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         username: "emilys", // ชื่อผู้ใช้จำลอง
//         password: "emilyspass", // รหัสผ่านจำลอง
//         expiresInMins: 60,
//       }),
//       credentials: "include",
//     });

//     const data = await response.json();

//     if (response.status === 200) {
//       // ใช้ await เพื่อเข้าถึง cookies() และตั้งค่า token
//       const cookieStore = await cookies();

//       // กำหนดค่า HttpOnly และ SameSite สำหรับคุกกี้
//       cookieStore.set("token", data.accessToken, {
//         httpOnly: true, // ไม่สามารถเข้าถึงได้จาก JavaScript
//         secure: true, // ตั้งค่าเป็น true หากใน production
//         sameSite: "strict", //
//         maxAge: 60 * 60, // กำหนดเวลาให้หมดอายุใน 1 ชั่วโมง (60 * 60 วินาที)
//       });

//       return { success: true, message: "Login successful!" };
//     } else {
//       return { success: false, message: data.message || "Login failed." };
//     }
//   } catch (error) {
//     console.log(error);
//     return { success: false, message: "An error occurred while logging in." };
//   }
// }

export async function loginIamAction(formData: FormData) {
  if (process.env.NODE_ENV === "development") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const defaultIv: any = process.env.SECRET_KEY_KEY_IAM_IV;
  const defaultKey: any = process.env.SECRET_KEY_KEY_IAM_KEY;
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  if (!username || !password) {
    return { success: false, message: "Email and password are required." };
  }

  const getForm = {
    username: username,
    password: password,
    expire: null,
  };
  const encode = await encryptDataAction(getForm, defaultKey, defaultIv);

  const body = JSON.stringify({ encryption: encode });

  try {
    const response = await fetch(
      "https://dev-iamics.inet.co.th/iam/moph/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
        credentials: "include",
      }
    );

    if (response.status === 200) {
      const responseSuccess = await response.json();

      const data = await decryptDataAction(
        responseSuccess.result,
        defaultKey,
        defaultIv,
        responseSuccess.result
      );

      // ใช้ await เพื่อเข้าถึง cookies() และตั้งค่า token
      const cookieStore = await cookies();

      // กำหนดค่า HttpOnly และ SameSite สำหรับคุกกี้
      cookieStore.set("token", data.data.access_token, {
        httpOnly: true, // ไม่สามารถเข้าถึงได้จาก JavaScript
        secure: true, // ตั้งค่าเป็น true หากใน production
        sameSite: "strict", //
        maxAge: 60 * 60, // กำหนดเวลาให้หมดอายุใน 1 ชั่วโมง (60 * 60 วินาที)
      });

      cookieStore.set("user", data.data.access_token, {
        httpOnly: true, // ไม่สามารถเข้าถึงได้จาก JavaScript
        secure: true, // ตั้งค่าเป็น true หากใน production
        sameSite: "strict", //
        maxAge: 60 * 60, // กำหนดเวลาให้หมดอายุใน 1 ชั่วโมง (60 * 60 วินาที)
      });

      return { success: true, message: "Login successful!" };
    } else {
      return { success: false, message: "Login failed." };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "An error occurred while logging in." };
  } finally {
    redirect("/dashboard");
  }
}
