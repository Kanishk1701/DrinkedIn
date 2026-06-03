"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGlassMartiniAlt, FaEnvelope, FaUser, FaBriefcase, FaArrowRight, FaExclamationCircle } from "react-icons/fa";
import { useDrinkedInStore } from "../store/drinkedinStore";

const preSelectedAvatars = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Jack",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Charlie",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Milo",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Sasha",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Toby",
];

export default function LoginPage() {
  const router = useRouter();
  const loginAction = useDrinkedInStore((state) => state.login);
  const signupAction = useDrinkedInStore((state) => state.signup);

  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(preSelectedAvatars[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email.trim()) {
      setError("Email address is required.");
      setIsLoading(false);
      return;
    }

    try {
      if (activeTab === "signin") {
        loginAction(email);
      } else {
        signupAction(email, name, headline, selectedAvatar);
      }
      
      // Mimic a smooth transition loading delay
      setTimeout(() => {
        setIsLoading(false);
        router.push("/");
      }, 800);
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12 font-sans text-zinc-200 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-xl shadow-amber-500/20 transform hover:scale-105 transition-transform duration-300">
            <FaGlassMartiniAlt className="h-8 w-8 text-zinc-950" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-zinc-50 to-zinc-200 bg-clip-text text-transparent">Drinked</span>
            <span className="text-amber-500">In</span>
          </h2>
          <p className="mt-2 text-xs text-zinc-500 max-w-xs leading-relaxed">
            The professional network for beer chuggers, cocktail mixers, and night-out legends.
          </p>
        </div>

        {/* Auth Card Container */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md p-6 shadow-2xl shadow-black/60 relative">
          
          {/* Tab Headers */}
          <div className="grid grid-cols-2 gap-2 mb-6 bg-zinc-950/80 p-1 rounded-xl border border-zinc-900">
            <button
              onClick={() => { setActiveTab("signin"); setError(""); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "signin"
                  ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/10"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab("signup"); setError(""); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "signup"
                  ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/10"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Join the Pub
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-950/20 border border-red-900/50 p-3 text-xs text-red-400 animate-pulse">
                <FaExclamationCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Email Address</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <FaEnvelope className="h-4 w-4 text-zinc-500" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@drinkedin.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800/80 py-2.5 pl-10 pr-4 text-xs text-zinc-200 placeholder-zinc-600 focus:border-amber-500/40 focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Signup Only Fields */}
            {activeTab === "signup" && (
              <>
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Full Name</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <FaUser className="h-4 w-4 text-zinc-500" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Marcus Vane"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800/80 py-2.5 pl-10 pr-4 text-xs text-zinc-200 placeholder-zinc-600 focus:border-amber-500/40 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Headline */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Drinking Headline / Title</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <FaBriefcase className="h-4 w-4 text-zinc-500" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Menu Designer | IPA Advocate"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800/80 py-2.5 pl-10 pr-4 text-xs text-zinc-200 placeholder-zinc-600 focus:border-amber-500/40 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Avatar Selection */}
                <div className="space-y-2 pt-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Choose Avatar</label>
                  <div className="flex gap-2 items-center overflow-x-auto pb-1 max-w-full no-scrollbar">
                    {preSelectedAvatars.map((url) => (
                      <button
                        key={url}
                        type="button"
                        onClick={() => setSelectedAvatar(url)}
                        className={`h-9 w-9 rounded-full shrink-0 border-2 overflow-hidden transition-all duration-200 ${
                          selectedAvatar === url
                            ? "border-amber-500 scale-105 shadow-sm shadow-amber-500/30"
                            : "border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        <img src={url} alt="avatar option" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:hover:bg-amber-500 py-3 text-xs font-bold text-zinc-950 transition-all hover:scale-[1.01] flex items-center justify-center gap-1.5 mt-2"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{activeTab === "signin" ? "Sign In" : "Register and Chug"}</span>
                  <FaArrowRight className="h-3 w-3" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Disclaimer */}
        <p className="text-center text-[10px] text-zinc-650">
          By signing in, you agree to report hangovers honestly and drink responsibly.
        </p>
      </div>
    </div>
  );
}
