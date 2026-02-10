import api from "./apiClient"; 

// GET – all team members
export const getTeamMembers = () => {
  return api.get("/v1/super/team");
};

// ADD – new team member
export const addTeamMember = (formData) => {
  return api.post("/v1/super/team/add", formData); 
};

// UPDATE – team member
export const updateTeamMember = (id, formData) => {
  return api.put(`/v1/super/team/${id}`, formData); 
};

// DELETE – team member
export const deleteTeamMember = (id) => {
  return api.delete(`/v1/super/team/${id}`);
};
