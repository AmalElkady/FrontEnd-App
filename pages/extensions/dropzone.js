import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Dropzone = asyncComponent(() => import('../../app/extensions/Dropzone'));

export default Page(() => (
    <>
        <Head>
            <title>Dropzone</title>
        </Head>
        <div className="app-wrapper">
            <Dropzone/>
        </div>
    </>
));