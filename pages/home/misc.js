import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Misc = asyncComponent(() => import('../../app/dashboard/Misc'));

export default Page(() => (
    <>
        <Head>
            <title>Misc Dashborad</title>
        </Head>
        <div className="app-wrapper">
            <Misc/>
        </div>
    </>
));