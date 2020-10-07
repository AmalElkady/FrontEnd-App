import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Classic = asyncComponent(() => import('../../app/widgets/Classic'));

export default Page(() => (
  <>
    <Head>
      <title>Widgets Classic</title>
    </Head>
    <div className="app-wrapper">
      <Classic/>
    </div>
  </>
));