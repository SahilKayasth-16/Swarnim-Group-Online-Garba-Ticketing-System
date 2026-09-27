import React from "react";
import "../styles/loadingskeleton.css";

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-shimmer-box">
        <div className="skeleton-line-title"></div>
        <div className="skeleton-line-sub"></div>
      </div>
      <div className="skeleton-block-main"></div>
      <p className="skeleton-msg">Loading Mahotsav Experience...</p>
    </div>
  );
};
