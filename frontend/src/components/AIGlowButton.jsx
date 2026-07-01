import { useRef } from "react";
import "../styles/ai-button.css"; // 👈 adjust path if needed

export default function AIGlowButton({
  showAI,
  setShowAI,
  variant = "neon",
  children,
}) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (x - centerX) / 12;
    const moveY = (y - centerY) / 12;

    btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;

    btn.style.setProperty("--x", `${x}px`);
    btn.style.setProperty("--y", `${y}px`);
  };

  const handleLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;

    btn.style.transform = "translate(0px, 0px) scale(1)";
  };

  return (
    <button
      ref={btnRef}
      onClick={() => setShowAI(!showAI)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      className={`ai-btn ai-${variant}`}
    >
      {children ?? (showAI ? "Close AI" : "AI Writer")}
    </button>
  );
}
