import React from "react";
import { useAuth } from "../context/useAuth";
import { LoadingSkeleton } from "./LoadingSkeleton";
import type { UserRole } from "../types";
import "../styles/dashboard.css";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  children: React.ReactNode;
}

const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: "Super Admin",
  event_admin: "Event Admin",
  counter_operator: "Counter Operator",
  security_staff: "Security Staff",
};

const ROLE_DASHBOARD_ROUTES: Record<UserRole, string> = {
  super_admin: "#dashboard/super-admin",
  event_admin: "#dashboard/event-admin",
  counter_operator: "#dashboard/counter-operator",
  security_staff: "#dashboard/security",
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="access-denied-container">
        <div className="access-denied-card">
          <div className="access-denied-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h2 className="access-denied-title">Authentication Required</h2>
          <p className="access-denied-text">
            You must be logged in with appropriate staff credentials to access this dashboard.
          </p>
          <div className="access-denied-buttons">
            <button
              onClick={() => { window.location.hash = "#login"; }}
              className="btn-dash-action btn-dash-home"
            >
              Go to Login
            </button>
            <button
              onClick={() => { window.location.hash = ""; }}
              className="btn-dash-action btn-dash-home"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const userRoleLabel = ROLE_LABELS[user.role] || user.role;
    const myDashboardRoute = ROLE_DASHBOARD_ROUTES[user.role] || "";

    return (
      <div className="access-denied-container">
        <div className="access-denied-card">
          <div className="access-denied-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <h2 className="access-denied-title">Access Restricted</h2>
          <p className="access-denied-text">
            Your current account role ({userRoleLabel}) does not have permission to view this section.
          </p>
          <div className="access-denied-buttons">
            {myDashboardRoute && (
              <button
                onClick={() => { window.location.hash = myDashboardRoute; }}
                className="btn-dash-action btn-dash-home"
              >
                Go to My Dashboard
              </button>
            )}
            <button
              onClick={() => { window.location.hash = ""; }}
              className="btn-dash-action btn-dash-home"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
