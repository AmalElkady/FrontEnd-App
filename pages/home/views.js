import Head from "next/head";
import Page from "../../hoc/securedPage/index";

import Views from "../../components/Views"

export default Page(() => (
  <>
    <Head>
      <title>Love</title>
    </Head>
    <div className="app-wrapper">
    <Views/>
    </div>
  </>
));
