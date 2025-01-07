// app/api/login/route.ts

import { NextResponse } from "next/server";

// สร้างฟังก์ชันที่จัดการ API route
export async function POST(request: Request) {
  try {
    // ดึงข้อมูลจาก body ของ request (รูปแบบ JSON)
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    // ตรวจสอบข้อมูลที่รับมา
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    // ตัวอย่างการตรวจสอบข้อมูล (ในตัวอย่างนี้ใช้ข้อมูลแบบสมมติ)
    if (username === "admin" && password === "1234") {
      return NextResponse.json({
        success: true,
        message: "เข้าสู่ระบบสำเร็จ",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "ข้อมูลไม่ถูกต้อง" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" },
      { status: 500 }
    );
  }
}
