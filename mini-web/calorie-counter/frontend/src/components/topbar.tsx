import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useContext } from 'react';
import { ColourModeContext } from '../main';

export function TopBar() {
  const colourModeContext = useContext(ColourModeContext);
  const theme = useTheme();

  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='h5' flexGrow={1}>
            Calorie Counter
          </Typography>
          <IconButton onClick={colourModeContext.toggleMode}>
            {theme.palette.mode === 'light' ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
