import React from "react";
import { DashboardLayout } from "../components/DashboardLayout";

export const SuperAdminDashboard: React.FC = () => {
  return (
    <DashboardLayout
      roleTitle="Super Admin"
      roleSubtitle="System & Administration Console"
    >
      <div className="dashboard-card">
        <h2 className="dashboard-card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          Super Admin Console
        </h2>
        <p className="dashboard-role-description">
          This dashboard is for Super Admin. Full administrative control over users, event pricing, logs, and system operations.
        </p>

        <div className="dashboard-grid">
          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Event Status</span>
            <span className="dashboard-stat-value" style={{ color: '#10b981' }}>Live</span>
            <span className="dashboard-stat-desc">11 – 20 October 2026</span>
          </div>

          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Ticket Base Price</span>
            <span className="dashboard-stat-value">₹200</span>
            <span className="dashboard-stat-desc">Standard Pass Category</span>
          </div>

          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Active Modules</span>
            <span className="dashboard-stat-value">4 Roles</span>
            <span className="dashboard-stat-desc">Super Admin, Event, Counter, Security</span>
          </div>

          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Venue Location</span>
            <span className="dashboard-stat-value" style={{ fontSize: '1.1rem', marginTop: '0.25rem' }}>Bardoli Ground</span>
            <span className="dashboard-stat-desc">Station Road, Bardoli, Surat</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
