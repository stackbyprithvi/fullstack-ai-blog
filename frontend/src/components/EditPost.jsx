// EditPost.jsx
import React, { useState } from "react";
import { postService } from "../services/postService";

const EditPost = ({ post, onPostUpdated, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const updatedPost = await postService.updatePost(
        post._id,
        title,
        content,
      );

      onPostUpdated(updatedPost);
    } catch (err) {
      console.error("Failed to update post:", err);

      setError(err.response?.data?.message || "Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[2rem] border bg-[var(--surface)] p-6">
      <div className="mb-6">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[var(--primary)]">
          Editor
        </p>

        <h3 className="text-2xl font-semibold tracking-tight">Edit post</h3>
      </div>

      {error && (
        <div className="mb-4 rounded-2xl border border-[var(--secondary)]/20 bg-[var(--secondary)]/10 px-4 py-3 text-sm text-[var(--secondary)]">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <label className="mb-2 block text-sm font-medium">Content</label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            className="
              w-full
              resize-none
              rounded-[1.2rem]
              border
              bg-transparent
              px-4
              py-3
              text-sm
              leading-7
              outline-none
              transition
              placeholder:text-[var(--muted)]
              focus:border-[var(--primary)]
            "
            required
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="
              rounded-full
              bg-[var(--primary)]
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:opacity-90
              disabled:opacity-50
            "
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="
              rounded-full
              border
              px-5
              py-2.5
              text-sm
              text-[var(--muted)]
              transition
              hover:border-[var(--primary)]
              hover:text-[var(--text)]
            "
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
