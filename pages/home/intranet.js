import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Intranet = asyncComponent(() => import('../../app/dashboard/Intranet'));

export default Page(() => (
    <>
        <Head>
            <title>Intranet Dashborad</title>
        </Head>
        <div className="app-wrapper">
            <Intranet/>
        </div>
    </>
));