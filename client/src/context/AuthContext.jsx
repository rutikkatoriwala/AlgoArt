import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/api/auth";

  // Verify token on mount
  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, []);

  const verifyToken = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
      setError(null);
    } catch (err) {
      console.error("Token verification failed:", err);
      setToken(null);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (fullName, email, enrollmentNo, password, role, teamId = null) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_URL}/register`, {
        fullName,
        email,
        enrollmentNo,
        password,
        role,
        teamId,
      });

      const { token: newToken, user: userData } = response.data;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem("token", newToken);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (emailOrEnrollment, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_URL}/login`, {
        emailOrEnrollment,
        password,
      });

      const { token: newToken, user: userData } = response.data;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem("token", newToken);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    setError(null);
  };

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
