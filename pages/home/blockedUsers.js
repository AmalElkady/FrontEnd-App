import Head from "next/head";
import Page from "../../hoc/securedPage/index";

import BlockedUsers from "../../components/BlockedUsers";
import Connection from "../../hoc/securedPage/Connection";

export default Page(() => (
  <>
    <Head>
      <title>Love</title>
    </Head>
    <div className="app-wrapper">
      <Connection />
      <BlockedUsers />
    </div>
  </>
));
