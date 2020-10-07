import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Modern = asyncComponent(() => import('../../app/widgets/Modern'));

export default Page(() => (
  <>
    <Head>
      <title>Widgets Modern</title>
    </Head>
    <div className="app-wrapper">
      <Modern/>
    </div>
  </>
));