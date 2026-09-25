import React from "react";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "Unable to load events. Please try again.",
  message,
  onRetry,
}) => {
  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-rose-50 border border-rose-200 rounded-xl text-center shadow-sm">
      <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
        ⚠️
      </div>
      <h3 className="text-lg font-bold text-rose-800 mb-1">{title}</h3>
      <p className="text-sm text-rose-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-colors shadow-sm"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
