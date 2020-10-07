import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Treemap = asyncComponent(() => import('../../app/charts/Treemap'));

export default Page(() => (
    <>
        <Head>
            <title>Treemap Charts</title>
        </Head>
        <div className="app-wrapper">
            <Treemap/>
        </div>
    </>
));