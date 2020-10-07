import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Selections = asyncComponent(() => import('../../app/components/Selection'));

export default Page(() => (
    <>
        <Head>
            <title>Selections Components</title>
        </Head>
        <div className="app-wrapper">
            <Selections/>
        </div>
    </>
));