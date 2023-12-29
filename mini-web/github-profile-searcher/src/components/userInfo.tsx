import { Avatar, Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { FullInfo, FullUser, Repo } from '../services/api/types';
import type {} from '@mui/lab/themeAugmentation';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
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
        <Typography variant='h6'>{user.username}</Typography>
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
  for (const repo of repos) {
    const date = new Date(repo.createdAt);

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    console.log(repo.name, year, month, day);
  }

  return (
    <>
      <Box>
        <Typography variant='h6'>Timeline</Typography>
        <Timeline>
          {repos.map((repo, index) => {
            return (
              <TimelineItem key={repo.name}>
                <TimelineSeparator>
                  <TimelineDot />
                  {index != repos.length - 1 ? <TimelineConnector /> : <></>}
                </TimelineSeparator>
                <TimelineContent>{repo.name}</TimelineContent>
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
  const followers = info.followers;
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
