import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import "../static/vendors/style";
import { PersistGate } from "redux-persist/integration/react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import initStore from "../store/index";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#b72051"
    }
  }
});
class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {})
      }
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Head>
          <title>Love gila</title>
        </Head>
        <Container>
          <Provider store={store}>
            <PersistGate persistor={store.__PERSISTOR} loading={null}>
              <ThemeProvider theme={theme}>
                <Component {...pageProps} />
              </ThemeProvider>
            </PersistGate>
          </Provider>
        </Container>
      </Container>
    );
  }
}

export default withRedux(initStore)(MyApp);
