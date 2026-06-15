import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white-900 text-white h-16 flex items-center justify-between px-6 sticky top-0 z-50">
        <span className="text-red-900 font-bold text-lg"> DanskBuddy</span>

        <div className="hidden md:flex gap-6">
          <NavLink
            to="/browse"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-indigo-400 pb-1"
                : "text-red-900 hover:text-black pb-1"
            }
          >
            Browse
          </NavLink>
          <NavLink
            to="/matches"
            className={({ isActive }) =>
              isActive
                ? "text-black-border-b-2 border-indigo-400 pb-1"
                : "text-red-900 hover:text-black pb-1"
            }
          >
            Matches
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              isActive
                ? "text-red- border-b-2 border-indigo-400 pb-1"
                : "text-red-900 hover:text-black pb-1"
            }
          >
            Messages
          </NavLink>
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-indigo-400 pb-1"
                : "text-red-900 hover:text-black pb-1"
            }
          >
            Feed
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to="/profile/me"
            className="flex items-center gap-2 text-white no-underline"
          >
            <span className="text-2xl">{user?.avatar}</span>
            <span className="text-sm text-gray-200 hidden md:block">
              {user?.name}
            </span>
          </NavLink>
          <button
            onClick={handleLogout}
            className="bg-white text-red-900 hover:bg-gray-100 text-sm px-3 py-1.5 rounded-md font-medium"
          >
            Log out
          </button>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden text-red-900 text-2xl"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 flex flex-col gap-4 px-6 py-4">
          <NavLink
            to="/browse"
            onClick={() => setMenuOpen(false)}
            className="text-gray-300"
          >
            Browse
          </NavLink>
          <NavLink
            to="/matches"
            onClick={() => setMenuOpen(false)}
            className="text-gray-300"
          >
            Matches
          </NavLink>
          <NavLink
            to="/messages"
            onClick={() => setMenuOpen(false)}
            className="text-gray-300"
          >
            Messages
          </NavLink>
          <NavLink
            to="/feed"
            onClick={() => setMenuOpen(false)}
            className="text-gray-300"
          >
            Feed
          </NavLink>
        </div>
      )}

      <main className="flex-1 p-8 bg-slate-50">
        <Outlet />
      </main>

      <footer className="text-center text-sm text-gray-400 py-4 border-t">
        © 2026 DanskBuddy · Find your Danish conversation partner 🇩🇰
      </footer>
    </div>
  );
}
