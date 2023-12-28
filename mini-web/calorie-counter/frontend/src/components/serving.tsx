import { Paper, Typography, useTheme } from '@mui/material';

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

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          padding: '1rem',
          backgroundColor: theme.palette.primary.contrastText,
        }}
      >
        <Typography>Serving</Typography>
        <Typography>{portionAmount + ' ' + portionName}</Typography>
        <Typography>Calories</Typography>
        <Typography>{calories}</Typography>
      </Paper>
    </>
  );
}
