import Head from "next/head";
import Page from "../../hoc/securedPage";
import asyncComponent from "../../util/asyncComponent";

const Login1 = asyncComponent(() => import("../../app/appModule/login/Login1"));

export default Page(() => (
  <>
    <Head>
      <title>Login</title>
    </Head>
    <div className="app-wrapper h-100">
      <Login1/>
    </div>
  </>
));