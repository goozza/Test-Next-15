// components/templates/HomeTemplate.tsx
import React, { Suspense } from "react";

import Footer from "../../organisms/footer";
import { encryptDataAction } from "@/app/utils/encryp/action";
// import { dashBoardExecutiveService } from "@/app/api-service";

// import { dashBoardExecutiveService } from "@/app/api-service";
import Card from "@components/molecules/card";
import AxiosInstance from "@/app/utils/axios-instance/action";
import { decryptDataAction } from "@/app/utils/decryp/action";

// const fetchData = async () => {
//   const bodyOnTimeAndBackup = {
//     hid: ["11162"],
//     province: [],
//     health_zone: [],
//     start_date: `11/2014`,
//     end_date: `11/2014`,
//   };
//   const encryptedOntimeAndBackupHospital = await encryptDataAction(
//     bodyOnTimeAndBackup
//   );
//   const resBackup = await dashBoardExecutiveService.POST_ฺTREND_BANNER_HOSPITAL(
//     encryptedOntimeAndBackupHospital
//   );

//   return resBackup;
// };

const About: React.FC = async ({}) => {
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

  const response = await AxiosInstance.post(
    "https://dev-bics.inet.co.th/executives_dashboard/api/v2/report_ticket_trend",
    encryptedOntimeAndBackupHospital
  );
  console.log("responseeee", response.data);

  // const data = await fetchData(); // ดึงข้อมูลจาก API ฝั่งเซิร์ฟเวอร์
  // console.log("data", data);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-4">
        <h2 className="text-2xl font-semibold">Welcome to Our Website</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <Suspense fallback={<div>Loading data...</div>}>
            <Card />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
