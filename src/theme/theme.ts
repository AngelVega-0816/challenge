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
          backgroundColor: palette.primary.main, // Establece el background para primary
          color: palette.text.main, // Establece el color del texto
          '&:hover': {
            backgroundColor: palette.primary.secondary, // Establece el color para el hover
          },
        },
      },
    },
  },
});

export default theme;