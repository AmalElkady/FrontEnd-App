import Head from "next/head";
//import Page from "../../hoc/securedPage/index";

import Page from "../../hoc/defaultPage";

import PrivacyTerms from "../../components/PrivacyTerms";
import Connection from "../../hoc/securedPage/Connection";

export default Page(() => (
  <>
    <Head>
      <title>Privacy Statements</title>
    </Head>
    <div className="app-wrapper">
      {/* <Connection /> */}
      <PrivacyTerms componentFlag="privacy" />
    </div>
  </>
));
