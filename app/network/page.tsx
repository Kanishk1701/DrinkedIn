"use client";

import Header from "../components/Header";
import { useDrinkedInStore, Connection } from "../store/drinkedinStore";
import { 
  FaUserFriends, 
  FaUserPlus, 
  FaUserTimes, 
  FaUserCheck, 
  FaAddressBook, 
  FaBriefcase,
  FaAward
} from "react-icons/fa";
import Link from "next/link";

export default function BadInfluences() {
  const connections = useDrinkedInStore((state) => state.connections);
  const toggleConnection = useDrinkedInStore((state) => state.toggleConnection);
  
  // Pending received (for demo, Sofia Gatti starts as pending)
  const pendingRequests = connections.filter((c) => c.status === "pending");
  
  // Recommendations: people with status "none"
  const recommendedPeople = connections.filter((c) => c.status === "none");

  // Connected friends
  const connectedFriends = connections.filter((c) => c.status === "connected");

  const handleConnectClick = (id: string) => {
    toggleConnection(id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 font-sans text-zinc-200">
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* LEFT PANEL: NETWORK INFO */}
          <aside className="lg:col-span-1 space-y-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-md text-xs space-y-4">
              <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Influences Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-zinc-300">
                  <span className="flex items-center gap-2"><FaUserFriends /> Bad Influences</span>
                  <span className="font-semibold text-amber-500">{connectedFriends.length + 842}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-500 hover:text-zinc-300 cursor-pointer">
                  <span className="flex items-center gap-2"><FaAddressBook /> Teammates</span>
                  <span className="font-semibold text-zinc-400">12</span>
                </div>
                <div className="flex justify-between items-center text-zinc-500 hover:text-zinc-300 cursor-pointer">
                  <span className="flex items-center gap-2"><FaBriefcase /> Companies & Bars</span>
                  <span className="font-semibold text-zinc-400">46</span>
                </div>
                <div className="flex justify-between items-center text-zinc-500 hover:text-zinc-300 cursor-pointer">
                  <span className="flex items-center gap-2"><FaAward /> Certifications</span>
                  <span className="font-semibold text-zinc-400">3</span>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <section className="lg:col-span-3 space-y-6">
            
            {/* PENDING RECEIVED REQUESTS */}
            {pendingRequests.length > 0 && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-md space-y-4">
                <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-2">
                  Pending Invitations ({pendingRequests.length})
                </h2>
                <div className="divide-y divide-zinc-900">
                  {pendingRequests.map((req) => (
                    <div key={req.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <img
                          src={req.avatar}
                          alt={req.name}
                          className="h-11 w-11 rounded-full object-cover border border-zinc-800"
                        />
                        <div>
                          <h3 className="text-xs font-bold text-zinc-100">{req.name}</h3>
                          <p className="text-[10px] text-zinc-500">{req.title}</p>
                          <p className="text-[9px] text-zinc-600 mt-0.5">{req.mutualConnections} mutual influences</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleConnectClick(req.id)}
                          className="flex-1 sm:flex-none rounded-full border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 px-4 py-1.5 text-[10px] font-bold text-zinc-400 transition-colors"
                        >
                          Ignore Table
                        </button>
                        <button
                          onClick={() => handleConnectClick(req.id)}
                          className="flex-1 sm:flex-none rounded-full bg-amber-500 hover:bg-amber-600 px-4 py-1.5 text-[10px] font-bold text-zinc-950 transition-colors"
                        >
                          Join Table
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RECOMMENDATIONS (PEOPLE YOU MAY KNOW) */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-md">
              <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-2 mb-4">
                Bad Influences you may know in the beverage scene
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recommendedPeople.length === 0 ? (
                  <p className="text-xs text-zinc-600 col-span-full text-center py-6">You've sent requests to all recommended profiles!</p>
                ) : (
                  recommendedPeople.map((person) => {
                    const isPending = person.status === "pending";
                    return (
                      <div key={person.id} className="relative rounded-xl border border-zinc-900 bg-zinc-900/10 p-4 flex flex-col items-center text-center shadow-inner hover:border-zinc-800 transition-all">
                        {/* Avatar */}
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="h-16 w-16 rounded-full object-cover border border-zinc-800 mb-2.5"
                        />
                        {/* Profile Info */}
                        <div className="flex-1 space-y-1">
                          <h3 className="text-xs font-bold text-zinc-200 line-clamp-1">{person.name}</h3>
                          <p className="text-[10px] text-zinc-500 h-8 overflow-hidden line-clamp-2 leading-relaxed px-1">
                            {person.title}
                          </p>
                          <p className="text-[9px] text-zinc-600 pt-1.5">{person.mutualConnections} mutual influences</p>
                        </div>

                        {/* Action button */}
                        <button
                          onClick={() => handleConnectClick(person.id)}
                          className={`w-full rounded-full py-1.5 text-[10px] font-bold mt-4 transition-all ${
                            isPending
                              ? "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-red-400 hover:border-red-950/20"
                              : "border border-amber-500/20 hover:border-amber-500/40 text-amber-500 hover:bg-amber-500/[0.02]"
                          }`}
                        >
                          {isPending ? "Waiting at Table..." : "Join Table"}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* MY ACTIVE CONNECTIONS */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-md space-y-4">
              <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-2">
                My Bad Influences ({connectedFriends.length})
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {connectedFriends.map((conn) => (
                  <div key={conn.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-zinc-900/30 border border-zinc-900">
                    <img
                      src={conn.avatar}
                      alt={conn.name}
                      className="h-9 w-9 rounded-full object-cover border border-zinc-850"
                    />
                    <div className="flex-1 overflow-hidden">
                      <h3 className="text-xs font-bold text-zinc-200 truncate">{conn.name}</h3>
                      <p className="text-[10px] text-zinc-500 truncate">{conn.title}</p>
                    </div>
                    <button
                      onClick={() => handleConnectClick(conn.id)}
                      className="rounded-full bg-zinc-900 border border-zinc-850 px-3 py-1 text-[9px] font-bold text-zinc-500 hover:text-red-400 transition-colors shrink-0"
                    >
                      Leave Table
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}
