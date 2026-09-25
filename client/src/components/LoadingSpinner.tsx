import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading events...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
      <div className="w-12 h-12 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mb-4 shadow-sm"></div>
      <p className="text-gray-600 font-medium animate-pulse">{message}</p>
    </div>
  );
};
