import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const SweetAlert = asyncComponent(() => import('../../app/extensions/SweetAlert'));

export default Page(() => (
    <>
        <Head>
            <title>SweetAlert</title>
        </Head>
        <div className="app-wrapper">
            <SweetAlert/>
        </div>
    </>
));