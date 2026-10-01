import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campus_os_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.avatar) {
          parsed.avatar = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250';
          localStorage.setItem('campus_os_user', JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        return null;
      }
    }
    return null; 
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('campus_os_token') || null;
  });

  const [role, setRole] = useState(() => {
    const saved = localStorage.getItem('campus_os_user');
    return saved ? JSON.parse(saved).role : null;
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
    const userObj = response.user;
    if (userObj && !userObj.avatar) {
      userObj.avatar = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250';
    }
    setUser(userObj);
    setToken(response.token);
    return userObj;
  };

  const registerStudent = async (studentData) => {
    return await authApi.register(studentData);
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => {
      const updated = { ...(prev || {}), ...updatedFields };
      localStorage.setItem('campus_os_user', JSON.stringify(updated));
      return updated;
    });
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
        registerStudent,
        updateUserProfile,
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
