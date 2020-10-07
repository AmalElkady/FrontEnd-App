import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const List = asyncComponent(() => import('../../app/components/List'));

export default Page(() => (
    <>
        <Head>
            <title>List Components</title>
        </Head>
        <div className="app-wrapper">
            <List/>
        </div>
    </>
));