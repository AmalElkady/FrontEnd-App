import Head from "next/head";
import Page from "../../hoc/securedPage";
import asyncComponent from "../../util/asyncComponent";

const ForgotPassword1 = asyncComponent(() => import("../../app/appModule/forgotPassword/ForgotPassword1"));

export default Page(() => (
  <>
    <Head>
      <title>ForgotPassword</title>
    </Head>
    <div className="app-wrapper h-100">
      <ForgotPassword1/>
    </div>
  </>
));