import React from "react";

type DashboardParams = {
  id: string; // Adjust type if necessary
};

type DashboardProps = {
  params: DashboardParams;
};

const DashboardDetailPage: React.FC<DashboardProps> = async ({ params }) => {
  const { id } = await params;
  console.log(id);

  return <div>Dashboard Detail Page for ID: {id}</div>;
};

export default DashboardDetailPage;
