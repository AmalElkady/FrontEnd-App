import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Cards = asyncComponent(() => import('../../app/components/Cards'));

export default Page(() => (
    <>
        <Head>
            <title>Cards Components</title>
        </Head>
        <div className="app-wrapper">
            <Cards/>
        </div>
    </>
));