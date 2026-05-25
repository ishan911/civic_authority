/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Category, Issue } from '../types';
import { 
  Search, Construction, ShieldAlert, Trash2, Trees, Droplet, Zap, 
  Footprints, Megaphone, ArrowUpRight, BarChart3, AlertCircle, Clock, 
  CheckCircle2, Building, MessageSquare, ThumbsUp 
} from 'lucide-react';

interface ExploreViewProps {
  onCategorySelect: (category: Category) => void;
  onQuickReport: () => void;
  issues: Issue[];
}

export default function ExploreView({ onCategorySelect, onQuickReport, issues }: ExploreViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Other services listed at the bottom
  const otherServices = [
    { name: 'Water & Sewage', icon: Droplet, key: 'Water & Power' },
    { name: 'Power Outages', icon: Zap, key: 'Water & Power' },
    { name: 'Animal Control', icon: Footprints, key: 'Public Safety' },
    { name: 'Noise Pollution', icon: Megaphone, key: 'Public Safety' },
  ];

  // Primary categories
  const bentoCategories = [
    {
      id: 'Infrastructure' as Category,
      title: 'Infrastructure',
      description: 'Roads, bridges, streetlights, and traffic signals.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC20GbiFMzmPp8H-unks-Vnh_7Q19x2zxkWjl9DMEfXxW-Wi7ON0hLJlJyIka3P1x-1lOchUi47A75Gv3ZCNoFj2-Uxc0RcHSSvZZqrzaTpahanZl-mcEiUXKnbHrfYR4zg4WEmV_kUDDu4dZC_PWYdabsdj4z_WHkxUX7B4G2wN-8k3hOnRaUORMMCI5yqacf8K0DTsfiAREG-KQxUBCzNmwMe4Pd9FzUj-vuyPFt8EIPT28QSDsY8XlwdlXI6KJRBobAPSY-XbGA',
      icon: Construction,
      accentClass: 'bg-primary',
      textSize: 'text-3xl'
    },
    {
      id: 'Public Safety' as Category,
      title: 'Public Safety',
      description: 'Emergency hazards and public order.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKqayfBogJ_kvfztDXtlOTCnALsU43nPLVzHWD-9qTKJAR3_Acdgqf38BiV0OpqBODFE1DQWQ1qJTGsMqCHJm1iXjNiECnoWjigV9D1i8OOR2hb2_8B7q502TnBOl0fHvNIgHlYaXiKglpF1xBdkrfAL940VpzPHi3BV3U6llMVZd4TJGf7m3Ft5HhkyBNw0U2GP9NujCf8ByjLnRGY9BrOdRDUJjpF01iuWl789KSrxRurG4AA7-OOKDzIe1CrdFchoUnZMHAX5c',
      icon: ShieldAlert,
      accentClass: 'bg-tertiary',
      textSize: 'text-xl'
    },
    {
      id: 'Sanitation' as Category,
      title: 'Sanitation',
      description: 'Waste collection and graffiti removal.',
      icon: Trash2,
      accentClass: 'bg-secondary',
      isSimpleCard: true
    },
    {
      id: 'Parks' as Category,
      title: 'Parks & Rec',
      description: 'Green spaces and playgrounds.',
      icon: Trees,
      accentClass: 'bg-primary-container',
      isSimpleCard: true
    }
  ];

  const filteredCategories = bentoCategories.filter(cat =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Analytical computations for the newly added Issue Summary section
  const totalIssuesCount = issues.length;
  const activeCount = issues.filter(i => i.status !== 'Resolved').length;
  const inProgressCount = issues.filter(i => i.status === 'In Progress').length;
  const resolvedCount = issues.filter(i => i.status === 'Resolved').length;
  
  const categoriesList: { id: Category; label: string; bgClass: string; textClass: string; icon: any }[] = [
    { id: 'Infrastructure', label: 'Infrastructure', bgClass: 'bg-primary dark:bg-sky-500', textClass: 'text-primary dark:text-sky-400', icon: Construction },
    { id: 'Public Safety', label: 'Public Safety', bgClass: 'bg-tertiary dark:bg-amber-500', textClass: 'text-tertiary dark:text-amber-400', icon: ShieldAlert },
    { id: 'Sanitation', label: 'Sanitation', bgClass: 'bg-secondary dark:bg-emerald-500', textClass: 'text-secondary dark:text-emerald-400', icon: Trash2 },
    { id: 'Parks', label: 'Parks', bgClass: 'bg-indigo-500', textClass: 'text-indigo-500 dark:text-indigo-400', icon: Trees },
    { id: 'Water & Power', label: 'Water & Power', bgClass: 'bg-teal-500', textClass: 'text-teal-500 dark:text-teal-400', icon: Droplet },
  ];

  const categoryDistribution = categoriesList.map(cat => {
    const count = issues.filter(i => i.category === cat.id).length;
    const percentage = totalIssuesCount > 0 ? (count / totalIssuesCount) * 100 : 0;
    return { ...cat, count, percentage };
  });

  const districtCounts = issues.reduce((acc, issue) => {
    const dist = issue.district || 'Unassigned';
    acc[dist] = (acc[dist] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedDistricts = Object.entries(districtCounts)
    .map(([district, count]) => ({ district, count }))
    .sort((a, b) => b.count - a.count);

  const totalUpvotes = issues.reduce((acc, i) => acc + i.upvotes, 0);
  const totalComments = issues.reduce((acc, i) => acc + i.comments.length, 0);

  return (
    <div className="space-y-12 animate-fade-in pb-16">
      {/* Editorial Header */}
      <section className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-[1.1] mb-6 dark:text-primary-fixed-dim">
          Better communities <br />
          <span className="text-on-surface-variant dark:text-neutral-400">start with a single report.</span>
        </h2>
        <p className="text-lg text-on-surface-variant dark:text-neutral-400 leading-relaxed max-w-lg">
          Directly connect with city officials to improve your neighborhood. Select a category below to begin your report.
        </p>

        {/* Dynamic Search Bar (Responsive styling matched) */}
        <div className="mt-8 relative max-w-lg">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-neutral-400">
            <Search size={20} />
          </span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-4 bg-surface-container border-none rounded-2xl dark:bg-slate-900/40 text-on-surface dark:text-white placeholder:text-outline focus:ring-2 focus:ring-primary dark:focus:ring-primary-fixed-dim transition-all text-base outline-none shadow-sm"
            placeholder="Search reporting categories..."
          />
        </div>
      </section>

      {/* Bento Grid: Modular cards showing reporting options */}
      <section className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
        {filteredCategories.map((cat, idx) => {
          if (!cat.isSimpleCard) {
            // Featured large card with image overlays
            return (
              <div 
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className={`md:col-span-2 ${idx === 0 ? 'md:row-span-2 min-h-[340px]' : 'min-h-[160px]'} relative group overflow-hidden rounded-[2rem] bg-surface-container-low cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 active:scale-[0.99]`}
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover opacity-60 dark:opacity-40 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.id === 'Infrastructure' ? 'from-primary/40' : 'from-tertiary/30'} to-transparent`} />
                </div>
                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  <div className={`w-14 h-14 ${cat.accentClass} text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <cat.icon size={28} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight flex items-center gap-1.5">
                    {cat.title} <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-white/90 font-medium text-sm max-w-sm">{cat.description}</p>
                </div>
              </div>
            );
          } else {
            // Standard small categories
            return (
              <div 
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className="md:col-span-1 relative group overflow-hidden rounded-[2rem] bg-surface-container-low dark:bg-slate-900/30 cursor-pointer border border-outline-variant/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 active:scale-[0.99] min-h-[160px]"
              >
                <div className="p-6 h-full flex flex-col items-start justify-between">
                  <div className={`w-12 h-12 ${cat.accentClass} text-white rounded-xl flex items-center justify-center mb-4`}>
                    <cat.icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-on-surface dark:text-white truncate flex items-center gap-1">
                      {cat.title}
                    </h3>
                    <p className="text-on-surface-variant dark:text-neutral-400 text-xs mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
        })}

        {filteredCategories.length === 0 && (
          <div className="md:col-span-4 py-12 text-center text-on-surface-variant">
            No categories found matching "{searchQuery}".
          </div>
        )}
      </section>

      {/* Secondary Categories / Utility Services Section */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold font-headline text-primary dark:text-primary-fixed-dim tracking-tight">Other Services</h2>
          <span className="text-neutral-400 text-xs font-semibold">Integrations Live</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {otherServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                onClick={() => onCategorySelect(service.key as Category)}
                className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 dark:bg-slate-900/40 hover:bg-primary/5 dark:hover:bg-primary-fixed-dim/10 transition-colors cursor-pointer group"
              >
                <div className="p-2 rounded-xl bg-surface-container group-hover:bg-primary-fixed dark:bg-slate-800 transition-colors group-hover:text-primary">
                  <Icon className="text-primary dark:text-neutral-300" size={20} />
                </div>
                <span className="font-semibold text-sm text-on-surface dark:text-neutral-200">{service.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Issue summary Breakdown Section */}
      <section className="space-y-6 pt-6 border-t border-outline-variant/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1 px-2.5 rounded bg-primary/10 text-primary dark:bg-primary-fixed-dim/15 dark:text-primary-fixed-dim font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 size={11} /> Analytics
            </div>
            <h2 className="text-2xl font-extrabold font-headline text-primary dark:text-primary-fixed-dim tracking-tight">Issue Summary</h2>
          </div>
          <span className="text-neutral-400 text-xs font-semibold">Neighborhood Metrics</span>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total Active Card */}
          <div className="p-5 rounded-[2rem] bg-surface-container border border-outline-variant/10 dark:bg-slate-900/40 flex flex-col justify-between min-h-[120px] transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-on-surface-variant dark:text-neutral-400 text-xs font-bold uppercase tracking-wider">Active</span>
              <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500 dark:bg-slate-800 dark:text-orange-400">
                <AlertCircle size={15} />
              </div>
            </div>
            <div>
              <h4 className="text-3xl font-black font-headline text-on-surface dark:text-white leading-none mb-1">
                {activeCount}
              </h4>
              <p className="text-[10px] text-neutral-400 font-medium font-sans">Citizens reporting issues</p>
            </div>
          </div>

          {/* In Progress Card */}
          <div className="p-5 rounded-[2rem] bg-surface-container border border-outline-variant/10 dark:bg-slate-900/40 flex flex-col justify-between min-h-[120px] transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-on-surface-variant dark:text-neutral-400 text-xs font-bold uppercase tracking-wider">In Progress</span>
              <div className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-500 dark:bg-slate-800 dark:text-yellow-400">
                <Clock size={15} />
              </div>
            </div>
            <div>
              <h4 className="text-3xl font-black font-headline text-on-surface dark:text-white leading-none mb-1">
                {inProgressCount}
              </h4>
              <p className="text-[10px] text-neutral-400 font-medium">Under active maintenance</p>
            </div>
          </div>

          {/* Resolved Card */}
          <div className="p-5 rounded-[2rem] bg-surface-container border border-outline-variant/10 dark:bg-slate-900/40 flex flex-col justify-between min-h-[120px] transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-on-surface-variant dark:text-neutral-400 text-xs font-bold uppercase tracking-wider">Resolved</span>
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 dark:bg-slate-800 dark:text-emerald-400">
                <CheckCircle2 size={15} />
              </div>
            </div>
            <div>
              <h4 className="text-3xl font-black font-headline text-on-surface dark:text-white leading-none mb-1">
                {resolvedCount}
              </h4>
              <p className="text-[10px] text-neutral-400 font-medium">Successfully completed</p>
            </div>
          </div>

          {/* Citizen Voicing Card */}
          <div className="p-5 rounded-[2rem] bg-surface-container border border-outline-variant/10 dark:bg-slate-900/40 flex flex-col justify-between min-h-[120px] transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-on-surface-variant dark:text-neutral-400 text-xs font-bold uppercase tracking-wider">Support</span>
              <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-500 dark:bg-slate-800 dark:text-pink-400">
                <ThumbsUp size={15} />
              </div>
            </div>
            <div>
              <h4 className="text-3xl font-black font-headline text-on-surface dark:text-white leading-none mb-1">
                {totalUpvotes}
              </h4>
              <p className="text-[10px] text-neutral-400 font-medium">Community support votes</p>
            </div>
          </div>
        </div>

        {/* Categories Distribution progress elements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          {/* Category breakdown bar visual list - Left Col (lg:span-7) */}
          <div className="lg:col-span-7 bg-surface-container border border-outline-variant/10 dark:bg-slate-900/30 rounded-[2rem] p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold font-headline text-on-surface dark:text-white leading-snug">Categories Distribution</h3>
              <p className="text-xs text-on-surface-variant dark:text-neutral-400 font-semibold mt-1">Relative ratio of reports filed per category.</p>
            </div>

            {/* Multi-Segment Stacked Progress Bar */}
            <div className="w-full h-3 bg-neutral-200 dark:bg-slate-850 rounded-full overflow-hidden flex">
              {categoryDistribution.map((cat) => {
                if (cat.percentage === 0) return null;
                return (
                  <div 
                    key={cat.id} 
                    style={{ width: `${cat.percentage}%` }}
                    className={`${cat.bgClass} h-full transition-all duration-300`}
                    title={`${cat.label}: ${cat.count} (${cat.percentage.toFixed(0)}%)`}
                  />
                );
              })}
              {totalIssuesCount === 0 && (
                <div className="w-full h-full bg-neutral-200 dark:bg-slate-800" />
              )}
            </div>

            {/* Detailed Horizontal Key List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categoryDistribution.map((cat) => {
                const CatIcon = cat.icon;
                return (
                  <div key={cat.id} className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low border border-outline-variant/10 dark:bg-slate-900/20">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-xl ${cat.bgClass} text-white flex items-center justify-center shrink-0`}>
                        <CatIcon size={16} />
                      </div>
                      <div className="min-w-0">
                        <span className="block font-bold text-sm text-on-surface dark:text-white truncate">{cat.label}</span>
                        <span className="block font-medium text-[10px] text-neutral-400 tracking-tight">{cat.percentage.toFixed(0)}% of issues</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-extrabold text-sm text-on-surface dark:text-white">{cat.count}</span>
                      <span className="block font-medium text-[8px] text-neutral-400 tracking-wide uppercase">Open</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Districts rank & Civic response time index - Right Col (lg:span-5) */}
          <div className="lg:col-span-5 bg-surface-container border border-outline-variant/10 dark:bg-slate-900/30 rounded-[2rem] p-6 flex flex-col justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold font-headline text-on-surface dark:text-white leading-snug">Active District Index</h3>
              <p className="text-xs text-on-surface-variant dark:text-neutral-400 font-semibold mt-1">Sectors ranked by community report count.</p>
            </div>

            <div className="space-y-4 flex-1 flex flex-col justify-center">
              {sortedDistricts.slice(0, 3).map((item) => {
                const maxCount = sortedDistricts[0]?.count || 1;
                const widthPercentage = (item.count / maxCount) * 100;
                return (
                  <div key={item.district} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <div className="flex items-center gap-2 text-on-surface dark:text-white">
                        <Building size={14} className="text-primary dark:text-primary-fixed-dim" />
                        <span>{item.district}</span>
                      </div>
                      <span className="text-neutral-500 dark:text-neutral-300 font-extrabold">{item.count} items</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${widthPercentage}%` }} 
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300" 
                      />
                    </div>
                  </div>
                );
              })}
              {sortedDistricts.length === 0 && (
                <div className="text-center py-6 text-on-surface-variant dark:text-neutral-400 text-xs font-medium">
                  No district reports recorded
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-outline-variant/10 flex items-center justify-between text-xs font-bold text-neutral-500">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-neutral-400">
                <MessageSquare size={13} /> Discussion forums
              </div>
              <span className="text-on-surface dark:text-white">{totalComments} community comments</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAB Floating button */}
      <div className="fixed bottom-24 right-6 z-40 md:bottom-8 md:right-8">
        <button 
          onClick={onQuickReport}
          className="flex items-center gap-3 px-6 py-4 bg-gradient-to-br from-primary to-primary-container text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all group font-bold"
        >
          <span className="material-symbols-outlined text-2xl">add_circle</span>
          <span className="text-sm font-bold tracking-tight">Quick Report</span>
        </button>
      </div>
    </div>
  );
}

