import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Appbar = asyncComponent(() => import('../../app/components/Appbar'));

export default Page(() => (
    <>
        <Head>
            <title>Appbar Components</title>
        </Head>
        <div className="app-wrapper">
            <Appbar/>
        </div>
    </>
));