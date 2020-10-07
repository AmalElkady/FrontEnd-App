import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Portfolio = asyncComponent(() => import('../../app/extraPages/Portfolio'));

export default Page(() => (
    <>
        <Head>
            <title>Portfolio</title>
        </Head>
        <div className="app-wrapper">
            <Portfolio/>
        </div>
    </>
));