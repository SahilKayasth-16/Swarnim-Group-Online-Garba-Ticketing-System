import React from "react";
import type { Event } from "../types";

interface EventCardProps {
  event: Event;
  onSelectEvent: (eventId: number) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelectEvent }) => {
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getStartingPrice = () => {
    if (event.ticket_types && event.ticket_types.length > 0) {
      const prices = event.ticket_types.map((t) => Number(t.price));
      const minPrice = Math.min(...prices);
      return `₹${minPrice}`;
    }
    return "₹200";
  };

  const defaultImage = "https://images.unsplash.com/photo-1605722243979-fe0be8158232?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
      <div className="relative h-48 sm:h-56 overflow-hidden bg-purple-950">
        <img
          src={event.image || defaultImage}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
        <div className="absolute top-3 left-3 bg-purple-900/80 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full border border-purple-500/40">
          📅 {formatDate(event.event_date)}
        </div>
        <div className="absolute top-3 right-3 bg-emerald-600/90 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          {event.status}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-1 mb-2">
            {event.name}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
            {event.description || "Join us for an unforgettable night of traditional Garba and Dandiya."}
          </p>

          <div className="space-y-1.5 text-xs text-gray-500 mb-5">
            <div className="flex items-center gap-2">
              <span className="text-purple-600">📍</span>
              <span className="font-medium text-gray-700 truncate">{event.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-600">⏰</span>
              <span>{event.start_time} - {event.end_time}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Starting from</span>
            <span className="text-lg font-extrabold text-purple-900">{getStartingPrice()}</span>
          </div>

          <button
            onClick={() => onSelectEvent(event.id)}
            className="px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow group-hover:translate-x-0.5"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
