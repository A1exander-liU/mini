import { Box, IconButton, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TopBar } from './components/topbar';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

function App() {
  const [query, setQuery] = useState('');

  const handleQueryChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      sendQuery();
      setQuery('');
    }
  };

  const sendQuery = async () => {};

  return (
    <>
      <TopBar />
      <Box padding={'1rem'} display={'flex'} flexDirection={'column'}>
        <Typography variant='h5' textAlign={'center'} marginBottom={'1rem'}>
          Enter a food to begin searching
        </Typography>
        <Box display={'flex'} alignItems={'stretch'}>
          <TextField
            placeholder='Food'
            value={query}
            onChange={(e) => handleQueryChange(e)}
            onKeyDown={(e) => handleQuerySubmit(e)}
            sx={{ flexGrow: 1 }}
          />
          <IconButton sx={{ borderRadius: 1 }}>
            <SearchIcon sx={{ height: '100%' }} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default App;
