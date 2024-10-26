import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';

const theme = createTheme({
  cssVariables: true,
  palette,
  typography,
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: palette.primary.main,
          color: palette.text.main,
          '&:hover': {
            backgroundColor: palette.primary.secondary,
          },
        },
      },
    },
  },
});

export default theme;