import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TopBar } from './components/topbar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { API } from './services/api/api';
import { Food } from './services/api/types';
import { isAxiosError } from 'axios';

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
    if (query === '') {
      return;
    }

    setLoading(true);
    try {
      const foods = await API.queryFood(query);
      setFoods(foods);
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e.response?.data);
      }
    } finally {
      setQuery('');
      setLoading(false);
    }
  };

  return (
    <>
      <TopBar />
      <Box padding={'1rem'} display={'flex'} flexDirection={'column'}>
        <Typography variant='h5' textAlign={'center'} marginBottom={'1rem'}>
          Enter a food to begin searching
        </Typography>
        <Box display={'flex'} alignItems={'center'}>
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
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          minHeight={60}
          margin={'1rem 0'}
        >
          {loading ? <CircularProgress /> : <></>}
        </Box>
        <Stack direction={'column'} spacing={1}>
          {foods &&
            foods.map((food) => {
              return (
                <Accordion key={food.Display_Name}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{food.Display_Name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {food.Calories_By_Portion.map((data, index) => {
                      return (
                        <Typography key={index}>
                          Serving: {data.Portion_Amount}
                          {data.Portion_Display_Name} | {data.Calories} Calories
                        </Typography>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </Stack>
      </Box>
    </>
  );
}

export default App;
