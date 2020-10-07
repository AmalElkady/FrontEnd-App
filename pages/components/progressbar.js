import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Progressbar = asyncComponent(() => import('../../app/components/Progressbar'));

export default Page(() => (
    <>
        <Head>
            <title>Progressbar Components</title>
        </Head>
        <div className="app-wrapper">
            <Progressbar/>
        </div>
    </>
));