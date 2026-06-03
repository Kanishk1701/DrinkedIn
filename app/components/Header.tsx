"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaGlassMartiniAlt,
  FaHome,
  FaUserFriends,
  FaBriefcase,
  FaComments,
  FaBell,
  FaSearch,
  FaChevronDown,
  FaSignOutAlt,
  FaUser
} from "react-icons/fa";
import { useDrinkedInStore } from "../store/drinkedinStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const profile = useDrinkedInStore((state) => state.profile);
  const logoutAction = useDrinkedInStore((state) => state.logout);
  const threads = useDrinkedInStore((state) => state.threads);
  const notifications = useDrinkedInStore((state) => state.notifications);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const unreadMessagesCount = threads.filter(t => t.unread).length;
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { label: "My Pub", href: "/", icon: FaHome },
    {
      label: "Bad Influences",
      href: "/network",
      icon: FaUserFriends,
      badge: 0
    },
    {
      label: "Drunk Texts",
      href: "/messaging",
      icon: FaComments,
      badge: unreadMessagesCount
    },
    {
      label: "Pour Alerts",
      href: "/notifications",
      icon: FaBell,
      badge: unreadNotificationsCount
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Left Side: Brand Logo & Search */}
        <div className="flex flex-1 items-center gap-3 md:gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 shadow-md shadow-amber-500/20 transition-all duration-300 group-hover:scale-105">
              <FaGlassMartiniAlt className="h-5 w-5 text-zinc-950 transform group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="hidden text-xl font-bold tracking-tight sm:block">
              <span className="bg-gradient-to-r from-zinc-50 to-zinc-200 bg-clip-text text-transparent">Drinked</span>
              <span className="text-amber-500">In</span>
            </span>
          </Link>

          {/* Search bar */}
          <div className="relative w-full max-w-[280px] hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className={`h-4 w-4 transition-colors duration-200 ${searchFocused ? 'text-amber-500' : 'text-zinc-500'}`} />
            </div>
            <input
              type="text"
              placeholder="Search bars, ex(es), excuses..."
              className={`w-full rounded-full bg-zinc-900 py-1.5 pl-9 pr-4 text-sm text-zinc-200 placeholder-zinc-500 border transition-all duration-200 focus:outline-none ${searchFocused
                  ? 'border-amber-500/50 shadow-sm shadow-amber-500/10 w-[320px]'
                  : 'border-zinc-800 focus:border-zinc-700'
                }`}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right Side: Navigation & Profile */}
        <nav className="flex items-center gap-1 sm:gap-2 md:gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center px-2 py-1.5 text-xs font-medium transition-colors duration-200 rounded-lg group ${isActive
                    ? "text-amber-500"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                  }`}
              >
                <div className="relative">
                  <Icon className="h-5 w-5 mb-0.5" />
                  {item.badge && item.badge > 0 ? (
                    <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-zinc-950 ring-2 ring-zinc-950">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <span className="hidden md:inline-block text-[10px] mt-0.5 font-normal">
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-500 rounded-full" />
                )}
              </Link>
            );
          })}

          {/* Vertical Divider */}
          <div className="h-8 w-px bg-zinc-800 hidden md:block" />

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex flex-col items-center justify-center px-1 py-1 text-xs font-medium text-zinc-400 hover:text-zinc-200 focus:outline-none"
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-6 w-6 rounded-full object-cover border border-zinc-800 hover:border-amber-500/50 transition-colors"
              />
              <span className="hidden md:flex items-center gap-0.5 text-[10px] mt-0.5 font-normal">
                Me <FaChevronDown className="h-2 w-2" />
              </span>
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-zinc-800 bg-zinc-950 p-2 shadow-xl shadow-black/80 ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                  <div className="flex items-center gap-2 p-2 border-b border-zinc-900 pb-3">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="h-10 w-10 rounded-full object-cover border border-zinc-800"
                    />
                    <div className="overflow-hidden">
                      <h4 className="font-semibold text-sm text-zinc-100 truncate">{profile.name}</h4>
                      <p className="text-xs text-zinc-500 truncate">{profile.title}</p>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-amber-500 transition-colors"
                    >
                      <FaUser className="h-4 w-4" />
                      View Profile
                    </Link>
                  </div>

                  <div className="border-t border-zinc-900 pt-1 mt-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logoutAction();
                        router.push("/login");
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-400 hover:bg-red-950/20 transition-colors text-left"
                    >
                      <FaSignOutAlt className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
