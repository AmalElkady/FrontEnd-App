import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Rendering = asyncComponent(() => import('../../app/calendar/Rendering'));

export default Page(() => (
    <>
        <Head>
            <title>Rendering Calendar</title>
        </Head>
        <div className="app-wrapper">
            <Rendering/>
        </div>
    </>
));