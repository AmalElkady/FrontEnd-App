import Head from "next/head";
import Page from "../../hoc/securedPage/index";
import asyncComponent from "../../util/asyncComponent";

const Crypto = asyncComponent(() => import("../../app/dashboard/Crypto"));

export default Page(() => (
  <>
    <Head>{/* <title>Crypto Dashborad</title> */}</Head>
    <div className="app-wrapper">{/* {console.log(this)}
		<Crypto/> */}</div>
  </>
));
