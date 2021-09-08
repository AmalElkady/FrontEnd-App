import Head from "next/head";
import Page from "../hoc/securedPage/index";

import PaymentCancel from "../components/PaymentsSubs/PaymentCancel";

export default Page(() => (
  <>
    <Head>
      <title>Payment Cancel</title>
    </Head>
    <div className="app-wrapper">
      <PaymentCancel />
    </div>
  </>
));
