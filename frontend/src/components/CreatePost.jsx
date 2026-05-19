import React, { useState } from "react";
import { postService } from "../services/postService";
import AIBlogGenerator from "./AIBlogGenerator";

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
    setContent(aiContent);
    setShowAI(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Create New Post</h3>
        <button
          onClick={() => setShowAI(!showAI)}
          className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded"
        >
          {showAI ? "Hide AI" : "AI Writer"}
        </button>
      </div>

      {showAI && (
        <div className="mb-4 p-4 bg-gray-50 rounded border">
          <AIBlogGenerator onGenerate={fillFromAI} />
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Post created!
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          rows="6"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
