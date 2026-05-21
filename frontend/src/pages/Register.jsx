// RegisterForm.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterForm = () => {
  const { register } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const res = await register(username, email, password);

    setLoading(false);

    if (res.success) {
      navigate("/");
    } else {
      setError(res.message || "Registration failed");
    }
  };

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-md rounded-[2rem] border bg-[var(--surface)] p-8">
        <div className="mb-8">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[var(--primary)]">
            Join
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Create account
          </h1>

          <p className="mt-3 text-sm text-[var(--muted)]">
            Start writing and sharing your ideas.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-[var(--secondary)]/20 bg-[var(--secondary)]/10 px-4 py-3 text-sm text-[var(--secondary)]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="
              w-full
              rounded-[1.2rem]
              border
              bg-transparent
              px-4
              py-3
              text-sm
              outline-none
              transition
              placeholder:text-[var(--muted)]
              focus:border-[var(--primary)]
            "
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full
              rounded-[1.2rem]
              border
              bg-transparent
              px-4
              py-3
              text-sm
              outline-none
              transition
              placeholder:text-[var(--muted)]
              focus:border-[var(--primary)]
            "
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full
              rounded-[1.2rem]
              border
              bg-transparent
              px-4
              py-3
              text-sm
              outline-none
              transition
              placeholder:text-[var(--muted)]
              focus:border-[var(--primary)]
            "
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="
              w-full
              rounded-[1.2rem]
              border
              bg-transparent
              px-4
              py-3
              text-sm
              outline-none
              transition
              placeholder:text-[var(--muted)]
              focus:border-[var(--primary)]
            "
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-full
              bg-[var(--primary)]
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:opacity-90
              disabled:opacity-50
            "
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              text-[var(--primary)]
              transition
              hover:opacity-80
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
