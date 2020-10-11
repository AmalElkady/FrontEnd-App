import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Listing = asyncComponent(() => import('../../app/dashboard/Listing'));

export default Page(() => (
    <>
        <Head>
            <title>Listing Dashborad</title>
        </Head>
        <div className="app-wrapper">
            <Listing/>
        </div>
    </>
));