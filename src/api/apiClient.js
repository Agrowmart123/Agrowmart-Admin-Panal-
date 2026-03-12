
// ==================== 1 ====================

// import axios from "axios";
// import { getAuthToken, logout, refreshAccessToken } from "./authService";

// const api = axios.create({
//   baseURL: "https://api.agrowmartindia.com",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 🔐 Request Interceptor - Add Authorization token to every request
// api.interceptors.request.use(
//   (config) => {
//     const token = getAuthToken();

//     //  JWT format check (must contain 2 dots)
//     if (token && token.split(".").length === 3) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log(" Valid JWT attached:", config.url);
//     } else {
//       console.warn(" Invalid / Missing JWT, skipping header:", token);
//       delete config.headers.Authorization;
//     }

//     return config;
//   },
//   (error) => {
//     console.error(" Request interceptor error:", error);
//     return Promise.reject(error);
//   },
// );

// // 🔐 Response Interceptor - Handle authentication errors
// api.interceptors.response.use(
//   (response) => {
//     console.log(" Response received:", response.config.url);
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     const status = error.response?.status;
//     const requestUrl = error.config?.url || "";

//     console.log(` Request failed: ${requestUrl} | Status: ${status}`);

//     // 401 – unauthorized (try refresh)
//     if (
//       status === 401 &&
//      !requestUrl.includes("/admin/auth/login") &&
//       !requestUrl.includes("/api/auth/refresh-token") &&
//       !requestUrl.includes("/admin/auth/forgot-password") &&
//       !requestUrl.includes("/api/auth/reset-password") &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       console.log(" Attempting token refresh...");

//       try {
//         const newToken = await refreshAccessToken();
//         console.log("Token refreshed successfully");

//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh failed, logging out...", refreshError);
//         logout();
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     // 403 – permission issue
//     if (status === 403) {
//       console.error(" Access Denied! Insufficient permissions.");
//       alert("You don't have permission to perform this action.");
//     }

//     return Promise.reject(error);
//   },
// );

// export default api;


// ==================== 2 ====================  


import axios from "axios";
import { getAuthToken, logout, refreshAccessToken } from "./authService";

// ✅ Ensure baseURL exists
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error(
    "❌ VITE_API_BASE_URL is not defined. Check Vercel environment variables.",
  );
}



const api = axios.create({
  baseURL: "https://api.agrowmartindia.com",
  headers: {
    "Content-Type": "application/json",
  },
});


// 🔐 REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    // JWT sanity check
    if (token && token.split(".").length === 3) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ JWT attached:", config.url);
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  },
);

// 🔐 RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response received:", response.config?.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config || {};
    const status = error.response?.status;
    const requestUrl = originalRequest.url || "";

    console.error(`❌ API Error: ${requestUrl} | Status: ${status}`);

    // 🚫 Network / CORS / backend down
    if (!error.response) {
      alert("Server is unreachable. Please try again later.");
      return Promise.reject(error);
    }

    // 🚫 Do NOT retry on login or missing routes
    if (
      status === 404 ||
      requestUrl.includes("/admin/auth/login") ||
      requestUrl.includes("/admin/auth/forgot-password") ||
      requestUrl.includes("/admin/auth/reset-password") ||
      requestUrl.includes("/api/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    // 🔄 401 → try refresh token ONCE
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("🔄 Attempting token refresh...");

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Token refresh failed, logging out.");
        logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // 🚫 403 → permission issue
    if (status === 403) {
      alert("You do not have permission to perform this action.");
    }

    return Promise.reject(error);
  },
);

export default api;
