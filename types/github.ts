

export type GitHubUser = {
  username: string;
  name: string;
  bio: string;
  avatar: string;
  location: string;
  company: string;
  repositories: number;
  followers: number;
  following: number;
  
};

export type Repository = {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  isPrivate: boolean;
};

export type LanguageStat = {
  name: string;
  count: number;
  percentage: number;
};

export type GitHubAnalytics = {
  totalStars: number;
  totalForks: number;
  averageStars: number;
  popularRepositories: Repository[];
  languages: LanguageStat[];
};

export type GitHubDashboardData = {
  user: GitHubUser;
  repositories: Repository[];
  analytics: GitHubAnalytics;
  activity: GitHubActivity;
};

export type ActivityDay = {
  date: string;
  count: number;
};

export type GitHubActivity = {
  totalEvents: number;
  days: ActivityDay[];
};