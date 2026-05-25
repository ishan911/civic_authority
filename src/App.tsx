/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Category, Issue, UserProfile } from './types';
import { INITIAL_ISSUES } from './data';
import HomeView from './components/HomeView';
import ExploreView from './components/ExploreView';
import MapView from './components/MapView';
import SubmitReportView from './components/SubmitReportView';
import IssueDetailView from './components/IssueDetailView';
import ProfileView from './components/ProfileView';
import { Menu, Search, Home as HomeIcon, Map as MapIcon, ClipboardList, User, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('Home');
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [showReportingWizard, setShowReportingWizard] = useState<boolean>(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<Category | null>(null);

  // Issues State (Local storage persistent for high fidelity)
  const [issues, setIssues] = useState<Issue[]>(() => {
    const saved = localStorage.getItem('civic_authority_issues');
    return saved ? JSON.parse(saved) : INITIAL_ISSUES;
  });

  // Dark Theme State
  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    const saved = localStorage.getItem('civic_authority_dark');
    return saved === 'true';
  });

  // User Profile
  const [profile] = useState<UserProfile>({
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@civic.org',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpptOT5vl3FObiE5GDb2q27ZH_dRxNicK1reBZ_74EHkh0TSQUhUeL5ys-nFwMpWA58Qn92lx1QgDuOsBiV6tZNsll1mgdU9uLcIylb8H3gvLid_fh9W2EAg86ImMdC8iDMFYziyHwxN_hO8LXlgHbzIfvzVae3ohOoezXUPPZcgA45F_B4kU3HcR9JumtbXQWuV94O6EFKh29GPWHTzfMh5sclxasRVZH70sr7oCdzftmkpZGm3q_OJQuz6TtCzbnS-RRW0fifOA',
    reportedCount: 3,
    upvotedCount: 12
  });

  // Persistent Storage Sync
  useEffect(() => {
    localStorage.setItem('civic_authority_issues', JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem('civic_authority_dark', String(darkTheme));
    if (darkTheme) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [darkTheme]);

  // Handlers
  const handleCategorySelect = (category: Category) => {
    setSelectedCategoryFilter(category);
    setActiveTab('Map');
    setSelectedIssueId(null);
    setShowReportingWizard(false);
  };

  const handleSelectIssue = (issueId: string) => {
    setSelectedIssueId(issueId);
    setShowReportingWizard(false);
  };

  const handleQuickReport = () => {
    setShowReportingWizard(true);
    setSelectedIssueId(null);
  };

  const handleAddIssue = (newIssue: Issue) => {
    setIssues([newIssue, ...issues]);
    setShowReportingWizard(false);
    setSelectedIssueId(newIssue.id); // View reported issue details!
    
    // Increment stats
    localStorage.setItem('civic_authority_reported_count_extra', String(
      Number(localStorage.getItem('civic_authority_reported_count_extra') || 0) + 1
    ));
  };

  const handleUpvote = (issueId: string) => {
    setIssues(prevIssues => 
      prevIssues.map(issue => {
        if (issue.id === issueId) {
          // Check if already toggled upvoted by saving state in localstorage of upvoted arrays
          const upvotedList = JSON.parse(localStorage.getItem('civic_upvoted_list') || '[]');
          const hasUpvoted = upvotedList.includes(issueId);
          
          let updatedUpvotedList;
          let diff = 0;
          if (hasUpvoted) {
            updatedUpvotedList = upvotedList.filter((id: string) => id !== issueId);
            diff = -1;
          } else {
            updatedUpvotedList = [...upvotedList, issueId];
            diff = 1;
          }
          localStorage.setItem('civic_upvoted_list', JSON.stringify(updatedUpvotedList));
          
          return {
            ...issue,
            upvotes: issue.upvotes + diff
          };
        }
        return issue;
      })
    );
  };

  const handleAddComment = (issueId: string, commentText: string) => {
    const newComment = {
      id: `c_${Math.random()}`,
      userName: profile.name,
      userAvatar: profile.avatar,
      text: commentText,
      time: 'Just Now',
      repliesCount: 0,
      upvotes: 0
    };

    setIssues(prevIssues => 
      prevIssues.map(issue => {
        if (issue.id === issueId) {
          return {
            ...issue,
            comments: [...issue.comments, newComment]
          };
        }
        return issue;
      })
    );
  };

  // Extra reported state calculations
  const totalReportedCount = profile.reportedCount + Number(localStorage.getItem('civic_authority_reported_count_extra') || 0);
  const upvotedList = JSON.parse(localStorage.getItem('civic_upvoted_list') || '[]');
  const totalUpvotedCount = profile.upvotedCount + upvotedList.length;

  const currentSelectedIssue = issues.find(i => i.id === selectedIssueId);

  // Render correct body screen
  const renderContent = () => {
    if (selectedIssueId && currentSelectedIssue) {
      return (
        <IssueDetailView 
          issue={currentSelectedIssue}
          onBack={() => setSelectedIssueId(null)}
          onUpvote={handleUpvote}
          onAddComment={handleAddComment}
          currentUserAvatar={profile.avatar}
        />
      );
    }

    if (showReportingWizard) {
      return (
        <SubmitReportView 
          onAddIssue={handleAddIssue}
          onCancel={() => setShowReportingWizard(false)}
        />
      );
    }

    switch (activeTab) {
      case 'Home':
        return (
          <HomeView 
            onCategorySelect={handleCategorySelect}
            onNavigate={(tab) => { setActiveTab(tab); setSelectedIssueId(null); setSelectedCategoryFilter(null); }}
            onSelectIssue={handleSelectIssue}
            onQuickReport={handleQuickReport}
            issues={issues}
          />
        );
      case 'Explore':
        return (
          <ExploreView 
            onCategorySelect={handleCategorySelect}
            onQuickReport={handleQuickReport}
            issues={issues}
          />
        );
      case 'Map':
        return (
          <MapView 
            issues={issues}
            onSelectIssue={handleSelectIssue}
            onQuickReport={handleQuickReport}
            onUpvote={handleUpvote}
            selectedCategory={selectedCategoryFilter}
          />
        );
      case 'Reports':
        // Listing reported issues timeline (Image 1 and 9 style cards)
        return (
          <div className="space-y-6 animate-fade-in pb-12 pt-4 max-w-2xl mx-auto">
            <div>
              <h2 className="text-3xl font-extrabold text-primary dark:text-primary-fixed-dim tracking-tight mb-2">My Issues Timeline</h2>
              <p className="text-on-surface-variant dark:text-neutral-400 font-medium">Verify completion milestones and active discussions of your reported concern coordinates.</p>
            </div>

            <div className="space-y-4">
              {issues.map(issue => (
                <div 
                  key={issue.id}
                  onClick={() => handleSelectIssue(issue.id)}
                  className="bg-white dark:bg-slate-900 border border-outline-variant/10 rounded-3xl p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col md:flex-row gap-6 relative"
                >
                  <div className="w-full md:w-32 h-24 rounded-2xl overflow-hidden shrink-0 border border-neutral-100/10">
                    <img src={issue.imageUrl} alt={issue.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-2 items-center mb-1.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded bg-secondary-container text-on-secondary-container dark:bg-emerald-500/15 dark:text-emerald-400 text-[9px] font-extrabold uppercase tracking-wider">
                          {issue.subcategory}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                          <span>{issue.id}</span>
                          <span>•</span>
                          <span>{issue.date}</span>
                        </div>
                      </div>
                      <h4 className="font-extrabold text-on-surface dark:text-white text-base truncate leading-tight mb-1">
                        {issue.title}
                      </h4>
                      <p className="text-xs text-on-surface-variant dark:text-neutral-400 line-clamp-1 leading-relaxed">
                        {issue.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-outline-variant/5 flex items-center justify-between text-xs text-neutral-400 font-medium">
                      <span className="flex items-center gap-1 text-primary dark:text-primary-fixed-dim font-bold">
                        <MapIcon size={12} /> {issue.location.name}
                      </span>
                      <span className="text-secondary font-bold inline-flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-secondary" /> {issue.status}
                      </span>
                    </div>
                  </div>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block text-neutral-300">
                    <ChevronRight size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Profile':
        return (
          <ProfileView 
            profile={profile}
            darkTheme={darkTheme}
            onThemeToggle={() => setDarkTheme(!darkTheme)}
            reportedCount={totalReportedCount}
            upvotesCount={totalUpvotedCount}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 transition-colors duration-200">
      
      {/* Editorial Header Navigation Shell */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-sm dark:shadow-none h-16 border-b border-outline-variant/5">
        <div className="flex justify-between items-center px-6 h-full w-full max-w-7xl mx-auto">
          
          <div className="flex items-center gap-4">
            <button className="text-primary dark:text-white p-2 hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors active:scale-95 duration-200 rounded-xl outline-none">
              <Menu size={22} onClick={() => setActiveTab('Home')} />
            </button>
            <div className="flex flex-col cursor-pointer" onClick={() => { setActiveTab('Home'); setSelectedIssueId(null); setShowReportingWizard(false); }}>
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest hidden md:block leading-none mb-0.5">Democratic Portal</span>
              <h1 className="font-extrabold text-blue-900 dark:text-primary-fixed-dim text-lg md:text-xl tracking-tighter leading-none">
                The Civic Authority
              </h1>
            </div>
          </div>

          {/* Search bar inside header (Only active and visible on Large desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                <Search size={16} />
              </span>
              <input 
                type="text"
                onClick={() => { setActiveTab('Map'); setSelectedIssueId(null); }}
                className="w-full h-10 pl-11 pr-4 bg-surface-container-high dark:bg-slate-900/60 border-none rounded-full text-xs font-semibold focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-900 text-on-surface dark:text-neutral-100 placeholder:text-outline transition-all" 
                placeholder="Search coordinates, reports or categories..." 
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop horizontal Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              {[
                { name: 'Home', tab: 'Home' },
                { name: 'Explore Services', tab: 'Explore' },
                { name: 'Coordinates Map', tab: 'Map' },
                { name: 'My Timelines', tab: 'Reports' },
              ].map((item) => (
                <button
                  key={item.tab}
                  onClick={() => { setActiveTab(item.tab); setSelectedIssueId(null); setShowReportingWizard(false); }}
                  className={`font-bold text-xs tracking-wide uppercase transition-colors outline-none cursor-pointer ${
                    activeTab === item.tab && !selectedIssueId && !showReportingWizard
                      ? 'text-primary dark:text-primary-fixed-dim underline underline-offset-4 decoration-2'
                      : 'text-neutral-500 hover:text-primary dark:hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Profile circular headshot trigger */}
            <div 
              onClick={() => { setActiveTab('Profile'); setSelectedIssueId(null); setShowReportingWizard(false); }}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 dark:border-primary-fixed-dim/20 cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition-transform"
            >
              <img src={profile.avatar} alt="User Profile Avatar" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </header>

      {/* Main Core Main Layout Screen content */}
      <main className={`min-h-screen transition-all duration-300 ${
        activeTab === 'Map' && !selectedIssueId && !showReportingWizard
          ? 'pt-16 pb-[88px] px-0 max-w-none w-full'
          : 'pt-24 pb-32 px-6 max-w-7xl mx-auto'
      }`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (selectedIssueId || '') + showReportingWizard}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className={activeTab === 'Map' && !selectedIssueId && !showReportingWizard ? 'w-full h-full' : ''}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Fixed Sticky Nav Navigation Bar (Mobile / IFrame focused views only) */}
      <footer className="fixed bottom-0 left-0 w-full z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-outline-variant/10 shadow-[0_-4px_20px_rgba(0,66,117,0.06)] rounded-t-3xl transition-transform">
        <div className="flex justify-around items-center w-full px-4 pb-6 pt-3 max-w-xl mx-auto">
          {[
            { tag: 'Home', label: 'Home', icon: 'map' },
            { tag: 'Explore', label: 'Explore', icon: 'grid_view' },
            { tag: 'Map', label: 'Map', icon: 'explore' },
            { tag: 'Reports', label: 'My Issues', icon: 'assignment' },
            { tag: 'Profile', label: 'Profile', icon: 'person' },
          ].map((item) => {
            const isTabActive = activeTab === item.tag && !selectedIssueId && !showReportingWizard;
            return (
              <button
                key={item.tag}
                onClick={() => { 
                  setActiveTab(item.tag); 
                  setSelectedIssueId(null); 
                  setShowReportingWizard(false); 
                  setSelectedCategoryFilter(null);
                }}
                className={`flex flex-col items-center justify-center transition-all duration-300 select-none outline-none ${
                  isTabActive
                    ? 'p-2 px-4 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-white scale-105 shadow-md -translate-y-1'
                    : 'text-neutral-400 hover:text-primary dark:hover:text-silver-300'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
                <span className="font-semibold text-[10px] mt-1 uppercase tracking-wider">{item.label}</span>
              </button>
            );
          })}
        </div>
      </footer>

    </div>
  );
}
