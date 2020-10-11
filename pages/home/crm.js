import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const CRM = asyncComponent(() => import('../../app/dashboard/CRM'));

export default Page(() => (
    <>
        <Head>
            <title>CRM Dashborad</title>
        </Head>
        <div className="app-wrapper">
            <CRM/>
        </div>
    </>
));