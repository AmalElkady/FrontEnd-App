import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const DragnDrop = asyncComponent(() => import('../../app/extensions/DragnDrop'));

export default Page(() => (
    <>
        <Head>
            <title>DragnDrop</title>
        </Head>
        <div className="app-wrapper">
            <DragnDrop/>
        </div>
    </>
));