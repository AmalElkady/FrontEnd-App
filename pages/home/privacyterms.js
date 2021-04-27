import Head from "next/head";
import Page from "../../hoc/securedPage/index";

import PrivacyTerms from "../../components/PrivacyTerms";

export default Page(() => (
  <>
    <Head>
      <title>Privacy and Terms</title>
    </Head>
    <div className="app-wrapper">
      <PrivacyTerms />
    </div>
  </>
));
