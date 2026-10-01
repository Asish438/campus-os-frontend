import api from './api';

export const adminApi = {
  getSystemMetrics: async () => {
    return api.get('/dashboard/admin');
  },

  getAuditLogs: async () => {
    return api.get('/audit-logs');
  }
};

export default adminApi;
