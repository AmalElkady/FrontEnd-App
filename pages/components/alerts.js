import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Alerts = asyncComponent(() => import('../../app/components/Alert'));

export default Page(() => (
    <>
        <Head>
            <title>Alert Components</title>
        </Head>
        <div className="app-wrapper">
            <Alerts/>
        </div>
    </>
));