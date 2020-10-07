import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const composed = asyncComponent(() => import('../../app/charts/composed'));

export default Page(() => (
    <>
        <Head>
            <title>composed Charts</title>
        </Head>
        <div className="app-wrapper">
            <composed/>
        </div>
    </>
));