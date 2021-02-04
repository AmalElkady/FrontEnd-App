import Head from "next/head";
import Page from "../../hoc/securedPage/index";

import PrivatePhotos from "../../components/PrivatePhotos";

export default Page(() => (
  <>
    <Head>
      <title>Private Photos</title>
    </Head>
    <div className="app-wrapper">
      <PrivatePhotos />
    </div>
  </>
));
