import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const AboutUs = asyncComponent(() => import('../../app/extraPages/AboutUs'));

export default Page(() => (
    <>
        <Head>
            <title>About Us</title>
        </Head>
        <div className="app-wrapper">
            <AboutUs/>
        </div>
    </>
));