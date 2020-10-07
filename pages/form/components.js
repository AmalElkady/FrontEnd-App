import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Components = asyncComponent(() => import('../../app/form/Components'));

export default Page(() => (
  <>
    <Head>
      <title>Components</title>
    </Head>
    <div className="app-wrapper">
      <Components/>
    </div>
  </>
));