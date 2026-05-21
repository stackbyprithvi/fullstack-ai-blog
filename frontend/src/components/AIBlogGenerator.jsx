// AIBlogGenerator.jsx
import { useState } from "react";
import API from "../services/api";

const AIBlogGenerator = ({ onGenerate }) => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic) return;

    setLoading(true);

    try {
      const response = await API.post("/ai/generate-blog", {
        topic,
        tone,
      });

      if (response.data.success) {
        onGenerate(response.data.content);
      }
    } catch (err) {
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
      />

      <select
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="
  w-full
  rounded-[1.2rem]
  border
  bg-[var(--surface)]
  px-4
  py-3
  text-sm
  text-[var(--text)]
  outline-none
  transition
  focus:border-[var(--primary)]
"
      >
        <option value="professional">Professional</option>
        <option value="casual">Casual</option>
        <option value="funny">Funny</option>
        <option value="educational">Educational</option>
      </select>

      <button
        onClick={generate}
        disabled={loading || !topic}
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
        {loading ? "Generating..." : "Generate Draft"}
      </button>
    </div>
  );
};

export default AIBlogGenerator;
