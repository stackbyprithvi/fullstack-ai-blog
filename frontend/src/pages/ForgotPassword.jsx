// ForgotPassword.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await API.post("/auth/forgot-password", { email });

      setSuccess(
        response.data.message || "Password reset link sent successfully",
      );

      setEmail("");

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-md rounded-[2rem] border bg-[var(--surface)] p-8">
        <div className="mb-8">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[var(--primary)]">
            Recovery
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Forgot password
          </h1>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Enter your email and we’ll send you a password reset link.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-[var(--secondary)]/20 bg-[var(--secondary)]/10 px-4 py-3 text-sm text-[var(--secondary)]">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-4 py-3 text-sm text-[var(--accent)]">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
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
          </div>

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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="
              text-sm
              text-[var(--muted)]
              transition
              hover:text-[var(--primary)]
            "
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
