import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Notification = asyncComponent(() => import('../../app/extensions/Notification'));

export default Page(() => (
    <>
        <Head>
            <title>Notification</title>
        </Head>
        <div className="app-wrapper">
            <Notification/>
        </div>
    </>
));