import Head from "next/head";
import Page from "../../hoc/securedPage/index";

import Love from "../../components/Love"

export default Page(() => (
  <>
    <Head>
      <title>Love</title>
    </Head>
    <div className="app-wrapper">
    <Love/>
    </div>
  </>
));
