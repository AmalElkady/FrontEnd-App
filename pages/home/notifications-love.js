import Head from "next/head";
import Page from "../../hoc/securedPage/index";

import LoveNotification from "../../components/AppNotification/LoveNotification";
import Connection from "../../hoc/securedPage/Connection";

export default Page(() => (
  <>
    <Head>
      <title>Love Notifications</title>
    </Head>
    <div className="app-wrapper">
      <Connection />
      <LoveNotification />
    </div>
  </>
));
