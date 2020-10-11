import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const ECommerce = asyncComponent(() => import('../../app/dashboard/ECommerce'));

export default Page(() => (
    <>
        <Head>
            <title>ECommerce Dashborad</title>
        </Head>
        <div className="app-wrapper">
            <ECommerce/>
        </div>
    </>
));