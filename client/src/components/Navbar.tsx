import React from "react";
import "../styles/navbar.css";

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateHome, onNavigateBooking }) => {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo & Title */}
        <div 
          onClick={onNavigateHome}
          className="navbar-brand"
        >
          <div className="navbar-logo-badge">
            SG
          </div>
          <div>
            <h1 className="navbar-title gold-gradient-text">
              SWARNIM GARBA
            </h1>
            <p className="navbar-subtitle">
              Navratri Mahotsav 2026
            </p>
          </div>
        </div>

        {/* Customer CTA Button */}
        <nav className="navbar-nav">
          <button
            onClick={onNavigateBooking}
            className="nav-cta-btn"
          >
            <span>Book Tickets</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};
