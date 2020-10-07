import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const DrawingView = asyncComponent(() => import('../../app/map/DrawingView'));

export default Page(() => (
  <>
    <Head>
      <title>Map Drawing</title>
    </Head>
    <div className="app-wrapper">
      <DrawingView/>
    </div>
  </>
));