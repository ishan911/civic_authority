/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Category, Issue, Milestone } from '../types';
import { Camera, Image as ImageIcon, MapPin, Check, ChevronRight, AlertCircle, Sparkles, Upload, Loader2 } from 'lucide-react';

interface SubmitReportViewProps {
  onAddIssue: (issue: Issue) => void;
  onCancel: () => void;
}

export default function SubmitReportView({ onAddIssue, onCancel }: SubmitReportViewProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields State
  const [category, setCategory] = useState<Category>('Infrastructure');
  const [subcategory, setSubcategory] = useState<string>('Pothole');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('242 Civic Center Dr, Downtown');
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  
  // Custom mock uploaded image path
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  // Simulated preset images selection for the demo sandbox
  const imagePresets = [
    { name: 'Pothole', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApj5FUYyRCEx1cqZsNYLW_30nMN0ouYuOv5tGbuOXIhzQ6e1W_ttK5mdNcRC8WMJFhD7RV-Kgyl8pMp_HXb4_SZt2zkEghk-zh3Inh_FU5GLyaKmCNDKvHBxHXDjJ2RMl2-qWJRM35nJyn8q9s3LQtmGhrvFiAiIT0XjHJJcGI8w-PK6exaufxVmO9UfLl9u5ezO1FWpb0sBSrdGUaDaUY098zW0yGmDmdOX77gIbjUkpIwxlXTkAV9uoX5_K9NXe3XfgVa_NNTP8' },
    { name: 'Sidewalk Subsidence', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAIHto7TJFsEFD7I0UEdQ1w5ZaeL2KpFETtOoYFYT-iezIGl01HMcJHXXNNC6W94YhEqXBuW6jUCBH6OclToESHeNcQtJIuGorRe8VDWHuadK-Fdxw6coiKg8DKtH81AlgnMDJzAjjR8j9xG8PLphw1YYC917me73EiuOudqvsxVSbb9W2TlwIh9RF24XR2u8a1y-boJy_jrnIWt-veRpVrh6zr77cow7BS4H9UvvGmcZRlJVvbewiXsatkg0au5Fks_oLgdlaFS0' },
    { name: 'Vandalism Wall', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC20GbiFMzmPp8H-unks-Vnh_7Q19x2zxkWjl9DMEfXxW-Wi7ON0hLJlJyIka3P1x-1lOchUi47A75Gv3ZCNoFj2-Uxc0RcHSSvZZqrzaTpahanZl-mcEiUXKnbHrfYR4zg4WEmV_kUDDu4dZC_PWYdabsdj4z_WHkxUX7B4G2wN-8k3hOnRaUORMMCI5yqacf8K0DTsfiAREG-KQxUBCzNmwMe4Pd9FzUj-vuyPFt8EIPT28QSDsY8XlwdlXI6KJRBobAPSY-XbGA' },
    { name: 'Street light out', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKqayfBogJ_kvfztDXtlOTCnALsU43nPLVzHWD-9qTKJAR3_Acdgqf38BiV0OpqBODFE1DQWQ1qJTGsMqCHJm1iXjNiECnoWjigV9D1i8OOR2hb2_8B7q502TnBOl0fHvNIgHlYaXiKglpF1xBdkrfAL940VpzPHi3BV3U6llMVZd4TJGf7m3Ft5HhkyBNw0U2GP9NujCf8ByjLnRGY9BrOdRDUJjpF01iuWl789KSrxRurG4AA7-OOKDzIe1CrdFchoUnZMHAX5c' }
  ];

  const handleSelectPreset = (url: string) => {
    setIsUploading(true);
    setTimeout(() => {
      setUploadedImage(url);
      setIsUploading(false);
    }, 800);
  };

  // Step 1 Validation & Next Step trigger
  const handleNextStep1 = () => {
    if (description.trim().length === 0) {
      alert('Please fill in a description of the issue to proceed.');
      return;
    }
    // Set typical categories by quick select guesses
    setStep(2);
  };

  // Submit and create issue
  const handleSubmit = () => {
    const finalImage = uploadedImage || imagePresets[0].url; // Default to Pothole if none selected
    
    const milestoneDraft: Milestone[] = [
      {
        title: 'Reported Successfully',
        description: 'New issue recorded into database',
        date: 'Today, Just Now',
        status: 'completed',
        icon: 'check_circle'
      }
    ];

    const newIssue: Issue = {
      id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `${subcategory} on ${locationName.split(',')[0]}`,
      description,
      category,
      subcategory,
      status: 'New',
      statusText: 'Reported Just Now',
      location: {
        name: locationName,
        address: locationName,
        lat: 37.75 + Math.random() * 0.04, // Assign values in city bounds
        lng: -122.45 + Math.random() * 0.04
      },
      imageUrl: finalImage,
      upvotes: 1,
      followed: true,
      date: 'Today, Just Now',
      timeline: milestoneDraft,
      comments: [],
      district: 'District 4'
    };

    onAddIssue(newIssue);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pb-16 pt-4">
      
      {/* Dynamic Editorial Progress Header */}
      <section className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-extrabold text-primary dark:text-primary-fixed-dim uppercase tracking-widest leading-none">
            Step {step} of 2
          </span>
          <span className="text-xs font-bold text-outline uppercase tracking-widest leading-none">
            {step === 1 ? 'Photo & Details Engagement' : 'Identify & Locate Category'}
          </span>
        </div>
        <div className="h-2.5 w-full bg-surface-container-high dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary dark:bg-primary-fixed transition-all duration-300 rounded-full" 
            style={{ width: step === 1 ? '50%' : '100%' }}
          />
        </div>
      </section>

      {/* ================= STEP 1: PHOTO & SMALL DESCRIPTION ================= */}
      {step === 1 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold text-primary dark:text-primary-fixed-dim tracking-tight mb-2">Report an Issue</h2>
            <p className="text-on-surface-variant dark:text-neutral-400 font-medium">Let's document the concern. Start by capturing a clear visual or descriptive details.</p>
          </div>

          {/* Media Upload Area */}
          <div className="space-y-3">
            <span className="block font-semibold text-xs uppercase tracking-widest text-on-surface-variant ml-1">Upload Photo</span>
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-surface-container-low dark:bg-slate-900/30 border-2 border-dashed border-outline-variant/30 dark:border-neutral-800 flex flex-col items-center justify-center p-6 group hover:border-primary/40 transition-colors">
              
              {isUploading ? (
                <div className="text-center space-y-2">
                  <Loader2 className="animate-spin text-primary mx-auto" size={40} />
                  <p className="text-xs font-bold text-outline">Processing photo uploads...</p>
                </div>
              ) : uploadedImage ? (
                <div className="absolute inset-0">
                  <img src={uploadedImage} alt="Issue preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setUploadedImage('')}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold"
                    >
                      Remove Photo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleSelectPreset(imagePresets[0].url)}
                      className="w-14 h-14 rounded-full bg-primary-container text-white flex items-center justify-center shadow-lg active:scale-95 duration-200"
                    >
                      <Camera size={24} />
                    </button>
                    <button 
                      onClick={() => handleSelectPreset(imagePresets[1].url)}
                      className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 text-primary border border-outline-variant/15 flex items-center justify-center shadow-md active:scale-95 duration-200"
                    >
                      <ImageIcon size={24} />
                    </button>
                  </div>
                  <div>
                    <span className="font-bold text-lg block mb-1 text-on-surface dark:text-neutral-200">Simulate Photo Upload</span>
                    <p className="text-xs text-on-surface-variant dark:text-neutral-400">Tap triggers mock capture or select a demo preset below:</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Presets Carousel */}
            {!uploadedImage && !isUploading && (
              <div className="flex gap-2 py-1 overflow-x-auto no-scrollbar">
                {imagePresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handleSelectPreset(preset.url)}
                    className="flex-shrink-0 px-3.5 py-2 bg-white dark:bg-slate-900 border border-outline-variant/10 text-xs font-semibold rounded-full active:scale-95 transition-all text-neutral-600 dark:text-neutral-300"
                  >
                    Preset: {preset.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description Textarea Field */}
          <div className="space-y-3">
            <div className="flex justify-between items-center ml-1">
              <label className="block font-semibold text-xs uppercase tracking-widest text-on-surface-variant">Small Description</label>
              <span className="text-[10px] text-neutral-400">Required</span>
            </div>
            <div className="relative">
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-surface-container-highest dark:bg-slate-900/40 border-none rounded-2xl px-5 py-4 font-normal text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-900 transition-all placeholder:text-outline text-sm leading-relaxed" 
                placeholder="Tell us what's happening... (e.g. major cracks on pavement, deep dip crossing near library)"
                rows={4}
              />
            </div>
            <p className="text-[11px] text-on-surface-variant/70 ml-1">Limit your description to key details for faster automated processing.</p>
          </div>

          {/* Quick Select Category Presets */}
          <section className="space-y-3">
            <p className="font-semibold text-xs uppercase tracking-widest text-on-surface-variant ml-1">Quick category guess</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Roads & Infrastructure', cat: 'Infrastructure', sub: 'Pothole' },
                { name: 'Parks & Recreation', cat: 'Parks', sub: 'Park Upkeep' },
                { name: 'Lighting Outages', cat: 'Infrastructure', sub: 'Street Light' },
                { name: 'Sanitation & Waste', cat: 'Sanitation', sub: 'Waste' }
              ].map((item) => (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => {
                    setCategory(item.cat as Category);
                    setSubcategory(item.sub);
                  }}
                  className={`flex items-center gap-3 p-4 bg-surface-container-lowest dark:bg-slate-900 border rounded-2xl transition-all text-left font-bold text-sm ${
                    category === item.cat && subcategory === item.sub
                      ? 'border-primary ring-2 ring-primary/20 dark:border-primary-fixed-dim'
                      : 'border-outline-variant/10 hover:bg-neutral-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">
                    {item.sub === 'Pothole' ? 'construction' : item.sub === 'Street Light' ? 'lightbulb' : item.sub === 'Waste' ? 'delete' : 'park'}
                  </span>
                  <span className="truncate text-on-surface dark:text-neutral-200">{item.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Footer Actions */}
          <div className="pt-2 flex justify-between gap-4">
            <button 
              onClick={onCancel}
              className="px-6 py-3.5 bg-neutral-200/50 hover:bg-neutral-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-neutral-700 dark:text-neutral-200 font-bold text-sm rounded-full active:scale-95 transition-all shrink-0"
            >
              Cancel
            </button>
            <button 
              onClick={handleNextStep1}
              className="flex-1 h-14 bg-gradient-to-br from-primary to-primary-container text-white font-bold text-base rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
            >
              <span>Next Step</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: CATEGORY SELECT & LOCATION PROMPT ================= */}
      {step === 2 && (
        <div className="space-y-8 animate-fade-in">
          <div>
            <h2 className="text-3xl font-extrabold text-primary dark:text-primary-fixed-dim tracking-tight mb-2">Identify the Issue</h2>
            <p className="text-on-surface-variant dark:text-neutral-300 font-medium">Select the specific sub-category and verify the GPS tag.</p>
          </div>

          {/* Specific Grid Selection */}
          <section className="grid grid-cols-2 gap-4">
            {[
              { title: 'Pothole', sub: 'Road Maintenance', icon: 'construction', key: 'Infrastructure', color: 'bg-primary-fixed text-on-primary-fixed' },
              { title: 'Graffiti', sub: 'Vandalism Cleanup', icon: 'format_paint', key: 'Sanitation', color: 'bg-secondary-container text-on-secondary-container' },
              { title: 'Street Light', sub: 'Lighting Outage', icon: 'lightbulb', key: 'Infrastructure', color: 'bg-tertiary-fixed text-on-tertiary-fixed' },
              { title: 'Waste', sub: 'Sanitation Issue', icon: 'delete_outline', key: 'Sanitation', color: 'bg-error-container text-on-error-container' }
            ].map((item) => (
              <button 
                type="button"
                key={item.title}
                onClick={() => {
                  setCategory(item.key as Category);
                  setSubcategory(item.title);
                }}
                className={`group flex flex-col items-start p-5 rounded-3xl border-none shadow-sm hover:shadow-md transition-all text-left active:scale-[0.98] ${
                  subcategory === item.title 
                    ? 'bg-neutral-100 dark:bg-slate-800 ring-2 ring-primary dark:ring-primary-fixed-dim' 
                    : 'bg-surface-container-lowest dark:bg-slate-900'
                }`}
              >
                <div className={`mb-4 p-3 rounded-2xl ${item.color} group-hover:bg-primary group-hover:text-white transition-colors`}>
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <span className="font-extrabold text-on-surface dark:text-white text-base">{item.title}</span>
                <span className="text-xs text-on-surface-variant dark:text-neutral-400 mt-1">{item.sub}</span>
              </button>
            ))}
          </section>

          {/* Location Detection with Mock Map Preview */}
          <section className="space-y-4">
            <div className="flex justify-between items-end mb-1 px-1">
              <div>
                <h3 className="font-bold text-base text-primary dark:text-primary-fixed-dim">Location Tagged</h3>
                
                {isEditingLocation ? (
                  <input 
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="mt-1 bg-surface-container-high border-none rounded-lg px-2 py-1 text-xs text-on-surface dark:text-white font-medium outline-none focus:ring-1 focus:ring-primary"
                    onBlur={() => setIsEditingLocation(false)}
                    autoFocus
                  />
                ) : (
                  <p className="text-xs text-on-surface-variant dark:text-neutral-400 flex items-center gap-1 mt-0.5 font-medium leading-relaxed">
                    <MapPin size={12} className="text-primary dark:text-primary-fixed-dim" />
                    <span>{locationName}</span>
                  </p>
                )}
              </div>
              <button 
                type="button"
                onClick={() => setIsEditingLocation(!isEditingLocation)}
                className="text-primary dark:text-primary-fixed-dim font-bold text-xs hover:underline outline-none"
              >
                {isEditingLocation ? 'Done' : 'Edit Location'}
              </button>
            </div>

            {/* Mock static map image preview */}
            <div className="relative w-full h-48 rounded-full overflow-hidden shadow-inner bg-surface-container group">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcWKBgVMD83PxsY-FFMgUEMgEEPVoMDsky3DPusvuHrKjRUWVG9EGBwI83apbREjrEPHFEYAuwgiTqvj2ov9rL_Fowhl_3N-fMQ-YtQG3kV4NuneuVEoQGLt9RVdYfNzR4SHMUHSnCTskZs30JttnBPCzk_VazTkC8jJ4Tn-EPE0None4LLo1bHZaunSQYtEDABewhwD0EpgQld5mBsTSfWkd8mEOh8nHu2NgPqXt9DY1ZI0iY81VN1RpBPqZJTrr2kduH7nqEmNk" 
                alt="Mini location tag mapping" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full scale-150 blur-lg pointer-events-none" />
                  <div className="relative w-11 h-11 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white">
                    <MapPin size={16} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 2 actions: back & submit */}
          <div className="pt-2 flex justify-between gap-4">
            <button 
              onClick={() => setStep(1)}
              className="px-6 py-3.5 bg-neutral-200/50 hover:bg-neutral-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-neutral-700 dark:text-neutral-200 font-bold text-sm rounded-full active:scale-95 transition-all shrink-0"
            >
              Back
            </button>
            <button 
              onClick={handleSubmit}
              className="flex-1 h-14 bg-gradient-to-br from-primary to-primary-container text-white font-extrabold text-base rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
            >
              <span>Submit Report</span>
              <Check size={18} />
            </button>
          </div>
          <p className="text-center text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">
            Confidential and Dynamic Encrypted Transmission
          </p>
        </div>
      )}
    </div>
  );
}
