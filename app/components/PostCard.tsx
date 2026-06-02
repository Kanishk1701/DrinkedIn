"use client";

import { useState } from "react";
import { 
  FaGlassMartini, 
  FaRegComment, 
  FaRetweet, 
  FaPaperPlane,
  FaShareAlt,
  FaBeer
} from "react-icons/fa";
import { Post, useDrinkedInStore } from "../store/drinkedinStore";
import RecipeCard from "./RecipeCard";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const cheerPost = useDrinkedInStore((state) => state.cheerPost);
  const sharePost = useDrinkedInStore((state) => state.sharePost);
  const addComment = useDrinkedInStore((state) => state.addComment);
  
  const [showComments, setShowComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");

  const handleCheer = () => {
    cheerPost(post.id);
  };

  const handleShare = () => {
    sharePost(post.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    addComment(post.id, newCommentText.trim());
    setNewCommentText("");
  };

  return (
    <article className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 shadow-lg transition-all duration-300 hover:border-zinc-700/60">
      {/* Author Section */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <img
            src={post.authorAvatar}
            alt={post.authorName}
            className="h-10 w-10 rounded-full object-cover border border-zinc-800"
          />
          <div>
            <h3 className="text-sm font-semibold text-zinc-100 hover:text-amber-500 hover:underline cursor-pointer transition-colors">
              {post.authorName}
            </h3>
            <p className="text-[11px] text-zinc-500 max-w-[280px] md:max-w-md truncate">
              {post.authorTitle}
            </p>
            <span className="text-[10px] text-zinc-600 block mt-0.5">{post.timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line mb-3">
        {post.content}
      </div>

      {/* Optional Post Image */}
      {post.image && (
        <div className="relative overflow-hidden rounded-lg border border-zinc-900 mb-3 bg-zinc-900">
          <img
            src={post.image}
            alt="Post media"
            className="w-full h-64 md:h-80 object-cover hover:scale-[1.01] transition-transform duration-500"
          />
        </div>
      )}

      {/* Optional Recipe Card */}
      {post.recipe && (
        <div className="mb-3">
          <RecipeCard recipe={post.recipe} />
        </div>
      )}

      {/* Stats Counter */}
      <div className="flex items-center justify-between py-2 border-b border-zinc-900 text-[11px] text-zinc-500">
        <div className="flex items-center gap-1">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 text-[10px]">
            🍸
          </span>
          <span>{post.likes} Cheers</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowComments(!showComments)}
            className="hover:underline hover:text-zinc-300"
          >
            {post.commentsCount} Bar Talk
          </button>
          <span>{post.shares} Pass The Pint</span>
        </div>
      </div>

      {/* Interactive Action Buttons */}
      <div className="grid grid-cols-3 gap-1 pt-2">
        {/* Cheers Button */}
        <button
          onClick={handleCheer}
          className={`flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg transition-all ${
            post.cheered
              ? "text-amber-500 bg-amber-500/[0.04] scale-[1.02]"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
          }`}
        >
          <FaGlassMartini className={`h-4 w-4 ${post.cheered ? "animate-pulse" : ""}`} />
          <span>Cheers</span>
        </button>

        {/* Comment Button */}
        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg transition-colors ${
            showComments
              ? "text-zinc-200 bg-zinc-900/80"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
          }`}
        >
          <FaRegComment className="h-4 w-4" />
          <span>Bar Talk</span>
        </button>

        {/* Repost Button */}
        <button
          onClick={handleShare}
          className={`flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg transition-colors ${
            post.shared
              ? "text-emerald-500 bg-emerald-500/[0.04]"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
          }`}
        >
          <FaRetweet className="h-4 w-4" />
          <span>Pass The Pint</span>
        </button>
      </div>

      {/* Expanded Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-zinc-900 space-y-4">
          {/* New Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2.5">
            <img
              src={useDrinkedInStore.getState().profile.avatar}
              alt="Me"
              className="h-8 w-8 rounded-full object-cover border border-zinc-800"
            />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Start an unnecessary argument..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="flex-1 rounded-full bg-zinc-900 px-4 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 border border-zinc-800 focus:border-amber-500/40 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 px-4 py-1.5 text-xs font-medium text-zinc-300 transition-colors"
              >
                Post
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3.5 max-h-[250px] overflow-y-auto pr-1">
            {post.comments.length === 0 ? (
              <p className="text-xs text-zinc-600 text-center py-2">No Bar Talk yet. Pour the first thoughts!</p>
            ) : (
              post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-2.5 items-start bg-zinc-900/40 rounded-xl p-3 border border-zinc-800/20">
                  <img
                    src={comment.authorAvatar}
                    alt={comment.authorName}
                    className="h-7 w-7 rounded-full object-cover border border-zinc-800"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-semibold text-zinc-200">{comment.authorName}</h4>
                        <p className="text-[10px] text-zinc-500">{comment.authorTitle}</p>
                      </div>
                      <span className="text-[9px] text-zinc-600">{comment.time}</span>
                    </div>
                    <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </article>
  );
}
