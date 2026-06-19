import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import markInverse from "../../assets/icon/mark-inverse.svg";
import wordmarkOnDark from "../../assets/wordmark/wordmark-on-dark.svg";
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
      <nav className="bg-primary text-white h-16 flex items-center justify-between px-6 sticky top-0 z-50">
        <NavLink to="/" className="flex items-center gap-3 no-underline">
          <img src={markInverse} alt="" className="h-8 w-8" />
          <img src={wordmarkOnDark} alt="DanskBuddy" className="h-5" />
        </NavLink>

        <div className="hidden md:flex gap-6">
          <NavLink
            to="/browse"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-secondary pb-1"
                : "text-primary-light hover:text-white pb-1"
            }
          >
            Browse
          </NavLink>
          <NavLink
            to="/matches"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-secondary pb-1"
                : "text-primary-light hover:text-white pb-1"
            }
          >
            Matches
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-secondary pb-1"
                : "text-primary-light hover:text-white pb-1"
            }
          >
            Messages
          </NavLink>
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-secondary pb-1"
                : "text-primary-light hover:text-white pb-1"
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
            <span className="text-sm text-primary-light hidden md:block">
              {user?.name}
            </span>
          </NavLink>
          <button
            onClick={handleLogout}
            className="bg-surface-alt text-primary hover:bg-background text-sm px-3 py-1.5 rounded-md font-medium"
          >
            Log out
          </button>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden text-white text-2xl"
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
        <div className="md:hidden bg-foreground flex flex-col gap-4 px-6 py-4">
          <NavLink
            to="/browse"
            onClick={() => setMenuOpen(false)}
            className="text-background"
          >
            Browse
          </NavLink>
          <NavLink
            to="/matches"
            onClick={() => setMenuOpen(false)}
            className="text-background"
          >
            Matches
          </NavLink>
          <NavLink
            to="/messages"
            onClick={() => setMenuOpen(false)}
            className="text-background"
          >
            Messages
          </NavLink>
          <NavLink
            to="/feed"
            onClick={() => setMenuOpen(false)}
            className="text-background"
          >
            Feed
          </NavLink>
        </div>
      )}

      <main className="flex-1 p-8 bg-background">
        <Outlet />
      </main>

      <footer className="text-center text-sm text-neutral-light py-4 border-t">
        © 2026 DanskBuddy · Find your Danish conversation partner 🇩🇰
      </footer>
    </div>
  );
}
