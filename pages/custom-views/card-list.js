import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const CardList = asyncComponent(() => import('../../app/customViews/Card/index'));

export default Page(() => (
  <>
    <Head>
      <title>Cards List View</title>
    </Head>
    <div className="app-wrapper">
      <CardList/>
    </div>
  </>
));