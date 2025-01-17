import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // นำเข้าฟังก์ชัน jwtVerify จาก jose

const SECRET_KEY = process.env.JWT_SECRET_KEY ?? "default-secret-key";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json(); // รับ token จาก client

    if (!token) {
      return NextResponse.json(
        { valid: false, message: "Token is required" },
        { status: 400 }
      );
    }

    // ตรวจสอบว่า token ถูกต้องและยังไม่หมดอายุ
    const decoded = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET_KEY)
    ); // ตรวจสอบด้วย JWT secret

    // ถ้า token ถูกต้อง ส่งข้อมูล valid: true กลับไป
    return NextResponse.json({ valid: true, decoded }, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    // ถ้า token ไม่ถูกต้องหรือหมดอายุ
    return NextResponse.json(
      { valid: false, message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
