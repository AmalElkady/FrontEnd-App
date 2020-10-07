import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Tabs = asyncComponent(() => import('../../app/components/Tabs'));

export default Page(() => (
    <>
        <Head>
            <title>Tabs Components</title>
        </Head>
        <div className="app-wrapper">
            <Tabs/>
        </div>
    </>
));