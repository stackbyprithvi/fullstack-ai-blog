// LoginForm.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const res = await login(email, password);

    setLoading(false);

    if (res.success) {
      navigate("/");
    } else {
      setError(res.message || "Invalid credentials");
    }
  };

  return (
    <div className="px-6">
      <div className="mx-auto mt-28 max-w-md">
        <div className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Login to your account
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-[var(--secondary)]/20 bg-[var(--secondary)]/10 px-4 py-3 text-sm text-[var(--secondary)]">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl border bg-[var(--surface)] p-6"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)]"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)]"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[var(--primary)] py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>

        <div className="mt-6 flex gap-2 text-sm text-[var(--muted)]">
          <Link
            to="/register"
            className="transition hover:text-[var(--primary)]"
          >
            Register
          </Link>

          <span>•</span>

          <Link
            to="/forgot-password"
            className="transition hover:text-[var(--primary)]"
          >
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
