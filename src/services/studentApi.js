import api from './api';

export const studentApi = {
  /**
   * GET /api/dashboard/student/{studentId}
   */
  getDashboardData: async (studentId = 1) => {
    try {
      const [dash, attSummary, notices, assignments, courses] = await Promise.all([
        api.get(`/dashboard/student/${studentId}`),
        api.get(`/attendance/summary/student/${studentId}`),
        api.get('/notices/active'),
        api.get('/assignments'),
        api.get('/courses')
      ]);

      return {
        ...dash,
        attendance: attSummary,
        notices: Array.isArray(notices) ? notices : [],
        assignments: Array.isArray(assignments) ? assignments : [],
        courses: Array.isArray(courses) ? courses : []
      };
    } catch (err) {
      console.warn('[studentApi] Error loading dashboard data:', err);
      return {
        attendance: null,
        notices: [],
        assignments: [],
        courses: []
      };
    }
  },

  /**
   * GET /api/students/user/{userId}
   */
  getProfile: async (userId = 1) => {
    return api.get(`/students/user/${userId}`);
  },

  /**
   * GET /api/documents/student/{studentId}
   */
  getDocuments: async (studentId = 1) => {
    try {
      const docs = await api.get(`/documents/student/${studentId}`);
      return Array.isArray(docs) ? docs : [];
    } catch (err) {
      return [];
    }
  },

  /**
   * GET /api/courses
   */
  getCourses: async () => {
    return api.get('/courses');
  },

  /**
   * GET /api/assignments
   */
  getAssignments: async () => {
    return api.get('/assignments');
  },

  /**
   * POST /api/submissions
   */
  submitAssignment: async (payload) => {
    return api.post('/submissions', payload);
  },

  /**
   * GET /api/study-materials
   */
  getStudyMaterials: async (courseId) => {
    if (courseId) {
      return api.get(`/study-materials/course/${courseId}`);
    }
    return api.get('/study-materials');
  }
};

export default studentApi;

