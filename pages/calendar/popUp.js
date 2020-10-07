import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Popup = asyncComponent(() => import('../../app/calendar/Popup'));

export default Page(() => (
    <>
        <Head>
            <title>Popup Calendar</title>
        </Head>
        <div className="app-wrapper">
            <Popup/>
        </div>
    </>
));