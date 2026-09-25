import React, { useEffect, useState } from "react";
import { EventCard } from "../components/EventCard";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { getEvents } from "../services/api";
import type { Event } from "../types";

interface EventsPageProps {
  onSelectEvent: (eventId: number) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onSelectEvent }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEventsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err: any) {
      setError(err.message || "Unable to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventsData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading events..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Unable to load events. Please try again."
        message={error}
        onRetry={fetchEventsData}
      />
    );
  }

  if (events.length === 0) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-purple-50 rounded-2xl border border-purple-100 text-center">
        <div className="text-4xl mb-3">💃</div>
        <h3 className="text-xl font-bold text-purple-900 mb-2">No events are currently available.</h3>
        <p className="text-sm text-purple-600 mb-4">
          Check back soon for upcoming Navratri Garba celebrations!
        </p>
        <button
          onClick={fetchEventsData}
          className="px-4 py-2 bg-purple-700 text-white font-medium rounded-lg text-sm hover:bg-purple-800 transition-colors"
        >
          Refresh List
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-rose-900 text-white p-8 sm:p-12 shadow-xl border border-purple-800/40">
        <div className="max-w-2xl">
          <span className="inline-block px-3.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-semibold mb-4 tracking-wider uppercase">
            Navratri 2026 Celebration
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Book Garba & Dandiya Passes Online
          </h2>
          <p className="text-purple-200 text-base sm:text-lg mb-6 leading-relaxed">
            Experience Surat's premier Navratri celebrations. Secure your entry passes instantly from the official Swarnim Group catalog.
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
            Upcoming Events ({events.length})
          </h3>
          <span className="text-xs text-gray-500 font-medium">Updated live from PostgreSQL</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onSelectEvent={onSelectEvent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
