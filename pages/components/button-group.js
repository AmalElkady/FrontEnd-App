import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const ButtonGroup = asyncComponent(() => import('../../app/components/ButtonGroup'));

export default Page(() => (
    <>
        <Head>
            <title>ButtonGroup Components</title>
        </Head>
        <div className="app-wrapper">
            <ButtonGroup/>
        </div>
    </>
));