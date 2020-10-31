import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#d3316e"
    }
  }
});

export default ComposedComponent => props => (
  <ThemeProvider theme={theme}>
    <ComposedComponent {...props} />
  </ThemeProvider>
);
