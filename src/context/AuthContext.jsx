import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS } from '../data/demoData';
import { authApi } from '../services/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campus_os_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.student;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('campus_os_token') || 'demo_jwt_token_student_active';
  });

  const [role, setRole] = useState(() => {
    const saved = localStorage.getItem('campus_os_user');
    return saved ? JSON.parse(saved).role : 'STUDENT';
  });

  const isAuthenticated = Boolean(user && token);

  useEffect(() => {
    if (user) {
      localStorage.setItem('campus_os_user', JSON.stringify(user));
      setRole(user.role);
    } else {
      localStorage.removeItem('campus_os_user');
      setRole(null);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('campus_os_token', token);
    } else {
      localStorage.removeItem('campus_os_token');
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await authApi.login(email, password);
    setUser(response.user);
    setToken(response.token);
    return response.user;
  };

  const loginWithOtp = async (identifier, otp, selectedRole = 'STUDENT') => {
    const response = await authApi.verifyOtp(identifier, otp, selectedRole);
    setUser(response.user);
    setToken(response.token);
    return response.user;
  };

  const registerStudent = async (studentData) => {
    const response = await authApi.register(studentData);
    setUser(response.user);
    setRole('STUDENT');
    setToken(response.token);
    return response.user;
  };

  const switchRole = (newRole) => {
    const roleKey = newRole.toLowerCase();
    const targetUser = DEMO_USERS[roleKey] || DEMO_USERS.student;
    setUser(targetUser);
    setRole(targetUser.role);
    setToken(`demo_jwt_token_${targetUser.role.toLowerCase()}_switched`);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem('campus_os_user');
    localStorage.removeItem('campus_os_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        isAuthenticated,
        login,
        loginWithOtp,
        registerStudent,
        switchRole,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
