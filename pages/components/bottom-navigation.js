import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const BottomNavigation = asyncComponent(() => import('../../app/components/BottomNavigation'));

export default Page(() => (
    <>
        <Head>
            <title>BottomNavigation Components</title>
        </Head>
        <div className="app-wrapper">
            <BottomNavigation/>
        </div>
    </>
));