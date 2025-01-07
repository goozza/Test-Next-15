"use server";
import CryptoJS from "crypto-js";
/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function decryptDataAction(
  data: any,
  key_another?: any,
  iv_another?: any,
  data_return?: any
) {
  try {
    const defaultIv: any = process.env.SECRET_KEY_IV;
    const defaultKey: any = process.env.SECRET_KEY_KEY;

    const iv = CryptoJS.enc.Utf8.parse(iv_another ?? defaultIv);
    let key = defaultKey;
    key = CryptoJS.enc.Utf8.parse(key_another ?? key);

    const decrypted = CryptoJS.AES.decrypt(data, key, { iv: iv }).toString(
      CryptoJS.enc.Utf8
    );

    if (decrypted) {
      try {
        const json = JSON.parse(decrypted);

        const myobj = data_return ? { ...data_return, data: json } : json;
        return myobj;
      } catch (jsonError) {
        console.log("JSON parsing error:", jsonError);
      }
    }
  } catch (error) {
    console.log("Decryption error:", error);
  }

  return null;
}
