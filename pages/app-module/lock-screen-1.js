import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const LockScreen1 = asyncComponent(() => import('../../app/appModule/lockScreen/LockScreen1'));

export default Page(() => (
    <>
        <Head>
            <title>lockScreen</title>
        </Head>
        <div className="app-wrapper h-100">
            <LockScreen1/>
        </div>
    </>
));