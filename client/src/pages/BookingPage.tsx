import React, { useState } from "react";
import { BookingForm } from "../components/BookingForm";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { TicketConfirmation } from "../components/TicketConfirmation";
import { createDemoBooking } from "../services/api";
import type { DemoBookingData, DemoBookingRequest, ToastMessage } from "../types";
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
  const [bookingSuccessData, setBookingSuccessData] = useState<DemoBookingData | null>(null);

  const handleBookingSubmit = async (payload: DemoBookingRequest) => {
    setIsProcessing(true);
    try {
      // Simulate demo payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const responseData = await createDemoBooking(payload);
      setBookingSuccessData(responseData);

      onShowToast({
        id: Date.now().toString(),
        type: "success",
        title: "PAYMENT SUCCESSFUL",
        message: "Payment successful! Your tickets have been booked.",
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Payment failed. Please try again.";
      onShowToast({
        id: Date.now().toString(),
        type: "error",
        title: "PAYMENT ERROR",
        message,
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
        <button
          onClick={onGoHome}
          className="back-btn"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

