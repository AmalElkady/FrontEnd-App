import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Scatter = asyncComponent(() => import('../../app/charts/Scatter'));

export default Page(() => (
    <>
        <Head>
            <title>Scatter Charts</title>
        </Head>
        <div className="app-wrapper">
            <Scatter/>
        </div>
    </>
));