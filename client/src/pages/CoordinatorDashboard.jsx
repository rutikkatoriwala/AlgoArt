import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const CoordinatorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">TechFest - Coordinator Dashboard</div>
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
          <div className="card coordinator-card">
            <h3>👤 Your Information</h3>
            <p><strong>Name:</strong> {user?.fullName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Enrollment:</strong> {user?.enrollmentNo}</p>
            <p><strong>Role:</strong> Tech Coordinator</p>
          </div>

          <div className="card coordinator-card">
            <h3>🎯 Your Permissions</h3>
            <ul className="permissions-list">
              <li>✓ View all teams</li>
              <li>✓ View all technocrats</li>
              <li>✓ Create events</li>
              <li>✓ Assign points</li>
              <li>✓ Add results</li>
              <li>✓ View leaderboard</li>
            </ul>
          </div>

          <div className="card coordinator-card">
            <h3>🎪 Event Management</h3>
            <button className="action-btn">Create Event</button>
            <button className="action-btn">View All Events</button>
            <button className="action-btn">Manage Results</button>
          </div>

          <div className="card coordinator-card">
            <h3>📊 Management Tools</h3>
            <button className="action-btn">View All Teams</button>
            <button className="action-btn">Assign Points</button>
            <button className="action-btn">View Leaderboard</button>
          </div>

          <div className="card coordinator-card">
            <h3>👥 Team Management</h3>
            <button className="action-btn">View Technocrats</button>
            <button className="action-btn">Register Teams</button>
            <button className="action-btn">Manage Participants</button>
          </div>

          <div className="card coordinator-card">
            <h3>📈 Statistics</h3>
            <p>Total Teams: <strong>--</strong></p>
            <p>Total Events: <strong>--</strong></p>
            <p>Active Participants: <strong>--</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
