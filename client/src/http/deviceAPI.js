import { $authhost, $host } from ".";
import { jwtDecode } from "jwt-decode";

//DEVICE//
export const createDevice = async (device) => {
  const { data } = await $authhost.post("api/device/", device);
  return data;
};
export const deleteDevice = async (id) => {
  const res = await $authhost.delete(`api/device/` + id);
  return res;
};
export const fetchDevices = async (brandId, typeId, limit, page) => {
  const { data } = await $host.get("api/device/", {
    params: {
      brandId,
      typeId,
      limit,
      page,
    },
  });
  return data;
};
export const fetchOneDevice = async (id) => {
  const { data } = await $host.get(`api/device/` + id);
  return data;
};

export const updateDevice = async (id, device) => {
  const { data } = await $authhost.put(`api/device/${id}`, device);
  return data;
};

export const check = async () => {
  const { data } = await $authhost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};
