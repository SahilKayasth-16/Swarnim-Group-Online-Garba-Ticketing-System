import React, { useMemo, useState } from "react";
import type { DemoBookingRequest } from "../types";
import "../styles/bookingform.css";

interface BookingFormProps {
  onSubmit: (data: DemoBookingRequest) => void;
  isProcessing: boolean;
}

const EVENT_START_DATE = "2026-10-11";
const EVENT_END_DATE = "2026-10-20";
const TICKET_PRICE_PER_PASS = 200;

// List of all 10 festival days for quick selection
const FESTIVAL_DAYS = [
  { dayNum: 1, isoDate: "2026-10-11", label: "11 Oct (Day 1)" },
  { dayNum: 2, isoDate: "2026-10-12", label: "12 Oct (Day 2)" },
  { dayNum: 3, isoDate: "2026-10-13", label: "13 Oct (Day 3)" },
  { dayNum: 4, isoDate: "2026-10-14", label: "14 Oct (Day 4)" },
  { dayNum: 5, isoDate: "2026-10-15", label: "15 Oct (Day 5)" },
  { dayNum: 6, isoDate: "2026-10-16", label: "16 Oct (Day 6)" },
  { dayNum: 7, isoDate: "2026-10-17", label: "17 Oct (Day 7)" },
  { dayNum: 8, isoDate: "2026-10-18", label: "18 Oct (Day 8)" },
  { dayNum: 9, isoDate: "2026-10-19", label: "19 Oct (Day 9)" },
  { dayNum: 10, isoDate: "2026-10-20", label: "20 Oct (Day 10)" },
];

function isDateInEventRange(isoDate: string): boolean {
  if (!isoDate) return false;
  return isoDate >= EVENT_START_DATE && isoDate <= EVENT_END_DATE;
}

