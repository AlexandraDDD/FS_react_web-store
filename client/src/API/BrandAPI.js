import { $authhost } from ".";

export const createBrandReq = async (brand) => {
  const { data } = await $authhost.post("api/brand/", brand);
  return data;
};
export const fetchBrandsReq = async () => {
  const { data } = await $authhost.get("api/brand/");
  return data;
};

export const removeBrandReq = async (id) => {
  const { data } = await $authhost.delete("api/brand/" + id);
  return data;
};
