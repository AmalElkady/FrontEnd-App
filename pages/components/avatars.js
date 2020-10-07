import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Avatars = asyncComponent(() => import('../../app/components/Avatar'));

export default Page(() => (
    <>
        <Head>
            <title>Avatar Components</title>
        </Head>
        <div className="app-wrapper">
            <Avatars/>
        </div>
    </>
));