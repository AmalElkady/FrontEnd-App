import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const MapOverlay = asyncComponent(() => import('../../app/map/MapOverlay'));

export default Page(() => (
  <>
    <Head>
      <title>Map Overlay</title>
    </Head>
    <div className="app-wrapper">
      <MapOverlay/>
    </div>
  </>
));