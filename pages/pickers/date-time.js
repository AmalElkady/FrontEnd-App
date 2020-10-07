import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const DateTime = asyncComponent(() => import('../../app/pickers/DateTime'));

export default Page(() => (
  <>
    <Head>
      <title>DateTime</title>
    </Head>
    <div className="app-wrapper">
      <DateTime/>
    </div>
  </>
));