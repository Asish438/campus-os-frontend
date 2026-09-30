import api, { IS_DEMO_MODE } from './api';
import { INITIAL_GATE_PASSES } from '../data/demoData';

export const gatePassApi = {
  getMyGatePasses: async () => {
    if (IS_DEMO_MODE) {
      return INITIAL_GATE_PASSES;
    }
    return api.get('/gate-pass/my');
  },

  getAllGatePasses: async () => {
    if (IS_DEMO_MODE) {
      return INITIAL_GATE_PASSES;
    }
    return api.get('/gate-pass/all');
  },

  createGatePass: async (passData) => {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 400));
      const id = `GP-2026-${Math.floor(8000 + Math.random() * 1000)}`;
      const newPass = {
        id,
        student: passData.student || 'Sai Krishna Mohanty',
        studentId: passData.studentId || 'BPUT2026001',
        hostel: passData.hostel || 'Aryabhatta Hall',
        room: passData.room || 'Room 304',
        phone: passData.phone || '+91 98765 43210',
        purpose: passData.purpose,
        destination: passData.destination,
        date: passData.date || new Date().toISOString().split('T')[0],
        outTime: passData.outTime,
        returnTime: passData.returnTime,
        status: 'Pending',
        approvedBy: null,
        approvedAt: null,
        qrPayload: null
      };
      return newPass;
    }
    return api.post('/gate-pass', passData);
  },

  approveGatePass: async (passId, wardenName = 'Col. Rajesh Sharma (Warden)') => {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 300));
      return {
        passId,
        status: 'Approved',
        approvedBy: wardenName,
        approvedAt: new Date().toLocaleString()
      };
    }
    return api.patch(`/gate-pass/${passId}/approve`);
  },

  rejectGatePass: async (passId, reason = 'Administrative grounds') => {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 300));
      return { passId, status: 'Rejected', rejectionReason: reason };
    }
    return api.patch(`/gate-pass/${passId}/reject`, { reason });
  },

  verifyGatePass: async (passId, actionType = 'ENTRY', gate = 'Main Security Gate 1') => {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 300));
      return {
        passId,
        verified: true,
        actionType,
        gate,
        timestamp: new Date().toLocaleString()
      };
    }
    return api.post(`/gate-pass/${passId}/verify`, { actionType, gate });
  }
};

export default gatePassApi;
