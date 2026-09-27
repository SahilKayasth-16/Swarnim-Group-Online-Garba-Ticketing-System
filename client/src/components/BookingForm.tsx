import React, { useState } from "react";
import type { DemoBookingRequest } from "../types";
import "../styles/bookingform.css";

interface BookingFormProps {
  onSubmit: (data: DemoBookingRequest) => void;
  isProcessing: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  onSubmit,
  isProcessing,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [eventDate] = useState<string>("11 October 2026");
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const pricePerTicket = 200;
  const totalAmount = quantity * pricePerTicket;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (quantity < 1 || quantity > 10) {
      setErrorMsg("Please select between 1 and 10 tickets.");
      return;
    }

    if (!eventDate) {
      setErrorMsg("Please verify the event date.");
      return;
    }

    if (!paymentMethod) {
      setErrorMsg("Please select a payment method.");
      return;
    }

    onSubmit({
      quantity,
      event_date: eventDate,
      payment_method: paymentMethod,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form-card">
      <div className="booking-form-header">
        <span className="booking-form-badge">
          DEMO BOOKING CHECKOUT
        </span>
        <h2 className="booking-form-title">
          BOOK YOUR TICKETS
        </h2>
        <p className="booking-form-sub">Swarnim Group Navratri Mahotsav 2026</p>
      </div>

      {errorMsg && (
        <div className="error-alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      <div>
        {/* 1. Number of tickets */}
        <div className="form-group">
          <label className="form-label">
            1. Number of Tickets (1–10)
          </label>
          <div className="stepper-container">
            <button
              type="button"
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="stepper-btn"
            >
              -
            </button>
            <div className="stepper-value-box">
              <span className="stepper-value">{quantity}</span>
              <span className="stepper-unit">Tickets</span>
            </div>
            <button
              type="button"
              onClick={handleIncrease}
              disabled={quantity >= 10}
              className="stepper-btn"
            >
              +
            </button>
          </div>

          {/* Quick Presets */}
          <div className="preset-buttons">
            {[1, 2, 4, 6, 10].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setQuantity(num)}
                className={`preset-btn ${quantity === num ? "preset-btn-active" : ""}`}
              >
                {num} {num === 1 ? "Ticket" : "Tickets"}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Date */}
        <div className="form-group">
          <label className="form-label form-label-left">
            2. Event Date
          </label>
          <div className="date-box">
            <span>{eventDate}</span>
            <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 700 }}>Fixed Event Date</span>
          </div>
        </div>

        {/* 3. Payment Method */}
        <div className="form-group">
          <label className="form-label form-label-left">
            3. Payment Method (Demo)
          </label>
          <div className="payment-grid">
            {[
              { id: "upi", label: "UPI", desc: "GPay / PhonePe / Paytm" },
              { id: "card", label: "Credit / Debit", desc: "Visa / MasterCard / RuPay" },
              { id: "netbanking", label: "Net Banking", desc: "All Major Indian Banks" },
            ].map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id)}
                className={`payment-card ${paymentMethod === method.id ? "payment-card-active" : ""}`}
              >
                <span>{method.label}</span>
                <span className="payment-sub">{method.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Live Summary */}
        <div className="summary-card">
          <div className="summary-row">
            <span>Ticket Price</span>
            <span className="summary-row-val">₹{pricePerTicket}</span>
          </div>
          <div className="summary-row">
            <span>Quantity</span>
            <span className="summary-row-val">{quantity}</span>
          </div>
          <div className="summary-divider">
            <div>
              <span className="summary-total-label">Total Amount</span>
            </div>
            <span className="summary-total-amount">₹{totalAmount}</span>
          </div>
        </div>

        {/* 5. Pay Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="btn-pay"
        >
          {isProcessing ? "Processing..." : `PAY ₹${totalAmount}`}
        </button>

        <p className="form-footer-note">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Secured by 256-bit encryption. Instant PDF download on confirmation.</span>
        </p>
      </div>
    </form>
  );
};
