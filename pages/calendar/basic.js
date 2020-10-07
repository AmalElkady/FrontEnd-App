import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Basic = asyncComponent(() => import('../../app/calendar/Basic'));

export default Page(() => (
    <>
        <Head>
            <title>Basic Calendar</title>
        </Head>
        <div className="app-wrapper">
            <Basic/>
        </div>
    </>
));