import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Styled = asyncComponent(() => import('../../app/map/Styled'));

export default Page(() => (
  <>
    <Head>
      <title>Styled</title>
    </Head>
    <div className="app-wrapper">
      <Styled/>
    </div>
  </>
));