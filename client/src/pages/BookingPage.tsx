import React, { useState } from "react";
import { BookingForm } from "../components/BookingForm";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { TicketConfirmation } from "../components/TicketConfirmation";
import type { BookingData, ToastMessage } from "../types";
import "../styles/bookingpage.css";

interface BookingPageProps {
  onShowToast: (toast: ToastMessage) => void;
  onGoHome: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  onShowToast,
  onGoHome,
}) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [bookingSuccessData, setBookingSuccessData] =
    useState<BookingData | null>(null);

  const handleBookingSubmit = async (): Promise<void> => {
    setIsProcessing(true);

    try {
      /*
       * Real booking creation will be connected after the booking
       * request/response contract is finalized.
       *
       * The previous demo booking API and simulated payment flow
       * have intentionally been removed.
       */
      onShowToast({
        id: Date.now().toString(),
        type: "info",
        title: "BOOKING FLOW UPDATING",
        message:
          "The booking flow is being connected to the actual ticketing system.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBookMore = () => {
    setBookingSuccessData(null);
  };

  return (
    <div className="booking-page-container">
      <div className="booking-header-bar">
        <button onClick={onGoHome} className="back-btn">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>

          <span>Back to Event Details</span>
        </button>
      </div>

      {isProcessing ? (
        <LoadingSkeleton />
      ) : bookingSuccessData ? (
        <TicketConfirmation
          booking={bookingSuccessData}
          onBookMore={handleBookMore}
          onGoHome={onGoHome}
        />
      ) : (
        <BookingForm
          onSubmit={handleBookingSubmit}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
};