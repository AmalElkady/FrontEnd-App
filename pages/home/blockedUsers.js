import Head from "next/head";
import Page from "../../hoc/securedPage/index";

import BlockedUsers from "../../components/BlockedUsers"

export default Page(() => (
  <>
    <Head>
      <title>Love</title>
    </Head>
    <div className="app-wrapper">
    <BlockedUsers/>
    </div>
  </>
));
