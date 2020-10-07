import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Default = asyncComponent(() => import('../../app/timeLine/default/index'));

export default Page(() => (
  <>
    <Head>
      <title>Default</title>
    </Head>
    <div className="app-wrapper">
      <Default/>
    </div>
  </>
));