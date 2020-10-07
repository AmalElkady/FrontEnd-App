import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Wall = asyncComponent(() => import('../../app/socialApps/Wall'));

export default Page(() => (
  <>
    <Head>
      <title>Wall</title>
    </Head>
    <div className="app-wrapper">
      <Wall/>
    </div>
  </>
));