/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, Issue } from '../types';
import { ShieldCheck, Recycle, Trees, Droplet, ArrowRight, Plus, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  onCategorySelect: (category: Category) => void;
  onNavigate: (tab: string) => void;
  onSelectIssue: (issueId: string) => void;
  onQuickReport: () => void;
  issues: Issue[];
}

export default function HomeView({
  onCategorySelect,
  onNavigate,
  onSelectIssue,
  onQuickReport,
  issues
}: HomeViewProps) {
  // Let's filter some high impact community issues to feature in the carousel / feed
  const activeIssues = issues.filter(i => i.status === 'In Progress');

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Editorial Welcome Banner */}
      <section className="relative pt-6 max-w-3xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-[1.1] mb-4 dark:text-primary-fixed-dim">
          How can we help your <br />
          <span className="text-on-surface-variant dark:text-neutral-300">neighborhood today?</span>
        </h2>
        <p className="text-lg text-on-surface-variant dark:text-neutral-400 max-w-lg leading-relaxed">
          Report municipal issues, track resolution timelines in real-time, and co-create an optimized city.
        </p>
      </section>

      {/* Main Category Grid - Bento Style */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
        {/* Large Infrastructure Card: Column span 8 */}
        <div 
          onClick={() => onCategorySelect('Infrastructure')}
          className="md:col-span-8 group cursor-pointer active:scale-[0.99] transition-all bg-gradient-to-br from-primary to-primary-container text-white rounded-[2rem] p-8 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[280px]"
        >
          <div className="absolute -right-8 -bottom-8 opacity-10 transform group-hover:scale-110 transition-transform duration-700">
            <span className="material-symbols-outlined text-[240px]">construction</span>
          </div>
          <div className="z-10">
            <div className="flex gap-2 items-center mb-6">
              <span className="material-symbols-outlined text-4xl text-white">construction</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-tight">Infrastructure</h3>
            <p className="text-white/95 max-w-md text-sm md:text-base leading-relaxed">
              Report damaged pavements, streetlights, broken sidewalks, traffic signals, and bridge maintenance.
            </p>
          </div>
          <div className="z-10 mt-6 flex items-center gap-2 font-semibold text-sm uppercase tracking-wider text-primary-fixed bg-white/10 hover:bg-white/15 w-fit px-5 py-2 rounded-full backdrop-blur-sm transition-all">
            <span>Report Issue</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Public Safety Card: Column span 4 */}
        <div 
          onClick={() => onCategorySelect('Public Safety')}
          className="md:col-span-4 group cursor-pointer active:scale-[0.99] transition-all bg-gradient-to-br from-tertiary to-tertiary-container text-white rounded-[2rem] p-8 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[280px]"
        >
          <div className="absolute -right-4 top-1/2 opacity-10 transform -translate-y-1/2 group-hover:scale-105 transition-transform duration-500">
            <span className="material-symbols-outlined text-[160px]">local_police</span>
          </div>
          <div className="z-10">
            <div className="bg-white/15 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-extrabold mb-2 tracking-tight">Public Safety</h3>
            <p className="text-white/95 text-sm leading-relaxed">
              Emergency local hazards, fire hydrants, animal control, and neighborhood safety concerns.
            </p>
          </div>
          <div className="z-10 mt-6 flex items-center gap-1.5 font-semibold text-xs tracking-wider uppercase text-white hover:underline">
            <span>Explore updates</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Sanitation Card: Column span 4 */}
        <div 
          onClick={() => onCategorySelect('Sanitation')}
          className="md:col-span-4 group cursor-pointer active:scale-[0.99] transition-all bg-gradient-to-br from-secondary to-secondary-container text-white rounded-[2rem] p-8 shadow-md relative overflow-hidden min-h-[240px] flex flex-col justify-between"
        >
          <div className="z-10">
            <div className="flex gap-2 items-center mb-6">
              <Recycle className="text-white" size={36} />
            </div>
            <h3 className="text-2xl font-extrabold mb-2 tracking-tight">Sanitation</h3>
            <p className="text-white/95 text-sm leading-relaxed">
              Waste collection delays, graffiti removal, illegal dump sites, and garbage overflow.
            </p>
          </div>
          <div className="z-10 flex items-center gap-1 font-semibold text-xs uppercase tracking-wider text-secondary-fixed">
            <span>Active requests</span>
          </div>
        </div>

        {/* Parks & Rec Card: Column span 4 */}
        <div 
          onClick={() => onCategorySelect('Parks')}
          className="md:col-span-4 group cursor-pointer active:scale-[0.99] transition-all bg-surface-container border border-outline-variant/10 dark:bg-slate-900/40 p-8 rounded-[2rem] relative overflow-hidden min-h-[240px] flex flex-col justify-center"
        >
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 dark:bg-primary-fixed-dim/20 p-4 rounded-2xl text-primary dark:text-primary-fixed-dim">
              <Trees size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary dark:text-primary-fixed-dim tracking-tight">Parks & Rec</h3>
              <p className="text-on-surface-variant dark:text-neutral-400 text-sm mt-1">
                Green space upkeep and park reporting.
              </p>
            </div>
          </div>
        </div>

        {/* Water & Power Card: Column span 4 */}
        <div 
          onClick={() => onCategorySelect('Water & Power')}
          className="md:col-span-4 group cursor-pointer active:scale-[0.99] transition-all bg-surface-container border border-outline-variant/10 dark:bg-slate-900/40 p-8 rounded-[2rem] relative overflow-hidden min-h-[240px] flex flex-col justify-center"
        >
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 dark:bg-primary-fixed-dim/20 p-4 rounded-2xl text-primary dark:text-primary-fixed-dim">
              <Droplet size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary dark:text-primary-fixed-dim tracking-tight">Water & Power</h3>
              <p className="text-on-surface-variant dark:text-neutral-400 text-sm mt-1">
                Grid outages, leaking pipes, hydrant details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Community Impact Section (Glass Card Style) */}
      <section className="pt-4">
        <div className="bg-surface-container-lowest border border-outline-variant/10 dark:bg-slate-900/30 p-8 rounded-[2.5rem] flex flex-col lg:flex-row items-center gap-8 shadow-sm">
          <div className="w-full lg:w-1/3 aspect-[4/3] rounded-3xl overflow-hidden relative shadow-sm border border-neutral-100/10 shrink-0">
            <img 
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcahex4iFkEP1ZB-xRNMZspwN4X6wibuo0rZIKjvIcoG-JIqVuDCEtYZ8pJIwaqmUvacqGqFE3aFFGy_nG43FMyoAlq513_K-AkAKuFhTi4Rd3zoEoTT0QAZLKxJLCyq4cEM46FAtybxq5C-KY3C7KAVpsCxGe3GNU_BFRgQ4YcPZWP5ZgAlGkaIuOmik53a0wWPHmRXhlQJjzcLsRXNJ7hwyIupclJe1X9tPHlrDgFu9tBuO0vJUveIJBM91G7yLGHCnrpND_idI" 
              alt="Community impact"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
          </div>
          <div className="flex-1 space-y-3">
            <span className="text-xs font-bold text-primary dark:text-primary-fixed-dim tracking-widest uppercase">Community Impact</span>
            <h4 className="text-2xl font-extrabold text-on-surface dark:text-white tracking-tight">Recent neighborhood updates</h4>
            <p className="text-on-surface-variant dark:text-neutral-300 text-base leading-relaxed">
              The new Elm Street Park project is 85% complete. Your collaborative reports helped prioritize the installation of energy-efficient LED streetlights across the North District.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => onNavigate('Map')}
                className="text-primary dark:text-primary-fixed-dim font-bold text-sm hover:underline inline-flex items-center gap-2 hover:translate-x-1 transition-transform"
              >
                <span>View current map progress</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Track Selected In-Progress Issues Feed */}
      {activeIssues.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="flex justify-between items-end">
            <h4 className="text-lg font-bold text-on-surface dark:text-white">Active Neighborhood Issues</h4>
            <button 
              onClick={() => onNavigate('Reports')}
              className="text-primary dark:text-primary-fixed-dim text-xs font-bold uppercase tracking-wider hover:underline"
            >
              See all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeIssues.slice(0, 2).map((issue) => (
              <div 
                key={issue.id}
                onClick={() => onSelectIssue(issue.id)}
                className="bg-surface-container-lowest border border-outline-variant/10 dark:bg-slate-900/40 p-5 rounded-3xl hover:shadow-md transition-shadow cursor-pointer flex gap-4"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-neutral-100/10">
                  <img src={issue.imageUrl} alt={issue.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-neutral-400">{issue.id}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 text-[9px] font-bold uppercase whitespace-nowrap">
                        {issue.status}
                      </span>
                    </div>
                    <h5 className="font-bold text-on-surface dark:text-white text-sm truncate">{issue.title}</h5>
                    <p className="text-xs text-on-surface-variant dark:text-neutral-400 line-clamp-1 mt-0.5">{issue.description}</p>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-neutral-400 pt-1">
                    <span className="flex items-center gap-1 text-primary dark:text-primary-fixed-dim">
                      <MapPin size={10} /> {issue.location.name}
                    </span>
                    <span>{issue.timeline[issue.timeline.length - 1].title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Floating Action Button (Quick Report) */}
      <div className="fixed bottom-24 right-6 z-[60] md:bottom-8 md:right-8">
        <button 
          onClick={onQuickReport}
          className="bg-primary text-white h-14 px-6 rounded-full flex items-center gap-2 shadow-[0_8px_32px_rgba(0,66,117,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 font-bold group"
        >
          <span className="material-symbols-outlined text-xl">add_circle</span>
          <span className="text-sm font-bold">Quick Report</span>
        </button>
      </div>
    </div>
  );
}
