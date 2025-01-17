"use server";
import { SignJWT, jwtVerify } from "jose";

// รับค่าคีย์ลับจาก environment variable
if (!process.env.SECRET_SIGN_KEY) {
  throw new Error("SECRET_SIGN_KEY is not defined in environment variables");
}

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_SIGN_KEY);

// ฟังก์ชันสร้างลายเซ็นสำหรับ cookie
export async function signToken(data: string) {
  try {
    const jwt = new SignJWT({ data }) // ใส่ข้อมูลที่ต้องการเซ็น
      .setProtectedHeader({ alg: "HS256" }) // ตั้งค่าอัลกอริธึม
      .setIssuedAt() // ตั้งเวลาออก token
      .setExpirationTime("1m"); // ตั้งค่าเวลาในการหมดอายุ (1 นาที)

    const token = await jwt.sign(SECRET_KEY); // เซ็นด้วยคีย์ลับ
    return token;
  } catch (error) {
    console.error("Error signing token:", error);
    throw new Error("Failed to sign token");
  }
}

// ฟังก์ชันตรวจสอบ JWT token
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY); // ตรวจสอบ token
    return payload; // คืนค่า payload หากตรวจสอบสำเร็จ
  } catch (error) {
    if (error === "JWSInvalid: JWS Protected Header is invalid") {
      return undefined; // คืนค่า undefined หาก token ไม่ถูกต้อง
    } else {
      return undefined; // คืนค่า undefined หาก token ไม่ถูกต้อง
    }
  }
}
