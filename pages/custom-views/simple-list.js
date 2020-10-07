import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Sample = asyncComponent(() => import('../../app/customViews/Sample/index'));

export default Page(() => (
  <>
    <Head>
      <title>Sample</title>
    </Head>
    <div className="app-wrapper">
      <Sample/>
    </div>
  </>
));