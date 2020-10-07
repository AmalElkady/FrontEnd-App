import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Basic = asyncComponent(() => import('../../app/table/Basic/index'));

export default Page(() => (
  <>
    <Head>
      <title>basic table</title>
    </Head>
    <div className="app-wrapper">
      <Basic/>
    </div>
  </>
));