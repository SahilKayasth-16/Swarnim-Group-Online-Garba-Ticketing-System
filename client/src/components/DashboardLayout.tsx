import React from "react";
import { useAuth } from "../context/useAuth";
import "../styles/dashboard.css";

interface DashboardLayoutProps {
  roleTitle: string;
  roleSubtitle?: string;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  roleTitle,
  roleSubtitle,
  children,
}) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.hash = "";
  };

  const handleGoHome = () => {
    window.location.hash = "";
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="dashboard-wrapper">
      {/* Top Banner / Header Card */}
      <div className="dashboard-header-card">
        <div className="dashboard-user-info">
          <div className="dashboard-avatar">
            {userInitial}
          </div>
          <div className="dashboard-titles">
            <span className="dashboard-role-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              {roleTitle}
            </span>
            <h1 className="dashboard-greeting">
              Welcome, {user?.name || "Staff Member"}
            </h1>
            <p className="dashboard-email">
              {user?.email} • {user?.contact_number}
              {roleSubtitle && ` • ${roleSubtitle}`}
            </p>
          </div>
        </div>

        <div className="dashboard-actions">
          <button
            onClick={handleGoHome}
            className="btn-dash-action btn-dash-home"
            title="Return to Public Homepage"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Public Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="btn-dash-action btn-dash-logout"
            title="Log Out of Account"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Role Content */}
      <div>{children}</div>
    </div>
  );
};
