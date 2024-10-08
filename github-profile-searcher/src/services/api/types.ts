export type User = {
  username: string;
  avatarUrl: string;
  url: string;
};

export type FullUser = {
  followerCount: number;
  repositoryCount: number;
} & User;

export type Repo = {
  name: string;
  stars: number;
  createdAt: string;
  description: string;
};

export type FullInfo = {
  user: FullUser;
  followers: User[];
  repos: Repo[];
};

export type RepoAndDate = {
  year: number;
  month: number;
  day: number;
} & Repo;

export type RepoCountByYear = {
  [key: number]: number;
};

export type RepoAndDateOrNumber = RepoAndDate | number;
