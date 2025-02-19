"use server";
import { cookies } from "next/headers";
import { encryptDataAction } from "../encryp/action";
import { redirect } from "next/navigation"; // Import redirect
import { profileAction } from "../profile/action";
import { signToken } from "../sign-key/action";
import { authService } from "@/app/api-service";

export async function loginIamAction(formData: FormData) {
  //ใน prd ไม่รู่้เหมือนกันทำไง
  if (process.env.NODE_ENV === "development") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const defaultIv: string | undefined = process.env.SECRET_KEY_KEY_IAM_IV;
  const defaultKey: string | undefined = process.env.SECRET_KEY_KEY_IAM_KEY;
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

  try {
    const response = await authService.POST_LOGIN({
      encryption: encode,
    });

    if (response.code === 200) {
      // ใช้ await เพื่อเข้าถึง cookies() และตั้งค่า token
      const cookieStore = await cookies();

      // กำหนดค่า HttpOnly และ SameSite สำหรับคุกกี้
      cookieStore.set("token", response.data.access_token, {
        httpOnly: true, // ไม่สามารถเข้าถึงได้จาก JavaScript
        secure: true, // ตั้งค่าเป็น true หากใน production
        sameSite: "strict", //
        maxAge: 60 * 60, // กำหนดเวลาให้หมดอายุใน 1 ชั่วโมง (60 * 60 วินาที)
      });

      const sign = await signToken(response.data.access_token);

      cookieStore.set("sign", sign, {
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
    try {
      await profileAction();
    } catch (error) {
      console.log(error);
    } finally {
      redirect("/dashboard");
    }
  }
}
