import type { Components, CssVarsTheme, Theme } from '@mui/material/styles';

export const MuiButton: Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme>['MuiButton'] = {
  defaultProps: {
    variant: 'contained',
    disableElevation: true,
    color: 'inherit',
  },
  styleOverrides: {
    root: {
      textTransform: 'none',
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    containedInherit: ({ theme }) => ({
      color: theme.vars.palette.common.white,
      backgroundColor: theme.vars.palette.grey[800],
      '&:hover': {
        backgroundColor: theme.vars.palette.grey[800],
      },
    }),
  },
  variants: [
    {
      props: { color: 'primary' },
      style: {
        '&.Mui-disabled': {
          color: 'var(--palette-primary-contrastText)',
          backgroundColor: 'var(--palette-primary-main)',
          opacity: 0.5,
        },
      },
    },
  ],
};
