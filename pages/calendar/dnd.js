import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Dnd = asyncComponent(() => import('../../app/calendar/Dnd'));

export default Page(() => (
    <>
        <Head>
            <title>Dnd Calendar</title>
        </Head>
        <div className="app-wrapper">
            <Dnd/>
        </div>
    </>
));