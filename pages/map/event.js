import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Event = asyncComponent(() => import('../../app/map/EventHanlder'));

export default Page(() => (
  <>
    <Head>
      <title>Map Event</title>
    </Head>
    <div className="app-wrapper">
      <Event/>
    </div>
  </>
));