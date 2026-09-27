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
    } catch (err: any) {
      onShowToast({
        id: Date.now().toString(),
        type: "error",
        title: "PAYMENT ERROR",
        message: err.message || "Payment failed. Please try again.",
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
          <span>Back to Mahotsav Overview</span>
        </button>

        <span className="booking-trust-note">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>256-bit Encrypted Checkout</span>
        </span>
      </div>

      {isProcessing ? (
        <LoadingSkeleton />
      ) : bookingSuccessData ? (
        <TicketConfirmation
          booking={bookingSuccessData}
          onBookMore={handleBookMore}
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
