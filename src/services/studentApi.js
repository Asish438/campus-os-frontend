import api, { IS_DEMO_MODE } from './api';
import { DEMO_USERS, INITIAL_TODAYS_CLASSES, INITIAL_NOTICES, INITIAL_ASSIGNMENTS } from '../data/demoData';

export const studentApi = {
  getDashboardData: async () => {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 200));
      return {
        student: DEMO_USERS.student,
        todaysClasses: INITIAL_TODAYS_CLASSES,
        notices: INITIAL_NOTICES,
        assignments: INITIAL_ASSIGNMENTS
      };
    }
    return api.get('/student/dashboard');
  },

  getProfile: async () => {
    if (IS_DEMO_MODE) {
      return DEMO_USERS.student;
    }
    return api.get('/student/profile');
  },

  getDocuments: async () => {
    if (IS_DEMO_MODE) {
      return [
        { id: 'doc_1', name: 'Monsoon 2026 Grade Card (Sem 4)', type: 'PDF', date: '2026-07-15', size: '1.2 MB' },
        { id: 'doc_2', name: 'Identity Card & Library Pass', type: 'Digital Pass', date: '2024-08-01', size: '420 KB' },
        { id: 'doc_3', name: 'Hostel Allotment Order - Room 304', type: 'PDF', date: '2024-08-10', size: '850 KB' },
        { id: 'doc_4', name: 'Anti-Ragging Undertaking', type: 'Signed PDF', date: '2024-08-05', size: '610 KB' }
      ];
    }
    return api.get('/student/documents');
  }
};

export default studentApi;
