"use client";

import { useState } from "react";
import Header from "./components/Header";
import PostCard from "./components/PostCard";
import CreatePostModal from "./components/CreatePostModal";
import { useDrinkedInStore } from "./store/drinkedinStore";
import { 
  FaRegEdit, 
  FaImage, 
  FaCalendarAlt, 
  FaFileAlt,
  FaGlassWhiskey,
  FaArrowRight,
  FaBookmark,
  FaUserAlt
} from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  const profile = useDrinkedInStore((state) => state.profile);
  const posts = useDrinkedInStore((state) => state.posts);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  // DrinkedIn News/Trending items
  const trendingNews = [
    { id: 1, title: "Sourcing Rare Agave Spirits", category: "Trends", readers: "1,248 readers" },
    { id: 2, title: "Zero-Waste Bar Prep Hacks", category: "Operations", readers: "852 readers" },
    { id: 3, title: "Sommelier Guide to Low-intervention Wines", category: "Wines", readers: "620 readers" },
    { id: 4, title: "Salary Standards for Head Mixologists", category: "Careers", readers: "2,192 readers" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 font-sans text-zinc-200">
      <Header />
      
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* LEFT SIDEBAR: PROFILE SUMMARY */}
          <aside className="lg:col-span-1 space-y-4">
            {/* Quick Profile Card */}
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-md">
              {/* Cover Banner */}
              <div 
                className="h-16 w-full bg-cover bg-center border-b border-zinc-900"
                style={{ backgroundImage: `url(${profile.coverPhoto})` }}
              />
              
              {/* Profile Details */}
              <div className="relative px-4 pb-4 pt-10 text-center border-b border-zinc-900">
                <div className="absolute -top-9 left-1/2 -translate-x-1/2">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-18 w-18 rounded-full border-2 border-zinc-950 object-cover"
                  />
                </div>
                <Link href="/profile" className="hover:underline">
                  <h2 className="text-sm font-bold text-zinc-100">{profile.name}</h2>
                </Link>
                <p className="text-[11px] text-zinc-500 mt-1 leading-snug">{profile.title}</p>
                <p className="text-[10px] text-zinc-600 mt-1.5">{profile.location}</p>
              </div>

              {/* Stats Analytics */}
              <div className="py-2 border-b border-zinc-900 text-xs">
                <Link href="/profile" className="flex items-center justify-between px-4 py-1.5 hover:bg-zinc-900/60 transition-colors">
                  <span className="text-zinc-500 text-[11px]">Profile views</span>
                  <span className="font-semibold text-amber-500">{profile.profileViews}</span>
                </Link>
                <Link href="/profile" className="flex items-center justify-between px-4 py-1.5 hover:bg-zinc-900/60 transition-colors">
                  <span className="text-zinc-500 text-[11px]">Post impressions</span>
                  <span className="font-semibold text-amber-500">{profile.postImpressions}</span>
                </Link>
                <Link href="/network" className="flex items-center justify-between px-4 py-1.5 hover:bg-zinc-900/60 transition-colors">
                  <span className="text-zinc-500 text-[11px]">Connections</span>
                  <span className="font-semibold text-amber-500">{profile.connectionsCount}</span>
                </Link>
              </div>

              {/* Access Premium Info / My Cellar */}
              <div className="p-3 text-xs bg-amber-500/[0.02]">
                <Link href="/profile" className="flex items-center gap-2 font-medium text-amber-500 hover:text-amber-400">
                  <FaBookmark className="h-3 w-3 shrink-0" />
                  <span>My Saved Recipes & Cellar</span>
                </Link>
              </div>
            </div>

            {/* Quick links card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-md text-xs space-y-3 hidden lg:block">
              <h3 className="font-bold text-zinc-400 uppercase tracking-wider text-[10px]">Shortcuts</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/network" className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] hover:border-amber-500/30 transition-colors">Network</Link>
                <Link href="/jobs" className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] hover:border-amber-500/30 transition-colors">Find Jobs</Link>
                <Link href="/messaging" className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] hover:border-amber-500/30 transition-colors">Suppliers Chat</Link>
              </div>
            </div>
          </aside>

          {/* MIDDLE COLUMN: POST COMPOSER & POSTS FEED */}
          <section className="lg:col-span-2 space-y-4">
            {/* Create Post Card Launcher */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-md">
              <div className="flex gap-3">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-10 w-10 rounded-full object-cover border border-zinc-850"
                />
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 rounded-full bg-zinc-900 px-4 text-left text-xs font-medium text-zinc-500 hover:bg-zinc-850 transition-colors focus:outline-none"
                >
                  Start a post, or share a cocktail recipe...
                </button>
              </div>

              {/* Action shortcuts */}
              <div className="grid grid-cols-4 gap-1 mt-3 pt-3 border-t border-zinc-900">
                <button 
                  onClick={() => { setIsModalOpen(true); }}
                  className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 text-xs font-semibold"
                >
                  <FaImage className="text-sky-500" />
                  <span>Media</span>
                </button>
                <button 
                  onClick={() => { setIsModalOpen(true); }}
                  className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 text-xs font-semibold"
                >
                  <FaGlassWhiskey className="text-amber-500" />
                  <span>Recipe</span>
                </button>
                <button 
                  onClick={() => alert("Mixology Events section is coming soon!")}
                  className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 text-xs font-semibold"
                >
                  <FaCalendarAlt className="text-orange-500" />
                  <span>Event</span>
                </button>
                <button 
                  onClick={() => { setIsModalOpen(true); }}
                  className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 text-xs font-semibold"
                >
                  <FaFileAlt className="text-emerald-500" />
                  <span>Write Article</span>
                </button>
              </div>
            </div>

            {/* Separator / Sort option */}
            <div className="flex items-center justify-between text-xs px-1 text-zinc-500">
              <div className="h-px bg-zinc-900 flex-1 mr-4" />
              <div className="flex gap-1">
                <span>Sort by:</span>
                <span className="font-bold text-zinc-300 hover:text-amber-500 cursor-pointer flex items-center gap-0.5">
                  Top Pour 🍸
                </span>
              </div>
            </div>

            {/* Feed Posts List */}
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>

          {/* RIGHT SIDEBAR: TRENDING & SUGGESTED CONNECTIONS */}
          <aside className="lg:col-span-1 space-y-4">
            {/* DrinkedIn News */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-md">
              <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">DrinkedIn News</h2>
              <div className="space-y-3">
                {trendingNews.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <h3 className="text-xs font-semibold text-zinc-200 group-hover:text-amber-500 group-hover:underline transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex gap-2 text-[10px] text-zinc-500 mt-0.5">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.readers}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Bar Brands (Non-copyrighted custom brands) */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-md text-xs space-y-3">
              <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Top Beverage Houses</h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-800 flex items-center justify-center font-bold text-zinc-950 text-[10px]">
                    BS
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-200">Botanical Shaker Co.</h3>
                    <p className="text-[10px] text-zinc-500">Premium Gin & Infusions</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-amber-500 to-red-800 flex items-center justify-center font-bold text-zinc-950 text-[10px]">
                    OD
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-200">Oak Barrel Cooperage</h3>
                    <p className="text-[10px] text-zinc-500">Aged Whiskey & Casks</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-800 flex items-center justify-center font-bold text-zinc-950 text-[10px]">
                    HL
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-200">Hops & Legacies</h3>
                    <p className="text-[10px] text-zinc-500">Microbrewery Alliance</p>
                  </div>
                </div>
              </div>

              <Link href="/jobs" className="text-[10px] font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1.5 pt-1.5 border-t border-zinc-900 w-fit">
                <span>View Job Openings</span>
                <FaArrowRight className="h-2 w-2" />
              </Link>
            </div>
          </aside>

        </div>
      </main>

      {/* CREATE POST MODAL DIALOG */}
      <CreatePostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
