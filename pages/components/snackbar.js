import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Snackbar = asyncComponent(() => import('../../app/components/Snackbar'));

export default Page(() => (
    <>
        <Head>
            <title>Snackbar Components</title>
        </Head>
        <div className="app-wrapper">
            <Snackbar/>
        </div>
    </>
));