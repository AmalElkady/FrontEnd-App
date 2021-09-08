import Head from "next/head";
import Page from "../hoc/securedPage/index";

import PaymentSuccess from "../components/PaymentsSubs/PaymentSuccess";

export default Page(() => (
  <>
    <Head>
      <title>Payment Success</title>
    </Head>
    <div className="app-wrapper">
      <PaymentSuccess />
    </div>
  </>
));
