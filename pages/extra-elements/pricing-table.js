import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const PricingTable = asyncComponent(() => import('../../app/extraElements/PricingTable'));

export default Page(() => (
    <>
        <Head>
            <title>PricingTable</title>
        </Head>
        <div className="app-wrapper">
            <PricingTable/>
        </div>
    </>
));