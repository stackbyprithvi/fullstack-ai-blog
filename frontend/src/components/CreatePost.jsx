// CreatePost.jsx
import React, { useState } from "react";
import { postService } from "../services/postService";
import AIBlogGenerator from "./AIBlogGenerator";
import AIGlowButton from "../components/AIGlowButton";

const CreatePost = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [showAI, setShowAI] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const newPost = await postService.createPost(title, content);

      onPostCreated(newPost);

      setTitle("");
      setContent("");

      setSuccess(true);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const fillFromAI = (aiContent) => {
    const lines = aiContent.split("\n");

    // AI returns "# Some Title" as first line
    const titleLine = lines.find((l) => l.startsWith("# "));
    const extractedTitle = titleLine
      ? titleLine.replace(/^#\s+/, "").trim()
      : "";

    // Everything after the title line goes into content
    const bodyLines = lines.filter((l) => l !== titleLine);
    const extractedContent = bodyLines.join("\n").trim();

    if (extractedTitle) setTitle(extractedTitle);
    setContent(extractedContent);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">Create post</h3>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Share your thoughts.
          </p>
        </div>

        <AIGlowButton variant="neon" showAI={showAI} setShowAI={setShowAI} />
      </div>

      {showAI && (
        <div className="mb-5 rounded-[1.5rem] border bg-[var(--bg)] p-5">
          <AIBlogGenerator onGenerate={fillFromAI} />
        </div>
      )}

      {success && (
        <div className="mb-4 text-sm text-[var(--accent)]">
          Post published successfully.
        </div>
      )}

      {error && (
        <div className="mb-4 text-sm text-[var(--secondary)]">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            w-full
            rounded-[1.5rem]
            border
            bg-transparent
            px-5
            py-4
            text-sm
            outline-none
            transition
            placeholder:text-[var(--muted)]
            focus:border-[var(--primary)]
          "
          required
        />

        <textarea
          placeholder="Write your story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="7"
          className="
            w-full
            resize-none
            rounded-[1.5rem]
            border
            bg-transparent
            px-5
            py-4
            text-sm
            leading-8
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
            rounded-full
            bg-[var(--primary)]
            px-6
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:opacity-90
            disabled:opacity-50
          "
        >
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
