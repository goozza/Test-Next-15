// components/templates/HomeTemplate.tsx
import React, { Suspense } from "react";

import Footer from "../../organisms/footer";
import { encryptDataAction } from "@/app/utils/encryp/action";
// import { dashBoardExecutiveService } from "@/app/api-service";

// import { dashBoardExecutiveService } from "@/app/api-service";
import Card from "@components/molecules/card";
import { dashBoardExecutiveService } from "@/app/api-service";

const fetchData = async () => {
  const bodyOnTimeAndBackup = {
    hid: ["11162"],
    province: [],
    health_zone: [],
    start_date: `11/2014`,
    end_date: `11/2014`,
  };
  const encryptedOntimeAndBackupHospital = await encryptDataAction(
    bodyOnTimeAndBackup
  );

  const resBackup = await dashBoardExecutiveService.POST_TABLE_BACKUP(
    encryptedOntimeAndBackupHospital
  );

  return JSON.parse(resBackup);
};

const About: React.FC = async ({}) => {
  const data = await fetchData(); // ดึงข้อมูลจาก API ฝั่งเซิร์ฟเวอร์

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-4">
        <h2 className="text-2xl font-semibold">
          Welcome to Our Website {data.message_code}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <Suspense fallback={<div>Loading data นะจ๊ะ ...</div>}>
            {data && (
              <Card
                key={data}
                title={data.data[0].hospital_name}
                description={data.data[0].status}
                id={data.data[0].id}
              />
            )}
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
