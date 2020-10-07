import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const News = asyncComponent(() => import('../../app/dashboard/News'));

export default Page(() => (
    <>
        <Head>
            <title>News Dashborad</title>
        </Head>
        <div className="app-wrapper">
            <News/>
        </div>
    </>
));