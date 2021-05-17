import Head from "next/head";
import Page from "../../hoc/securedPage/index";

import Views from "../../components/Views";
import Connection from "../../hoc/securedPage/Connection";

export default Page(() => (
  <>
    <Head>
      <title>Love</title>
    </Head>
    <div className="app-wrapper">
      <Connection />
      <Views />
    </div>
  </>
));
