import type { ColorSystemOptions } from '@mui/material/styles';

type DefaultColorScheme = 'light' | 'dark';

export const colorSchemes = {
  light: {
    palette: {
      primary: {
        main: '#00A76F',
        light: '#5BE49B',
        dark: '#007867',
        contrastText: '#fff',
      },
      secondary: {
        main: '#8E33FF',
        light: '#5119B7',
        dark: '#5119B7',
        contrastText: '#fff',
      },
      text: {
        primary: '#1C252E',
        secondary: '#637381',
        disabled: '#919EAB',
      },
      background: {
        default: '#fff',
      },
      grey: {
        '50': '#FCFDFD',
        '100': '#F9FAFB',
        '200': '#F4F6F8',
        '300': '#DFE3E8',
        '400': '#C4CDD5',
        '500': '#919EAB',
        '600': '#637381',
        '700': '#454F5B',
        '800': '#1C252E',
        '900': '#141A21',
      },
    },
  },
  dark: {
    palette: {
      primary: {
        main: '#00A76F',
        light: '#5BE49B',
        dark: '#007867',
        contrastText: '#fff',
      },
      secondary: {
        main: '#8E33FF',
        light: '#5119B7',
        dark: '#5119B7',
        contrastText: '#fff',
      },
      background: {
        default: '#121212',
      },
      grey: {
        '50': '#FCFDFD',
        '100': '#F9FAFB',
        '200': '#F4F6F8',
        '300': '#DFE3E8',
        '400': '#C4CDD5',
        '500': '#919EAB',
        '600': '#637381',
        '700': '#454F5B',
        '800': '#1C252E',
        '900': '#141A21',
      },
    },
  },
} satisfies Partial<Record<DefaultColorScheme, boolean | ColorSystemOptions>>;
