import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const TextFields = asyncComponent(() => import('../../app/components/TextFields'));

export default Page(() => (
    <>
        <Head>
            <title>TextFields Components</title>
        </Head>
        <div className="app-wrapper">
            <TextFields/>
        </div>
    </>
));