import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Simple = asyncComponent(() => import('../../app/map/Simple'));

export default Page(() => (
  <>
    <Head>
      <title>Simple Map</title>
    </Head>
    <div className="app-wrapper">
      <Simple/>
    </div>
  </>
));