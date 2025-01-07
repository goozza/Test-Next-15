"use server";
import CryptoJS from "crypto-js";
/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function encryptDataAction(data: any, key?: any, iv?: any) {
  const defaultIv: any = process.env.SECRET_KEY_IV;
  const defaultKey: any = process.env.SECRET_KEY_KEY;

  const serviceIv = CryptoJS.enc.Utf8.parse(iv ?? defaultIv);
  const serviceKey = key ?? defaultKey;

  key = CryptoJS.enc.Utf8.parse(serviceKey);

  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv: serviceIv,
    mode: CryptoJS.mode.CBC, // specify CBC mode
    padding: CryptoJS.pad.Pkcs7, // specify PKCS7 padding
  }).toString();
  const body = encryptedData;

  return body;
}
