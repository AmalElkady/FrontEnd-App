import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Testimonials = asyncComponent(() => import('../../app/extraElements/Testimonials'));

export default Page(() => (
    <>
        <Head>
            <title>Testimonials</title>
        </Head>
        <div className="app-wrapper">
            <Testimonials/>
        </div>
    </>
));