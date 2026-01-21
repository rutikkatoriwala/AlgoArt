import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const [emailOrEnrollment, setEmailOrEnrollment] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const { login, loading, error: authError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    // Validation
    if (!emailOrEnrollment.trim()) {
      setLocalError("Please enter your email or enrollment number");
      return;
    }
    if (!password) {
      setLocalError("Please enter your password");
      return;
    }
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await login(emailOrEnrollment, password);
      const role = response.user.role;

      // Role-based routing
      if (role === "owner") {
        navigate("/owner-dashboard");
      } else if (role === "coordinator") {
        navigate("/coordinator-dashboard");
      }
    } catch (err) {
      // Error is already set in context
    }
  };

  const displayError = localError || authError;

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>TechFest</h1>
          <p>Tech Fest Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {displayError && <div className="error-message">{displayError}</div>}

          <div className="form-group">
            <label htmlFor="emailOrEnrollment">Email or Enrollment Number</label>
            <input
              id="emailOrEnrollment"
              type="text"
              placeholder="Enter your email or enrollment number"
              value={emailOrEnrollment}
              onChange={(e) => setEmailOrEnrollment(e.target.value)}
              disabled={loading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-info">
          <p className="info-text">
            <strong>Demo Credentials:</strong>
          </p>
          <p className="info-text">
            Owner: panchalparangi@gmail.com / password123
          </p>
          <p className="info-text">
            Coordinator: coordinator@techfest.com / password123
          </p>
        </div>

        <div className="role-info">
          <h3>User Roles:</h3>
          <div className="roles-container">
            <div className="role-card owner-role">
              <h4>👤 Owner</h4>
              <ul>
                <li>Manage own team</li>
                <li>View team details</li>
                <li>Check rankings</li>
              </ul>
            </div>
            <div className="role-card coordinator-role">
              <h4>🎯 Coordinator</h4>
              <ul>
                <li>View all teams</li>
                <li>Create events</li>
                <li>Assign points</li>
                <li>View leaderboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
