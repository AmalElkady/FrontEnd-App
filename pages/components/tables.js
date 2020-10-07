import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Tables = asyncComponent(() => import('../../app/components/Tables'));

export default Page(() => (
    <>
        <Head>
            <title>Tables Components</title>
        </Head>
        <div className="app-wrapper">
            <Tables/>
        </div>
    </>
));