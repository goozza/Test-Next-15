"use client"; // Mark this as a client-side component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckPage() {
  const router = useRouter();

  useEffect(() => {
    const checkCookies = async () => {
      try {
        // Delay the execution by 2 seconds
        setTimeout(async () => {
          const response = await fetch("/api/remove-cookie");
          const data = await response.json();

          // Check if the response indicates a redirection
          if (data.redirectTo) {
            router.push(data.redirectTo);
          } else {
            console.log("Cookies are valid", data);
          }
        }, 3000); // 2000ms = 2 seconds
      } catch (error) {
        console.error("Error fetching the API:", error);
      }
    };

    checkCookies();
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-black">
        The information provided is incorrect. Please log in again to continue.
      </h1>
    </div>
  );
}
