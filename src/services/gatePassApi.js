import api from './api';

export const gatePassApi = {
  /**
   * GET /api/gate-passes/student/{studentId}
   */
  getMyGatePasses: async (studentId = 1) => {
    try {
      const data = await api.get(`/gate-passes/student/${studentId}`);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.warn('[gatePassApi] getMyGatePasses error:', err);
      return [];
    }
  },

  /**
   * GET /api/gate-passes
   */
  getAllGatePasses: async () => {
    try {
      const data = await api.get('/gate-passes');
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.warn('[gatePassApi] getAllGatePasses error:', err);
      return [];
    }
  },

  /**
   * POST /api/gate-passes
   */
  createGatePass: async (passData) => {
    const payload = {
      studentId: passData.studentId || 1,
      reason: passData.purpose || passData.reason,
      departureTime: passData.outTime || passData.departureTime || new Date().toISOString(),
      expectedReturnTime: passData.returnTime || passData.expectedReturnTime || new Date(Date.now() + 86400000).toISOString(),
      status: 'PENDING'
    };
    return api.post('/gate-passes', payload);
  },

  /**
   * PUT /api/gate-passes/{id}/approve
   */
  approveGatePass: async (passId, approvedByUserId = 3) => {
    return api.put(`/gate-passes/${passId}/approve`, { approvedByUserId });
  },

  /**
   * PUT /api/gate-passes/{id}/reject
   */
  rejectGatePass: async (passId) => {
    return api.put(`/gate-passes/${passId}/reject`);
  },

  /**
   * GET /api/security/gate-pass/verify/{qrCode}
   */
  verifyGatePass: async (qrCode) => {
    return api.get(`/security/gate-pass/verify/${qrCode}`);
  },

  /**
   * PUT /api/security/gate-pass/{id}/exit
   */
  markExit: async (passId) => {
    return api.put(`/security/gate-pass/${passId}/exit`);
  },

  /**
   * PUT /api/security/gate-pass/{id}/return
   */
  markReturn: async (passId) => {
    return api.put(`/security/gate-pass/${passId}/return`);
  }
};

export default gatePassApi;

