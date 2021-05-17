import Head from "next/head";
import Page from "../../hoc/securedPage/index";
import Profile from "../../components/profile";
import Connection from "../../hoc/securedPage/Connection";

export default Page(() => (
  <>
    <Head>
      <title>Profile</title>
    </Head>
    <div className="app-wrapper">
      <Connection />
      <Profile />
    </div>
  </>
));
