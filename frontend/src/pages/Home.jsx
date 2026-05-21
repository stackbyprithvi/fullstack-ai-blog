// Home.jsx
import React, { useState, useEffect } from "react";
import { postService } from "../services/postService";
import { useAuth } from "../context/AuthContext";
import CreatePost from "../components/CreatePost";
import CommentSection from "../components/CommentSection";
import EditPost from "../components/EditPost";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likingPostId, setLikingPostId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p)),
    );

    setEditingPostId(null);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Delete this post?")) return;

    await postService.deletePost(postId);

    setPosts(posts.filter((p) => p._id !== postId));
  };

  const handleLike = async (postId) => {
    if (!user) return alert("Please log in");

    if (likingPostId === postId) return;

    setLikingPostId(postId);

    try {
      const updatedPost = await postService.likePost(postId);

      setPosts(posts.map((p) => (p._id === postId ? updatedPost : p)));
    } catch {
      alert("Failed to like post");
    } finally {
      setLikingPostId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="mb-20">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[var(--primary)]">
          Journal
        </p>

        <h1 className="text-5xl font-semibold leading-tight tracking-tight">
          Thoughts, stories and ideas.
        </h1>

        <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--muted)]">
          A calm space for writing and meaningful conversations.
        </p>
      </div>

      {user && (
        <div className="mb-16 rounded-[2rem] border bg-[var(--surface)] p-6">
          <CreatePost onPostCreated={handlePostCreated} />
        </div>
      )}

      {posts.length === 0 ? (
        <div className="py-20 text-sm text-[var(--muted)]">
          No posts available.
        </div>
      ) : (
        <div className="space-y-10">
          {posts.map((post) => {
            const isLiking = likingPostId === post._id;

            const isEditing = editingPostId === post._id;

            return (
              <article
                key={post._id}
                className="rounded-[2rem] border bg-[var(--surface)] p-8 transition hover:border-[var(--primary)]/30"
              >
                {isEditing ? (
                  <EditPost
                    post={post}
                    onPostUpdated={handlePostUpdated}
                    onCancel={() => setEditingPostId(null)}
                  />
                ) : (
                  <>
                    <div className="mb-5 flex items-center gap-3 text-xs text-[var(--muted)]">
                      <span>{post.author?.username || "Anonymous"}</span>

                      <span>•</span>

                      <span>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="mb-5 text-3xl font-semibold tracking-tight">
                      {post.title}
                    </h2>

                    <p className="whitespace-pre-wrap text-sm leading-8 text-[var(--muted)]">
                      {post.content}
                    </p>

                    <div className="mt-8 flex items-center gap-6 text-sm">
                      <button
                        onClick={() => handleLike(post._id)}
                        disabled={!user || isLiking}
                        className="text-[var(--primary)] transition hover:opacity-70"
                      >
                        Like ({post.likes?.length || 0})
                      </button>

                      {user && user._id === post.author?._id && (
                        <>
                          <button
                            onClick={() => setEditingPostId(post._id)}
                            className="text-[var(--muted)] transition hover:text-[var(--text)]"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(post._id)}
                            className="text-[var(--muted)] transition hover:text-[var(--secondary)]"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>

                    <div className="mt-10 border-t pt-8">
                      <CommentSection postId={post._id} />
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
