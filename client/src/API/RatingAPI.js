import { $authhost, $host } from ".";

export const createRatingReq = async (deviceId, rate) => {
    try {
      const response = await $authhost.post(`api/rating`, { deviceId, rate });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        return { status: 409, message: "Rating already exists" };
      } else {
        console.error("Error creating rating:", error);
      }
    }
  };
  
/* 
export const getRatingReq = async (deviceId) => {
  const response = await $host.get("api/rating/"  + deviceId);
  return response.data;
}; */

export const deleteRatingReq = async (id) => {
  const response = await  $authhost.delete("api/rating/"  + id);
  return response.data;
};
