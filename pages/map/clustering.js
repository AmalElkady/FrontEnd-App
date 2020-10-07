import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const MapClustering = asyncComponent(() => import('../../app/map/MapClustering'));

export default Page(() => (
  <>
    <Head>
      <title>Map Clustering</title>
    </Head>
    <div className="app-wrapper">
      <MapClustering/>
    </div>
  </>
));