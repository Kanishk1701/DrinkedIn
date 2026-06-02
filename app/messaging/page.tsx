"use client";

import Header from "../components/Header";
import { useDrinkedInStore, ChatThread } from "../store/drinkedinStore";
import { 
  FaPaperPlane, 
  FaSearch, 
  FaInfoCircle, 
  FaArrowLeft,
  FaImage,
  FaFileAlt
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function DrunkTexts() {
  const threads = useDrinkedInStore((state) => state.threads);
  const sendMessage = useDrinkedInStore((state) => state.sendMessage);
  
  const [activeThreadId, setActiveThreadId] = useState<string>(threads[0]?.id || "");
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  // Auto-scroll messages to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
    // Simulating marking as read
    if (activeThread && activeThread.unread) {
      activeThread.unread = false;
    }
  }, [activeThread?.messages?.length, activeThreadId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThread) return;
    sendMessage(activeThread.id, inputText.trim());
    setInputText("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 font-sans text-zinc-200">
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[600px] max-h-[700px]">
          
          {/* LEFT PANEL: THREADS LIST (2/5 size) */}
          <section className="w-full md:w-2/5 border-r border-zinc-900 flex flex-col">
            {/* Search chats */}
            <div className="p-4 border-b border-zinc-900 bg-zinc-950/40 space-y-3">
              <h2 className="text-sm font-bold text-zinc-200">Drunk Texts</h2>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search apologies, bad influences..."
                  className="w-full rounded-lg bg-zinc-900 border border-zinc-800 py-1.5 pl-8.5 pr-3.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-750"
                  onClick={() => alert("Search texts is disabled in mockup.")}
                />
              </div>
            </div>

            {/* Threads List items */}
            <div className="flex-1 overflow-y-auto divide-y divide-zinc-900">
              {threads.map((thread) => {
                const isActive = thread.id === activeThreadId;
                return (
                  <div
                    key={thread.id}
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`flex gap-3 p-4 cursor-pointer hover:bg-zinc-900/50 transition-colors ${
                      isActive ? "bg-zinc-900 border-l-2 border-l-amber-500" : ""
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={thread.partnerAvatar}
                        alt={thread.partnerName}
                        className="h-11 w-11 rounded-full object-cover border border-zinc-850"
                      />
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex justify-between items-center">
                        <h3 className={`text-xs font-bold truncate ${thread.unread ? "text-zinc-100" : "text-zinc-300"}`}>
                          {thread.partnerName}
                        </h3>
                        <span className="text-[9px] text-zinc-550 shrink-0">{thread.lastMessageTime}</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 truncate">{thread.partnerTitle}</p>
                      <p className={`text-[10px] truncate ${thread.unread ? "text-amber-500 font-medium" : "text-zinc-450"}`}>
                        {thread.lastMessage}
                      </p>
                    </div>

                    {thread.unread && (
                      <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0 self-center" />
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* RIGHT PANEL: CHAT WINDOW (3/5 size) */}
          <section className="w-full md:w-3/5 flex flex-col bg-zinc-950/20">
            {activeThread ? (
              <>
                {/* Active Chat Header */}
                <div className="p-4 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeThread.partnerAvatar}
                      alt={activeThread.partnerName}
                      className="h-10 w-10 rounded-full object-cover border border-zinc-800"
                    />
                    <div>
                      <h2 className="text-xs font-bold text-zinc-100">{activeThread.partnerName}</h2>
                      <p className="text-[10px] text-zinc-500 truncate max-w-[200px] sm:max-w-[320px]">{activeThread.partnerTitle}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Accomplice details: ${activeThread.partnerName} is an active bad influence.`)}
                    className="p-2 rounded-full hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    <FaInfoCircle className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Messages Bubbles Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                  {activeThread.messages.map((msg) => {
                    const isMe = msg.senderId === "me";
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col max-w-[75%] ${isMe ? "ml-auto items-end" : "mr-auto items-start"}`}
                      >
                        <div
                          className={`rounded-2xl px-4 py-2.5 text-xs shadow-md leading-relaxed ${
                            isMe
                              ? "bg-amber-500 text-zinc-950 rounded-br-none font-medium"
                              : "bg-zinc-900 text-zinc-300 rounded-bl-none border border-zinc-800/40"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[9px] text-zinc-650 mt-1 px-1">{msg.timestamp}</span>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Footer Input */}
                <div className="p-3 bg-zinc-950 border-t border-zinc-900">
                  <form onSubmit={handleSend} className="flex gap-2 items-center">
                    <div className="flex items-center gap-1.5">
                      <button 
                        type="button"
                        onClick={() => alert("Image uploads disabled during active tabs.")}
                        className="p-2 rounded-full hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300 transition-colors"
                        title="Add blurry photo"
                      >
                        <FaImage className="h-4 w-4" />
                      </button>
                      <button 
                        type="button"
                        onClick={() => alert("Sending bail bonds / documents is disabled in mockup.")}
                        className="p-2 rounded-full hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300 transition-colors"
                        title="Attach incident report / files"
                      >
                        <FaFileAlt className="h-4 w-4" />
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Type a drunk text, apologize for last night..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="flex-1 rounded-full bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:border-amber-500/40 focus:outline-none"
                    />

                    <button
                      type="submit"
                      disabled={!inputText.trim()}
                      className="h-9 w-9 shrink-0 flex items-center justify-center rounded-full bg-amber-500 disabled:opacity-40 disabled:hover:bg-amber-500 hover:bg-amber-600 text-zinc-950 transition-all shadow-md hover:scale-[1.03]"
                    >
                      <FaPaperPlane className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <p className="text-xs text-zinc-500">Select an accomplice to begin sending drunk texts.</p>
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}
