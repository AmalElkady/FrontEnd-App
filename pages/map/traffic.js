import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const TrafficLayer = asyncComponent(() => import('../../app/map/TrafficLayer'));

export default Page(() => (
  <>
    <Head>
      <title>Traffic Layer</title>
    </Head>
    <div className="app-wrapper">
      <TrafficLayer/>
    </div>
  </>
));