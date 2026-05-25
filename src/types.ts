/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 'Infrastructure' | 'Public Safety' | 'Sanitation' | 'Parks' | 'Water & Power';

export interface Milestone {
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'in_progress' | 'pending';
  icon: string;
}

export interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  text: string;
  time: string;
  repliesCount: number;
  upvotes: number;
  isOfficial?: boolean;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: Category;
  subcategory: string;
  status: 'New' | 'In Progress' | 'Resolved';
  statusText: string;
  location: {
    name: string;
    address: string;
    lat: number; // For plotting
    lng: number; // For plotting
  };
  imageUrl: string;
  upvotes: number;
  followed: boolean;
  date: string;
  timeline: Milestone[];
  comments: Comment[];
  district: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  email: string;
  reportedCount: number;
  upvotedCount: number;
}
