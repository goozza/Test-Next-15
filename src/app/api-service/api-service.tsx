/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { BASE_API } from "./api-config";
import { decryptDataAction } from "../utils/decryp/action";
import { cookies } from "next/headers";
import { decryptDataIamAction } from "../utils/decryp-iam/action";
import { redirect } from "next/navigation";
let token: string = "";
// const { clearDataCenter,  } =useDataCenterStorePersist();
const getConfig = (
  token: string,
  port?: number | null,
  baseURL?: string,
  decode?: boolean,
  signal?: AbortSignal
) => {
  const config = {
    // baseURL: ip,
    timeout: 60 * 1000 * 120,
    //PRD
    // baseURL: baseURL ? `${baseURL}:${port}` : env == "production" ? `${BASE_API}` : `${BASE_API}:${port}`,
    //Dev
    baseURL: baseURL
      ? port
        ? `${baseURL}:${port}`
        : baseURL
      : `${BASE_API}:${port}`,
    decode: decode,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    signal,
  };

  return config;
};

const axiosSuccess = async (response: any) => {
  const decode = response?.config?.decode;
  const url = response?.config?.baseURL;
  const iam_url = process.env.NEXT_PUBLIC_BASE_IAM_API;
  const iam = response?.data?.result;
  const iam_iv: any = process.env.SECRET_KEY_KEY_IAM_IV;
  const iam_key: any = process.env.SECRET_KEY_KEY_IAM_KEY;

  if (decode) {
    if (url === iam_url) {
      return decryptDataIamAction(iam, iam_key, iam_iv, response?.data);
    } else {
      return decryptDataAction(response?.data);
    }
  } else {
    return response;
  }
};

const axiosError = async (error: any) => {
  // const url = error?.config?.baseURL;
  // const iam_url = process.env.NEXT_PUBLIC_BASE_IAM_API;
  // const iam = error?.response?.data?.result;
  // const iam_iv: any = process.env.SECRET_KEY_KEY_IAM_IV;
  // const iam_key: any = process.env.SECRET_KEY_KEY_IAM_KEY;
  // console.log("axiosError --->", error, error?.response);
  if (error?.response?.status === 401) {
    redirect("/check");

    //   if (url === iam_url) {
    //     return decryptDataAction(iam, iam_key, iam_iv, error?.response?.data);
    //   }
    //   // eslint-disable-next-line no-undef
    // } else {
    //   if (url === iam_url) {
    //     return decryptDataAction(iam, iam_key, iam_iv, error?.response?.data);
    //   } else {
    //     // console.log( error);
    //     if (error?.message !== "canceled" && error?.status !== 400) {
    //       return decryptDataAction(error?.response?.data);
    //     }
    //   }
  }
};
const getConfigFormdata = (
  token: string,
  port?: number | null,
  baseURL?: string,
  signal?: AbortSignal
) => {
  const config = {
    // baseURL: ip,
    timeout: 60 * 1000 * 120,
    baseURL: baseURL ? baseURL : `${BASE_API}:${port}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    signal,
  };
  return config;
};

const axiosService = async (
  type: any,
  url: string,
  params?: any,
  port?: number | null,
  baseURL?: string,
  decode?: boolean,
  signal?: AbortSignal // เพิ่ม signal ที่นี่
) => {
  let config: any = null;
  let config_formdata: any = null;

  if (url === "/auth/login" || url === "/health/") {
    token = "";
  }

  if (
    token === "" &&
    url !== "/auth/login" &&
    token === "" &&
    url !== "/health/"
  ) {
    const cookieStore = await cookies();
    const token = (await cookieStore.get("token")?.value) ?? "";

    config = getConfig(token, port, baseURL, decode, signal);
    //---------------------------------------------------------------------------

    config_formdata = getConfigFormdata(token, port, baseURL, signal);
    //---------------------------------------------------------------------------
  } else {
    config = getConfig(token, port, baseURL, decode, signal);
    // //---------------------------------------------------------------------------

    config_formdata = getConfigFormdata(token, port, baseURL, signal);
    //---------------------------------------------------------------------------
  }

  switch (type) {
    case "get":
      return axios
        .get(url, { ...config, ...params })
        .then(axiosSuccess)
        .catch(axiosError);
    case "post":
      return axios
        .post(url, params, { ...config })
        .then(axiosSuccess)
        .catch(axiosError);
    case "put":
      return axios
        .put(url, params, { ...config })
        .then(axiosSuccess)
        .catch(axiosError);
    case "patch":
      return axios
        .patch(url, params, { ...config })
        .then(axiosSuccess)
        .catch(axiosError);
    case "delete":
      return axios
        .delete(url, { ...config, data: params })
        .then(axiosSuccess)
        .catch(axiosError);
    //---------------------------------------------------------------------------

    case "formdata":
      return axios
        .post(url, params, { ...config_formdata })
        .then(axiosSuccess)
        .catch(axiosError);
    default:
      return false;
  }
};

export default {
  get: (
    url: string,
    params?: any,
    port?: any,
    baseURL?: string,
    decode?: boolean,
    signal?: AbortSignal
  ) => axiosService("get", url, params, port, baseURL, decode, signal),
  post: (
    url: string,
    params?: any,
    port?: any,
    baseURL?: string,
    decode?: boolean,
    signal?: AbortSignal
  ) => axiosService("post", url, params, port, baseURL, decode, signal),
  put: (
    url: string,
    params?: any,
    port?: any,
    baseURL?: string,
    decode?: boolean,
    signal?: AbortSignal
  ) => axiosService("put", url, params, port, baseURL, decode, signal),
  delete: (
    url: string,
    params?: any,
    port?: any,
    baseURL?: string,
    decode?: boolean,
    signal?: AbortSignal
  ) => axiosService("delete", url, params, port, baseURL, decode, signal),
  patch: (
    url: string,
    params?: any,
    port?: any,
    baseURL?: string,
    decode?: boolean,
    signal?: AbortSignal
  ) => axiosService("patch", url, params, port, baseURL, decode, signal),
  //---------------------------------------------------------------------------
  post_formdata: (
    url: string,
    params?: any,
    port?: number | null,
    baseURL?: string,
    signal?: AbortSignal
  ) => axiosService("formdata", url, params, port, baseURL, undefined, signal),
};
