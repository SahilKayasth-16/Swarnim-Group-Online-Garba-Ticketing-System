import React from "react";
import "../styles/legacycomponents.css";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="error-card-box">
      <h4 className="error-title-text">Error</h4>
      <p className="error-desc-text">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="back-btn" style={{ marginTop: '1rem' }}>
          Try Again
        </button>
      )}
    </div>
  );
};
