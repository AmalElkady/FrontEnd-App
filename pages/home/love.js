import Head from "next/head";
import Page from "../../hoc/securedPage/index";

import Love from "../../components/Love";
import Connection from "../../hoc/securedPage/Connection";

export default Page(() => (
  <>
    <Head>
      <title>Love</title>
    </Head>
    <div className="app-wrapper">
      <Connection />
      <Love />
    </div>
  </>
));
