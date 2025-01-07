// components/templates/HomeTemplate.tsx
import React from "react";
import Card from "../../molecules/card";
import Footer from "../../organisms/footer";

type HomeTemplateProps = {
  data: { title: string; description: string; id: number }[]; // ข้อมูลที่ได้รับจาก Server Component
};

const Home: React.FC<HomeTemplateProps> = ({ data }) => {
  // console.log(data);
  // const handleAction = (id: number) => {
  //   alert(id);
  // };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-4">
        <h2 className="text-2xl font-semibold">Welcome to Our Website</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {data.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.description}
              // onAction={() => handleAction(item.id)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
