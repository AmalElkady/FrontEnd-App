import Head from "next/head";
import Page from "../../hoc/securedPage/index";

import Settinds from "../../components/Settings";
import Connection from "../../hoc/securedPage/Connection";

export default Page(() => (
  <>
    <Head>
      <title>Setting</title>
    </Head>
    <div className="app-wrapper">
      <Connection />
      <Settinds />
    </div>
  </>
));
