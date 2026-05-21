// CommentSection.jsx
import React, { useState, useEffect } from "react";
import { commentService } from "../services/commentService";
import { useAuth } from "../context/AuthContext";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await commentService.getComments(postId);
        setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    setSubmitting(true);

    try {
      const comment = await commentService.createComment(postId, newComment);

      setComments([comment, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to create comment:", err);
      alert("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await commentService.deleteComment(commentId);

      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment:", err);
      alert("Failed to delete comment");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">Comments</h3>

        <span className="text-sm text-[var(--muted)]">{comments.length}</span>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows="4"
            className="
              w-full
              resize-none
              rounded-[1.5rem]
              border
              bg-transparent
              px-5
              py-4
              text-sm
              leading-7
              outline-none
              transition
              placeholder:text-[var(--muted)]
              focus:border-[var(--primary)]
            "
            required
          />

          <button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="
              mt-4
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
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <p className="mb-8 text-sm text-[var(--muted)]">
          Login to join the conversation.
        </p>
      )}

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">No comments yet.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="
                rounded-[1.5rem]
                border
                bg-[var(--bg)]
                p-5
              "
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">
                    {comment.author?.username || "Unknown"}
                  </span>

                  <span className="text-xs text-[var(--muted)]">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {user && user._id === comment.author?._id && (
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="
                      text-xs
                      text-[var(--muted)]
                      transition
                      hover:text-[var(--secondary)]
                    "
                  >
                    Delete
                  </button>
                )}
              </div>

              <p className="text-sm leading-7 text-[var(--muted)]">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
