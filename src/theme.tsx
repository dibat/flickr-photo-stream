import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0063dc",
    },
    secondary: {
      main: "#006dac",
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
