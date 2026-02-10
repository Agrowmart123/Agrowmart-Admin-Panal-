import apiClient from "./apiClient";


export const getCustomerById = async (id) => {
  const res = await apiClient.get(`/admin/customers/${id}`);
  return res.data; // 🔥 DO NOT do res.data again
};

 
export const getCustomerFavorites = async (id) => {
  const res = await apiClient.get(`/admin/customers/${id}/favorites`);
  return res.data; // { success, data: [] }
};