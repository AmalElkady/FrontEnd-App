import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Badges = asyncComponent(() => import('../../app/components/Badges/index'));

export default Page(() => (
    <>
        <Head>
            <title>Badges Components</title>
        </Head>
        <div className="app-wrapper">
            <Badges/>
        </div>
    </>
));