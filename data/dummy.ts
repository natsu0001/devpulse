import type {
  GitHubUser,
  Repository,
} from "@/types/github";

export const dummyUser: GitHubUser = {
  username: "torvalds",
  name: "Linus Torvalds",
  bio: "Creator of Linux and Git. Software engineer and open source developer.",
  avatar: "",
  location: "Portland, Oregon",
  company: "",
  repositories: 68,
  followers: 235000,
  following: 0,
  
};

export const dummyRepositories: Repository[] = [
  {
    id: 1,
    name: "linux",
    description:
      "Linux kernel source tree.",
    language: "C",
    stars: 184000,
    forks: 54000,
    updatedAt: "2 days ago",
    isPrivate: false,
  },

  {
    id: 2,
    name: "git",
    description:
      "Git source code mirror.",
    language: "C",
    stars: 52000,
    forks: 25000,
    updatedAt: "5 days ago",
    isPrivate: false,
  },

  {
    id: 3,
    name: "subsurface",
    description:
      "Open source dive log application.",
    language: "C++",
    stars: 3800,
    forks: 900,
    updatedAt: "1 week ago",
    isPrivate: false,
  },

  {
    id: 4,
    name: "libgit2",
    description:
      "A portable, pure C implementation of the Git core methods.",
    language: "C",
    stars: 10000,
    forks: 2200,
    updatedAt: "2 weeks ago",
    isPrivate: false,
  },
];