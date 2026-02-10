// import api from "./apiClient";

// // ==================== ADMIN AGRI PRODUCT API SERVICE ====================

// /**
//  * Get all agri products (pending, approved, rejected)
//  */
// export const getAllAgriProducts = async () => {
//   try {
//     const [pending, approved, rejected] = await Promise.all([
//       api.get("/v1/admin/agri-products/pending"),
//       api.get("/v1/admin/agri-products/approved"),
//       api.get("/v1/admin/agri-products/rejected"),
//     ]);

//     return {
//       pending: pending.data || [],
//       approved: approved.data || [],
//       rejected: rejected.data || [],
//       all: [
//         ...(pending.data || []),
//         ...(approved.data || []),
//         ...(rejected.data || []),
//       ],
//     };
//   } catch (error) {
//     console.error("❌ Error fetching all agri products:", error);
//     throw error;
//   }
// };

// /**
//  * Get pending agri products
//  */
// export const getPendingAgriProducts = async () => {
//   try {
//     const response = await api.get("/v1/admin/agri-products/pending");
//     console.log("✅ Pending products fetched:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error fetching pending products:", error);
//     throw error;
//   }
// };

// /**
//  * Get approved agri products
//  */
// export const getApprovedAgriProducts = async () => {
//   try {
//     const response = await api.get("/v1/admin/agri-products/approved");
//     console.log("✅ Approved products fetched:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error fetching approved products:", error);
//     throw error;
//   }
// };

// /**
//  * Get rejected agri products
//  */
// export const getRejectedAgriProducts = async () => {
//   try {
//     const response = await api.get("/v1/admin/agri-products/rejected");
//     console.log("✅ Rejected products fetched:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error fetching rejected products:", error);
//     throw error;
//   }
// };

// /**
//  * Get single agri product by ID
//  * Note: You'll need to add this endpoint in your backend
//  */
// export const getAgriProductById = async (id) => {
//   try {
//     const response = await api.get(`/v1/admin/agri-products/${id}`);
//     console.log("✅ Product details fetched:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error fetching product details:", error);
//     throw error;
//   }
// };

// /**
//  * Approve agri product
//  */
// export const approveAgriProduct = async (id) => {
//   try {
//     const response = await api.post(`/v1/admin/agri-products/${id}/approve`);
//     console.log("✅ Product approved:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error approving product:", error);
//     throw error;
//   }
// };

// /**
//  * Reject agri product
//  */
// export const rejectAgriProduct = async (id, reason) => {
//   try {
//     const response = await api.post(`/v1/admin/agri-products/${id}/reject`, {
//       reason: reason,
//     });
//     console.log("✅ Product rejected:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error rejecting product:", error);
//     throw error;
//   }
// };

// /**
//  * Delete agri product
//  */
// export const deleteAgriProduct = async (id) => {
//   try {
//     const response = await api.delete(`/v1/admin/agri-products/${id}`);
//     console.log("✅ Product deleted successfully");
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error deleting product:", error);
//     throw error;
//   }
// };

// /**
//  * Restore rejected product (set back to pending)
//  */
// export const restoreAgriProduct = async (id) => {
//   try {
//     const response = await api.post(`/v1/admin/agri-products/${id}/restore`);
//     console.log("✅ Product restored to pending:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error restoring product:", error);
//     throw error;
//   }
// };

// /**
//  * Search pending products
//  */
// export const searchPendingAgriProducts = async (keyword) => {
//   try {
//     const response = await api.get("/v1/admin/agri-products/pending/search", {
//       params: { keyword },
//     });
//     console.log("✅ Search results:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error searching products:", error);
//     throw error;
//   }
// };

import api from "./apiClient";

// ================= ADMIN AGRI PRODUCT APIs =================

export const getAllAgriProducts = async () => {
  const [pending, approved, rejected] = await Promise.all([
    api.get("/v1/admin/agri-products/pending"),
    api.get("/v1/admin/agri-products/approved"),
    api.get("/v1/admin/agri-products/rejected"),
  ]);

  return {
    pending: pending.data || [],
    approved: approved.data || [],
    rejected: rejected.data || [],
  };
};

export const getAgriProductById = async (id) => {
  const res = await api.get(`/v1/admin/agri-products/${id}`);
  return res.data;
};

export const approveAgriProduct = async (id) => {
  const res = await api.post(`/v1/admin/agri-products/${id}/approve`);
  return res.data;
};

export const rejectAgriProduct = async (id, reason) => {
  const res = await api.post(`/v1/admin/agri-products/${id}/reject`, {
    reason,
  });
  return res.data;
};

export const deleteAgriProduct = async (id) => {
  await api.delete(`/v1/admin/agri-products/${id}`);
};
