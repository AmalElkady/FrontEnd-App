import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Carousel = asyncComponent(() => import('../../app/components/Carousel'));

export default Page(() => (
    <>
        <Head>
            <title>Carousel Components</title>
        </Head>
        <div className="app-wrapper">
            <Carousel/>
        </div>
    </>
));