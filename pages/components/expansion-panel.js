import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const ExpansionPanel = asyncComponent(() => import('../../app/components/ExpansionPanel'));

export default Page(() => (
    <>
        <Head>
            <title>ExpansionPanel Components</title>
        </Head>
        <div className="app-wrapper">
            <ExpansionPanel/>
        </div>
    </>
));