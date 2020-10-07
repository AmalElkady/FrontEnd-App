import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Area = asyncComponent(() => import('../../app/charts/Area'));

export default Page(() => (
    <>
        <Head>
            <title>Area Charts</title>
        </Head>
        <div className="app-wrapper">
            <Area/>
        </div>
    </>
));