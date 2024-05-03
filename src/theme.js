import { red } from '@mui/material/colors';
import { createTheme, alpha } from '@mui/material/styles';
const transparent = alpha('#919EAB', 0.24);
// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#28AADC',
    },
    secondary: {
      main: '#64EBB6',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ' "Inter", sans-serif',
  },
  customShadows: {
    z1: `0 1px 2px 0 ${transparent}`,
    z8: `0 8px 16px 0 ${transparent}`,
    z12: `0 0 2px 0 ${transparent}, 0 12px 24px 0 ${transparent}`,
    z16: `0 0 2px 0 ${transparent}, 0 16px 32px -4px ${transparent}`,
    z20: `0 0 2px 0 ${transparent}, 0 20px 40px -4px ${transparent}`,
    z24: `0 0 4px 0 ${transparent}, 0 24px 48px 0 ${transparent}`,
  },
});

export default theme;
