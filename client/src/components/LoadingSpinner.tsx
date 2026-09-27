import React from "react";
import "../styles/legacycomponents.css";

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner-element"></div>
    </div>
  );
};
