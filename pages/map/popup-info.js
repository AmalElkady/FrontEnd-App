import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const PopUpInfo = asyncComponent(() => import('../../app/map/PopUpInfo'));

export default Page(() => (
  <>
    <Head>
      <title>Pop Up Info</title>
    </Head>
    <div className="app-wrapper">
      <PopUpInfo/>
    </div>
  </>
));