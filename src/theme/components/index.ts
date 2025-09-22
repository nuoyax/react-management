import type { Components, CssVarsTheme, Theme } from '@mui/material/styles';
import { MuiButton } from './button';
import { MuiIconButton } from './icon-button';
import { MuiTextField } from './text-field';

export const components = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiButton,
  MuiIconButton,
  MuiTextField,
  MuiInputLabel: {
    defaultProps: {
      shrink: true,
    },
  },
  MuiOutlinedInput: {
    defaultProps: {
      notched: true,
    },
  },
  MuiTooltip: {
    defaultProps: {
      arrow: true,
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        marginLeft: 0,
        marginRight: 0,
      },
    },
  },
} as Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme>;
