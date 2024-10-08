import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import TopBar from './components/topbar';
import { API } from './services/api/api';
import { extractFollowers, extractRepos, extractUser } from './services/util';
import { FullInfo } from './services/api/types';
import {
  Box,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import UserInfo from './components/userInfo';

function App() {
  const [query, setQuery] = useState('');

  const [info, setInfo] = useState<FullInfo>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log(info || error);
  }, [info, error]);

  const pullAllInfo = async (username: string) => {
    setError('');

    const userInfo = await API.user(username);

    if (userInfo.error) {
      if (userInfo.statusCode == 404) {
        setError('User not found');
      }
      return;
    }

    const followersInfo = await API.userFollowers(username);
    const reposInfo = await API.userRepos(username);

    const extractedUser = extractUser(userInfo);
    const extractedFollowers = extractFollowers(followersInfo);
    const extractedRepos = extractRepos(reposInfo);

    setInfo({
      user: extractedUser,
      followers: extractedFollowers,
      repos: extractedRepos,
    });
  };

  const sendQuery = async () => {
    if (query === '') {
      return;
    }

    setInfo(undefined);
    setLoading(true);
    await pullAllInfo(query);
    setQuery('');
    setLoading(false);
  };

  const handleQueryChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      sendQuery();
    }
  };

  return (
    <>
      <TopBar />
      <Box padding={'1rem'} display={'flex'} flexDirection={'column'}>
        <Typography variant='h5' textAlign={'center'} marginBottom={'1rem'}>
          Enter a username
        </Typography>
        <Box display={'flex'} alignItems={'center'}>
          <TextField
            placeholder='Username'
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleQuerySubmit}
            sx={{ flexGrow: 1 }}
          />
          <IconButton sx={{ borderRadius: 1 }} onClick={sendQuery}>
            <SearchIcon sx={{ height: '100%' }} />
          </IconButton>
        </Box>
        <Typography color={grey[500]} margin={'.1rem 0'}>
          {error}
        </Typography>
        <Box margin={'.5rem 0'} display={'flex'} justifyContent={'center'}>
          {loading ? <CircularProgress /> : <></>}
        </Box>
        <Box marginBottom={'5rem'} />
        {info && <UserInfo info={info} />}
      </Box>
    </>
  );
}

export default App;
