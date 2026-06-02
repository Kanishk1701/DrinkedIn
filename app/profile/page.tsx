"use client";

import Header from "../components/Header";
import { useDrinkedInStore } from "../store/drinkedinStore";
import { 
  FaEdit, 
  FaPlus, 
  FaMapMarkerAlt, 
  FaAward, 
  FaGraduationCap, 
  FaGlassWhiskey, 
  FaCheckCircle,
  FaArrowLeft,
  FaCheck
} from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function Profile() {
  const profile = useDrinkedInStore((state) => state.profile);
  const updateProfile = useDrinkedInStore((state) => state.updateProfile);
  
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState(profile.about);
  const [endorsements, setEndorsements] = useState<Record<string, number>>({
    "Molecular Mixology": 34,
    "Menu Engineering": 27,
    "Spirits Education": 19,
    "Bar Management & Inventory": 15,
    "Zero-Waste Programs": 41,
    "Staff Training": 22,
    "Flavor Pairing": 31
  });

  const handleEndorse = (skill: string) => {
    setEndorsements((prev) => ({
      ...prev,
      [skill]: prev[skill] + 1
    }));
  };

  const saveAbout = () => {
    updateProfile({ about: aboutText });
    setIsEditingAbout(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 font-sans text-zinc-200">
      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-amber-500 mb-4 transition-colors">
          <FaArrowLeft className="h-3 w-3" />
          <span>Back to Feed</span>
        </Link>

        <div className="space-y-6">
          {/* PROFILE HEADER CARD */}
          <section className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-lg">
            {/* Banner image */}
            <div 
              className="h-44 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${profile.coverPhoto})` }}
            />

            {/* Profile Avatar & Details wrapper */}
            <div className="relative px-6 pb-6 pt-16">
              {/* Profile Avatar */}
              <div className="absolute -top-16 left-6">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-32 w-32 rounded-full border-4 border-zinc-950 object-cover shadow-xl"
                />
              </div>

              {/* Edit Cover and Bio shortcuts */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                    {profile.name}
                    <FaCheckCircle className="h-4 w-4 text-amber-500" title="Verified Mixologist" />
                  </h1>
                  <p className="text-sm font-medium text-amber-500 mt-1">{profile.title}</p>
                  
                  <div className="flex items-center gap-1 text-xs text-zinc-500 mt-2">
                    <FaMapMarkerAlt />
                    <span>{profile.location}</span>
                    <span className="mx-1.5">•</span>
                    <Link href="/network" className="text-amber-500 hover:underline hover:text-amber-400 font-semibold">
                      {profile.connectionsCount} bad influences
                    </Link>
                  </div>
                </div>

                {/* Profile actions */}
                <div className="flex gap-2.5">
                  <button 
                    onClick={() => alert("Status set to: Open to Drink! Notify all Bad Influences nearby.")}
                    className="rounded-full bg-amber-500 hover:bg-amber-600 px-4 py-1.5 text-xs font-bold text-zinc-950 transition-all hover:scale-[1.01]"
                  >
                    Open to drink
                  </button>
                  <button 
                    onClick={() => alert("Creating custom DrinkedIn Hangover Report PDF...")}
                    className="rounded-full border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 px-4 py-1.5 text-xs font-bold text-zinc-300 transition-colors"
                  >
                    Export Hangover Report
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT / SUMMARY SECTION */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-base font-bold text-zinc-100">About</h2>
              {!isEditingAbout ? (
                <button 
                  onClick={() => setIsEditingAbout(true)}
                  className="p-1.5 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-amber-500 transition-colors"
                >
                  <FaEdit className="h-4 w-4" />
                </button>
              ) : (
                <button 
                  onClick={saveAbout}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 hover:bg-amber-500/20 text-xs font-bold transition-colors"
                >
                  <FaCheck className="h-3 w-3" /> Save
                </button>
              )}
            </div>

            {isEditingAbout ? (
              <textarea
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                rows={4}
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-3 text-xs text-zinc-200 focus:border-amber-500/40 focus:outline-none resize-none leading-relaxed"
              />
            ) : (
              <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {profile.about}
              </p>
            )}
          </section>

          {/* EXPERIENCE SECTION */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <h2 className="text-base font-bold text-zinc-100">Epic Drinking Achievements</h2>
              <button 
                onClick={() => alert("Add Achievement page is disabled in mockup.")}
                className="p-1.5 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-amber-500 transition-colors"
              >
                <FaPlus className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6">
              {profile.experience.map((exp) => (
                <div key={exp.id} className="flex gap-4 items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-amber-500">
                    <FaGlassWhiskey className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-bold text-zinc-100">{exp.role}</h3>
                    <p className="text-xs text-zinc-400 font-medium">{exp.company} • {exp.location}</p>
                    <p className="text-[10px] text-zinc-600 font-normal">{exp.duration}</p>
                    <p className="text-xs text-zinc-300 leading-relaxed pt-1.5">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SKILLS & ENDORSEMENTS SECTION */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-900">
              <h2 className="text-base font-bold text-zinc-100">Drinking Superpowers</h2>
              <button 
                onClick={() => alert("Add custom superpower is coming soon!")}
                className="p-1.5 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-amber-500 transition-colors"
              >
                <FaPlus className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {profile.skills.map((skill) => (
                <div 
                  key={skill}
                  onClick={() => handleEndorse(skill)}
                  className="flex items-center justify-between p-3 rounded-xl border border-zinc-900 bg-zinc-900/30 hover:border-amber-500/20 hover:bg-amber-500/[0.01] cursor-pointer transition-all duration-200 select-none group"
                >
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-200 group-hover:text-amber-500 transition-colors">{skill}</h3>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{endorsements[skill] || 0} endorsements</p>
                  </div>
                  <button className="h-6 w-14 rounded-full border border-zinc-800 group-hover:border-amber-500/30 text-[10px] font-bold text-zinc-400 group-hover:text-amber-500 transition-colors">
                    Endorse
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION & CREDENTIALS SECTION */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <h2 className="text-base font-bold text-zinc-100">Liver Training & Accreditations</h2>
              <button 
                onClick={() => alert("Add credentials page is disabled in mockup.")}
                className="p-1.5 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-amber-500 transition-colors"
              >
                <FaPlus className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6">
              {profile.education.map((edu) => (
                <div key={edu.id} className="flex gap-4 items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-amber-500">
                    {edu.school.includes("Wine") ? <FaAward className="h-5 w-5" /> : <FaGraduationCap className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-bold text-zinc-100">{edu.school}</h3>
                    <p className="text-xs text-zinc-400 font-medium">{edu.degree}</p>
                    <p className="text-[10px] text-zinc-600 font-normal">{edu.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
