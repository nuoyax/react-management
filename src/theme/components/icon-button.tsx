import type { Components, CssVarsTheme, Theme } from '@mui/material/styles';

export const MuiIconButton: Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme>['MuiIconButton'] = {
  defaultProps: {
    size: 'small',
  },
};
