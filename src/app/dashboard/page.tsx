import Image from "next/image";

function DashboardPage() {
  return (
    <div>
      <Image
        src="https://assets.tops.co.th/PEPSI-PepsiNoSugarLimeFlavor550ml-8858998581870-1?$JPEG$"
        alt="pepsi"
        width={100}
        height={100}
        priority
      />
    </div>
  );
}

export default DashboardPage;
