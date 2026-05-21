// Profile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { postService } from "../services/postService";
import CreatePost from "../components/CreatePost";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const data = await postService.getUserPosts(user._id);
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchMyPosts();
  }, [user]);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Delete this post?")) return;

    await postService.deletePost(postId);

    setPosts(posts.filter((p) => p._id !== postId));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10 rounded-[2rem] border bg-[var(--surface)] p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[var(--primary)]">
          Profile
        </p>

        <h1 className="text-4xl font-semibold tracking-tight">
          {user.username}
        </h1>

        <p className="mt-3 text-sm text-[var(--muted)]">{user.email}</p>
      </div>

      <div className="mb-10 rounded-[2rem] border bg-[var(--surface)] p-8">
        <CreatePost onPostCreated={handlePostCreated} />
      </div>

      <div className="rounded-[2rem] border bg-[var(--surface)] p-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Your posts</h2>

          <span className="text-sm text-[var(--muted)]">{posts.length}</span>
        </div>

        {posts.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No posts created yet.</p>
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
              <div
                key={post._id}
                className="
                  rounded-[1.5rem]
                  border
                  bg-[var(--bg)]
                  p-6
                "
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {post.title}
                    </h3>

                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(post._id)}
                    className="
                      text-sm
                      text-[var(--muted)]
                      transition
                      hover:text-[var(--secondary)]
                    "
                  >
                    Delete
                  </button>
                </div>

                <p className="line-clamp-3 text-sm leading-7 text-[var(--muted)]">
                  {post.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
