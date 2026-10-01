import api from './api';

export const complaintApi = {
  /**
   * GET /api/complaints/student/{studentId}
   */
  getMyComplaints: async (studentId = 1) => {
    try {
      const data = await api.get(`/complaints/student/${studentId}`);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.warn('[complaintApi] getMyComplaints error:', err);
      return [];
    }
  },

  /**
   * GET /api/complaints
   */
  getAllComplaints: async () => {
    try {
      const data = await api.get('/complaints');
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.warn('[complaintApi] getAllComplaints error:', err);
      return [];
    }
  },

  /**
   * POST /api/complaints
   */
  createComplaint: async (complaintData) => {
    return api.post('/complaints', complaintData);
  },

  /**
   * POST /api/complaints/classify
   * Real AI keyword / LLM auto-classification
   */
  classifyComplaint: async (description) => {
    return api.post('/complaints/classify', { description });
  },

  /**
   * PUT /api/complaints/{id}/status
   */
  updateStatus: async (complaintId, newStatus, assignedToUserId) => {
    return api.put(`/complaints/${complaintId}/status`, {
      status: newStatus,
      assignedToUserId
    });
  }
};

export default complaintApi;

