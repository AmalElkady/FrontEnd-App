import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Cultures = asyncComponent(() => import('../../app/calendar/Cultures'));

export default Page(() => (
    <>
        <Head>
            <title>Cultures Calendar</title>
        </Head>
        <div className="app-wrapper">
            <Cultures/>
        </div>
    </>
));