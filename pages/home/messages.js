import Head from "next/head";
import Page from "../../hoc/securedPage/index";

import Messages from "../../components/chatPanel/index";

export default Page(() => (
  <>
    <Head>
      <title>Love</title>
    </Head>
    <div className="app-wrapper">
      <Messages />
    </div>
  </>
));
