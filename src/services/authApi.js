import api from './api';

export const authApi = {
  // Login directly returns token and user
  login: async (email, password) => {
    try {
      const data = await api.post('/auth/login', { email, password });
      
      const token = data.token;
      const user = {
        id: data.userId,
        userId: data.userId,
        name: data.name,
        fullName: data.name,
        email: data.email,
        role: (data.role || 'STUDENT').toUpperCase(),
        studentId: data.role === 'STUDENT' ? '2026BCSE042' : undefined,
        employeeId: data.role === 'FACULTY' ? 'EMP-CSE-108' : data.role === 'WARDEN' ? 'WAR-ARY-01' : undefined
      };

      if (token) {
        localStorage.setItem('campus_os_token', token);
        localStorage.setItem('campus_os_user', JSON.stringify(user));
      }

      return { user, token, message: data.message || 'Login successful' };
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Invalid email or password');
    }
  },

  // Register directly registers without OTP
  register: async (studentData) => {
    try {
      const payload = {
        name: studentData.fullName || studentData.name,
        email: studentData.email,
        password: studentData.password,
        role: studentData.role || 'STUDENT'
      };

      const data = await api.post('/auth/register', payload);
      return { message: data.message || 'Registration successful' };
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  },

  getProfile: async () => {
    const stored = localStorage.getItem('campus_os_user');
    return stored ? JSON.parse(stored) : null;
  }
};

export default authApi;
