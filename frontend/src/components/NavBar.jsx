// Navbar.jsx
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-[var(--bg)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-semibold tracking-tight">
          SOMETHING
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          <Link
            to="/"
            className="text-[var(--muted)] transition hover:text-[var(--text)]"
          >
            Home
          </Link>

          {user && (
            <Link
              to="/profile"
              className="text-[var(--muted)] transition hover:text-[var(--text)]"
            >
              Profile
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="
              rounded-full
              border
              px-3
              py-1.5
              text-[var(--muted)]
              transition
              hover:border-[var(--primary)]
              hover:text-[var(--text)]
            "
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-[var(--muted)] transition hover:text-[var(--text)]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  rounded-full
                  bg-[var(--primary)]
                  px-4
                  py-2
                  text-white
                  transition
                  hover:opacity-90
                "
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-[var(--muted)] transition hover:text-[var(--secondary)]"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
