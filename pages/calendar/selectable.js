import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Selectable = asyncComponent(() => import('../../app/calendar/Selectable'));

export default Page(() => (
    <>
        <Head>
            <title>Selectable Calendar</title>
        </Head>
        <div className="app-wrapper">
            <Selectable/>
        </div>
    </>
));