// components/templates/HomeTemplate.tsx
import React, { Suspense } from "react";
import Card from "../../molecules/card";
import Footer from "../../organisms/footer";

type DataTypeMap = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
const fetchData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return data.slice(0, 9); // นำแค่ 6 โพสต์แรกเพื่อแสดงตัวอย่าง
};

const Home: React.FC = async ({}) => {
  const data = await fetchData(); // ดึงข้อมูลจาก API ฝั่งเซิร์ฟเวอร์

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-4">
        <h2 className="text-2xl font-semibold">Welcome to Our Website</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <Suspense fallback={<div>Loading data...</div>}>
            {data.map((item: DataTypeMap, index: number) => (
              <Card
                key={index}
                title={item.title}
                description={item.body}
                id={item.id}
              />
            ))}
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
