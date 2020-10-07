import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const CK = asyncComponent(() => import('../../app/editors/CK'));

export default Page(() => (
    <>
        <Head>
            <title>CK Editors</title>
        </Head>
        <div className="app-wrapper">
            <CK/>
        </div>
    </>
));