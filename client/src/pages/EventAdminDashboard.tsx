import React from "react";
import { DashboardLayout } from "../components/DashboardLayout";

export const EventAdminDashboard: React.FC = () => {
  return (
    <DashboardLayout
      roleTitle="Event Admin"
      roleSubtitle="Event Management & Scheduling"
    >
      <div className="dashboard-card">
        <h2 className="dashboard-card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Event Operations Panel
        </h2>
        <p className="dashboard-role-description">
          This dashboard is for Event Admin. Manage event festival dates, artist schedules, pass capacities, and venue allocations.
        </p>

        <div className="dashboard-grid">
          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Festival Span</span>
            <span className="dashboard-stat-value">10 Nights</span>
            <span className="dashboard-stat-desc">11 October to 20 October 2026</span>
          </div>

          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Daily Capacity</span>
            <span className="dashboard-stat-value">5,000</span>
            <span className="dashboard-stat-desc">Ground capacity per evening</span>
          </div>

          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Show Timings</span>
            <span className="dashboard-stat-value" style={{ fontSize: '1.2rem' }}>7:30 PM - Late</span>
            <span className="dashboard-stat-desc">Nightly Aarti at 7:30 PM</span>
          </div>

          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Booking Flow</span>
            <span className="dashboard-stat-value" style={{ color: '#10b981' }}>Enabled</span>
            <span className="dashboard-stat-desc">Online & Cash Reservations</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
