import React from "react";
import type { Event } from "../types";
import "../styles/legacycomponents.css";

interface EventCardProps {
  event: Event;
  onSelect: (id: number) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect }) => {
  return (
    <div className="legacy-card-container">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fef3c7', marginBottom: '0.5rem' }}>
        {event.name}
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
        {event.description}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 700 }}>
          {event.venue}
        </span>
        <button onClick={() => onSelect(event.id)} className="nav-cta-btn">
          View Event
        </button>
      </div>
    </div>
  );
};
