import React, { Suspense, useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Toast } from "./components/Toast";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import type { ToastMessage } from "./types";
import "./styles/global.css";

const HomePage = React.lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const BookingPage = React.lazy(() => import("./pages/BookingPage").then(m => ({ default: m.BookingPage })));

export function App() {
  const [currentRoute, setCurrentRoute] = useState<"home" | "book">("home");
  const [activeToast, setActiveToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#book" || hash.startsWith("#book")) {
        setCurrentRoute("book");
      } else {
        setCurrentRoute("home");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigateHome = () => {
    setCurrentRoute("home");
    window.location.hash = "";
  };

  const handleNavigateBooking = () => {
    setCurrentRoute("book");
    window.location.hash = "#book";
  };

  const handleShowToast = (toast: ToastMessage) => {
    setActiveToast(toast);
    setTimeout(() => {
      setActiveToast(null);
    }, 4000);
  };

  return (
    <div className="app-layout">
      <Navbar onNavigateHome={handleNavigateHome} onNavigateBooking={handleNavigateBooking} />

      <main className="main-content">
        <Suspense fallback={<LoadingSkeleton />}>
          {currentRoute === "book" ? (
            <BookingPage
              onShowToast={handleShowToast}
              onGoHome={handleNavigateHome}
            />
          ) : (
            <HomePage onGoToBooking={handleNavigateBooking} />
          )}
        </Suspense>
      </main>

      <footer className="app-footer">
        <div>
          <p className="app-footer-title">
            SWARNIM GROUP NAVRATRI MAHOTSAV 2026
          </p>
          <p>P.R.B Arts & P.G.R Commerce College Ground, Station Road, Bardoli, Surat</p>
          <p style={{ marginTop: '0.35rem', fontSize: '0.75rem', opacity: 0.7 }}>
            © 2026 Swarnim Group Navratri Mahotsav. All rights reserved. Developed by Sahil Kayasth.
          </p>
        </div>
      </footer>

      <Toast toast={activeToast} onClose={() => setActiveToast(null)} />
    </div>
  );
}

export default App;
