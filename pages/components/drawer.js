import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Drawer = asyncComponent(() => import('../../app/components/Drawer'));

export default Page(() => (
    <>
        <Head>
            <title>Drawer Components</title>
        </Head>
        <div className="app-wrapper">
            <Drawer/>
        </div>
    </>
));