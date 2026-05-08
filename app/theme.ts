import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50",
      light: "#81C784",
      dark: "#388E3C",
      contrastText: "#fff",
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: "inherit",
  },
});

export default theme;
