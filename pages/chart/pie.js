import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Pie = asyncComponent(() => import('../../app/charts/Pie'));

export default Page(() => (
    <>
        <Head>
            <title>Pie Charts</title>
        </Head>
        <div className="app-wrapper">
            <Pie/>
        </div>
    </>
));