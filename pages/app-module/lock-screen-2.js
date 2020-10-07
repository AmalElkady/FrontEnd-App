import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const LockScreen2 = asyncComponent(() => import('../../app/appModule/lockScreen/LockScreen2'));

export default Page(() => (
    <>
        <Head>
            <title>lockScreen</title>
        </Head>
        <div className="app-wrapper h-100">
            <LockScreen2/>
        </div>
    </>
));