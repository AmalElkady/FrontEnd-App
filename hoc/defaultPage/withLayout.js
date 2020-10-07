import React from "react";
import Layout from "../../containers/DefaultLayout";

export default ComposedComponent => props => (
  <Layout>
    <ComposedComponent {...props} />
  </Layout>
);
