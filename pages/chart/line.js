import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Bar = asyncComponent(() => import('../../app/charts/Bar'));

export default Page(() => (
    <>
        <Head>
            <title>Bar Charts</title>
        </Head>
        <div className="app-wrapper">
            <Bar/>
        </div>
    </>
));