// Base API URL
const API_BASE_URL = 'http://localhost:5000';

// Helper function to handle API calls
const apiCall = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: error.message };
  }
};

// Dashboard API functions
export const dashboardApi = {
  // Get all dashboard stats
  getDashboardStats: async () => {
    return await apiCall('/dashboardStats');
  },

  // Get stats cards data
  getStats: async () => {
    const result = await apiCall('/dashboardStats');
    return result.success ? { ...result, data: result.data.stats } : result;
  },

  // Get registration data
  getRegistrations: async () => {
    const result = await apiCall('/dashboardStats');
    return result.success ? { ...result, data: result.data.registrations } : result;
  },

  // Get orders data
  getOrders: async () => {
    const result = await apiCall('/dashboardStats');
    return result.success ? { ...result, data: result.data.orders } : result;
  },

  // Get product sales data by filter (year, month, week)
  getProductSales: async (filter = 'year') => {
    const result = await apiCall('/dashboardStats');
    if (result.success) {
      const salesData = result.data.productSales[filter];
      return { success: true, data: salesData };
    }
    return result;
  },

  // Get sellers list
  getSellers: async (limit = 5) => {
    const result = await apiCall(`/sellers?_limit=${limit}&_sort=createdAt&_order=desc`);
    return result;
  },

  // Get customers list
  getCustomers: async (limit = 5) => {
    const result = await apiCall(`/customers?_limit=${limit}&_sort=createdAt&_order=desc`);
    return result;
  },

  // Get popular products
  getPopularProducts: async (limit = 4) => {
    const result = await apiCall(`/popularProducts?_limit=${limit}`);
    return result;
  },

  // Get all data at once (for initial page load)
  getAllDashboardData: async () => {
    try {
      const [stats, sellers, customers, products] = await Promise.all([
        dashboardApi.getDashboardStats(),
        dashboardApi.getSellers(),
        dashboardApi.getCustomers(),
        dashboardApi.getPopularProducts(),
      ]);

      return {
        success: true,
        data: {
          stats: stats.data,
          sellers: sellers.data,
          customers: customers.data,
          products: products.data,
        },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

export default dashboardApi;