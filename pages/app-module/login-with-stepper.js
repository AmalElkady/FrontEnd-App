import Head from "next/head";
import Page from "../../hoc/securedPage";
import asyncComponent from "../../util/asyncComponent";

const LoginWithStepper = asyncComponent(() => import("../../app/appModule/login/LoginWithStepper"));

export default Page(() => (
  <>
    <Head>
      <title>Login with Stepper</title>
    </Head>
    <div className="app-wrapper h-100">
      <LoginWithStepper/>
    </div>
  </>
));