import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const AutoComplete = asyncComponent(() => import('../../app/components/AutoComplete'));

export default Page(() => (
    <>
        <Head>
            <title>AutoComplete Components</title>
        </Head>
        <div className="app-wrapper">
            <AutoComplete/>
        </div>
    </>
));