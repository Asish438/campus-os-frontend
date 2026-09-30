import api from './api';
import { DEMO_USERS } from '../data/demoData';

const BACKEND_URL = 'http://localhost:8080/api';

export const authApi = {
  /**
   * POST http://localhost:8080/api/auth/login
   * Authenticates user against Spring Boot backend via Axios
   */
  login: async (email, password) => {
    console.info(`[Axios POST] Requesting ${BACKEND_URL}/auth/login with credentials:`, { email });
    try {
      // Direct Axios POST request to Spring Boot backend
      const data = await api.post('/auth/login', {
        email,
        password,
        username: email,
        identifier: email
      });

      console.info(`[Axios POST] ${BACKEND_URL}/auth/login SUCCESS:`, data);

      // Handle standard Spring Boot token response formats
      const token = data.token || data.accessToken || data.jwt || `jwt_${Date.now()}`;
      let user = data.user;

      if (!user) {
        // If Spring Boot returns flat object { token, role, email, name, ... }
        const roleStr = data.role || (Array.isArray(data.roles) ? data.roles[0] : 'STUDENT');
        const roleKey = typeof roleStr === 'string' ? roleStr.replace('ROLE_', '').toUpperCase() : 'STUDENT';
        const defaultUser = DEMO_USERS[roleKey.toLowerCase()] || DEMO_USERS.student;

        user = {
          ...defaultUser,
          id: data.id || defaultUser.id,
          email: data.email || email,
          name: data.name || data.fullName || defaultUser.name,
          fullName: data.fullName || data.name || defaultUser.fullName,
          studentId: data.studentId || data.rollNo || defaultUser.studentId,
          role: roleKey
        };
      }

      return { user, token, source: 'BACKEND_API' };
    } catch (err) {
      console.warn(`[Axios POST] Request to ${BACKEND_URL}/auth/login failed:`, err.message);

      // If backend explicitly responded with 401 Unauthorized or 400 Bad Request
      if (err.response && (err.response.status === 401 || err.response.status === 400 || err.response.status === 403)) {
        const serverError = err.response.data?.message || err.response.data?.error || 'Invalid credentials returned by backend.';
        throw new Error(serverError);
      }

      // If network error (Backend offline or connection refused on localhost:8080)
      console.info(`[Axios Fallback] Spring Boot backend at ${BACKEND_URL} not reachable. Falling back to Demo Mode.`);
      
      const demoUser = Object.values(DEMO_USERS).find(
        u => (u.email.toLowerCase() === email.toLowerCase() || u.studentId?.toLowerCase() === email.toLowerCase()) && u.password === password
      );

      if (demoUser) {
        const token = `demo_jwt_token_${demoUser.role.toLowerCase()}_${Date.now()}`;
        return { user: demoUser, token, source: 'DEMO_FALLBACK' };
      }

      throw new Error(`Connection to ${BACKEND_URL}/auth/login refused and credentials not matched in demo registry.`);
    }
  },

  /**
   * POST http://localhost:8080/api/auth/register
   * Registers new student account on Spring Boot backend via Axios
   */
  register: async (studentData) => {
    console.info(`[Axios POST] Requesting ${BACKEND_URL}/auth/register with payload:`, studentData);
    try {
      const payload = {
        fullName: studentData.fullName,
        name: studentData.fullName,
        email: studentData.email,
        password: studentData.password,
        phone: studentData.phone,
        studentId: studentData.studentId,
        rollNo: studentData.studentId,
        program: studentData.program || 'B.Tech',
        department: studentData.department || 'Computer Science & Engineering',
        year: studentData.year || '1st Year',
        semester: studentData.semester || 'Semester 1',
        hostel: studentData.hostel || 'Aryabhatta Hall of Residence',
        room: studentData.room || 'Room 101',
        role: 'STUDENT'
      };

      // Direct Axios POST request to Spring Boot backend
      const data = await api.post('/auth/register', payload);
      console.info(`[Axios POST] ${BACKEND_URL}/auth/register SUCCESS:`, data);

      const token = data.token || data.accessToken || `jwt_reg_${Date.now()}`;
      let user = data.user;

      if (!user) {
        user = {
          ...studentData,
          id: data.id || `usr_stu_${Date.now()}`,
          name: studentData.fullName?.split(' ')[0] || 'Student',
          role: 'STUDENT',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
          cgpa: '8.50'
        };
      }

      return { user, token, source: 'BACKEND_API' };
    } catch (err) {
      console.warn(`[Axios POST] Request to ${BACKEND_URL}/auth/register failed:`, err.message);

      // If backend explicitly rejected registration (e.g. email already exists 409 or validation failure 400)
      if (err.response && (err.response.status === 400 || err.response.status === 409)) {
        const serverError = err.response.data?.message || err.response.data?.error || 'Registration rejected by backend.';
        throw new Error(serverError);
      }

      // Fallback for offline backend
      console.info(`[Axios Fallback] Spring Boot backend at ${BACKEND_URL} not reachable. Provisioning local student session.`);
      const fallbackUser = {
        id: `usr_stu_${Date.now()}`,
        name: studentData.fullName?.split(' ')[0] || 'Student',
        fullName: studentData.fullName || 'Student Scholar',
        email: studentData.email,
        password: studentData.password,
        role: 'STUDENT',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        studentId: studentData.studentId || `BPUT2026${Math.floor(100 + Math.random() * 900)}`,
        program: studentData.program || 'B.Tech',
        department: studentData.department || 'Computer Science & Engineering',
        year: studentData.year || '1st Year',
        semester: studentData.semester || 'Semester 1',
        section: 'CSE-A',
        hostel: studentData.hostel || 'Aryabhatta Hall of Residence',
        room: studentData.room || 'Room 101',
        phone: studentData.phone || '+91 98765 43210',
        cgpa: '8.50'
      };

      const token = `demo_jwt_token_registered_${Date.now()}`;
      return { user: fallbackUser, token, source: 'DEMO_FALLBACK' };
    }
  },

  sendOtp: async (identifier) => {
    try {
      return await api.post('/auth/send-otp', { identifier });
    } catch (err) {
      console.warn('[Axios] /auth/send-otp fallback to demo OTP: 123456');
      return { success: true, message: 'OTP sent successfully! Demo OTP is 123456', demoOtp: '123456' };
    }
  },

  verifyOtp: async (identifier, otp, selectedRole = 'STUDENT') => {
    try {
      return await api.post('/auth/verify-otp', { identifier, otp, role: selectedRole });
    } catch (err) {
      if (otp === '123456') {
        const roleKey = selectedRole.toLowerCase();
        const user = DEMO_USERS[roleKey] || DEMO_USERS.student;
        const token = `demo_jwt_otp_${user.role.toLowerCase()}_${Date.now()}`;
        return { success: true, user, token, source: 'DEMO_FALLBACK' };
      }
      throw new Error('Invalid OTP. Use demo OTP 123456 or start backend service.');
    }
  },

  getProfile: async () => {
    try {
      return await api.get('/auth/me');
    } catch (err) {
      const stored = localStorage.getItem('campus_os_user');
      return stored ? JSON.parse(stored) : DEMO_USERS.student;
    }
  }
};

export default authApi;
