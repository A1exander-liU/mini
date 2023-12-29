import { Avatar, Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { FullInfo, FullUser } from '../services/api/types';

interface Props {
  info: FullInfo;
}

interface FullUserProps {
  user: FullUser;
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

export default function UserInfo({ info }: Props) {
  const user = info.user;
  const followers = info.followers;
  const repos = info.repos;

  return (
    <Paper sx={{ padding: '1rem' }}>
      <UserInfoHeader user={user} />
    </Paper>
  );
}
