import Head from "next/head";
import Page from "../../hoc/securedPage";
import asyncComponent from "../../util/asyncComponent";

//const Todo = asyncComponent(() => import('../../app/todo/Basic/index'));

export default Page(() => (
  <>
    <Head>
      <title>Todo</title>
    </Head>
    <div className="app-wrapper"></div>
  </>
));
