import api from "./apiClient"; 

// Fakt '/admin' pasun suru kara, '/api' axios config madhe asava
const BASE_URL = "/admin/website-content";

const websiteContentService = {
  getAllByType: async (type) => {
    try {
      const response = await api.get(`${BASE_URL}/get-all/${type}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      throw error;
    }
  },

  saveContent: async (payload, id = null) => {
    try {
      if (id) {
        const response = await api.put(`${BASE_URL}/edit/${id}`, payload);
        return response.data;
      } else {
        const response = await api.post(`${BASE_URL}/save`, payload);
        return response.data;
      }
    } catch (error) {
      console.error("Error saving content:", error);
      throw error;
    }
  },

  removeContent: async (id) => {
    try {
      const response = await api.delete(`${BASE_URL}/remove/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting content:", error);
      throw error;
    }
  }
};

export default websiteContentService;