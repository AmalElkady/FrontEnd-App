import Head from "next/head";
import Page from "../../hoc/securedPage/index";

import PrivatePhotos from "../../components/PrivatePhotos";
import Connection from "../../hoc/securedPage/Connection";

export default Page(() => (
  <>
    <Head>
      <title>Private Photos</title>
    </Head>
    <div className="app-wrapper">
      <Connection />
      <PrivatePhotos />
    </div>
  </>
));
