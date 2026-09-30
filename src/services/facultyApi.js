import api, { IS_DEMO_MODE } from './api';

export const facultyApi = {
  getOverview: async () => {
    if (IS_DEMO_MODE) {
      return {
        assignedCourses: 3,
        totalStudents: 180,
        pendingAssignments: 14,
        attendanceAlerts: 8,
        courses: [
          { code: 'CS501', name: 'Computer Networks', semester: '5th Sem', students: 68, avgAttendance: '78%' },
          { code: 'CS302', name: 'Data Structures & Algorithms', semester: '3rd Sem', students: 62, avgAttendance: '82%' },
          { code: 'CS701', name: 'Cloud Computing & Distributed Systems', semester: '7th Sem', students: 50, avgAttendance: '86%' }
        ]
      };
    }
    return api.get('/faculty/overview');
  },

  simulateModuleUpload: async (fileName, moduleTitle) => {
    if (IS_DEMO_MODE) {
      return {
        success: true,
        fileName,
        moduleTitle,
        generatedNotes: `Comprehensive notes generated for ${moduleTitle}. 14 key concepts indexed.`,
        generatedQuestions: [
          'Explain the fundamental difference between Link-State and Distance-Vector protocols.',
          'Calculate the subnet mask for 5 subnets with 30 hosts each.',
          'How does selective repeat ARQ handle lost acknowledgements?'
        ],
        generatedQuiz: [
          { q: 'Which header field prevents packet looping in IPv4?', ans: 'Time to Live (TTL)' },
          { q: 'What is the default port for HTTPS?', ans: '443' }
        ]
      };
    }
    return api.post('/faculty/modules/upload', { fileName, moduleTitle });
  }
};

export default facultyApi;
