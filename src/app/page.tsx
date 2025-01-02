// app/page.tsx (หรือไฟล์ที่เหมาะสมใน App Router)
import HomeTemplate from "@/app/components/templates/HomeTemplate";
import React from "react";

const fetchData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return data.slice(0, 9); // นำแค่ 6 โพสต์แรกเพื่อแสดงตัวอย่าง
};

const Page = async () => {
  const data = await fetchData(); // ดึงข้อมูลจาก API ฝั่งเซิร์ฟเวอร์

  return <HomeTemplate data={data} />;
};

export default Page;
