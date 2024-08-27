import { $authhost, $host } from ".";
import { jwtDecode } from "jwt-decode";

export const addDeviceReq = async (basketDevice) => {
  const { data } = await $authhost.post("api/basket/add", basketDevice);
  return data;
};
export const fetchBasketReq = async () => {
  const { data } = await $authhost.get("api/basket/");
  return data;
};

export const removeDeviceReq = async (deviceId) => {
  const { data } = await $authhost.post("api/basket/remove", { deviceId });
  return data;
};
export const clearBasketReq = async () => {
  const { data } = await $authhost.get("api/basket/clear");
  return data;
};
