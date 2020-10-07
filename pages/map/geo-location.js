import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const GeoLocation = asyncComponent(() => import('../../app/map/GeoLocation'));

export default Page(() => (
  <>
    <Head>
      <title>Geo Location</title>
    </Head>
    <div className="app-wrapper">
      <GeoLocation/>
    </div>
  </>
));