/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserProfile } from '../types';
import { Sun, Moon, Sparkles, Flag, ThumbsUp, LogOut, CheckCircle } from 'lucide-react';

interface ProfileViewProps {
  profile: UserProfile;
  darkTheme: boolean;
  onThemeToggle: () => void;
  reportedCount: number;
  upvotesCount: number;
}

export default function ProfileView({
  profile,
  darkTheme,
  onThemeToggle,
  reportedCount,
  upvotesCount
}: ProfileViewProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pb-16 pt-4">
      {/* Editorial Profile Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-primary dark:text-primary-fixed-dim tracking-tight mb-2">My Profile</h2>
        <p className="text-on-surface-variant dark:text-neutral-400 font-medium">Manage your civic identity, check contribution stats, and toggle theme settings.</p>
      </div>

      {/* User Information Card (Aesthetic Pairings) */}
      <section className="bg-white dark:bg-slate-900 border border-outline-variant/10 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="w-18 h-18 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
          <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 text-center md:text-left min-w-0">
          <h3 className="text-xl font-extrabold text-on-surface dark:text-white leading-tight">{profile.name}</h3>
          <p className="text-xs font-semibold text-neutral-400 mt-1">{profile.email}</p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary-fixed-dim/20 text-[10px] font-extrabold text-primary dark:text-primary-fixed-dim uppercase tracking-wider">
            <Sparkles size={11} /> Verified Citizen • District 4
          </div>
        </div>
      </section>

      {/* Contribution Metrics Grid */}
      <section className="grid grid-cols-2 gap-4">
        {/* Metric 1 */}
        <div className="p-6 bg-surface-container-low dark:bg-slate-900/40 border border-outline-variant/5 rounded-3xl flex flex-col items-center justify-center text-center text-on-surface dark:text-white">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3">
            <Flag size={20} className="text-primary dark:text-primary-fixed-dim" />
          </div>
          <span className="text-3xl font-extrabold tracking-tight leading-none">
            {reportedCount}
          </span>
          <span className="text-xs font-semibold text-on-surface-variant dark:text-neutral-400 mt-2">Reports Filed</span>
        </div>

        {/* Metric 2 */}
        <div className="p-6 bg-surface-container-low dark:bg-slate-900/40 border border-outline-variant/5 rounded-3xl flex flex-col items-center justify-center text-center text-on-surface dark:text-white">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
            <ThumbsUp size={20} className="text-amber-600 dark:text-amber-400" />
          </div>
          <span className="text-3xl font-extrabold tracking-tight leading-none">
            {upvotesCount}
          </span>
          <span className="text-xs font-semibold text-on-surface-variant dark:text-neutral-400 mt-2">Upvotes Endorsed</span>
        </div>
      </section>

      {/* Interactive Options Section */}
      <section className="space-y-4">
        <h4 className="font-extrabold text-lg text-on-surface dark:text-white tracking-tight px-1">Settings</h4>
        
        <div className="bg-white dark:bg-slate-900 border border-outline-variant/10 rounded-3xl divide-y divide-outline-variant/5 shadow-sm overflow-hidden text-sm">
          {/* Theme Toggler Settings Row */}
          <div className="p-5 flex items-center justify-between text-on-surface dark:text-white">
            <div className="space-y-1">
              <span className="font-extrabold block">Appearance Theme</span>
              <p className="text-xs text-on-surface-variant dark:text-neutral-400 font-medium">Switch between Light Slate and Ink Dark modes</p>
            </div>
            
            <button 
              onClick={onThemeToggle}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-primary border border-outline-variant/10 font-bold text-xs"
            >
              {darkTheme ? (
                <>
                  <Sun size={14} />
                  <span>Light Theme</span>
                </>
              ) : (
                <>
                  <Moon size={14} />
                  <span>Dark Theme</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Notification Settings Row */}
          <div className="p-5 flex items-center justify-between text-on-surface dark:text-white">
            <div className="space-y-1">
              <span className="font-extrabold block">Automatic Updates</span>
              <p className="text-xs text-on-surface-variant dark:text-neutral-400 font-medium">SMS & Email notifies for followed timelines</p>
            </div>
            <div className="w-12 h-6 bg-secondary/20 rounded-full p-0.5 flex justify-end shrink-0 cursor-pointer">
              <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center text-white">
                <CheckCircle size={10} />
              </div>
            </div>
          </div>

          {/* Help Center Row */}
          <div className="p-5 flex items-center justify-between text-on-surface dark:text-white cursor-pointer hover:bg-neutral-50 dark:hover:bg-slate-800 transition-colors">
            <div className="space-y-1">
              <span className="font-extrabold block">Help & Citizen Support</span>
              <p className="text-xs text-on-surface-variant dark:text-neutral-400 font-medium">Browse dynamic tutorials, guidelines or coordinate lines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support / Disclaimer Footnote */}
      <section className="p-6 bg-surface-container-low dark:bg-slate-900/10 rounded-3xl text-center">
        <p className="text-xs text-on-surface-variant dark:text-neutral-400 leading-relaxed max-w-sm mx-auto font-medium">
          The Civic Authority applet is protected by District 4 data systems. Your updates are verified and sent using decentralized georef coordinates.
        </p>
      </section>
    </div>
  );
}
