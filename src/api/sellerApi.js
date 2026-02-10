// src/api/sellerApi.js
import api from "./apiClient"; 

/**
 * 1. Get All Active Vendors (Non-deleted only)
 */
export const getSellers = async (page = 0, size = 10, search = "", status = "") => {
  let url = `/admin/vendors?page=${page}&size=${size}`;
  if (search) url += `&search=${search}`;
  if (status) url += `&status=${status}`;
  const response = await api.get(url);
  return response.data;
};

/**
 * 2. Get Single Vendor Profile
 */
export const getSellerProfile = async (id) => {
  const response = await api.get(`/admin/vendors/${id}`);
  return response.data;
};

/**
 * 3. Approve Vendor Account
 */
export const approveSeller = async (id) => {
  return (await api.put(`/admin/vendors/${id}/approve`)).data;
};

/**
 * 4. Reject Vendor Account
 */
export const rejectSeller = async (id, rejectData) => {
  return (await api.put(`/admin/vendors/${id}/reject`, rejectData)).data;
};

/**
 * 5. SOFT DELETE VENDOR (Moves to Archive)
 * Marks is_deleted = true in database
 */
export const deleteSeller = async (id) => {
  const response = await api.delete(`/admin/vendors/${id}/delete`);
  return response.data;
};

/**
 * 6. RESTORE VENDOR (Reactivates account)
 * Marks is_deleted = false in database
 */
export const restoreSeller = async (id) => {
  const response = await api.post(`/admin/vendors/${id}/restore`);
  return response.data;
};

/**
 * 7. Get Seller Products (Live DB Data)
 */
export const getProductsByVendor = async (vendorId) => {
  const response = await api.get(`/admin/vendors/${vendorId}/products`);
  return response.data;
};

/**
 * 8. Get Deleted Archive from Backend
 */
export const getDeletedSellersList = async (page = 0, size = 10) => {
  const response = await api.get(`/admin/vendors/deleted?page=${page}&size=${size}`);
  return response.data;
};