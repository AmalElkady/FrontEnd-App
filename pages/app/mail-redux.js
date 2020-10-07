import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Mail = asyncComponent(() => import('../../app/mail/Redux'));

export default Page(() => (
  <>
    <Head>
      <title>Mail Redux</title>
    </Head>
    <div className="app-wrapper">
      <Mail/>
    </div>
  </>
));