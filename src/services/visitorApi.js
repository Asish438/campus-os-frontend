import api from './api';

export const visitorApi = {
  /**
   * GET /api/visitors
   */
  getVisitors: async () => {
    try {
      const data = await api.get('/visitors');
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.warn('[visitorApi] getVisitors error:', err);
      return [];
    }
  },

  /**
   * GET /api/visitors/student/{studentId}
   */
  getStudentVisitors: async (studentId = 1) => {
    try {
      const data = await api.get(`/visitors/student/${studentId}`);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.warn('[visitorApi] getStudentVisitors error:', err);
      return [];
    }
  },

  /**
   * POST /api/visitors
   */
  createVisitorRequest: async (visitorData) => {
    const payload = {
      studentId: visitorData.studentId || 1,
      visitorName: visitorData.visitorName || visitorData.name,
      relationship: visitorData.relationship,
      phone: visitorData.phone,
      idProofType: visitorData.idProofType || 'Aadhaar Card',
      idProofNumber: visitorData.idProofNumber || 'XXXX-XXXX-1234',
      expectedArrival: visitorData.expectedArrival || new Date().toISOString(),
      visitDate: visitorData.visitDate || new Date().toISOString(),
      status: 'PENDING'
    };
    return api.post('/visitors', payload);
  },

  /**
   * PUT /api/visitors/{id}/approve/{approvedByUserId}
   */
  approveVisitor: async (visitorId, approvedByUserId = 3) => {
    return api.put(`/visitors/${visitorId}/approve/${approvedByUserId}`);
  },

  /**
   * PUT /api/security/visitor/{id}/check-in
   */
  checkInVisitor: async (visitorId) => {
    return api.put(`/security/visitor/${visitorId}/check-in`);
  },

  /**
   * PUT /api/security/visitor/{id}/check-out
   */
  checkOutVisitor: async (visitorId) => {
    return api.put(`/security/visitor/${visitorId}/check-out`);
  }
};

export default visitorApi;

