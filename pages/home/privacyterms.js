import Head from "next/head";
import Page from "../../hoc/securedPage/index";

import PrivacyTerms from "../../components/PrivacyTerms";
import Connection from "../../hoc/securedPage/Connection";

export default Page(() => (
  <>
    <Head>
      <title>Privacy and Terms</title>
    </Head>
    <div className="app-wrapper">
      <Connection />
      <PrivacyTerms />
    </div>
  </>
));
