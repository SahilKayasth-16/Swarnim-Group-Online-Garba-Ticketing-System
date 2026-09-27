import React from "react";
import type { Event } from "../types";
import { EventCard } from "../components/EventCard";
import "../styles/legacycomponents.css";

interface EventsPageProps {
  events: Event[];
  onSelectEvent: (id: number) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ events, onSelectEvent }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h2 className="gold-gradient-text" style={{ fontSize: '2rem', fontWeight: 900, textAlign: 'center' }}>
        EXPLORE ALL EVENTS
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {events.map((e) => (
          <EventCard key={e.id} event={e} onSelect={onSelectEvent} />
        ))}
      </div>
    </div>
  );
};
