import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const GridList = asyncComponent(() => import('../../app/components/GridList'));

export default Page(() => (
    <>
        <Head>
            <title>GridList Components</title>
        </Head>
        <div className="app-wrapper">
            <GridList/>
        </div>
    </>
));