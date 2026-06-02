"use client";

import Header from "../components/Header";
import { useDrinkedInStore, Job } from "../store/drinkedinStore";
import { 
  FaBriefcase, 
  FaSearch, 
  FaMapMarkerAlt, 
  FaCoins, 
  FaClock, 
  FaCheckCircle, 
  FaChevronRight,
  FaFileAlt
} from "react-icons/fa";
import { useState } from "react";

export default function Jobs() {
  const jobs = useDrinkedInStore((state) => state.jobs);
  const applyToJob = useDrinkedInStore((state) => state.applyToJob);
  
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const activeJob = jobs.find((job) => job.id === selectedJobId) || jobs[0];

  const handleApply = (id: string) => {
    applyToJob(id);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(locationQuery.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const appliedJobsCount = jobs.filter(j => j.applied).length;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 font-sans text-zinc-200">
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        {/* Search Panel */}
        <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="relative md:col-span-2">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search job titles, companies, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg bg-zinc-900 border border-zinc-800 py-2 pl-9 pr-4 text-xs text-zinc-200 placeholder-zinc-500 focus:border-amber-500/40 focus:outline-none"
              />
            </div>
            <div className="relative md:col-span-2">
              <FaMapMarkerAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                placeholder="City, state, or region..."
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full rounded-lg bg-zinc-900 border border-zinc-800 py-2 pl-9 pr-4 text-xs text-zinc-200 placeholder-zinc-500 focus:border-amber-500/40 focus:outline-none"
              />
            </div>
            <button
              onClick={() => alert(`Filtering jobs for "${searchQuery}" in "${locationQuery}"`)}
              className="w-full md:col-span-1 rounded-lg bg-amber-500 hover:bg-amber-600 font-bold text-zinc-950 text-xs py-2 transition-all hover:scale-[1.01]"
            >
              Search Jobs
            </button>
          </div>
        </div>

        {/* Layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* LEFT PANEL: QUICK STATS */}
          <aside className="lg:col-span-1 space-y-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-md text-xs space-y-4">
              <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">My Careers</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center hover:text-amber-500 cursor-pointer">
                  <span className="text-zinc-500">My Applications</span>
                  <span className="font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full text-[10px]">
                    {appliedJobsCount}
                  </span>
                </div>
                <div className="flex justify-between items-center hover:text-amber-500 cursor-pointer">
                  <span className="text-zinc-500">Saved Jobs</span>
                  <span className="font-semibold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-full text-[10px]">3</span>
                </div>
                <div className="flex justify-between items-center hover:text-amber-500 cursor-pointer">
                  <span className="text-zinc-500">Job Alerts</span>
                  <span className="font-semibold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-full text-[10px]">On</span>
                </div>
              </div>

              <div className="border-t border-zinc-900 pt-3">
                <button
                  onClick={() => alert("Creating a Job Posting involves connecting a corporate billing account. This feature is coming soon!")}
                  className="w-full rounded-lg border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/[0.01] text-amber-500 font-bold text-xs py-2 text-center transition-all"
                >
                  Post a Free Job opening
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-md text-xs space-y-3 hidden lg:block">
              <h3 className="font-bold text-zinc-400 uppercase tracking-wider text-[10px]">Resume Builder</h3>
              <p className="text-[10px] text-zinc-500 leading-relaxed">Let employers search you by your certified cocktail portfolio. Complete your mixology skills checklist.</p>
              <button 
                onClick={() => alert("Resume analyzer is analyzing your profile...")}
                className="w-full rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 py-1.5 text-[10px] font-semibold text-zinc-300 transition-colors"
              >
                Analyze my profile strength
              </button>
            </div>
          </aside>

          {/* MAIN SPLIT VIEW: JOB LISTINGS & JOB DETAIL CARD */}
          <section className="lg:col-span-3 grid grid-cols-1 md:grid-cols-5 border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-950 shadow-lg min-h-[580px]">
            {/* JOBS LIST (2 Cols) */}
            <div className="md:col-span-2 border-r border-zinc-900 max-h-[580px] overflow-y-auto">
              <div className="p-3 border-b border-zinc-900 bg-zinc-950/40">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  {filteredJobs.length} matches found
                </p>
              </div>

              <div className="divide-y divide-zinc-900">
                {filteredJobs.length === 0 ? (
                  <p className="text-xs text-zinc-600 text-center py-8">No jobs match your criteria.</p>
                ) : (
                  filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJobId(job.id)}
                      className={`p-3.5 cursor-pointer text-xs transition-colors hover:bg-zinc-900/60 ${
                        selectedJobId === job.id ? "bg-zinc-900 border-l-2 border-l-amber-500" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-zinc-200 line-clamp-1">{job.title}</h3>
                        {job.applied && (
                          <span className="text-[10px] text-emerald-500 font-semibold shrink-0">Applied</span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{job.company}</p>
                      <p className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1">
                        <FaMapMarkerAlt /> {job.location}
                      </p>
                      <div className="flex gap-2.5 mt-2.5 text-[10px] text-zinc-500">
                        <span className="flex items-center gap-1"><FaCoins /> {job.salary.split(" / ")[0]}</span>
                        <span className="flex items-center gap-1"><FaClock /> {job.type}</span>
                      </div>
                      <span className="block text-[9px] text-zinc-600 mt-2">{job.postedAgo}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* JOB DETAILS (3 Cols) */}
            <div className="md:col-span-3 max-h-[580px] overflow-y-auto p-5 space-y-4 flex flex-col justify-between">
              {activeJob ? (
                <>
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex gap-3 items-start border-b border-zinc-900 pb-4">
                      <div className={`h-11 w-11 rounded-xl shrink-0 flex items-center justify-center font-bold text-zinc-950 text-xs shadow-md ${activeJob.logoColor}`}>
                        {activeJob.company.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <h2 className="text-base font-bold text-zinc-100">{activeJob.title}</h2>
                        <p className="text-xs text-zinc-400">{activeJob.company}</p>
                        <p className="text-[10px] text-zinc-500 mt-1">{activeJob.location} • {activeJob.postedAgo}</p>
                      </div>
                    </div>

                    {/* Stats details */}
                    <div className="grid grid-cols-2 gap-3 text-xs border-b border-zinc-900 pb-4">
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-tight">Compensation</p>
                        <p className="font-semibold text-zinc-200 mt-0.5">{activeJob.salary}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-tight">Job Classification</p>
                        <p className="font-semibold text-zinc-200 mt-0.5">{activeJob.type}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Job Description</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">{activeJob.description}</p>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Key Requirements</h3>
                      <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 leading-relaxed pl-1">
                        {activeJob.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Perks & Benefits</h3>
                      <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 leading-relaxed pl-1">
                        {activeJob.benefits.map((ben, index) => (
                          <li key={index}>{ben}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="border-t border-zinc-900 pt-4 mt-4 flex items-center justify-between gap-4 bg-zinc-950/20 sticky bottom-0">
                    <div className="text-xs text-zinc-500 flex items-center gap-1.5">
                      <FaFileAlt />
                      <span>MarcusVane_Resume.pdf</span>
                    </div>

                    <button
                      onClick={() => handleApply(activeJob.id)}
                      disabled={activeJob.applied}
                      className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                        activeJob.applied
                          ? "bg-emerald-600/10 border border-emerald-500/20 text-emerald-500"
                          : "bg-amber-500 hover:bg-amber-600 text-zinc-950 hover:scale-[1.01]"
                      }`}
                    >
                      {activeJob.applied ? (
                        <>
                          <FaCheckCircle />
                          <span>Applied</span>
                        </>
                      ) : (
                        <span>Easy Apply</span>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <p className="text-xs text-zinc-500">Select a job from the list to view specifications.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
