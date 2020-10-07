import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Breadcrumbs = asyncComponent(() => import('../../app/components/Breadcrumbs'));

export default Page(() => (
    <>
        <Head>
            <title>Breadcrumbs Components</title>
        </Head>
        <div className="app-wrapper">
            <Breadcrumbs/>
        </div>
    </>
));