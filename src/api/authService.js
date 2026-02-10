
// import api from "./apiClient";

// // Local storage keys
// const AUTH_KEY = "adminUser";
// const TOKEN_KEY = "authToken";

// // Login function
// export const login = async (email, password) => {
//   // Call backend login API with login credentials
//   const response = await api.post("/admin/auth/login", { email, password });

//   // Log the login API response (for debugging)
//   console.log("LOGIN RESPONSE", response.data);

//   // Get JWT token from response body (JwtResponse)
//   const token = response.data.token;

//   // If token is not received, throw an error
//   if (!token) {
//     throw new Error(" Token not received");
//   }

//   // Store access token and refresh token in localStorage
//   sessionStorage.setItem("authToken", token);
//   sessionStorage.setItem("refreshToken", response.data.refreshToken || "");

//   //  Fetch logged-in user details using /auth/me
//   const meResponse = await api.get("/admin/auth/me");

//   console.log("Logged user:", meResponse.data);

//   const userData = {
//     ...meResponse.data,
//     role: meResponse.data.roleName || "USER", 
//   };

//   sessionStorage.setItem("adminUser", JSON.stringify(userData));

//   return meResponse.data;
// };

// // Logout function - Clear everything
// export const logout = () => {
//   // Clear localStorage
//   localStorage.removeItem(AUTH_KEY);
//   localStorage.removeItem(TOKEN_KEY);
//   localStorage.removeItem("refreshToken");

//   // Clear sessionStorage
//   sessionStorage.removeItem(AUTH_KEY);
//   sessionStorage.removeItem(TOKEN_KEY);
//   sessionStorage.removeItem("refreshToken");

//   // Clear any other auth data
//   sessionStorage.clear();

//   // Optional: Clear cookies if you're using them
//   document.cookie.split(";").forEach((c) => {
//     document.cookie = c
//       .replace(/^ +/, "")
//       .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
//   });
// };

// // 🔐 FORGOT PASSWORD
// export const sendPasswordReset = async (email) => {
//   const response = await api.post("/admin/auth/forgot-password", { email });
//   return response.data;
// };

// // 🔐 RESET PASSWORD
// export const resetPassword = async (token, newPassword) => {
//   const response = await api.post("/auth/reset-password", {
//     token,
//     newPassword,
//   });
//   return response.data;
// };

// // Get current user
// export const getCurrentUser = () => {
//   try {
//     const user = sessionStorage.getItem(AUTH_KEY);
//     return user ? JSON.parse(user) : null;
//   } catch (error) {
//     console.error("Error getting current user:", error);
//     return null;
//   }
// };

// // Get auth token
// export const getAuthToken = () => {
//   return sessionStorage.getItem(TOKEN_KEY);
// };

// // Check if user is authenticated
// export const isAuthenticated = () => {
//   const user = getCurrentUser();
//   const token = getAuthToken();
//   return !!(user && token);
// };

// // Check if user has specific permission
// export const hasPermission = (permission) => {
//   const user = getCurrentUser();
//   if (!user || !user.permissions) return false;
//   return user.permissions.includes(permission);
// };

// // Check if user is Super Admin
// export const isSuperAdmin = () => {
//   const user = getCurrentUser();
//   return user && user.role === "SUPER_ADMIN";
// };

// // Validate session (optional - for additional security)
// export const validateSession = () => {
//   const user = getCurrentUser();
//   const token = getAuthToken();

//   if (!user || !token) {
//     logout();
//     return false;
//   }

//   return true;
// };

// export const refreshAccessToken = async () => {
//   try {
//     const refresh = localStorage.getItem("refreshToken");
//     if (!refresh) {
//       throw new Error("No refresh token available");
//     }
//     const response = await api.post("/auth/refresh-token", {
//       refreshToken: refresh,
//     });
//     sessionStorage.setItem(TOKEN_KEY, response.data.accessToken);
//     sessionStorage.setItem("refreshToken", response.data.refreshToken);

//     // Update adminUser with new token (fetch fresh user)
//     const meResponse = await api.get("/auth/me");
//     sessionStorage.setItem("adminUser", JSON.stringify(meResponse.data));

//     return response.data.accessToken;
//   } catch (err) {
//     console.error(" Refresh failed:", err);
//     logout();
//     window.location.href = "/login";
//     throw err;
//   }
// };

// // FORMAT ROLE (ADMIN → Admin, SUPER_ADMIN → Super Admin)
// export const formatRole = (role) => {
//   if (!role || typeof role !== "string") return "User";

//   return role
//     .replace(/_/g, " ")
//     .toLowerCase()
//     .replace(/\b\w/g, (c) => c.toUpperCase());
// };


import api from "./apiClient";

// Storage keys
const AUTH_KEY = "adminUser";
const TOKEN_KEY = "authToken";

// 🔐 LOGIN (NO /me API)
export const login = async (email, password) => {
  const response = await api.post("/admin/auth/login", { email, password });

  console.log("LOGIN RESPONSE:", response.data);

  const token = response.data.token;
  if (!token) {
    throw new Error("Token not received");
  }

  // Store tokens
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem("refreshToken", response.data.refreshToken || "");

  // ✅ Use login response directly
  const userData = {
    id: response.data.id,
    fullName: response.data.fullName,
    email: response.data.email,
    role: response.data.role ?? "USER",
  };

  sessionStorage.setItem(AUTH_KEY, JSON.stringify(userData));

  return userData;
};

// 🔐 LOGOUT
export const logout = () => {
  sessionStorage.clear();
  localStorage.clear();

  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
};

// 🔐 FORGOT PASSWORD
export const sendPasswordReset = async (email) => {
  const response = await api.post("/admin/auth/forgot-password", { email });
  return response.data;
};

// 🔐 RESET PASSWORD
export const resetPassword = async (token, newPassword) => {
  const response = await api.post("/auth/reset-password", {
    token,
    newPassword,
  });
  return response.data;
};

// Get current user
export const getCurrentUser = () => {
  try {
    const user = sessionStorage.getItem(AUTH_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

// Get auth token
export const getAuthToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};

// Auth check
export const isAuthenticated = () => {
  return !!(getCurrentUser() && getAuthToken());
};

//REFRESH TOKEN 
export const refreshAccessToken = async () => {
  try {
    const refresh = sessionStorage.getItem("refreshToken");
    if (!refresh) throw new Error("No refresh token");

    const response = await api.post("/auth/refresh-token", {
      refreshToken: refresh,
    });

    sessionStorage.setItem(TOKEN_KEY, response.data.accessToken);
    sessionStorage.setItem(
      "refreshToken",
      response.data.refreshToken || ""
    );

    return response.data.accessToken;
  } catch (err) {
    logout();
    window.location.href = "/login";
    throw err;
  }
};

// Role helpers
export const isSuperAdmin = () => {
  const user = getCurrentUser();
  return user?.role === "SUPER_ADMIN";
};

//  Validate session (REQUIRED for admin panel)
export const validateSession = () => {
  const user = getCurrentUser();
  const token = getAuthToken();

  if (!user || !token) {
    logout();
    return false;
  }
  return true;
};

// Format role (used in Sidebar/Header UI)
export const formatRole = (role) => {
  if (!role || typeof role !== "string") return "User";

  return role
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

