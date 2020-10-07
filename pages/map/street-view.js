import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const StreetView = asyncComponent(() => import('../../app/map/StreetView'));

export default Page(() => (
  <>
    <Head>
      <title>Street View</title>
    </Head>
    <div className="app-wrapper">
      <StreetView/>
    </div>
  </>
));