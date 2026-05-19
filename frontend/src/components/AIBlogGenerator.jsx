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
      const response = await API.post("/ai/generate-blog", { topic, tone });
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
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Enter blog topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />

      <select
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      >
        <option value="professional">Professional</option>
        <option value="casual">Casual</option>
        <option value="funny">Funny</option>
        <option value="educational">Educational</option>
      </select>

      <button
        onClick={generate}
        disabled={loading || !topic}
        className="w-full py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {loading ? "Generating..." : "Generate Blog Post"}
      </button>
    </div>
  );
};

export default AIBlogGenerator;
