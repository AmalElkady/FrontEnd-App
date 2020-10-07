import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Strip = asyncComponent(() => import('../../app/customViews/Strip/index'));

export default Page(() => (
  <>
    <Head>
      <title>Plain List With Divider</title>
    </Head>
    <div className="app-wrapper">
      <Strip/>
    </div>
  </>
));