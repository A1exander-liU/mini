import {
  Avatar,
  Box,
  Chip,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { FullInfo, FullUser, Repo, RepoAndDate } from '../services/api/types';
import type {} from '@mui/lab/themeAugmentation';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import { groupReposByYear, reposByYearCount } from '../services/util';

interface Props {
  info: FullInfo;
}

interface FullUserProps {
  user: FullUser;
}

interface RepoProps {
  repos: Repo[];
}

function UserInfoHeader({ user }: FullUserProps) {
  return (
    <Stack direction={'row'} spacing={3}>
      <Avatar
        sx={{ width: 56, height: 56 }}
        alt={user.username}
        src={user.avatarUrl}
      />
      <Stack direction={'column'} spacing={1}>
        <Typography variant='h6'>
          <Link href={user.url} underline='none'>
            {user.username}
          </Link>
        </Typography>
        <Stack direction={'row'} spacing={3}>
          <Typography variant='subtitle2'>
            Repositories <Chip size='small' label={user.repositoryCount} />{' '}
          </Typography>
          <Typography variant='subtitle2'>
            Followers <Chip size='small' label={user.followerCount} />{' '}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

function RepoTimeline({ repos }: RepoProps) {
  repos.sort((a, b) => {
    return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf();
  });

  const repositories = repos.map((repo) => {
    const date = new Date(repo.createdAt);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return {
      name: repo.name,
      description: repo.description || 'No description',
      createdAt: repo.createdAt,
      stars: repo.stars,
      year,
      month,
      day,
    };
  });

  const grouped = groupReposByYear(repositories);
  const repoCountByYear = reposByYearCount(repositories);

  const colours = ['primary', 'secondary', 'info', 'warning'];

  const makeColourGroups = (repos: RepoAndDate[]) => {
    let index = 0;
    const grouped = {};
    for (const year of new Set(repos.map((repo) => repo.year))) {
      grouped[year] = colours[index];
      if (index + 1 > colours.length - 1) {
        index = 0;
      } else {
        index++;
      }
    }

    return grouped;
  };

  const colourForGroups = makeColourGroups(repositories);

  return (
    <>
      <Box>
        <Typography variant='h6'>Timeline</Typography>
        <Timeline>
          {grouped.map((repo, index) => {
            if (typeof repo === 'number') {
              return (
                <TimelineItem position='left' key={index}>
                  <TimelineSeparator>
                    <TimelineDot color={colourForGroups[repo]} />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography>{repo}</Typography>
                    <Typography variant='subtitle2'>
                      {repoCountByYear[repo]} Repositories
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              );
            } else {
              return (
                <TimelineItem key={index}>
                  <TimelineOppositeContent>
                    <Typography color={'text.secondary'}>
                      {repo.month}/{repo.day}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot
                      variant='outlined'
                      color={colourForGroups[repo.year]}
                    />
                    {index != grouped.length - 1 ? (
                      <TimelineConnector />
                    ) : (
                      <></>
                    )}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography>{repo.name}</Typography>
                    <Typography variant='subtitle2'>
                      {repo.description}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              );
            }
          })}
        </Timeline>
      </Box>
    </>
  );
}

export default function UserInfo({ info }: Props) {
  const user = info.user;
  const repos = info.repos;

  return (
    <Paper sx={{ padding: '1rem' }}>
      <Stack direction={'column'} spacing={2}>
        <UserInfoHeader user={user} />
        <RepoTimeline repos={repos} />
      </Stack>
    </Paper>
  );
}
