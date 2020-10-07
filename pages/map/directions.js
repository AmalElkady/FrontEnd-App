import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Directions = asyncComponent(() => import('../../app/map/Directions'));

export default Page(() => (
  <>
    <Head>
      <title>Map Direction</title>
    </Head>
    <div className="app-wrapper">
      <Directions/>
    </div>
  </>
));