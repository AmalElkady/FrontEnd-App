import Head from "next/head";
import Page from "../../hoc/securedPage/index";

import PaymentsSubs from "../../components/PaymentsSubs";
import Connection from "../../hoc/securedPage/Connection";

export default Page(() => (
  <>
    <Head>
      <title>Payment And Subscription</title>
    </Head>
    <div className="app-wrapper">
      <Connection />
      <PaymentsSubs />
    </div>
  </>
));
