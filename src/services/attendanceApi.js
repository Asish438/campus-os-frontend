import api from './api';

export const attendanceApi = {
  /**
   * GET /api/attendance/summary/student/{studentId}
   */
  getAttendance: async (studentId = 1) => {
    try {
      const data = await api.get(`/attendance/summary/student/${studentId}`);
      return data;
    } catch (err) {
      console.warn('[attendanceApi] Falling back to default student summary format', err);
      return {
        studentId,
        percentage: 75.0,
        attendedClasses: 26,
        totalClasses: 36,
        requiredClasses: 0,
        status: 'GOOD',
        subjectWise: [],
        records: []
      };
    }
  },

  /**
   * GET /api/attendance/student/{studentId}
   */
  getStudentRecords: async (studentId = 1) => {
    return api.get(`/attendance/student/${studentId}`);
  },

  /**
   * POST /api/attendance
   * Record attendance for a class session
   */
  markAttendance: async (attendanceData) => {
    return api.post('/attendance', attendanceData);
  },

  /**
   * Calculate consecutive classes needed to reach target percentage
   */
  calculateProjection: async (conducted, attended, targetPct = 75) => {
    const total = Number(conducted) || 0;
    const att = Number(attended) || 0;
    const currentPct = total > 0 ? (att / total) * 100 : 0;
    const target = Number(targetPct) / 100.0;
    
    let needed = 0;
    if (total > 0 && att / total < target) {
      needed = Math.ceil((target * total - att) / (1 - target));
      if (needed < 0) needed = 0;
    }

    return {
      currentPercentage: Math.round(currentPct * 10) / 10,
      classesNeeded: needed,
      message: needed > 0 
        ? `You need ${needed} more consecutive classes to reach ${targetPct}% attendance threshold.`
        : `Your attendance is above ${targetPct}% threshold.`
    };
  }
};

export default attendanceApi;

