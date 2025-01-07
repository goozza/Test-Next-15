// app/page.tsx (หรือไฟล์ที่เหมาะสมใน App Router)

import Home from "@components/templates/home";
import React from "react";

const fetchData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return data.slice(0, 9); // นำแค่ 6 โพสต์แรกเพื่อแสดงตัวอย่าง
};

const DashboardPage = async () => {
  const data = await fetchData(); // ดึงข้อมูลจาก API ฝั่งเซิร์ฟเวอร์

  return <Home data={data} />;
};

export default DashboardPage;
