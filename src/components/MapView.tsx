/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, MouseEvent } from 'react';
import { Issue, Category } from '../types';
import { Search, SlidersHorizontal, MapPin, Compass, Plus, ThumbsUp, Layers, CheckCircle2, AlertTriangle, Construction, Lightbulb } from 'lucide-react';

interface MapViewProps {
  issues: Issue[];
  onSelectIssue: (issueId: string) => void;
  onQuickReport: () => void;
  onUpvote: (issueId: string) => void;
  selectedCategory: Category | null;
}

export default function MapView({
  issues,
  onSelectIssue,
  onQuickReport,
  onUpvote,
  selectedCategory: initialCategory
}: MapViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMainCategory, setSelectedMainCategory] = useState<Category | 'All'>(
    initialCategory || 'All'
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  
  // Theme of the map background
  // 1: San Francisco, 2: Topography, 3: Standard City Map
  const [mapTheme, setMapTheme] = useState<1 | 2 | 3>(3);
  
  // Focused / clicked issue id on map
  const [focusedIssueId, setFocusedIssueId] = useState<string>('INC-2401');

  // Map theme backgrounds
  const themeImages = {
    1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6JveKsgDp03wd23J9zoqlAp-CB6EZOGLlSzrZPSVBMUx9-SSbISrNPN8xALtjDc7d3Vnyrd9VJ_Sd_I-m54lVvUs3TfrAGtf8GEnEkKYDD7GvmOZr4yzlcqMIqo4PCr96vnCGtniGeNyehaHmiklJKowCz3H8Ux0G5A1y3RgO4OUTIk6-NhQE-UgUmz51PLNOIZERKs7o4QwpJkjxrazxEQFZ55_scWzP2QPpcYRUvaREdkzQesfbKD2DSwc776UvlpzEg5FtSE4',
    2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABuDuo92SEIuMPukYGNp3JQrJZGvX0VtXMeLi63YMsWC-BOhpYKRa_y1kpCcrCgac3KF76v6C98VvLTI53vDA8JofBI9y_PGgQbf4l8SHmL8jJty-OjktAQtu_QkT75VTsCnfY97MdW2TXbckQvy_RIZ49yAoNHAnQSspM29SlWbwFac3qvY235CfJsSM5C6hCw0D6lyz8-SY_zpYPJveu-2QEaZsv92LuPFR3_uaCH3qEb-1oGBBdgtLXv0sE4Td1jJNiCfaaCPM',
    3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg-3DKtHJ-gcjZ05-9TmWYXWmyRpsy-Llewg6X-f3w4MRMiEl_Pcdc2-WXtsv7oRdwLCVpVXPAHdib5rQeWeCxnCD1ggBiD4EMODh6aWJdqbSK_bpNYFgyKDFE9MLVTxojWEfLnfevnyjzb6Fm-H2SQI3-D16qGlrSUVKKPImjaCuXnPoKU4x9g4AUA_Sv22NylM3BhBDW2Nan3C8ExOnyXTyiiMMcJUJKeVFjOVodoW5gxlrmPT7hlB-3fu39WqJxGUNZM3s6DOk'
  };

  // Filter issues based on category and coordinates
  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      // Main category filter
      if (selectedMainCategory !== 'All' && issue.category !== selectedMainCategory) {
        return false;
      }
      // Sub-category filter
      if (selectedSubCategory !== 'All' && issue.subcategory !== selectedSubCategory) {
        return false;
      }
      // Search text query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          issue.title.toLowerCase().includes(query) ||
          issue.location.name.toLowerCase().includes(query) ||
          issue.subcategory.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [issues, selectedMainCategory, selectedSubCategory, searchQuery]);

  const focusedIssue = useMemo(() => {
    return issues.find(i => i.id === focusedIssueId) || filteredIssues[0] || null;
  }, [issues, focusedIssueId, filteredIssues]);

  // Handle upvoting from listing
  const handleUpvoteClick = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    onUpvote(id);
  };

  // Switch to the issue center or select it
  const selectPin = (id: string) => {
    setFocusedIssueId(id);
  };

  // Reset to default location center
  const recenter = () => {
    if (filteredIssues.length > 0) {
      setFocusedIssueId(filteredIssues[0].id);
    }
  };

  // Sub-categories list based on selected main category
  const subCategories = useMemo(() => {
    if (selectedMainCategory === 'All') {
      return ['All', 'Pothole', 'Street Light', 'Sidewalk', 'Graffiti', 'Waste'];
    }
    const setOfSubs = new Set<string>();
    setOfSubs.add('All');
    issues
      .filter(i => i.category === selectedMainCategory)
      .forEach(i => setOfSubs.add(i.subcategory));
    return Array.from(setOfSubs);
  }, [selectedMainCategory, issues]);

  // Icon selector depending on type
  const renderMarkerIcon = (subcategory: string) => {
    switch (subcategory) {
      case 'Pothole':
        return <Construction className="w-5 h-5" />;
      case 'Street Light':
        return <Lightbulb className="w-5 h-5" />;
      case 'Graffiti':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'Waste':
        return <CheckCircle2 className="w-5 h-5 text-purple-500" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative h-[calc(100vh-152px)] w-full overflow-hidden rounded-none shadow-none border-0">
      {/* Map Layers Toggler in top right header */}
      <div className="absolute top-20 right-4 z-20 flex gap-2">
        <button 
          onClick={() => setMapTheme(mapTheme === 1 ? 2 : mapTheme === 2 ? 3 : 1)}
          className="w-10 h-10 bg-white/90 dark:bg-slate-900/90 text-primary dark:text-primary-fixed-dim rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all outline-none border border-neutral-100/10"
          title="Toggle Map Style"
        >
          <Layers size={18} />
        </button>
      </div>

      {/* Primary Floating Overlays: Search & Filters */}
      <div className="absolute top-4 left-0 w-full px-4 space-y-3 z-10 pointer-events-none">
        
        {/* Search Bar Container */}
        <div className="max-w-xl mx-auto w-full pointer-events-auto">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-full px-5 py-3 flex items-center shadow-lg gap-3 border border-outline-variant/10">
            <MapPin className="text-primary dark:text-primary-fixed-dim" size={20} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 w-full text-sm font-semibold text-on-surface dark:text-white placeholder:text-outline outline-none"
              placeholder="Search locations or issues..."
            />
            <button className="text-outline hover:text-primary transition-colors">
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Categories Bar: Level 1 (Parent categories) */}
        <div className="max-w-xl mx-auto w-full pointer-events-auto">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            <button 
              onClick={() => { setSelectedMainCategory('All'); setSelectedSubCategory('All'); }}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-bold text-xs shadow-sm transition-all active:scale-95 border border-transparent ${selectedMainCategory === 'All' ? 'bg-primary text-white dark:bg-primary-fixed dark:text-on-primary-fixed' : 'bg-white/90 dark:bg-slate-900/95 text-neutral-600 dark:text-neutral-400'}`}
            >
              All Issues
            </button>
            {(['Infrastructure', 'Public Safety', 'Sanitation', 'Parks'] as Category[]).map(cat => (
              <button 
                key={cat}
                onClick={() => { setSelectedMainCategory(cat); setSelectedSubCategory('All'); }}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-bold text-xs shadow-sm transition-all active:scale-95 border border-transparent ${selectedMainCategory === cat ? 'bg-primary text-white dark:bg-primary-fixed dark:text-on-primary-fixed' : 'bg-white/90 dark:bg-slate-900/95 text-neutral-600 dark:text-neutral-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategories Bar: Level 2 (Specific tags of selection) */}
        <div className="max-w-xl mx-auto w-full pointer-events-auto">
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {subCategories.map(sub => (
              <button 
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full font-medium text-[11px] border transition-all active:scale-95 shadow-sm ${selectedSubCategory === sub ? 'bg-primary-fixed text-on-primary-fixed border-primary/25' : 'bg-white/70 dark:bg-slate-900/80 text-neutral-500 border-outline-variant/10'}`}
              >
                {sub === 'All' ? 'All Types' : sub}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Simulated Interactive Map Background */}
      <div className="absolute inset-0 z-0 bg-surface-container overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center opacity-70 grayscale-[0.1] transition-all duration-700 select-none scale-105"
          style={{ backgroundImage: `url('${themeImages[mapTheme]}')` }}
        ></div>

        {/* Asymmetrical Floating Map Pins */}
        {filteredIssues.map((issue) => {
          // Map coordinates values scaled to percentage coordinates for visual placement on screen
          // Lat 37.73 to 37.80, Lng -122.46 to -122.40
          const leftPercent = ((issue.location.lng - (-122.465)) / (0.065)) * 100;
          const topPercent = (1 - (issue.location.lat - 37.73) / (0.07)) * 100;

          const isFocused = issue.id === focusedIssueId;

          return (
            <div 
              key={issue.id}
              onClick={() => selectPin(issue.id)}
              className="absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 hover:scale-110"
              style={{ 
                left: `${Math.max(10, Math.min(90, leftPercent))}%`, 
                top: `${Math.max(15, Math.min(85, topPercent))}%` 
              }}
            >
              {/* Ripple Ring if selected */}
              {isFocused && (
                <div className="absolute -inset-4 bg-primary/20 dark:bg-primary-fixed-dim/20 rounded-full animate-ping pointer-events-none duration-1000"></div>
              )}

              {/* Pin Base */}
              <div 
                className={`p-3 rounded-full shadow-lg border-2 border-white transition-all flex items-center justify-center ${
                  isFocused 
                    ? 'bg-primary text-white scale-125 z-20' 
                    : 'bg-white text-primary hover:bg-neutral-100 scale-100'
                }`}
              >
                {renderMarkerIcon(issue.subcategory)}
              </div>

              {/* Tooltip on pin hover/focus */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[10px] py-1 px-3.5 rounded shadow-lg opacity-0 hover:opacity-100 transition-opacity font-bold truncate max-w-xs whitespace-nowrap pointer-events-none z-30">
                {issue.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation and Actions Row: Recenter, Custom Report */}
      <div className="absolute bottom-[200px] right-4 z-20 flex flex-col gap-3">
        <button 
          onClick={recenter}
          className="w-12 h-12 bg-white/90 dark:bg-slate-900/90 text-primary dark:text-primary-fixed-dim rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all outline-none border border-neutral-100/10"
          title="Ficus to Default Location"
        >
          <Compass size={22} className="animate-spin-slow" />
        </button>

        <button 
          onClick={onQuickReport}
          className="w-14 h-14 bg-gradient-to-br from-primary to-primary-container text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all outline-none group"
          title="Create New Report"
        >
          <Plus size={28} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Floating Preview bottom card of selected issue */}
      {focusedIssue && (
        <div className="absolute bottom-4 left-4 right-4 z-10 max-w-xl mx-auto pointer-events-auto">
          <div 
            onClick={() => onSelectIssue(focusedIssue.id)}
            className="glass-card bg-white/95 dark:bg-slate-900/95 p-4 rounded-3xl shadow-xl flex items-center gap-4 border border-outline-variant/10 dark:border-neutral-800 cursor-pointer animate-fade-in hover:bg-neutral-50 dark:hover:bg-slate-900 transition-colors"
          >
            <div className={`w-16 h-16 rounded-2xl ${
              focusedIssue.category === 'Infrastructure' ? 'bg-primary-fixed text-primary' : 
              focusedIssue.category === 'Public Safety' ? 'bg-tertiary-fixed text-tertiary' : 'bg-secondary-fixed text-secondary'
            } flex items-center justify-center shrink-0`}>
              <span className="material-symbols-outlined text-3xl">
                {focusedIssue.subcategory === 'Pothole' ? 'construction' : 
                 focusedIssue.subcategory === 'Street Light' ? 'lightbulb' : 
                 focusedIssue.subcategory === 'Graffiti' ? 'format_paint' : 'warning'}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-1">
                <h4 className="font-extrabold text-on-surface dark:text-white text-base truncate leading-tight">
                  {focusedIssue.title}
                </h4>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 bg-neutral-200/50 dark:bg-slate-800 text-neutral-500 rounded uppercase tracking-wider shrink-0">
                  {focusedIssue.statusText || 'Reported'}
                </span>
              </div>
              <p className="text-on-surface-variant dark:text-neutral-400 text-xs line-clamp-1 mt-1 font-medium">
                {focusedIssue.location.name} • {focusedIssue.description}
              </p>
              
              <div className="mt-2.5 flex items-center gap-4 pt-1 border-t border-outline-variant/5">
                <button 
                  onClick={(e) => handleUpvoteClick(e, focusedIssue.id)}
                  className="text-primary dark:text-primary-fixed-dim font-bold text-xs flex items-center gap-1.5 hover:underline"
                >
                  <ThumbsUp size={12} className="fill-current text-primary dark:text-primary-fixed-dim" />
                  <span>{focusedIssue.upvotes} Upvotes</span>
                </button>
                <div className="text-primary dark:text-primary-fixed-dim font-extrabold text-xs">
                  View Details & Timeline →
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
