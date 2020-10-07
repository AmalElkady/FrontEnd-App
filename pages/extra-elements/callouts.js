import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Callouts = asyncComponent(() => import('../../app/extraElements/Callouts'));

export default Page(() => (
    <>
        <Head>
            <title>Callouts</title>
        </Head>
        <div className="app-wrapper">
            <Callouts/>
        </div>
    </>
));