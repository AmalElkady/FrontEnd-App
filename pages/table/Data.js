import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Data = asyncComponent(() => import('../../app/table/Data/index'));

export default Page(() => (
  <>
    <Head>
      <title>basic table</title>
    </Head>
    <div className="app-wrapper">
      <Data/>
    </div>
  </>
));