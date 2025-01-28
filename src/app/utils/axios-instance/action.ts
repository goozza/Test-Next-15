"use server";
import axios from "axios";
import { cookies } from "next/headers";
import https from "https";

// Axios Interceptor Instance
const AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL, // ใส่ URL ของ API ที่คุณใช้งาน
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // ข้ามการตรวจสอบ SSL
  }),
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    // Get token from Next.js cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("token")?.value;

    // If token is present, add it to request's Authorization Header
    if (accessToken) {
      if (config.headers) config.headers.token = accessToken;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Axios Interceptor: Response Method
AxiosInstance.interceptors.response.use(
  (response) => {
    // Can be modified response
    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);

export default AxiosInstance;
