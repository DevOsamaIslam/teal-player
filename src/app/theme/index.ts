import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

const teal = {
  light: '#0aa',
  main: '#067',
  dark: '#033',
}

const theme = createTheme({
  palette: {
    primary: {
      main: teal.main,
      light: teal.light,
      dark: teal.dark,
      contrastText: '#fff',
    },
    secondary: {
      main: grey[500],
      light: grey[300],
      dark: grey[700],
      contrastText: '#000',
    },
    background: {
      default: grey[100],
      paper: '#fff',
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: teal.dark,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: teal.dark,
    },
    body1: {
      fontSize: '1rem',
      color: grey[800],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
        containedPrimary: {
          backgroundColor: teal.main,
          color: '#fff',
          '&:hover': {
            backgroundColor: teal.dark,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: teal.main,
        },
      },
    },
  },
})

export default theme
