import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

interface Props {
  calories: number;
  portionAmount: number;
  portionName: string;
}

export default function Serving({
  calories,
  portionAmount,
  portionName,
}: Props) {
  const theme = useTheme();

  const [serving, setServing] = useState<number | ''>(1);
  const [resultPortions, setResultPortions] = useState(portionAmount);
  const [resultCalories, setResultCalories] = useState(calories);

  useEffect(() => {
    if (serving === '' || serving <= 1) {
      setResultPortions(portionAmount);
      setResultCalories(calories);
      return;
    }
    setResultPortions(portionAmount * serving);
    setResultCalories(calories * serving);
  }, [serving, portionAmount, calories]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log('current', e.target.value);
    if (e.target.value === '') {
      setServing(e.target.value);
    }
    const value = parseInt(e.target.value[e.target.value.length - 1]);

    if (!isNaN(value)) {
      setServing(parseInt(e.target.value));
    }
  };

  const handleIncrement = () => {
    setServing((prev) => {
      if (prev === '') {
        return 1;
      }
      return prev + 1;
    });
  };

  const handleDecrement = () => {
    setServing((prev) => {
      if (prev === '') {
        return 1;
      }
      return Math.max(0, prev - 1);
    });
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          padding: '1rem',
          backgroundColor: theme.palette.primary.contrastText,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction={'column'}>
          <Typography>Portion</Typography>
          <Typography variant='body2'>
            {resultPortions + ' ' + portionName}
          </Typography>
          <Typography>Calories</Typography>
          <Typography variant='body2'>{resultCalories}</Typography>
        </Stack>
        <Box>
          <Typography textAlign={'center'}>Servings</Typography>
          <Box margin={'.5rem'} display={'flex'} alignItems={'stretch'}>
            <Button onClick={handleDecrement}>-</Button>
            <TextField
              size='small'
              sx={{ maxWidth: 80 }}
              value={serving}
              onChange={handleChange}
            />
            <Button onClick={handleIncrement}>+</Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
