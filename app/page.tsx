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

const barNews = [
  { id: 1, title: "Local bartender rolls eyes at patron ordering 'mojito, no mint'", category: "Fights", readers: "4.2k readers" },
  { id: 2, title: "VIP lounge flooded after Stout keg line bursts", category: "Spills", readers: "1.8k readers" },
  { id: 3, title: "Patron sends 4-page essay to ex after three tequila shots", category: "Regrets", readers: "12.4k readers" },
  { id: 4, title: "Police seek barback suspected of stealing 40 lemons", category: "Heists", readers: "920 readers" },
  { id: 5, title: "Guest spotted putting ice cubes in 1996 Chateau Margaux", category: "Crimes", readers: "3.1k readers" },
  { id: 6, title: "Fight avoided: Combatants realize they went to same school", category: "Fights", readers: "2.5k readers" },
  { id: 7, title: "Bartender sets record for ignoring waving 500-rupee note", category: "Records", readers: "8.9k readers" },
  { id: 8, title: "Freshly poured cocktail knocked over by dramatic hand gesture", category: "Spills", readers: "1.1k readers" },
  { id: 9, title: "Patron spots ex-girlfriend at door; exits through kitchen", category: "Regrets", readers: "5.6k readers" },
  { id: 10, title: "Spilled campari leaves red stain; patron calls it 'high fashion'", category: "Spills", readers: "720 readers" },
  { id: 11, title: "DJ plays 'Wonderwall' for 3rd time; crowd boos enthusiastically", category: "DJ Crimes", readers: "2.8k readers" },
  { id: 12, title: "Bartender reveals 'secret ingredient' is just double sugar syrup", category: "Secrets", readers: "6.4k readers" },
  { id: 13, title: "Acoustic duo volume level compared to roaring jet engine", category: "Acoustics", readers: "1.5k readers" },
  { id: 14, title: "Patron returns to retrieve card, faces bartender's icy glare", category: "Regrets", readers: "4.1k readers" },
  { id: 15, title: "Cocktail shaker flies off; walls decorated in Espresso Martini", category: "Spills", readers: "3.5k readers" },
  { id: 16, title: "Sommelier detects 'notes of leather' in cheap local house red", category: "Sommelier Lies", readers: "1.9k readers" },
  { id: 17, title: "Flair bartender drops ₹25,000 Scotch during triple spin", category: "Fails", readers: "7.2k readers" },
  { id: 18, title: "Barback promoted to bartender; first order is a complex Virgin Colada", category: "Career Shifts", readers: "910 readers" },
  { id: 19, title: "Customer orders 'sweet dry martini'; bartender suffers crisis", category: "Existentialism", readers: "3.8k readers" },
  { id: 20, title: "Patron tries paying for ₹800 craft beer with expired bus ticket", category: "Audacity", readers: "5.2k readers" },
  { id: 21, title: "VIP booth couple debates if coriander tastes like bathroom soap", category: "Intrigue", readers: "1.4k readers" },
  { id: 22, title: "Ice machine breaks down on 42°C night; mass hysteria reported", category: "Panics", readers: "9.3k readers" },
  { id: 23, title: "Patron spends 20 minutes photographing drink; ice melts", category: "Photography", readers: "2.1k readers" },
  { id: 24, title: "Group orders 8 custom complex shots at 11:59 PM; bartender weeps", category: "Tragedies", readers: "11.1k readers" },
  { id: 25, title: "Patron swears they had two beers; tab shows 12 drinks and a regret", category: "Regrets", readers: "14.5k readers" }
];

import { useEffect } from "react";

export default function Home() {
  const profile = useDrinkedInStore((state) => state.profile);
  const posts = useDrinkedInStore((state) => state.posts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shuffledNews, setShuffledNews] = useState<{id: number, title: string, category: string, readers: string}[]>([]);

  useEffect(() => {
    // Shuffle news and take 6 items
    const shuffled = [...barNews].sort(() => 0.5 - Math.random());
    setShuffledNews(shuffled.slice(0, 6));
  }, []);

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
                  <span className="text-zinc-500 text-[11px]">Pub Visitors</span>
                  <span className="font-semibold text-amber-500">{profile.profileViews}</span>
                </Link>
                <Link href="/profile" className="flex items-center justify-between px-4 py-1.5 hover:bg-zinc-900/60 transition-colors">
                  <span className="text-zinc-500 text-[11px]">Cheers Reached</span>
                  <span className="font-semibold text-amber-500">{profile.postImpressions}</span>
                </Link>
                <Link href="/network" className="flex items-center justify-between px-4 py-1.5 hover:bg-zinc-900/60 transition-colors">
                  <span className="text-zinc-500 text-[11px]">Bad Influences</span>
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
                <Link href="/network" className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] hover:border-amber-500/30 transition-colors">Bad Influences</Link>
                <Link href="/notifications" className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] hover:border-amber-500/30 transition-colors">Pour Alerts</Link>
                <Link href="/messaging" className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] hover:border-amber-500/30 transition-colors">Drunk Texts</Link>
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
                  Start a rant, or share a Tuesday hangover cure......
                </button>
              </div>

              {/* Action shortcuts */}
              <div className="grid grid-cols-4 gap-1 mt-3 pt-3 border-t border-zinc-900">
                <button
                  onClick={() => { setIsModalOpen(true); }}
                  className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 text-xs font-semibold"
                >
                  <FaImage className="text-sky-500" />
                  <span>Blurry Pics</span>
                </button>
                <button
                  onClick={() => { setIsModalOpen(true); }}
                  className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 text-xs font-semibold"
                >
                  <FaGlassWhiskey className="text-amber-500" />
                  <span>Cocktails</span>
                </button>
                <button
                  onClick={() => alert("Mixology Events section is coming soon!")}
                  className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 text-xs font-semibold"
                >
                  <FaCalendarAlt className="text-orange-500" />
                  <span>Pre-Game</span>
                </button>
                <button
                  onClick={() => { setIsModalOpen(true); }}
                  className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 text-xs font-semibold"
                >
                  <FaFileAlt className="text-emerald-500" />
                  <span>Publish Incident Report</span>
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
                {shuffledNews.map((item) => (
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
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center font-bold text-zinc-950 text-[10px] shrink-0">
                    MB
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-200">Midway Bar & Restraunt</h3>
                    <p className="text-[10px] text-zinc-500">Flair & Food • Bangalore</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-800 flex items-center justify-center font-bold text-zinc-950 text-[10px] shrink-0">
                    HW
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-200">Hillway Bar and Night Light</h3>
                    <p className="text-[10px] text-zinc-500">Scenic Lounge • Dehradun</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-pink-500 to-purple-900 flex items-center justify-center font-bold text-zinc-950 text-[10px] shrink-0">
                    LC
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-200">The Local Cask</h3>
                    <p className="text-[10px] text-zinc-500">Premium Speakeasy • Mumbai</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-700 flex items-center justify-center font-bold text-zinc-950 text-[10px] shrink-0">
                    GB
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-200">Goan Beachside Tavern</h3>
                    <p className="text-[10px] text-zinc-500">Open-Air Beach Club • Goa</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-orange-400 to-red-800 flex items-center justify-center font-bold text-zinc-950 text-[10px] shrink-0">
                    HE
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-200">The Hops Empire</h3>
                    <p className="text-[10px] text-zinc-500">Industrial Microbrewery • Gurugram</p>
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-semibold text-zinc-550 pt-2 border-t border-zinc-900 text-center">
                <span>Drink Responsibly (Or Don't) 🍻</span>
              </div>
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
