import {
  FullUser,
  Repo,
  RepoAndDate,
  RepoAndDateOrNumber,
  RepoCountByYear,
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

export function extractFollowers(followers): User[] {
  return followers.map((follower) => {
    return {
      username: follower.login,
      avatarUrl: follower.avatar_url,
    };
  });
}

export function extractRepos(repos): Repo[] {
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
    }
    grouped.push(repo);
  }

  return grouped;
}

export function reposByYearCount(repos: RepoAndDate[]) {
  const reposByYear: RepoCountByYear = {};

  for (const repo of repos) {
    if (!reposByYear[repo.year]) {
      reposByYear[repo.year] = 0;
    }
    reposByYear[repo.year] += 1;
  }

  return reposByYear;
}
