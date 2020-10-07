import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Faq = asyncComponent(() => import('../../app/extraPages/Faq'));

export default Page(() => (
    <>
        <Head>
            <title>Faq</title>
        </Head>
        <div className="app-wrapper">
            <Faq/>
        </div>
    </>
));