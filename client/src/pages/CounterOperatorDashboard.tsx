import React from "react";
import { DashboardLayout } from "../components/DashboardLayout";

export const CounterOperatorDashboard: React.FC = () => {
  return (
    <DashboardLayout
      roleTitle="Counter Operator"
      roleSubtitle="Box Office & Ticket Sales Desk"
    >
      <div className="dashboard-card">
        <h2 className="dashboard-card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            <line x1="6" y1="8" x2="6" y2="8"></line>
            <line x1="10" y1="8" x2="18" y2="8"></line>
            <line x1="6" y1="12" x2="18" y2="12"></line>
            <line x1="6" y1="16" x2="12" y2="16"></line>
          </svg>
          Counter Sales & Booking Desk
        </h2>
        <p className="dashboard-role-description">
          This dashboard is for Counter Operator. Process on-spot ticket bookings, collect cash/online payments, and print physical passes.
        </p>

        <div className="dashboard-grid">
          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Fast Action</span>
            <button
              onClick={() => { window.location.hash = "#book"; }}
              className="btn-dash-action btn-dash-home"
              style={{ marginTop: '0.5rem', width: 'fit-content' }}
            >
              Issue New Ticket
            </button>
            <span className="dashboard-stat-desc" style={{ marginTop: '0.25rem' }}>Open booking checkout modal</span>
          </div>

          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Accepted Modes</span>
            <span
              className="dashboard-stat-value"
              style={{ fontSize: "1.25rem" }}
            >
              Cash & Online
            </span>
            <span className="dashboard-stat-desc">
              Available booking payment methods
            </span>
          </div>

          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Ticket Pricing</span>
            <span className="dashboard-stat-value">Database Driven</span>
            <span className="dashboard-stat-desc">
              Price and booking limits are managed by the ticketing system
            </span>
          </div>

          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Desk Status</span>
            <span className="dashboard-stat-value">Configured</span>
            <span className="dashboard-stat-desc">
              Counter operator access is configured
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
