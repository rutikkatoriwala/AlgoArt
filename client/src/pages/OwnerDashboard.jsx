import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const OwnerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">TechFest - Owner Dashboard</div>
        <div className="nav-right">
          <span className="user-info">Welcome, {user?.fullName}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome, {user?.fullName}! 👋</h1>
          <p>You are logged in as: <strong>{user?.role.toUpperCase()}</strong></p>
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <h3>📋 Team Information</h3>
            <p><strong>Name:</strong> {user?.fullName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Enrollment:</strong> {user?.enrollmentNo}</p>
            <p><strong>Team ID:</strong> {user?.teamId || "Not assigned"}</p>
          </div>

          <div className="card">
            <h3>📊 Your Permissions</h3>
            <ul className="permissions-list">
              <li>✓ Manage your team</li>
              <li>✓ View team details</li>
              <li>✓ Check rankings</li>
              <li>✓ View leaderboard</li>
              <li>✗ Cannot create events</li>
              <li>✗ Cannot assign points</li>
            </ul>
          </div>

          <div className="card">
            <h3>🎯 Quick Actions</h3>
            <button className="action-btn">View Team Details</button>
            <button className="action-btn">Check Leaderboard</button>
            <button className="action-btn">View Results</button>
          </div>

          <div className="card">
            <h3>📝 Recent Activities</h3>
            <p>No recent activities yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
