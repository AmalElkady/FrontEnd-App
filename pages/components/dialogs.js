import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Dialogs = asyncComponent(() => import('../../app/components/Dialogs'));

export default Page(() => (
    <>
        <Head>
            <title>Dialogs Components</title>
        </Head>
        <div className="app-wrapper">
            <Dialogs/>
        </div>
    </>
));