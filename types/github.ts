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
  contributions: number;
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