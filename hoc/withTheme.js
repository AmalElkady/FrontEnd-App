import { ThemeProvider } from "styled-components";
//import { createMuiTheme } from "@material-ui/core/styles";
import theme from "../config/theme";

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#d3316e"
//     },
//     secondary: {
//       main: "#f44336"
//     }
//   }
// });

export default ComposedComponent => props => (
  <ThemeProvider theme={theme}>
    <ComposedComponent {...props} />
  </ThemeProvider>
);
