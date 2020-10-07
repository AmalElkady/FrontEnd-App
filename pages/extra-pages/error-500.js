import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Error500 = asyncComponent(() => import('../../app/extraPages/500'));

export default Page(() => (
    <>
        <Head>
            <title>Error-500</title>
        </Head>
        <div className="app-wrapper">
            <Error500/>
        </div>
    </>
));