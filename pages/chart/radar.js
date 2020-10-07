import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Radar = asyncComponent(() => import('../../app/charts/Radar'));

export default Page(() => (
    <>
        <Head>
            <title>Radar Charts</title>
        </Head>
        <div className="app-wrapper">
            <Radar/>
        </div>
    </>
));