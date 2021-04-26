import Head from "next/head";
import Page from "../../hoc/securedPage/index";

import Settinds from "../../components/Settings";

export default Page(() => (
  <>
    <Head>
      <title>Setting</title>
    </Head>
    <div className="app-wrapper">
      <Settinds />
    </div>
  </>
));
