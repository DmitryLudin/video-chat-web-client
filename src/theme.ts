import { ThemeOptions } from '@mui/material/styles';

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      default: '#fafafa',
    },
    primary: {
      main: '#7558e0',
    },
    secondary: {
      main: '#e0577e',
    },
  },
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: '#303030',
    },
    primary: {
      main: '#7558e0',
    },
    secondary: {
      main: '#e0577e',
    },
  },
};
