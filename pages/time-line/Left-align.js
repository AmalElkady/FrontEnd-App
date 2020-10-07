import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const LeftAligned = asyncComponent(() => import('../../app/timeLine/leftAligned/index'));

export default Page(() => (
  <>
    <Head>
      <title>Left Aligned</title>
    </Head>
    <div className="app-wrapper">
      <LeftAligned/>
    </div>
  </>
));