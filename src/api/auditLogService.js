import api from "./apiClient"; 

// ─── Fetch ALL audit logs (paginated + filters) ───────────────────────────────
export const fetchAllAuditLogs = async ({
  page = 0,
  size = 10,
  searchUser = "",
  action = "",
  role = "",
  ipAddress = "",
} = {}) => {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("size", size);
  if (searchUser) params.append("searchUser", searchUser);
  if (action && action !== "All") params.append("action", action);
  if (role && role !== "All") params.append("role", role);
  if (ipAddress) params.append("ipAddress", ipAddress);

  const response = await api.get(`/admin/vendors/audit-logs?${params.toString()}`);
  return response.data;
  // Shape: { success, message, data: [...logs], errors: { totalElements, totalPages, currentPage, pageSize } }
};

// ─── Fetch audit logs for a SPECIFIC vendor ───────────────────────────────────
export const fetchVendorAuditLogs = async (vendorId) => {
  const response = await api.get(`/admin/vendors/${vendorId}/audit-logs`);
  return response.data;
};