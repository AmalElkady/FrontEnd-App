import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Modern = asyncComponent(() => import('../../app/metrics/Modern'));

export default Page(() => (
  <>
    <Head>
      <title>Metrics Modern</title>
    </Head>
    <div className="app-wrapper">
      <Modern/>
    </div>
  </>
));