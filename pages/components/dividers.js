import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Dividers = asyncComponent(() => import('../../app/components/Dividers'));

export default Page(() => (
    <>
        <Head>
            <title>Dividers Components</title>
        </Head>
        <div className="app-wrapper">
            <Dividers/>
        </div>
    </>
));