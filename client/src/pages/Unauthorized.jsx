import React from "react";
import { useNavigate } from "react-router-dom";
import "./Unauthorized.css";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1>❌ Unauthorized</h1>
        <p>You don't have permission to access this page.</p>
        <button onClick={() => navigate("/login")} className="btn-home">
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
