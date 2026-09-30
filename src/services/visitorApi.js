import api, { IS_DEMO_MODE } from './api';
import { INITIAL_VISITORS } from '../data/demoData';

export const visitorApi = {
  getVisitors: async () => {
    if (IS_DEMO_MODE) {
      return INITIAL_VISITORS;
    }
    return api.get('/visitors');
  },

  createVisitorRequest: async (visitorData) => {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 400));
      const newVisitor = {
        id: `VIS-2026-${Math.floor(300 + Math.random() * 700)}`,
        visitorName: visitorData.visitorName,
        relationship: visitorData.relationship,
        phone: visitorData.phone,
        studentName: visitorData.studentName || 'Sai Krishna Mohanty',
        studentId: visitorData.studentId || 'BPUT2026001',
        visitDate: visitorData.visitDate,
        expectedArrival: visitorData.expectedArrival,
        purpose: visitorData.purpose,
        status: 'Pending',
        checkedInAt: null,
        checkedOutAt: null
      };
      return newVisitor;
    }
    return api.post('/visitors', visitorData);
  },

  updateVisitorStatus: async (visitorId, status) => {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 300));
      return {
        visitorId,
        status,
        timestamp: new Date().toLocaleString()
      };
    }
    return api.patch(`/visitors/${visitorId}/status`, { status });
  }
};

export default visitorApi;
