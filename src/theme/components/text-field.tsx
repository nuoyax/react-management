import type { Components, CssVarsTheme, Theme } from '@mui/material/styles';

export const MuiTextField: Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme>['MuiTextField'] = {
  defaultProps: {
    size: 'small',
    slotProps: {
      inputLabel: { shrink: true },
    },
  },
};
