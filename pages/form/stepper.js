import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Stepper = asyncComponent(() => import('../../app/form/Stepper'));

export default Page(() => (
  <>
    <Head>
      <title>Stepper</title>
    </Head>
    <div className="app-wrapper">
      <Stepper/>
    </div>
  </>
));