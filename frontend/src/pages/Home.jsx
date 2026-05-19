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

  const handlePostCreated = (newPost) => setPosts([newPost, ...posts]);
  const handlePostUpdated = (updatedPost) =>
    setPosts(posts.map((p) => (p._id === updatedPost._id ? updatedPost : p)));
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    await postService.deletePost(postId);
    setPosts(posts.filter((p) => p._id !== postId));
  };

  const handleLike = async (postId) => {
    if (!user) return alert("Please log in to like posts");
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading posts...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            Latest Articles
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Explore insights and stories from our community
          </p>
        </div>

        {/* Create Post Section */}
        {user && (
          <div className="mb-10">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-5 text-gray-900 dark:text-white">
                Share Your Thoughts
              </h2>
              <CreatePost onPostCreated={handlePostCreated} />
            </div>
          </div>
        )}

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No posts yet. Be the first to share!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => {
              const isLiked =
                user &&
                post.likes?.some((id) => id.toString() === user._id.toString());
              const isLiking = likingPostId === post._id;
              const isEditing = editingPostId === post._id;

              return (
                <article
                  key={post._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-6 sm:p-8">
                    {isEditing ? (
                      <EditPost
                        post={post}
                        onPostUpdated={handlePostUpdated}
                        onCancel={() => setEditingPostId(null)}
                      />
                    ) : (
                      <>
                        {/* Post Header */}
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                            {post.title}
                          </h2>
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                                {post.author?.username?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {post.author?.username || "Anonymous"}
                                </p>
                              </div>
                            </div>
                            <span className="text-gray-500 dark:text-gray-400">
                              {new Date(post.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                              Article
                            </span>
                          </div>
                        </div>

                        {/* Post Content */}
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 whitespace-pre-wrap">
                          {post.content}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <button
                            onClick={() => handleLike(post._id)}
                            disabled={!user || isLiking}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              isLiked
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            <span className="text-lg mr-2">
                              {isLiked ? "❤️" : "🤍"}
                            </span>
                            {isLiking
                              ? "Liking..."
                              : isLiked
                                ? "Liked"
                                : "Like"}
                            <span className="ml-1.5 text-sm opacity-80">
                              ({post.likes?.length || 0})
                            </span>
                          </button>

                          {user && user._id === post.author?._id && (
                            <>
                              <button
                                onClick={() => setEditingPostId(post._id)}
                                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={() => handleDelete(post._id)}
                                className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-all ml-auto"
                              >
                                🗑️ Delete
                              </button>
                            </>
                          )}
                        </div>

                        {/* Comments Section */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <CommentSection postId={post._id} />
                        </div>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
