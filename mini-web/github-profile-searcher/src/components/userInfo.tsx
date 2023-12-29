import {
  Avatar,
  Box,
  Chip,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { FullInfo, FullUser, Repo } from '../services/api/types';
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

  return (
    <>
      <Box>
        <Typography variant='h6'>Timeline</Typography>
        <Timeline>
          {repositories.map((repo, index) => {
            return (
              <TimelineItem key={repo.name}>
                <TimelineOppositeContent color={'text.secondary'}>
                  <Typography>
                    {repo.year}/{repo.month}/{repo.day}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  {index != repos.length - 1 ? <TimelineConnector /> : <></>}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography>{repo.name}</Typography>
                  <Typography variant='body2'>{repo.description}</Typography>
                </TimelineContent>
              </TimelineItem>
            );
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
