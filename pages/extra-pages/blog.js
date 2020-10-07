import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Blog = asyncComponent(() => import('../../app/extraPages/Blog'));

export default Page(() => (
    <>
        <Head>
            <title>Blog</title>
        </Head>
        <div className="app-wrapper">
            <Blog/>
        </div>
    </>
));