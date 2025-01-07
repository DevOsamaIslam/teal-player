import { createTheme } from "@mui/material/styles"
import { teal, grey } from "@mui/material/colors"

const theme = createTheme({
  palette: {
    primary: {
      main: "#068",
      light: "#0ab",
      dark: "#056",
      contrastText: "#fff",
    },
    secondary: {
      main: grey[500],
      light: grey[300],
      dark: grey[700],
      contrastText: "#000",
    },
    background: {
      default: grey[100],
      paper: "#fff",
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      color: teal[700],
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      color: teal[600],
    },
    body1: {
      fontSize: "1rem",
      color: grey[800],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
        containedPrimary: {
          backgroundColor: teal[500],
          color: "#fff",
          "&:hover": {
            backgroundColor: teal[700],
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: teal[500],
        },
      },
    },
  },
})

export default theme
