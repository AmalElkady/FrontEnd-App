import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const ContactUs = asyncComponent(() => import('../../app/extraPages/ContactUs'));

export default Page(() => (
    <>
        <Head>
            <title>Contact Us</title>
        </Head>
        <div className="app-wrapper">
            <ContactUs/>
        </div>
    </>
));