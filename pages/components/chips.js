import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Chips = asyncComponent(() => import('../../app/components/Chips'));

export default Page(() => (
    <>
        <Head>
            <title>Chips Components</title>
        </Head>
        <div className="app-wrapper">
            <Chips/>
        </div>
    </>
));