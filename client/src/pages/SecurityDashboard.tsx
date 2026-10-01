import React from "react";
import { DashboardLayout } from "../components/DashboardLayout";

export const SecurityDashboard: React.FC = () => {
  return (
    <DashboardLayout
      roleTitle="Security Staff"
      roleSubtitle="Gate Access & Entry Verification"
    >
      <div className="dashboard-card">
        <h2 className="dashboard-card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          Security & Access Checkpoint
        </h2>
        <p className="dashboard-role-description">
          This dashboard is for Security Staff. Verify attendee QR passes, control gate flow, and monitor venue entry points.
        </p>

        <div className="dashboard-grid">
          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Main Gate Status</span>
            <span className="dashboard-stat-value">Configured</span>
            <span className="dashboard-stat-desc">
              Station Road Main Entrance
            </span>
          </div>

          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Pass Validation</span>
            <span
              className="dashboard-stat-value"
              style={{ fontSize: "1.25rem" }}
            >
              Validation Module
            </span>
            <span className="dashboard-stat-desc">
              QR verification will be connected to ticket records
            </span>
          </div>

          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Festival Span</span>
            <span className="dashboard-stat-value">11 – 20 Oct</span>
            <span className="dashboard-stat-desc">2026 Season Schedule</span>
          </div>

          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Pass Validation</span>
            <span
              className="dashboard-stat-value"
              style={{ fontSize: "1.25rem" }}
            >
              Validation Module
            </span>
            <span className="dashboard-stat-desc">
              QR verification will be connected to ticket records
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
