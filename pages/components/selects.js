import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Selects = asyncComponent(() => import('../../app/components/Selects'));

export default Page(() => (
    <>
        <Head>
            <title>Selects Components</title>
        </Head>
        <div className="app-wrapper">
            <Selects/>
        </div>
    </>
));