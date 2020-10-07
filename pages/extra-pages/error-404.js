import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Error404 = asyncComponent(() => import('../../app/extraPages/404'));

export default Page(() => (
    <>
        <Head>
            <title>Error 404</title>
        </Head>
        <div className="app-wrapper">
            <Error404/>
        </div>
    </>
));