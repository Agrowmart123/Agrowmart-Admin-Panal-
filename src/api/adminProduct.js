import api from "./apiClient";

// ===================== ADMIN: GET ALL PRODUCTS =====================
export const getAllProductsForAdmin = async () => {
  try {
    const response = await api.get("/admin/products", {
      params: {
        _ts: Date.now(), //cache buster
      },
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

// ===================== ADMIN: GET PRODUCT DETAILS =====================
export const getProductDetailsForAdmin = async (type, id) => {
  try {
    const response = await api.get(`/admin/products/${type}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

// ===================== ADMIN: GET PENDING PRODUCTS =====================
export const getPendingProducts = async () => {
  try {
    const response = await api.get("/admin/products/pending");
    return response.data;
  } catch (error) {
    console.error("Error fetching pending products:", error);
    throw error;
  }
};

// ===================== ADMIN: GET PENDING WOMEN PRODUCTS =====================
export const getPendingWomenProducts = async () => {
  try {
    const response = await api.get("/admin/women-products/pending");
    return response.data;
  } catch (error) {
    console.error("Error fetching pending women products:", error);
    throw error;
  }
};

// ===================== ADMIN: APPROVE REGULAR PRODUCT =====================
export const approveProduct = async (productId) => {
  try {
    const response = await api.patch(`/admin/products/${productId}/approval`, {
      action: "APPROVE",
    });
    return response.data;
  } catch (error) {
    console.error("Error approving product:", error);
    throw error;
  }
};

// ===================== ADMIN: REJECT REGULAR PRODUCT =====================
export const rejectProduct = async (productId, rejectionReason) => {
  try {
    const response = await api.patch(`/admin/products/${productId}/approval`, {
      action: "REJECT",
      rejectionReason: rejectionReason,
    });
    return response.data;
  } catch (error) {
    console.error("Error rejecting product:", error);
    throw error;
  }
};

// ===================== ADMIN: DELETE REGULAR PRODUCT =====================
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/admin/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// ===================== ADMIN: APPROVE WOMEN PRODUCT =====================
export const approveWomenProduct = async (productId) => {
  try {
    const response = await api.patch(
      `/admin/women-products/${productId}/approval`,
      {
        action: "APPROVE",
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error approving women product:", error);
    throw error;
  }
};

// ===================== ADMIN: REJECT WOMEN PRODUCT =====================
export const rejectWomenProduct = async (productId, rejectionReason) => {
  try {
    const response = await api.patch(
      `/admin/women-products/${productId}/approval`,
      {
        action: "REJECT",
        rejectionReason: rejectionReason,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error rejecting women product:", error);
    throw error;
  }
};

// ===================== ADMIN: DELETE WOMEN PRODUCT =====================
export const deleteWomenProduct = async (productId) => {
  try {
    const response = await api.delete(`/admin/women-products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting women product:", error);
    throw error;
  }
};
