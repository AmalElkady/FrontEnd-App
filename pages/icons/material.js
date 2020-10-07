import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const MaterialIcon = asyncComponent(() => import('../../app/icons/Material'));

export default Page(() => (
  <>
    <Head>
      <title>Icon</title>
    </Head>
    <div className="app-wrapper">
      <MaterialIcon/>
    </div>
  </>
));