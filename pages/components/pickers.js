import Head from "next/head";
import Page from "../../hoc/securedPage";
import asyncComponent from "../../util/asyncComponent";

const Pickers = asyncComponent(() => import("../../app/components/Pickers"));

export default Page(() => (
  <>
    <Head>
      <title>Pickers Components</title>
    </Head>
    <div className="app-wrapper">
      <Pickers/>
    </div>
  </>
));