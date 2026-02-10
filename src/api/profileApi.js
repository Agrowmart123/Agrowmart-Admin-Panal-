import api from "./apiClient";

// GET – My Profile
export const getMyProfile = () => {
  return api.get("/admin/auth/profile");
};

// UPDATE – My Profile (FullName + Photo only)
export const updateMyProfile = (formData) => {
  return api.put("/admin/auth/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
