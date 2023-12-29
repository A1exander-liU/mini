import {
  FullUser,
  GroupedRepoAndDate,
  Repo,
  RepoAndDate,
  RepoAndDateOrNumber,
  User,
} from './api/types';

export function extractUser(user): FullUser {
  return {
    username: user.login,
    avatarUrl: user.avatar_url,
    url: user.html_url,
    followerCount: user.followers,
    repositoryCount: user.public_repos,
  };
}

export function extractFollowers(followers: any[]): User[] {
  return followers.map((follower) => {
    return {
      username: follower.login,
      avatarUrl: follower.avatar_url,
    };
  });
}

export function extractRepos(repos: any[]): Repo[] {
  return repos.map((repo) => {
    return {
      name: repo.name,
      stars: repo.stargazers_count,
      createdAt: repo.created_at,
      description: repo.description,
    };
  });
}

export function groupReposByYear(repos: RepoAndDate[]) {
  const grouped: RepoAndDateOrNumber[] = [];

  for (const repo of repos) {
    if (!grouped.includes(repo.year)) {
      grouped.push(repo.year);
    } else {
      grouped.push(repo);
    }
  }

  return grouped;
}
