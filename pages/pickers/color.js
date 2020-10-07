import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Color = asyncComponent(() => import('../../app/pickers/Color'));

export default Page(() => (
  <>
    <Head>
      <title>Color</title>
    </Head>
    <div className="app-wrapper">
      <Color/>
    </div>
  </>
));