function formatIsoToReadableDate(isoDate: string): string {
  if (!isoDate) return "";
  const parts = isoDate.split("-");
  if (parts.length !== 3) return isoDate;
  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${day} ${months[monthIdx] || "October"} ${year}`;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  onSubmit,
  isProcessing,
}) => {
  // 1. Date state (changeable, defaults to opening day 11 Oct 2026)
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-11");

  // 2. Number of tickets state (1 to 10)
  const [quantity, setQuantity] = useState<number>(1);

  // 3. Payment Option state (online or cash)
  const [paymentOption, setPaymentOption] = useState<string>("online");

  // Validation message state
  const [formError, setFormError] = useState<string | null>(null);

  // Computed values
  const isDateValid = useMemo(() => isDateInEventRange(selectedDate), [selectedDate]);
  const formattedReadableDate = useMemo(() => formatIsoToReadableDate(selectedDate), [selectedDate]);
  const totalAmount = quantity * TICKET_PRICE_PER_PASS;

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Sequence Step 1 Validation: Date
    if (!selectedDate || !isDateInEventRange(selectedDate)) {
      setFormError("select correct date.");
      return;
    }

    // Sequence Step 2 Validation: Quantity
    if (quantity < 1 || quantity > 10) {
      setFormError("Please select between 1 and 10 tickets.");
      return;
    }

    // Sequence Step 3 Validation: Payment Option
    if (!paymentOption || (paymentOption !== "online" && paymentOption !== "cash")) {
      setFormError("Please select a valid payment option.");
      return;
    }

    // Submit dynamic details
    onSubmit({
      quantity,
      event_date: formattedReadableDate,
      payment_method: paymentOption,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form-card" noValidate>
      {/* Header */}
      <div className="booking-form-header">
        <span className="booking-form-badge">
          ONLINE PASS RESERVATION
        </span>
        <h2 className="booking-form-title">
          BOOK YOUR TICKETS
        </h2>
        <p className="booking-form-sub">
          Swarnim Group Navratri Mahotsav 2026 • 11th to 20th October 2026
        </p>
      </div>

      {/* Global Form Error Alert if any */}
      {formError && (
        <div className="error-alert" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{formError}</span>
        </div>
      )}

      {/* =========================================================================
          1. SEQUENCE ITEM 1: DATE SELECTION INPUT FIELD (CHANGEABLE & ADVANCE BOOKING)
          ========================================================================= */}
      <div className="form-group section-date-selection">
        <div className="form-section-title-row">
          <span className="form-step-num">1</span>
          <label className="form-label form-label-left" htmlFor="booking-date-input">
            Date Selection (11th Oct – 20th Oct 2026)
          </label>
        </div>
        <p className="form-section-desc">
          Select any festival day in advance for your Garba pass.
        </p>

        {/* Changeable Date Input */}
        <div className="date-input-container">
          <input
            id="booking-date-input"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className={`form-input-date ${!isDateValid ? "input-date-error" : "input-date-valid"}`}
            aria-describedby="date-status-msg"
            required
          />
        </div>

        {/* Inline Date Validation Message */}
        {!isDateValid ? (
          <div id="date-status-msg" className="date-warning-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span className="warning-text-highlight">select correct date.</span>
            <span className="warning-text-sub">
              (Event runs from 11th October 2026 to 20th October 2026)
            </span>
          </div>
        ) : (
          <div className="date-valid-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Selected Event Date: <strong>{formattedReadableDate}</strong></span>
          </div>
        )}

        {/* Quick Day Selector Pills */}
        <div className="festival-days-pills-label">Quick Day Selector:</div>
        <div className="festival-days-grid">
          {FESTIVAL_DAYS.map((d) => (
            <button
              key={d.isoDate}
              type="button"
              onClick={() => {
                setSelectedDate(d.isoDate);
                setFormError(null);
              }}
              className={`festival-day-pill ${selectedDate === d.isoDate ? "festival-day-pill-active" : ""}`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          2. SEQUENCE ITEM 2: COUNTER TO SET NUMBER OF TICKETS TO BOOK & PRICE
          ========================================================================= */}
      <div className="form-group section-ticket-counter">
        <div className="form-section-title-row">
          <span className="form-step-num">2</span>
          <label className="form-label form-label-left">
            Number of Tickets to Book & Price
          </label>
        </div>
        <p className="form-section-desc">
          Ticket Price: <strong>₹{TICKET_PRICE_PER_PASS} per pass</strong> • Set 1 to 10 passes
        </p>

        {/* Stepper Counter */}
        <div className="stepper-container">
          <button
            type="button"
            onClick={handleDecreaseQuantity}
            disabled={quantity <= 1}
            className="stepper-btn"
            aria-label="Decrease ticket quantity"
          >
            -
          </button>
          <div className="stepper-value-box">
            <span className="stepper-value">{quantity}</span>
            <span className="stepper-unit">{quantity === 1 ? "Ticket" : "Tickets"}</span>
          </div>
          <button
            type="button"
            onClick={handleIncreaseQuantity}
            disabled={quantity >= 10}
            className="stepper-btn"
            aria-label="Increase ticket quantity"
          >
            +
          </button>
        </div>

        {/* Quick Quantity Presets (1, 2, 4, 5, 6, 10) */}
        <div className="preset-buttons">
          {[1, 2, 4, 5, 6, 10].map((num) => (
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

        {/* Live Calculation Display Example (e.g. 5 tickets x ₹200 = ₹1000) */}
        <div className="live-price-box">
          <div className="price-calc-row">
            <span>Rate per Ticket:</span>
            <span className="price-calc-val">₹{TICKET_PRICE_PER_PASS}</span>
          </div>
          <div className="price-calc-row">
            <span>Selected Passes:</span>
            <span className="price-calc-val">{quantity}</span>
          </div>
          <div className="price-calc-divider">
            <span className="price-total-text">Calculated Amount:</span>
            <span className="price-total-num">₹{totalAmount}</span>
          </div>
          <p className="price-calc-formula">
            ({quantity} {quantity === 1 ? "pass" : "passes"} × ₹{TICKET_PRICE_PER_PASS} = ₹{totalAmount})
          </p>
        </div>
      </div>

      {/* =========================================================================
          3. SEQUENCE ITEM 3: DROP DOWN FOR PAYMENT OPTION
          ========================================================================= */}
      <div className="form-group section-payment-dropdown">
        <div className="form-section-title-row">
          <span className="form-step-num">3</span>
          <label className="form-label form-label-left" htmlFor="payment-dropdown-select">
            Payment Option
          </label>
        </div>
        <p className="form-section-desc">
          Choose your preferred demo payment method.
        </p>

        <div className="dropdown-select-wrapper">
          <select
            id="payment-dropdown-select"
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
            className="form-dropdown-select"
          >
            <option value="online">Online Payment</option>
            <option value="cash">Cash Payment</option>
          </select>
          <div className="dropdown-arrow-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. SEQUENCE ITEM 4: "MAKE PAYMENT" BUTTON & SUMMARY
          ========================================================================= */}
      <div className="form-group section-payment-cta">
        {/* Dynamic Summary Review */}
        <div className="final-summary-card">
          <div className="final-summary-title">Booking Order Summary</div>
          <div className="final-summary-row">
            <span>Event:</span>
            <span className="final-summary-bold">Swarnim Group Navratri 2026</span>
          </div>
          <div className="final-summary-row">
            <span>Event Date:</span>
            <span className={`final-summary-bold ${!isDateValid ? "text-danger" : "text-amber"}`}>
              {isDateValid ? formattedReadableDate : "Invalid Date Selected"}
            </span>
          </div>
          <div className="final-summary-row">
            <span>Quantity:</span>
            <span className="final-summary-bold">{quantity} Pass(es)</span>
          </div>
          <div className="final-summary-row">
            <span>Payment Mode:</span>
            <span className="final-summary-bold">
              {paymentOption === "cash" ? "Cash Payment" : "Online Payment"}
            </span>
          </div>
          <div className="final-summary-total-row">
            <span className="final-total-label">Total Payable:</span>
            <span className="final-total-amount">₹{totalAmount}</span>
          </div>
        </div>

        {/* CTA: Make Payment Button */}
        <button
          type="submit"
          disabled={isProcessing || !isDateValid}
          className="btn-make-payment"
        >
          {isProcessing ? (
            <>
              <svg className="spin-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
              </svg>
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
              <span>Make Payment • ₹{totalAmount}</span>
            </>
          )}
        </button>

        <p className="form-footer-note">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Instant booking confirmation and dynamic PDF ticket pass download upon payment.</span>
        </p>
      </div>
    </form>
  );
};
