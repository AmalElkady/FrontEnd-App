import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Classic = asyncComponent(() => import('../../app/metrics/Classic'));

export default Page(() => (
  <>
    <Head>
      <title>Metrics Classic</title>
    </Head>
    <div className="app-wrapper">
      <Classic/>
    </div>
  </>
));