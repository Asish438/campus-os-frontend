import api, { IS_DEMO_MODE } from './api';
import { INITIAL_ATTENDANCE, calculateAttendanceImpact } from '../data/demoData';

export const attendanceApi = {
  getAttendance: async () => {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 200));
      return INITIAL_ATTENDANCE;
    }
    return api.get('/student/attendance');
  },

  calculateProjection: async (conducted, attended, targetPct = 75) => {
    if (IS_DEMO_MODE) {
      return calculateAttendanceImpact(conducted, attended, targetPct);
    }
    return api.post('/student/attendance/calculate', { conducted, attended, targetPct });
  }
};

export default attendanceApi;
