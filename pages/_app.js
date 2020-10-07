import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import "../static/vendors/style";
//import "../firebaseConfig/index"
import { PersistGate } from "redux-persist/integration/react";

import initStore from "../store/index";

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
          <title>App</title>
        </Head>
        <Container>
          <Provider store={store}>
            <PersistGate persistor={store.__PERSISTOR} loading={null}>
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </Container>
      </Container>
    );
  }
}

export default withRedux(initStore)(MyApp);
