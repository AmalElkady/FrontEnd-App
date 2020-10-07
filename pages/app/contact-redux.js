import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Contact = asyncComponent(() => import('../../app/contact/Redux'));

export default Page(() => (
  <>
    <Head>
      <title>Mail</title>
    </Head>
    <div className="app-wrapper">
      <Contact/>
    </div>
  </>
));