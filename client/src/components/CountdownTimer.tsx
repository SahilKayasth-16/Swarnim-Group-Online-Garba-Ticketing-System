import React, { useEffect, useState } from "react";
import "../styles/countdowntimer.css";

export const CountdownTimer: React.FC = () => {
  const targetDate = new Date("2026-10-11T19:30:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    completed: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, completed: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.completed) {
    return (
      <div className="countdown-completed">
        THE MAHOTSAV HAS BEGUN! SEE YOU AT THE ARENA!
      </div>
    );
  }

  return (
    <div className="countdown-card">
      <div className="countdown-header">
        <span className="countdown-pulse-dot"></span>
        <h3 className="countdown-title">
          COUNTDOWN TO 11 OCTOBER 2026
        </h3>
      </div>

      <div className="countdown-grid">
        <div className="countdown-box">
          <span className="countdown-num">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="countdown-unit">DAYS</span>
        </div>

        <div className="countdown-box">
          <span className="countdown-num">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="countdown-unit">HOURS</span>
        </div>

        <div className="countdown-box">
          <span className="countdown-num">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="countdown-unit">MINUTES</span>
        </div>

        <div className="countdown-box">
          <span className="countdown-num">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="countdown-unit">SECONDS</span>
        </div>
      </div>
    </div>
  );
};
