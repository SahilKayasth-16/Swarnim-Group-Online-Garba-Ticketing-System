import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { EventDetailPage } from "./pages/EventDetailPage";
import { EventsPage } from "./pages/EventsPage";

export function App() {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#event-")) {
        const id = parseInt(hash.replace("#event-", ""), 10);
        if (!isNaN(id)) {
          setSelectedEventId(id);
          return;
        }
      }
      setSelectedEventId(null);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectEvent = (id: number) => {
    setSelectedEventId(id);
    window.location.hash = `#event-${id}`;
  };

  const handleNavigateHome = () => {
    setSelectedEventId(null);
    window.location.hash = "";
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar onNavigateHome={handleNavigateHome} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {selectedEventId ? (
          <EventDetailPage
            eventId={selectedEventId}
            onBack={handleNavigateHome}
          />
        ) : (
          <EventsPage onSelectEvent={handleSelectEvent} />
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-6 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-semibold text-slate-300 mb-1">
            Swarnim Group Online Garba Ticketing System
          </p>
          <p>© 2026 Swarnim Group. All rights reserved. Powered by FastAPI & PostgreSQL.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
