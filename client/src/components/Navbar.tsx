import React from "react";

interface NavbarProps {
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateHome }) => {
  return (
    <header className="bg-gradient-to-r from-purple-900 via-indigo-900 to-rose-900 text-white shadow-lg border-b border-purple-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div 
          onClick={onNavigateHome}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-200 to-purple-200">
              Swarnim Garba
            </h1>
            <p className="text-xs text-purple-200/80 font-medium">Online Garba Ticketing System</p>
          </div>
        </div>

        <nav className="flex items-center gap-4 text-sm font-medium">
          <button
            onClick={onNavigateHome}
            className="hover:text-amber-300 transition-colors px-3 py-1.5 rounded-lg bg-purple-800/40 hover:bg-purple-800/70 border border-purple-600/40"
          >
            Explore Events
          </button>
          <a
            href="http://127.0.0.1:8000/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block text-purple-200 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-purple-600/30 hover:border-purple-500"
          >
            API Docs
          </a>
        </nav>
      </div>
    </header>
  );
};
