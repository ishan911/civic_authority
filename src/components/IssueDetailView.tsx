/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Issue, Comment } from '../types';
import { ChevronLeft, ThumbsUp, Share2, MapPin, Check, Plus, MessageSquare, Shield, Bell } from 'lucide-react';

interface IssueDetailViewProps {
  issue: Issue;
  onBack: () => void;
  onUpvote: (issueId: string) => void;
  onAddComment: (issueId: string, commentText: string) => void;
  currentUserAvatar: string;
}

export default function IssueDetailView({
  issue,
  onBack,
  onUpvote,
  onAddComment,
  currentUserAvatar
}: IssueDetailViewProps) {
  const [commentInput, setCommentInput] = useState('');
  const [isFollowing, setIsFollowing] = useState(issue.followed);

  // Handle comment submit
  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (commentInput.trim().length === 0) return;
    onAddComment(issue.id, commentInput);
    setCommentInput('');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Back Button Navigation Header */}
      <div className="flex items-center gap-4 py-2 border-b border-outline-variant/5">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-200/50 dark:hover:bg-slate-800 text-primary dark:text-primary-fixed-dim transition-colors active:scale-95 outline-none font-bold"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Issue Tracker</span>
          <h2 className="text-sm font-extrabold text-on-surface dark:text-white leading-none">
            {issue.id} • {issue.subcategory}
          </h2>
        </div>
      </div>

      {/* Hero Header Aspect Ratio Visual Card */}
      <div className="relative rounded-[2rem] overflow-hidden shadow-xl group">
        <div className="aspect-video w-full">
          <img 
            src={issue.imageUrl} 
            alt={issue.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-primary font-bold rounded-2xl text-xs md:text-sm shadow-lg leading-none">
            {issue.id}
          </span>
          <button 
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-5 py-2.5 rounded-full font-bold text-xs md:text-sm flex items-center gap-2 transition-all active:scale-95 shadow-md ${
              isFollowing 
                ? 'bg-secondary text-white' 
                : 'bg-primary hover:bg-primary-container text-white'
            }`}
          >
            <Bell size={14} className={isFollowing ? 'fill-current text-white' : ''} />
            <span>{isFollowing ? 'Following Updates' : 'Follow Updates'}</span>
          </button>
        </div>
      </div>

      {/* Two Column Desktop Layout / One Column Mobile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Core Info & Community Interactions */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Title & Status Tags */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="px-3 py-1 bg-secondary-container text-on-secondary-container dark:bg-emerald-500/10 dark:text-emerald-400 rounded-lg text-xs font-bold tracking-wider uppercase">
                {issue.category}
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-neutral-200 dark:bg-slate-800 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span>{issue.status}</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface dark:text-white tracking-tight leading-tight">
              {issue.title}
            </h1>
            <p className="text-on-surface-variant dark:text-neutral-300 text-base md:text-lg leading-relaxed font-normal">
              {issue.description}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 py-6 border-y border-outline-variant/10">
            <button 
              onClick={() => onUpvote(issue.id)}
              className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 hover:bg-neutral-50 dark:hover:bg-slate-800 rounded-2xl text-primary dark:text-neutral-300 font-semibold transition-all border border-outline-variant/10 shadow-sm active:scale-95 outline-none"
            >
              <ThumbsUp size={16} className="fill-current text-primary dark:text-primary-fixed-dim" />
              <span>Upvote ({issue.upvotes})</span>
            </button>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Shared issue details URL copied successfully to clipboard!');
              }}
              className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 hover:bg-neutral-50 dark:hover:bg-slate-800 rounded-2xl text-on-surface-variant dark:text-neutral-300 font-semibold transition-all border border-outline-variant/10 shadow-sm active:scale-95 outline-none"
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>

          {/* Comments Feed Section */}
          <section className="space-y-6">
            <h3 className="text-xl font-extrabold text-on-surface dark:text-white flex items-center gap-2 tracking-tight">
              <span>Community Discussion</span>
              <span className="px-2.5 py-0.5 bg-surface-container dark:bg-slate-800 rounded text-xs text-on-surface-variant dark:text-neutral-400">
                {issue.comments.length}
              </span>
            </h3>

            {/* Live Comment Form Field */}
            <form onSubmit={handleCommentSubmit} className="bg-surface-container-low dark:bg-slate-900/30 p-4 rounded-3xl border border-outline-variant/5">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/10 shrink-0">
                  <img src={currentUserAvatar} alt="My headshot avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <textarea 
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="w-full bg-surface-container-lowest dark:bg-slate-900 font-medium text-sm text-on-surface dark:text-white rounded-2xl p-4 placeholder:text-outline/70 focus:ring-1 focus:ring-primary border-none outline-none resize-none leading-relaxed"
                    placeholder="Share your thoughts or updates..."
                    rows={2}
                  />
                  <div className="flex justify-end mt-2">
                    <button 
                      type="submit"
                      disabled={commentInput.trim().length === 0}
                      className="bg-primary hover:bg-primary-container text-white px-5 py-2 rounded-xl text-xs font-bold shadow-sm transition-colors active:scale-95"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Loop through comments listing */}
            <div className="space-y-6 pt-2">
              {issue.comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  {comment.isOfficial ? (
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-sm border border-white">
                      <Shield size={18} />
                    </div>
                  ) : comment.userAvatar ? (
                    <img src={comment.userAvatar} alt={comment.userName} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-slate-800 text-neutral-600 dark:text-neutral-400 font-bold text-xs flex items-center justify-center capitalize">
                      {comment.userName.charAt(0)}
                    </div>
                  )}

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm text-on-surface dark:text-white ${comment.isOfficial ? 'text-primary dark:text-primary-fixed-dim' : ''}`}>
                        {comment.userName} 
                      </span>
                      {comment.isOfficial && (
                        <span className="px-1.5 py-0.5 rounded bg-primary/10 text-[9px] font-extrabold text-primary dark:text-primary-fixed-dim uppercase tracking-wider">
                          Official Reply
                        </span>
                      )}
                      <span className="text-xs text-neutral-400">• {comment.time}</span>
                    </div>
                    <p className="text-on-surface-variant dark:text-neutral-300 text-sm leading-relaxed">
                      {comment.text}
                    </p>
                    <div className="flex gap-4 pt-1">
                      <button className="text-xs font-bold text-primary dark:text-primary-fixed-dim hover:underline">Reply</button>
                      <button className="text-xs font-semibold text-neutral-400 hover:text-primary transition-colors flex items-center gap-1">
                        <ThumbsUp size={10} /> {comment.upvotes}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {issue.comments.length === 0 && (
                <div className="py-6 text-center text-on-surface-variant text-sm font-medium">
                  No discussion entries yet. Start the conversation above!
                </div>
              )}
            </div>
          </section>

        </div>

        {/* Right Column: Information, Maps and Timelines */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Location details card */}
          <div className="bg-surface-container-lowest dark:bg-slate-900 border border-outline-variant/10 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xs font-extrabold text-on-surface-variant dark:text-neutral-400 uppercase tracking-widest mb-4">Location</h3>
            
            <div className="rounded-[1.5rem] overflow-hidden h-44 relative mb-4 shadow-sm border border-neutral-100/5">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEWT-gVOv9WrjMAqwTxNxhztuKKO4q_E-ReAkNE5Z2DfxuBXUz-PwhKoOe7c-IBY1N8e_e1lemI-ROWdv6SW_PXRf1GJLo6kU6a-UQBIHoQTSIt03OIkGo1NCSg3j0CHbTu3ucXv6VLb5QKrhybqqnqGRnJ2CosGT-R_1osKrRFeGbLC-xbOOBooDCAhamTrb5fpwNzcJu4tKet5Cavy1zZK4F0ptecXx9fvgTLqKPXnm4BSsv911loGeVl2LB-z2GGjLvvKSTKk4" 
                alt="Static static map preview location" 
                className="w-full h-full object-cover grayscale opacity-80" 
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <div className="w-3.5 h-3.5 bg-primary rounded-full shadow-lg" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 dark:bg-slate-900/95 px-3 py-2 rounded-xl border border-white/50 dark:border-neutral-800">
                <p className="text-xs font-extrabold text-on-surface dark:text-white leading-tight">{issue.location.name}</p>
                <p className="text-[10px] text-on-surface-variant dark:text-neutral-400 truncate mt-0.5">{issue.location.address}</p>
              </div>
            </div>

            <button 
              onClick={() => alert(`Opening native maps path for standard coordinates: ${issue.location.lat}, ${issue.location.lng}`)}
              className="w-full h-11 bg-surface-container-low hover:bg-surface-container text-primary dark:text-primary-fixed-dim font-bold rounded-2xl transition-all font-sans text-xs outline-none"
            >
              Open in Maps
            </button>
          </div>

          {/* Core Timeline Milestone Activity Card */}
          <div className="bg-surface-container-lowest dark:bg-slate-900 border border-outline-variant/10 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xs font-extrabold text-on-surface-variant dark:text-neutral-400 uppercase tracking-widest mb-6">Activity Timeline</h3>
            
            <div className="space-y-6 relative ml-1">
              {/* Vertical timeline connector */}
              <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-surface-container dark:bg-slate-800" />
              
              {issue.timeline.map((mile, i) => {
                const isActive = mile.status === 'in_progress' || mile.status === 'completed';
                
                return (
                  <div key={i} className="relative flex gap-4">
                    <div className={`w-5 h-5 rounded-full z-10 flex items-center justify-center transition-all ${
                      mile.status === 'completed' ? 'bg-secondary ring-4 ring-secondary-container/30' :
                      mile.status === 'in_progress' ? 'bg-amber-500 ring-4 ring-amber-500/20 animate-pulse' : 'bg-neutral-300'
                    }`}>
                      {mile.status === 'completed' && <Check size={10} className="text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-extrabold leading-none ${isActive ? 'text-on-surface dark:text-white' : 'text-neutral-400'}`}>
                        {mile.title}
                      </p>
                      <p className="text-xs text-on-surface-variant dark:text-neutral-400 mt-1 leading-relaxed">{mile.description}</p>
                      <p className="text-[10px] text-neutral-400 mt-1">{mile.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Supervisor Call CTA */}
          <div className="p-6 bg-gradient-to-br from-primary to-primary-container rounded-3xl text-white shadow-md relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h4 className="font-extrabold text-lg mb-2">Notice a delay?</h4>
              <p className="text-xs text-white/90 leading-relaxed">
                Direct communication is available for critical concerns and status queries with District officials.
              </p>
              <button 
                onClick={() => alert(`Directly calling Civic Authority district line for ${issue.district}`)}
                className="w-full py-3 bg-white text-primary hover:bg-neutral-50 rounded-2xl font-bold text-xs transition-colors shadow-sm outline-none"
              >
                Contact {issue.district}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
