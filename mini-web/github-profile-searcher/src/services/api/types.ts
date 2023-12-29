export type User = {
  username: string;
  avatarUrl: string;
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
