import { useState } from "react";

const TONES = [
  "professional",
  "casual",
  "humorous",
  "educational",
  "inspirational",
];
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050/api";

const AIBlogGenerator = ({ onGenerate }) => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const generate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError("");
    setContent("");

    try {
      //  fetch for SSE — manual token attach
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/ai/generate-blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topic, tone }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Request failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value).split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          const json = JSON.parse(line.slice(6));

          if (json.error) throw new Error(json.error);

          if (json.done) {
            onGenerate(accumulated); //  send full content to CreatePost
            return;
          }

          if (json.text) {
            accumulated += json.text;
            setContent(accumulated);
          }
        }
      }
    } catch (err) {
      setError("Failed to generate. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold tracking-tight">AI Writer</h4>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Generate a quick draft with AI.
        </p>
      </div>

      <input
        type="text"
        placeholder="Enter topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full rounded-[1.2rem] border bg-transparent px-4 py-3 text-sm outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
      />

      <div className="flex flex-wrap gap-2">
        {TONES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTone(t)}
            className={`
        rounded-full border px-4 py-1.5 text-sm capitalize transition
        ${
          tone === t
            ? "border-[var(--primary)] bg-[var(--primary)] text-white"
            : "border bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--text)]"
        }
      `}
          >
            {t}
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* live preview as it streams */}
      {content && (
        <div className="max-h-48 overflow-y-auto rounded-[1.2rem] border bg-[var(--bg)] px-4 py-3 text-sm text-[var(--muted)] whitespace-pre-wrap">
          {content}
        </div>
      )}

      <button
        onClick={generate}
        disabled={loading || !topic.trim()}
        className="w-full rounded-full bg-[var(--primary)] py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Draft"}
      </button>
    </div>
  );
};

export default AIBlogGenerator;
