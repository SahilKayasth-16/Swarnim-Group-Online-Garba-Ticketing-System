import React from "react";
import type { Event } from "../types";
import "../styles/legacycomponents.css";

interface EventDetailPageProps {
  event: Event | null;
  onBack: () => void;
  onBook: () => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({ event, onBack, onBook }) => {
  if (!event) return null;

  return (
    <div className="legacy-card-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={onBack} className="back-btn" style={{ marginBottom: '1.5rem' }}>
        ← Back to Events
      </button>
      <h1 className="gold-gradient-text" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>
        {event.name}
      </h1>
      <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
        {event.description}
      </p>
      <button onClick={onBook} className="nav-cta-btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
        BOOK PASSES FOR THIS EVENT
      </button>
    </div>
  );
};
