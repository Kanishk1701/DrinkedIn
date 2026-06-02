"use client";

import Header from "../components/Header";
import { useDrinkedInStore, NotificationItem } from "../store/drinkedinStore";
import { 
  FaBell, 
  FaGlassMartini, 
  FaComment, 
  FaUserPlus, 
  FaBriefcase, 
  FaEye, 
  FaCheck, 
  FaTrash 
} from "react-icons/fa";
import Link from "next/link";
import { useEffect } from "react";

export default function Notifications() {
  const notifications = useDrinkedInStore((state) => state.notifications);
  const markNotificationsAsRead = useDrinkedInStore((state) => state.markNotificationsAsRead);

  // Automatically mark notifications as read when visiting this page
  useEffect(() => {
    markNotificationsAsRead();
  }, [markNotificationsAsRead]);

  const getNotificationIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "cheer":
        return <FaGlassMartini className="h-4.5 w-4.5 text-amber-500" />;
      case "comment":
        return <FaComment className="h-4.5 w-4.5 text-sky-500" />;
      case "connection":
        return <FaUserPlus className="h-4.5 w-4.5 text-emerald-500" />;
      case "job":
        return <FaBriefcase className="h-4.5 w-4.5 text-orange-500" />;
      case "view":
        return <FaEye className="h-4.5 w-4.5 text-indigo-500" />;
      default:
        return <FaBell className="h-4.5 w-4.5 text-zinc-500" />;
    }
  };

  const getNotificationTitle = (type: NotificationItem["type"]) => {
    switch (type) {
      case "cheer":
        return "Cheers Social Accent";
      case "comment":
        return "Pour comment received";
      case "connection":
        return "Connection Request";
      case "job":
        return "Careers Match Recommendation";
      case "view":
        return "Profile View Intelligence";
      default:
        return "DrinkedIn Alert";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 font-sans text-zinc-200">
      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-lg overflow-hidden">
          {/* Notifications Header */}
          <div className="p-4 border-b border-zinc-900 bg-zinc-950 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-zinc-200">Notifications</h2>
              <span className="rounded-full bg-zinc-900 text-zinc-500 px-2 py-0.5 text-[10px] font-semibold">
                {notifications.length} total
              </span>
            </div>
            <button
              onClick={() => {
                markNotificationsAsRead();
                alert("All notifications marked as read.");
              }}
              className="text-[10px] font-bold text-amber-500 hover:text-amber-400 hover:underline flex items-center gap-1 transition-colors"
            >
              <FaCheck className="h-2.5 w-2.5" />
              <span>Mark all as read</span>
            </button>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-zinc-900">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <FaBell className="h-10 w-10 text-zinc-700 mb-2.5" />
                <p className="text-xs text-zinc-500">Your notifications tray is dry. Check back later!</p>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`flex gap-3.5 p-4 items-start transition-all hover:bg-zinc-900/30 ${
                    !item.read 
                      ? "bg-amber-500/[0.02] border-l-2 border-l-amber-500" 
                      : "border-l-2 border-l-transparent"
                  }`}
                >
                  {/* Left Column: Icon Type */}
                  <div className="h-9 w-9 shrink-0 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
                    {getNotificationIcon(item.type)}
                  </div>

                  {/* Middle Column: Text details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                        {getNotificationTitle(item.type)}
                      </h4>
                      <span className="text-[9px] text-zinc-655 font-normal">{item.time}</span>
                    </div>

                    <div className="flex items-start gap-2 pt-0.5">
                      {item.actorAvatar && (
                        <img
                          src={item.actorAvatar}
                          alt={item.actorName}
                          className="h-5 w-5 rounded-full object-cover shrink-0 border border-zinc-850 mt-0.5"
                        />
                      )}
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {item.actorName && <span className="font-bold text-zinc-200">{item.actorName} </span>}
                        {item.text}
                      </p>
                    </div>

                    {/* Quick navigation context link */}
                    {item.link && (
                      <div className="pt-2">
                        <Link
                          href={item.link}
                          className="text-[10px] font-bold text-amber-500 hover:text-amber-400 hover:underline inline-flex items-center gap-1"
                        >
                          View Details
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
