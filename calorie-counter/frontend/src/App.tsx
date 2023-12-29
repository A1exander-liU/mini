import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  IconButton,
  Pagination,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TopBar } from './components/topbar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { API } from './services/api/api';
import { Food } from './services/api/types';
import { isAxiosError } from 'axios';
import {
  PER_PAGE,
  numberOfPages,
  pageStartIndex,
} from './services/scripts/app/functions';
import Serving from './components/serving';

function App() {
  const [query, setQuery] = useState('');

  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);

  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageStart, setPageStart] = useState(0);

  useEffect(() => {
    const paginationCalculations = () => {
      const pages = numberOfPages(foods.length);
      console.log(`${foods.length} entries, ${PER_PAGE} per page`);
      console.log(`${pages} pages are needed`);

      setPages(pages);
    };
    paginationCalculations();
  }, [foods]);

  useEffect(() => {
    setPageStart(pageStartIndex(currentPage));
  }, [currentPage]);

  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
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
      setCurrentPage(1);
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
            foods
              .slice(pageStart, Math.min(foods.length, pageStart + PER_PAGE))
              .map((food) => {
                return (
                  <Accordion key={food.Display_Name}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{food.Display_Name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack direction={'column'} spacing={1}>
                        {food.Calories_By_Portion.map((data, index) => {
                          return (
                            <Serving
                              key={index}
                              calories={data.Calories}
                              portionAmount={data.Portion_Amount}
                              portionName={data.Portion_Display_Name}
                            />
                          );
                        })}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
        </Stack>
        {foods.length != 0 ? (
          <Pagination
            sx={{ margin: '.5rem 0' }}
            color='primary'
            count={pages}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}

export default App;
