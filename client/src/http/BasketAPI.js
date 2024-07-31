import { $authhost, $host } from ".";
import { jwtDecode } from "jwt-decode";

export const addDevice = async (basketDevice) => {
  const { data } = await $authhost.post("api/basket/add", basketDevice);
  return data;
};
export const fetchBasket = async () => {
  const { data } = await $authhost.get("api/basket/");
  return data;
};

export const removeDevice = async (deviceId) => {
  const { data } = await $authhost.post("api/basket/remove", { deviceId });
  return data;
};
export const clearBasket = async () => {
  const { data } = await $authhost.get("api/basket/clear");
  return data;
};
