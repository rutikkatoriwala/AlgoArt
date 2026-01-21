import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import OwnerDashboard from "./pages/OwnerDashboard";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
import Unauthorized from "./pages/Unauthorized";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/owner-dashboard"
            element={
              <ProtectedRoute requiredRole="owner">
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/coordinator-dashboard"
            element={
              <ProtectedRoute requiredRole="coordinator">
                <CoordinatorDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
