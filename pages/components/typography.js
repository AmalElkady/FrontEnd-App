import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Typography = asyncComponent(() => import('../../app/components/Typography'));

export default Page(() => (
    <>
        <Head>
            <title>Typography Components</title>
        </Head>
        <div className="app-wrapper">
            <Typography/>
        </div>
    </>
));