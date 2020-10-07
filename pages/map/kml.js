import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const KmLayer = asyncComponent(() => import('../../app/map/KmLayer'));

export default Page(() => (
  <>
    <Head>
      <title>Km Layer</title>
    </Head>
    <div className="app-wrapper">
      <KmLayer/>
    </div>
  </>
));