// ResetPassword.jsx
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../services/api";

const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post(`/auth/reset-password/${token}`, {
        password,
      });

      setSuccess(response.data.message || "Password reset successful");

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Reset link expired or invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-md rounded-[2rem] border bg-[var(--surface)] p-8">
        <div className="mb-8">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[var(--primary)]">
            Security
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Reset password
          </h1>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Create a new password for your account.
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
              New Password
            </label>

            <input
              type="password"
              placeholder="Minimum 6 characters"
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
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

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
            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
