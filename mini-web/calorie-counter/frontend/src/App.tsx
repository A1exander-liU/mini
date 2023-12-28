import {
  Box,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TopBar } from './components/topbar';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { API } from './services/api/api';
import { Food } from './services/api/types';

function App() {
  const [query, setQuery] = useState('');
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);

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

  const sendQuery = async () => {
    setLoading(true);
    const foods = await API.queryFood(query);
    setLoading(false);

    setQuery('');

    setFoods(foods);
  };

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
          <IconButton onClick={sendQuery} sx={{ borderRadius: 1 }}>
            <SearchIcon sx={{ height: '100%' }} />
          </IconButton>
        </Box>
        {loading ? <CircularProgress /> : <></>}
        {foods &&
          foods.map((food) => {
            return (
              <Typography key={food.Display_Name}>
                {food.Display_Name}
              </Typography>
            );
          })}
      </Box>
    </>
  );
}

export default App;
