import ReactDOM from 'react-dom/client';
import './index.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App.tsx';
import { createContext, useMemo, useState } from 'react';
import Cookies from 'js-cookie';

const MODE_KEY = 'mode';

export const ColourModeContext = createContext({
  toggleMode: () => {},
});

export function ThemeWrapper() {
  const cookieMode = Cookies.get(MODE_KEY);
  const initial: 'light' | 'dark' = ['light', 'dark'].includes(cookieMode)
    ? cookieMode
    : 'light';
  const [mode, setMode] = useState<'light' | 'dark'>(initial);
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
      },
    });
  }, [mode]);

  return (
    <>
      <ColourModeContext.Provider
        value={{
          toggleMode: () => {
            if (mode === 'dark') {
              Cookies.set(MODE_KEY, 'light');
            } else {
              Cookies.set(MODE_KEY, 'dark');
            }
            setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
          },
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ColourModeContext.Provider>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<ThemeWrapper />);
