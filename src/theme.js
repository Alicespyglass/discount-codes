import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // MUI default blue
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
});

export default theme;
