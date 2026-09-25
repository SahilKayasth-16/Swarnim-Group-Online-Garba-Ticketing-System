import React, { useEffect, useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { getEventById, getEventTickets } from "../services/api";
import type { Event, TicketType } from "../types";

interface EventDetailPageProps {
  eventId: number;
  onBack: () => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  eventId,
  onBack,
}) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [loadingEvent, setLoadingEvent] = useState<boolean>(true);
  const [loadingTickets, setLoadingTickets] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadEventData = async () => {
    setLoadingEvent(true);
    setLoadingTickets(true);
    setError(null);
    try {
      const eventData = await getEventById(eventId);
      setEvent(eventData);
      setLoadingEvent(false);

      const ticketData = await getEventTickets(eventId);
      setTickets(ticketData);
      setLoadingTickets(false);
    } catch (err: any) {
      setError(err.message || "Unable to load event.");
      setLoadingEvent(false);
      setLoadingTickets(false);
    }
  };

  useEffect(() => {
    loadEventData();
  }, [eventId]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const defaultImage =
    "https://images.unsplash.com/photo-1605722243979-fe0be8158232?q=80&w=1200&auto=format&fit=crop";

  if (loadingEvent) {
    return <LoadingSpinner message="Loading event..." />;
  }

  if (error || !event) {
    return (
      <div>
        <button
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-purple-700 hover:text-purple-900 transition-colors"
        >
          ← Back to Events List
        </button>
        <ErrorMessage
          title="Event not found."
          message={error || "Event not found."}
          onRetry={loadEventData}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
      >
        ← Back to Events List
      </button>

      <div className="bg-white rounded-3xl overflow-hidden border border-purple-100 shadow-lg">
        <div className="relative h-64 sm:h-80 lg:h-96 bg-purple-950">
          <img
            src={event.image || defaultImage}
            alt={event.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-950/40 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <div className="inline-block self-start px-3 py-1 bg-amber-400 text-purple-950 font-bold text-xs rounded-full uppercase tracking-wider mb-3">
              {event.status} Event
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {event.name}
            </h1>
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 bg-purple-50/50 border-b border-purple-100">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl text-xl">📅</div>
            <div>
              <span className="text-xs text-gray-500 font-medium block">Date</span>
              <span className="text-sm font-bold text-gray-900">{formatDate(event.event_date)}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl text-xl">⏰</div>
            <div>
              <span className="text-xs text-gray-500 font-medium block">Time</span>
              <span className="text-sm font-bold text-gray-900">
                {event.start_time} - {event.end_time}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl text-xl">📍</div>
            <div>
              <span className="text-xs text-gray-500 font-medium block">Venue</span>
              <span className="text-sm font-bold text-gray-900">{event.venue}</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-3">About The Event</h3>
          <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
            {event.description ||
              "Experience traditional Garba dance, vibrant music, authentic Gujarati attire, and grand festivities. Reserve your passes below."}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Ticket Categories</h2>
            <p className="text-xs text-gray-500 mt-1">Real-time availability directly from PostgreSQL</p>
          </div>
        </div>

        {loadingTickets ? (
          <LoadingSpinner message="Loading ticket categories..." />
        ) : tickets.length === 0 ? (
          <div className="p-6 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <p className="text-sm text-gray-500">No ticket categories are available for this event.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="p-5 sm:p-6 rounded-2xl border border-purple-100 bg-gradient-to-r from-white via-purple-50/30 to-white hover:border-purple-300 transition-all shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-lg font-bold text-gray-900">{t.name}</h4>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Available: {t.available_quantity}
                    </span>
                  </div>

                  {t.description && (
                    <p className="text-sm text-gray-600 mb-2">{t.description}</p>
                  )}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block">Price</span>
                    <span className="text-2xl font-black text-purple-900">₹{Number(t.price)}</span>
                  </div>

                  <button
                    disabled={t.available_quantity <= 0}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all ${
                      t.available_quantity > 0
                        ? "bg-purple-700 hover:bg-purple-800 text-white hover:shadow"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Select Tickets
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
