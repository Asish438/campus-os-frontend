import api, { IS_DEMO_MODE } from './api';

export const adminApi = {
  getSystemMetrics: async () => {
    if (IS_DEMO_MODE) {
      return {
        totalStudents: 4850,
        pendingRequests: 42,
        openComplaints: 18,
        overdueComplaints: 3,
        studentsBelow75: 312,
        pendingFees: '₹48.6L',
        activeGatePasses: 64,
        visitorsToday: 29,
        activeBuses: 12,
        departments: [
          { name: 'Computer Science', students: 1240, faculty: 48, avgAtt: '81%' },
          { name: 'Electronics & Comm.', students: 980, faculty: 38, avgAtt: '76%' },
          { name: 'Mechanical Engg.', students: 780, faculty: 32, avgAtt: '74%' },
          { name: 'Civil Engg.', students: 620, faculty: 26, avgAtt: '73%' },
          { name: 'Management Studies', students: 1230, faculty: 45, avgAtt: '84%' }
        ]
      };
    }
    return api.get('/admin/metrics');
  },

  getAuditLogs: async () => {
    if (IS_DEMO_MODE) {
      return [
        { id: 'AUD-901', timestamp: '2026-09-30 01:45 PM', actor: 'Dr. S. K. Patnaik', action: 'BATCH_ATTENDANCE_OVERRIDE', target: 'CS503 Sec B', ip: '10.20.1.14' },
        { id: 'AUD-900', timestamp: '2026-09-30 11:15 AM', actor: 'Col. Rajesh Sharma', action: 'GATE_PASS_APPROVED', target: 'GP-2026-8841', ip: '10.20.4.88' },
        { id: 'AUD-899', timestamp: '2026-09-30 09:30 AM', actor: 'Priyanka Das', action: 'FEE_RECEIPT_GENERATED', target: 'RCP-2026-944', ip: '10.20.2.11' },
        { id: 'AUD-898', timestamp: '2026-09-29 08:30 AM', actor: 'AI_AGENT_PIPELINE', action: 'AUTO_CLASSIFY_COMPLAINT', target: 'CMP-2026-104', ip: '127.0.0.1' }
      ];
    }
    return api.get('/admin/audit-logs');
  }
};

export default adminApi;
