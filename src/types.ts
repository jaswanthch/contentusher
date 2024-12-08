export interface BlogSuggestion {
  title: string;
  keywords: string[];
  description: string;
  estimatedReadTime: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface BlogFormData {
  brief: string;
  length: number;
  tone: string;
}

export interface BlogSuggestionsFormData {
  contentGoal: string;
  suggestionCount: number;
}

export interface InstagramPost {
  caption: string;
  hashtags: string[];
}

export interface InstagramPostFormData {
  topic: string;
  tone: string;
  callToAction: string;
  postCount: number;
}

export interface ContentBrief {
  topic: string;
  targetKeywords: string[];
  outline: string[];
  keyPoints: string[];
  targetAudience: string;
  tone: string;
  callToAction: string;
}

export interface ContentStrategy {
  overview: string;
  targetAudience: {
    demographics: string;
    interests: string[];
    painPoints: string[];
  };
  contentPlan: {
    types: string[];
    topics: string[];
    bestPractices: string[];
    contentBriefs: ContentBrief[];
  };
  postingSchedule: {
    frequency: string;
    bestTimes: string[];
    consistency: string;
  };
  engagement: {
    tactics: string[];
    responses: string[];
    monitoring: string[];
  };
  metrics: {
    kpis: string[];
    tools: string[];
    goals: string[];
  };
}

export interface ContentStrategyFormData {
  platform: 'instagram' | 'linkedin' | 'facebook' | 'twitter';
  contentGoal: string;
  contentCount: number;
  targetAudience: string;
  contentTypes: string[];
  postingFrequency: string;
}

export interface GooglePost {
  title: string;
  content: string;
  callToAction: {
    type: 'LEARN_MORE' | 'BOOK' | 'ORDER' | 'BUY' | 'SIGN_UP' | 'CALL' | 'VISIT';
    label: string;
  };
  eventDetails?: {
    startDate: string;
    endDate: string;
    time: string;
  };
  offerDetails?: {
    couponCode?: string;
    terms?: string;
    expiryDate?: string;
  };
}

export interface GooglePostFormData {
  postType: 'update' | 'event' | 'offer' | 'product';
  topic: string;
  tone: string;
  callToAction: string;
  postCount: number;
}

export interface Project {
  id: string;
  name: string;
  industry: string;
  location: string;
  description: string;
  services: string[];
  createdAt: string;
  updatedAt: string;
}

// Storage keys
export const PROJECTS_STORAGE_KEY = 'content-usher-projects';
export const CURRENT_PROJECT_KEY = 'content-usher-current-project';