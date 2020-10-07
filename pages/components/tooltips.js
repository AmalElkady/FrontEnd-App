import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Tooltip = asyncComponent(() => import('../../app/components/Tooltip'));

export default Page(() => (
    <>
        <Head>
            <title>Tooltip Components</title>
        </Head>
        <div className="app-wrapper">
            <Tooltip/>
        </div>
    </>
));