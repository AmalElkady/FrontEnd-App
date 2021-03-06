import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const SignUP1 = asyncComponent(() => import('../../app/appModule/signUp/SignUP1'));

export default Page(() => (
    <>
        <Head>
            <title>Sign UP</title>
        </Head>
        <div className="app-wrapper h-100">
            <SignUP1/>
        </div>
    </>
));