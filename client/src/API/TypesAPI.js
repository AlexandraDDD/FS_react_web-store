import { $authhost } from ".";

export const createTypeReq = async (type) => {
  const { data } = await $authhost.post("api/type/", type);
  return data;
};
export const fetchTypesReq = async () => {
  const { data } = await $authhost.get("api/type/");
  return data;
};

export const removeTypeReq = async (id) => {
  const { data } = await $authhost.delete("api/type/" + id);
  return data;
};
