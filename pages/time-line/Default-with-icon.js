import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const DefaultWithIcon = asyncComponent(() => import('../../app/timeLine/defaultWithIcon/index'));

export default Page(() => (
  <>
    <Head>
      <title>Default With Icon</title>
    </Head>
    <div className="app-wrapper">
      <DefaultWithIcon/>
    </div>
  </>
));