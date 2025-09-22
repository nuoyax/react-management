import { createTheme } from '@mui/material/styles';
import { colorSchemes } from './color-schemes';
import { components } from './components';

// declare module '@mui/material/styles' {
//   interface BreakpointOverrides {
//     '2xl': true;
//   }
// }

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
    cssVarPrefix: '',
  },
  colorSchemes,
  typography: {
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 640,
  //     md: 768,
  //     lg: 1024,
  //     xl: 1280,
  //     '2xl': 1536,
  //   },
  // },
  components,
});
